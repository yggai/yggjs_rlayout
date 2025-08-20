import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { Flex } from './Flex';

describe('Flex', () => {
  it('renders row with center/space-between and gap', () => {
    const { getByTestId } = render(
      <Flex direction="row" align="center" justify="space-between" gap={12} data-testid="fx">
        <div>A</div><div>B</div>
      </Flex>
    );
    const el = getByTestId('fx');
    expect(el).toHaveStyle({ display: 'flex', flexDirection: 'row' });
    expect(el).toHaveStyle({ alignItems: 'center', justifyContent: 'space-between' });
    expect(el).toHaveStyle({ gap: '12px' });
  });

  it('renders column with wrap and custom element', () => {
    const { getByTestId } = render(
      <Flex as="ul" direction="column" wrap data-testid="fx">
        <li>A</li><li>B</li>
      </Flex>
    );
    const el = getByTestId('fx');
    expect(el.tagName.toLowerCase()).toBe('ul');
    expect(el).toHaveStyle({ flexDirection: 'column', flexWrap: 'wrap' });
  });
});

