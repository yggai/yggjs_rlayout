import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { Layout } from './Layout';

describe('Layout', () => {
  it('renders horizontal layout with gap and item', () => {
    const { getByTestId } = render(
      <Layout direction="horizontal" gap={8} data-testid="layout">
        <Layout.Item>Item</Layout.Item>
      </Layout>
    );
    const el = getByTestId('layout');
    expect(el).toBeInTheDocument();
    expect(el).toHaveStyle({ display: 'flex', flexDirection: 'row' });
  });
});

