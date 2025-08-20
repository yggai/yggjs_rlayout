import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { Row } from './row';
import { Column } from './column';
import { GridConfigProvider } from './config';

describe('GridConfigProvider', () => {
  it('supports totalColumns override (24 columns)', () => {
    const { getByTestId } = render(
      <GridConfigProvider value={{ totalColumns: 24 }}>
        <Row>
          <Column span={12} data-testid="col">A</Column>
        </Row>
      </GridConfigProvider>
    );
    expect(getByTestId('col')).toHaveStyle({ width: '50.0000%' });
  });

  it('warns when span/offset are out of range and clamps values', () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    try {
      const { getByTestId } = render(
        <GridConfigProvider value={{ totalColumns: 12 }}>
          <Row>
            <Column span={20} offset={10} data-testid="col">A</Column>
          </Row>
        </GridConfigProvider>
      );
      const el = getByTestId('col');
      expect(spy).toHaveBeenCalled();
      // offset+span clamped to total => span becomes 2 when offset=10 (total=12)
      expect(el).toHaveStyle({ width: '16.6667%' });
      expect(el).toHaveStyle({ marginLeft: '83.33333333333334%' });
    } finally {
      spy.mockRestore();
    }
  });
});

