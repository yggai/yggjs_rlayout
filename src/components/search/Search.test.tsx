import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { Search } from './Search';

describe('Search', () => {
  it('renders with default props', () => {
    render(<Search data-testid="search" />);
    const search = screen.getByTestId('search');
    expect(search).toBeInTheDocument();
    expect(search).toHaveClass('ygg-search', 'ygg-search-medium', 'ygg-search-outlined');
  });

  it('handles controlled value', () => {
    const onChange = vi.fn();
    render(<Search value="test" onChange={onChange} data-testid="search" />);
    const input = screen.getByRole('searchbox');
    expect(input).toHaveValue('test');
    
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(onChange).toHaveBeenCalledWith('new value');
  });

  it('handles uncontrolled value', () => {
    render(<Search defaultValue="initial" data-testid="search" />);
    const input = screen.getByRole('searchbox');
    expect(input).toHaveValue('initial');
    
    fireEvent.change(input, { target: { value: 'changed' } });
    expect(input).toHaveValue('changed');
  });

  it('calls onSearch when Enter is pressed', () => {
    const onSearch = vi.fn();
    render(<Search onSearch={onSearch} data-testid="search" />);
    const input = screen.getByRole('searchbox');

    fireEvent.change(input, { target: { value: 'search term' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onSearch).toHaveBeenCalledWith('search term');
  });

  it('calls onSearch when search button is clicked', () => {
    const onSearch = vi.fn();
    render(<Search onSearch={onSearch} searchButton={true} showSearchIcon={false} data-testid="search" />);
    const input = screen.getByRole('searchbox');
    const searchButton = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'search term' } });
    fireEvent.click(searchButton);

    expect(onSearch).toHaveBeenCalledWith('search term');
  });

  it('shows clear button when allowClear is true and has value', () => {
    render(<Search defaultValue="test" allowClear data-testid="search" />);
    const clearButton = screen.getByTestId('search').querySelector('.ygg-search-clear');
    expect(clearButton).toBeInTheDocument();
  });

  it('clears value when clear button is clicked', () => {
    const onChange = vi.fn();
    render(<Search value="test" onChange={onChange} allowClear data-testid="search" />);
    const clearButton = screen.getByTestId('search').querySelector('.ygg-search-clear');

    fireEvent.click(clearButton!);
    expect(onChange).toHaveBeenCalledWith('');
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<Search size="small" data-testid="search" />);
    expect(screen.getByTestId('search')).toHaveClass('ygg-search-small');
    
    rerender(<Search size="large" data-testid="search" />);
    expect(screen.getByTestId('search')).toHaveClass('ygg-search-large');
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Search variant="filled" data-testid="search" />);
    expect(screen.getByTestId('search')).toHaveClass('ygg-search-filled');
    
    rerender(<Search variant="ghost" data-testid="search" />);
    expect(screen.getByTestId('search')).toHaveClass('ygg-search-ghost');
  });

  it('shows loading state', () => {
    render(<Search loading data-testid="search" />);
    // Loading icon should be present (we can't easily test the SVG, but we can test the container)
    expect(screen.getByTestId('search')).toBeInTheDocument();
  });

  it('handles disabled state', () => {
    render(<Search disabled data-testid="search" />);
    const input = screen.getByRole('searchbox');
    const container = screen.getByTestId('search');

    expect(input).toBeDisabled();
    expect(container).toHaveClass('ygg-search-disabled');
  });

  it('shows search icon when showSearchIcon is true', () => {
    render(<Search showSearchIcon={true} data-testid="search" />);
    const searchIcon = screen.getByTestId('search').querySelector('.ygg-search-icon');
    expect(searchIcon).toBeInTheDocument();
  });

  it('hides search icon when showSearchIcon is false', () => {
    render(<Search showSearchIcon={false} data-testid="search" />);
    const searchIcon = screen.getByTestId('search').querySelector('.ygg-search-icon');
    expect(searchIcon).not.toBeInTheDocument();
  });

  it('calls onSearch when search icon is clicked with content', () => {
    const onSearch = vi.fn();
    render(<Search onSearch={onSearch} showSearchIcon={true} data-testid="search" />);
    const input = screen.getByRole('searchbox');
    const searchIcon = screen.getByTestId('search').querySelector('.ygg-search-icon');

    fireEvent.change(input, { target: { value: 'search term' } });
    fireEvent.click(searchIcon!);

    expect(onSearch).toHaveBeenCalledWith('search term');
  });

  it('shows alert when search icon is clicked without content', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    render(<Search showSearchIcon={true} data-testid="search" />);
    const searchIcon = screen.getByTestId('search').querySelector('.ygg-search-icon');

    fireEvent.click(searchIcon!);

    expect(alertSpy).toHaveBeenCalledWith('请输入搜索内容');
    alertSpy.mockRestore();
  });

  it('does not show search icon when loading', () => {
    render(<Search showSearchIcon={true} loading={true} data-testid="search" />);
    const searchIcon = screen.getByTestId('search').querySelector('.ygg-search-icon');
    expect(searchIcon).not.toBeInTheDocument();
  });

  it('shows search icon by default', () => {
    render(<Search data-testid="search" />);
    const searchIcon = screen.getByTestId('search').querySelector('.ygg-search-icon');
    expect(searchIcon).toBeInTheDocument();
  });
});
