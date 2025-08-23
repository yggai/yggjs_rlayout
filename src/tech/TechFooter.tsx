import React from 'react';
import { Container } from '../components/container';
import { TechIcon } from './TechIcon';
import type { TechIconName } from './types';
import styles from './TechFooter.module.css';

export interface TechFooterLink {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: TechIconName;
}

export interface TechFooterSection {
  title: string;
  links: TechFooterLink[];
}

export interface TechFooterProps {
  brand?: React.ReactNode;
  description?: string;
  sections?: TechFooterSection[];
  socialLinks?: TechFooterLink[];
  copyright?: string;
  version?: string;
  showBackToTop?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function TechFooter({
  brand,
  description,
  sections = [],
  socialLinks = [],
  copyright,
  version,
  showBackToTop = true,
  className = '',
  style = {}
}: TechFooterProps) {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={[styles.footer, className].filter(Boolean).join(' ')} style={style}>
      <Container variant="fixed" maxWidth={1280} paddingX={16}>
        <div className={styles.main}>
          <div className={styles.grid}>
            {/* 品牌区域 */}
            <div className={styles.brand}>
              {brand && <div className={styles.brandName}>{brand}</div>}
              {description && <div className={styles.description}>{description}</div>}
            </div>

            {/* 链接区域 */}
            {sections.length > 0 && (
              <div className={styles.sections}>
                {sections.map((section, index) => (
                  <div key={index}>
                    <div className={styles.sectionTitle}>{section.title}</div>
                    <div className={styles.links}>
                      {section.links.map((link, linkIndex) => (
                        <a
                          key={linkIndex}
                          className={styles.link}
                          href={link.href}
                          onClick={link.onClick}
                        >
                          {link.icon && <TechIcon name={link.icon} size={14} />}
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 底部区域 */}
        <div className={styles.bottom}>
          <div>
            {copyright || `© ${new Date().getFullYear()} All rights reserved.`}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* 社交链接 */}
            {socialLinks.length > 0 && (
              <div className={styles.social}>
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    className={styles.socialLink}
                    href={link.href}
                    onClick={link.onClick}
                    title={link.label}
                  >
                    {link.icon && <TechIcon name={link.icon} size={16} />}
                  </a>
                ))}
              </div>
            )}

            {/* 版本信息 */}
            {version && (
              <div className={styles.version}>
                <span>v{version}</span>
              </div>
            )}

            {/* 回到顶部 */}
            {showBackToTop && (
              <button className={styles.backToTop} onClick={handleBackToTop}>
                <TechIcon name="chevron-right" size={12} style={{ transform: 'rotate(-90deg)' }} />
                Back to top
              </button>
            )}
          </div>
        </div>
      </Container>
    </footer>
  );
}
