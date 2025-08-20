import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { Row, Column } from './';
import { BreakpointProvider } from './breakpoints';

describe('Grid Row/Column', () => {
  it('Column span=6 should be 50% width', () => {
    const { getByTestId } = render(
      <Row>
        <Column span={6} data-testid="col">A</Column>
      </Row>
    );
    expect(getByTestId('col')).toHaveStyle({ width: '50%' });
  });

  it('Row gutter=16 should give Column padding 8px and Row negative margins', () => {
    const { getByTestId } = render(
      <Row gutter={16} data-testid="row">
        <Column span={6} data-testid="col">A</Column>
      </Row>
    );
    expect(getByTestId('row')).toHaveStyle({ marginLeft: '-8px', marginRight: '-8px' });
    expect(getByTestId('col')).toHaveStyle({ paddingLeft: '8px', paddingRight: '8px' });
  });

  it('Column offset=3 should add 25% margin-left', () => {
    const { getByTestId } = render(
      <Row>
        <Column span={6} offset={3} data-testid="col">A</Column>
      </Row>
    );
    expect(getByTestId('col')).toHaveStyle({ marginLeft: '25%' });
  });

  it('Responsive spanMd overrides base span when bp=md', () => {
    const { getByTestId } = render(
      <BreakpointProvider value="md">
        <Row>
          <Column span={12} spanMd={4} data-testid="col">A</Column>
        </Row>
      </BreakpointProvider>
    );
    expect(getByTestId('col')).toHaveStyle({ width: '33.3333%' });
  });

  it('Row gutterX/gutterY apply paddings and negative margins', () => {
    const { getByTestId } = render(
      <Row gutterX={20} gutterY={10} data-testid="row">
        <Column span={6} data-testid="col">A</Column>
      </Row>
    );
    expect(getByTestId('row')).toHaveStyle({ marginLeft: '-10px', marginRight: '-10px', marginTop: '-5px', marginBottom: '-5px' });
    expect(getByTestId('col')).toHaveStyle({ paddingLeft: '10px', paddingRight: '10px', paddingTop: '5px', paddingBottom: '5px' });
  });
});

