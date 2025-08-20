import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { Flex } from './Flex';

describe('Flex presets', () => {
  it('Flex.Center centers children both axes', () => {
    const { getByTestId } = render(
      <Flex.Center data-testid="fx"><div>A</div></Flex.Center>
    );
    const el = getByTestId('fx');
    expect(el).toHaveStyle({ display: 'flex', justifyContent: 'center', alignItems: 'center' });
  });

  it('Flex.Between sets justify space-between and align center by default', () => {
    const { getByTestId } = render(
      <Flex.Between data-testid="fx"><div>A</div><div>B</div></Flex.Between>
    );
    const el = getByTestId('fx');
    expect(el).toHaveStyle({ justifyContent: 'space-between', alignItems: 'center' });
  });

  it('Flex.Around sets justify space-around and align center', () => {
    const { getByTestId } = render(
      <Flex.Around data-testid="fx"><div>A</div><div>B</div></Flex.Around>
    );
    const el = getByTestId('fx');
    expect(el).toHaveStyle({ justifyContent: 'space-around', alignItems: 'center' });
  });
});

