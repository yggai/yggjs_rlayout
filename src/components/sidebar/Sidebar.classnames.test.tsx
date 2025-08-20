import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { Sidebar } from './Sidebar';

describe('Sidebar classNames', () => {
  it('adds ygg-sidebar classes for sticky left', () => {
    const { getByTestId } = render(<Sidebar sticky data-testid="s">X</Sidebar>);
    const el = getByTestId('s');
    expect(el.className).toContain('ygg-sidebar');
    expect(el.className).toContain('ygg-sidebar-left');
    expect(el.className).toContain('ygg-sidebar-sticky');
  });

  it('adds right/fixed classes and supports custom prefix', () => {
    const { getByTestId } = render(<Sidebar fixed side="right" prefixCls="acme" data-testid="s">X</Sidebar>);
    const el = getByTestId('s');
    expect(el.className).toContain('acme-sidebar');
    expect(el.className).toContain('acme-sidebar-right');
    expect(el.className).toContain('acme-sidebar-fixed');
  });
});

