import { describe, it, expect } from 'vitest';
import { computeSelectionFromPath } from './pathSelect';

const items = [
  { key: 'home', path: '/' },
  { key: 'docs', path: '/docs', children: [
    { key: 'guide', path: '/docs/guide' },
    { key: 'api', path: '/docs/api' },
  ]},
  { key: 'about', path: '/about' }
];

describe('computeSelectionFromPath', () => {
  it('matches exact path and builds openKeys', () => {
    const r = computeSelectionFromPath(items, '/docs/guide', { match: 'exact' });
    expect(r.selectedKey).toBe('guide');
    expect(r.openKeys).toEqual(['docs']);
  });

  it('matches longest prefix with startsWith', () => {
    const r = computeSelectionFromPath(items, '/docs/api/ref', { match: 'startsWith' });
    expect(r.selectedKey).toBe('api');
    expect(r.openKeys).toEqual(['docs']);
  });
});

