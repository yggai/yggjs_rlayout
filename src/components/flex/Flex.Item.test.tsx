import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { Flex } from './Flex';

describe('Flex.Item', () => {
  it('supports order/grow/shrink/basis', () => {
    const { getByTestId } = render(
      <Flex data-testid="fx">
        <Flex.Item data-testid="item" order={2} grow={1} shrink={0} basis={100}>A</Flex.Item>
      </Flex>
    );
    const el = getByTestId('item');
    expect(el).toHaveStyle({ order: '2', flexGrow: '1', flexShrink: '0', flexBasis: '100px' });
  });
});

