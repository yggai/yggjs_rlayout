import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { Header } from './Header';

describe('Header classNames', () => {
  it('adds ygg-header + sticky/fixed classes', () => {
    const { getByTestId, rerender } = render(<Header data-testid="h">X</Header>);
    const el = getByTestId('h');
    expect(el.className).toContain('ygg-header');

    rerender(<Header sticky data-testid="h">X</Header>);
    expect(getByTestId('h').className).toContain('ygg-header-sticky');

    rerender(<Header fixed data-testid="h">X</Header>);
    expect(getByTestId('h').className).toContain('ygg-header-fixed');
  });

  it('respects custom prefixCls', () => {
    const { getByTestId } = render(<Header prefixCls="acme" data-testid="h">X</Header>);
    expect(getByTestId('h').className).toContain('acme-header');
  });
});

