import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { Menu } from './Menu';

const items = [
  { key: 'home', label: 'Home' },
  { key: 'docs', label: 'Docs', children: [
    { key: 'guide', label: 'Guide' },
  ]},
  { key: 'about', label: 'About', disabled: true },
];

describe('Menu classNames', () => {
  it('adds minimal classNames with default prefix ygg', () => {
    const { getByTestId, getByText } = render(
      <Menu items={items} mode="horizontal" selectedKeys={["home"]} openKeys={["docs"]} data-testid="m" />
    );
    const root = getByTestId('m');
    expect(root.className).toContain('ygg-menu');
    expect(root.className).toContain('ygg-menu-horizontal');

    const homeLi = getByText('Home').closest('li');
    expect(homeLi?.className).toContain('ygg-menu-item');
    expect(homeLi?.className).toContain('ygg-menu-item-selected');

    const aboutLi = getByText('About').closest('li');
    expect(aboutLi?.className).toContain('ygg-menu-item-disabled');

    const docsLi = getByText('Docs').closest('li');
    expect(docsLi?.className).toContain('ygg-submenu');
    expect(docsLi?.className).toContain('ygg-submenu-open');
  });

  it('respects custom prefixCls', () => {
    const { getByTestId } = render(
      <Menu items={items} mode="vertical" prefixCls="acme" data-testid="m" />
    );
    const root = getByTestId('m');
    expect(root.className).toContain('acme-menu');
    expect(root.className).toContain('acme-menu-vertical');
  });
});

