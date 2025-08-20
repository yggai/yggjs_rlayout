import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { Header } from './Header';

describe('Header', () => {
  it('renders as <header> by default', () => {
    const { getByTestId } = render(<Header data-testid="h">X</Header>);
    const el = getByTestId('h');
    expect(el.tagName.toLowerCase()).toBe('header');
  });

  it('sticky header has position:sticky and top:0', () => {
    const { getByTestId } = render(<Header sticky data-testid="h">X</Header>);
    const el = getByTestId('h');
    expect(el).toHaveStyle({ position: 'sticky', top: '0px' });
  });

  it('fixed header supports height and top', () => {
    const { getByTestId } = render(<Header fixed height={64} top={10} data-testid="h">X</Header>);
    const el = getByTestId('h');
    expect(el).toHaveStyle({ position: 'fixed', top: '10px', height: '64px', width: '100%' });
  });
});

