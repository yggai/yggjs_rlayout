import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
  it('renders as <aside> by default', () => {
    const { getByTestId } = render(<Sidebar data-testid="s">X</Sidebar>);
    const el = getByTestId('s');
    expect(el.tagName.toLowerCase()).toBe('aside');
  });

  it('fixed left sidebar with width', () => {
    const { getByTestId } = render(<Sidebar fixed width={240} data-testid="s">X</Sidebar>);
    const el = getByTestId('s');
    expect(el).toHaveStyle({ position: 'fixed', left: '0px', width: '240px' });
  });

  it('sticky right sidebar with top', () => {
    const { getByTestId } = render(<Sidebar sticky side="right" top={16} data-testid="s">X</Sidebar>);
    const el = getByTestId('s');
    expect(el).toHaveStyle({ position: 'sticky', right: '0px', top: '16px' });
  });
});

