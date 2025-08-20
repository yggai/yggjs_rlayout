import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { Row, Column } from './';

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
});

