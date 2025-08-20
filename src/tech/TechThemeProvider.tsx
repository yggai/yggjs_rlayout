import React, { createContext, useContext, useEffect } from 'react';
import type { TechTheme } from './types';

const defaultTheme: TechTheme = {
  colors: {
    bg: '#0a0f1e',
    panel: '#0e1630',
    panel2: '#0a1128',
    muted: '#7c89bf',
    primary: '#5aa2ff',
    accent: '#27e0ff',
    border: '#1b2550',
    ring: '#2242a8',
    text: '#cfe1ff',
    textMuted: '#9ca3af'
  },
  effects: {
    glow: '0 0 0 1px rgba(39,224,255,.16), 0 0 0 2px rgba(90,162,255,.08), 0 8px 30px rgba(25,34,83,.45)',
    backdrop: 'saturate(140%) blur(10px)'
  },
  gradients: {
    background: `
      radial-gradient(1200px 800px at 20% -200px, rgba(39,224,255,.06), transparent 60%),
      radial-gradient(1200px 800px at 120% -200px, rgba(90,162,255,.06), transparent 60%)
    `,
    sidebar: 'linear-gradient(180deg, rgba(39,224,255,.06), rgba(90,162,255,.04))',
    card: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))'
  }
};

const TechThemeContext = createContext<TechTheme>(defaultTheme);

export const useTechTheme = () => useContext(TechThemeContext);

export interface TechThemeProviderProps {
  children: React.ReactNode;
  theme?: Partial<TechTheme>;
}

export function TechThemeProvider({ children, theme }: TechThemeProviderProps) {
  const mergedTheme = React.useMemo(() => ({
    ...defaultTheme,
    ...theme,
    colors: { ...defaultTheme.colors, ...theme?.colors },
    effects: { ...defaultTheme.effects, ...theme?.effects },
    gradients: { ...defaultTheme.gradients, ...theme?.gradients }
  }), [theme]);

  useEffect(() => {
    // 注入CSS变量到根元素
    const root = document.documentElement;
    const { colors, effects } = mergedTheme;
    
    root.style.setProperty('--tech-bg', colors.bg);
    root.style.setProperty('--tech-panel', colors.panel);
    root.style.setProperty('--tech-panel-2', colors.panel2);
    root.style.setProperty('--tech-muted', colors.muted);
    root.style.setProperty('--tech-primary', colors.primary);
    root.style.setProperty('--tech-accent', colors.accent);
    root.style.setProperty('--tech-border', colors.border);
    root.style.setProperty('--tech-ring', colors.ring);
    root.style.setProperty('--tech-text', colors.text);
    root.style.setProperty('--tech-text-muted', colors.textMuted);
    root.style.setProperty('--tech-glow', effects.glow);
    root.style.setProperty('--tech-backdrop', effects.backdrop);

    // 设置body背景
    document.body.style.background = `${mergedTheme.gradients.background}, ${colors.bg}`;

    return () => {
      // 清理
      const properties = [
        '--tech-bg', '--tech-panel', '--tech-panel-2', '--tech-muted',
        '--tech-primary', '--tech-accent', '--tech-border', '--tech-ring',
        '--tech-text', '--tech-text-muted', '--tech-glow', '--tech-backdrop'
      ];
      properties.forEach(prop => root.style.removeProperty(prop));
    };
  }, [mergedTheme]);

  return (
    <TechThemeContext.Provider value={mergedTheme}>
      {children}
    </TechThemeContext.Provider>
  );
}
