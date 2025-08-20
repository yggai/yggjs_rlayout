import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { Grid } from './Grid';

describe('CSS Grid', () => {
  it('renders Grid with columns, gap and autoFlow', () => {
    const { getByTestId } = render(
      <Grid columns={3} gap={12} autoFlow="row dense" data-testid="grid">
        <div>A</div>
      </Grid>
    );
    const el = getByTestId('grid');
    expect(el).toHaveStyle({ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' });
    expect(el).toHaveStyle({ gridAutoFlow: 'row dense' });
  });

  it('Grid.Item supports colSpan and rowSpan', () => {
    const { getByTestId } = render(
      <Grid columns={4} data-testid="grid">
        <Grid.Item data-testid="item" colSpan={2} rowSpan={3}>X</Grid.Item>
      </Grid>
    );
    const it = getByTestId('item');
    expect(it).toHaveStyle({ gridColumn: 'span 2', gridRow: 'span 3' });
  });
});

