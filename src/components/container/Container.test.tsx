import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { Container } from './Container';
import { BreakpointProvider } from '../grid/breakpoints';

describe('Container', () => {
  it('fixed container centers with maxWidth and paddingX', () => {
    const { getByTestId } = render(
      <Container variant="fixed" maxWidth={960} paddingX={16} data-testid="c" />
    );
    const el = getByTestId('c');
    expect(el).toHaveStyle({ maxWidth: '960px', marginLeft: 'auto', marginRight: 'auto' });
    expect(el).toHaveStyle({ paddingLeft: '16px', paddingRight: '16px' });
  });

  it('fluid container takes full width without maxWidth', () => {
    const { getByTestId } = render(
      <Container variant="fluid" data-testid="c" />
    );
    const el = getByTestId('c');
    expect(el).toHaveStyle({ width: '100%' });
  });

  it('responsive container behaves as fixed on and above breakpoint', () => {
    const { getByTestId, rerender } = render(
      <BreakpointProvider value="sm">
        <Container variant="responsive" breakpoint="md" maxWidth={960} data-testid="c" />
      </BreakpointProvider>
    );
    // below md => fluid
    expect(getByTestId('c')).toHaveStyle({ width: '100%' });

    rerender(
      <BreakpointProvider value="md">
        <Container variant="responsive" breakpoint="md" maxWidth={960} data-testid="c" />
      </BreakpointProvider>
    );
    // at md => fixed
    const el = getByTestId('c');
    expect(el).toHaveStyle({ maxWidth: '960px', marginLeft: 'auto', marginRight: 'auto' });
  });
});

