import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { Menu } from './Menu';

const items = [
  { key: 'home', label: 'Home' },
  { key: 'docs', label: 'Docs', children: [
    { key: 'guide', label: 'Guide' },
    { key: 'api', label: 'API' },
  ]},
  { key: 'about', label: 'About', disabled: true },
];

describe('Menu', () => {
  it('renders horizontal menu and highlights selected', () => {
    const { getByTestId, getByText } = render(
      <Menu items={items} mode="horizontal" selectedKeys={["home"]} data-testid="m" />
    );
    const el = getByTestId('m');
    expect(el).toHaveAttribute('role', 'menubar');
    expect(el).toHaveStyle({ display: 'flex' });
    const home = getByText('Home');
    expect(home.parentElement).toHaveAttribute('aria-selected', 'true');
  });

  it('submenu shows items when openKeys contains its key', () => {
    const { queryByText } = render(
      <Menu items={items} openKeys={["docs"]} />
    );
    expect(queryByText('Guide')).toBeTruthy();
  });

  it('onSelect fires for enabled item and not for disabled', () => {
    const onSelect = vi.fn();
    const { getByText } = render(
      <Menu items={items} onSelect={onSelect} />
    );
    fireEvent.click(getByText('Home'));
    expect(onSelect).toHaveBeenCalledWith({ key: 'home' });
    onSelect.mockClear();
    fireEvent.click(getByText('About'));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('inline mode toggles submenu on click (uncontrolled)', () => {
    const { queryByText, getByText } = render(
      <Menu items={items} mode="inline" />
    );
    expect(queryByText('Guide')).toBeNull();
    fireEvent.click(getByText('Docs'));
    expect(queryByText('Guide')).toBeTruthy();
    fireEvent.click(getByText('Docs'));
    expect(queryByText('Guide')).toBeNull();
  });

  it('hover trigger opens submenu in horizontal mode and calls onOpenChange', async () => {
    const onOpenChange = vi.fn();
    const { getByText, queryByText } = render(
      <Menu items={items} mode="horizontal" trigger="hover" onOpenChange={onOpenChange} />
    );
    const docs = getByText('Docs');
    fireEvent.mouseEnter(docs.parentElement as HTMLElement);
    expect(queryByText('Guide')).toBeTruthy();
    fireEvent.mouseLeave(docs.parentElement as HTMLElement);
    expect(queryByText('Guide')).toBeNull();
    expect(onOpenChange).toHaveBeenCalled();
  });
});

