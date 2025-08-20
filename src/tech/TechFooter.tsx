import React from 'react';
import { Container } from '../components/container';
import { TechIcon } from './TechIcon';
import type { TechIconName } from './types';

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
    <>
      <style>{`
        .tech-footer {
          background: linear-gradient(180deg, 
            var(--tech-panel, #0e1630) 0%, 
            var(--tech-panel-2, #0a1128) 100%
          );
          border-top: 1px solid var(--tech-border, #1b2550);
          color: var(--tech-text, #cfe1ff);
          margin-top: auto;
        }
        
        .tech-footer-main {
          padding: 40px 0 24px;
        }
        
        .tech-footer-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 40px;
          margin-bottom: 32px;
        }
        
        .tech-footer-brand {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .tech-footer-brand-name {
          font-size: 20px;
          font-weight: 700;
          color: var(--tech-accent, #27e0ff);
          letter-spacing: 0.6px;
        }
        
        .tech-footer-description {
          color: var(--tech-text-muted, #9ca3af);
          line-height: 1.6;
          max-width: 300px;
        }
        
        .tech-footer-sections {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 32px;
        }
        
        .tech-footer-section-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--tech-text, #cfe1ff);
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .tech-footer-links {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .tech-footer-link {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--tech-text-muted, #9ca3af);
          text-decoration: none;
          font-size: 13px;
          transition: all 0.2s ease;
          cursor: pointer;
          padding: 4px 0;
        }
        
        .tech-footer-link:hover {
          color: var(--tech-accent, #27e0ff);
          transform: translateX(4px);
        }
        
        .tech-footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 0;
          border-top: 1px solid var(--tech-border, #1b2550);
          font-size: 12px;
          color: var(--tech-text-muted, #9ca3af);
        }
        
        .tech-footer-social {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        
        .tech-footer-social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border: 1px solid var(--tech-border, #1b2550);
          border-radius: 6px;
          color: var(--tech-text-muted, #9ca3af);
          text-decoration: none;
          transition: all 0.2s ease;
        }
        
        .tech-footer-social-link:hover {
          border-color: var(--tech-accent, #27e0ff);
          color: var(--tech-accent, #27e0ff);
          box-shadow: 0 0 8px rgba(39, 224, 255, 0.3);
        }
        
        .tech-footer-back-to-top {
          display: flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: 1px solid var(--tech-border, #1b2550);
          color: var(--tech-text-muted, #9ca3af);
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 12px;
        }
        
        .tech-footer-back-to-top:hover {
          border-color: var(--tech-accent, #27e0ff);
          color: var(--tech-accent, #27e0ff);
          background: rgba(39, 224, 255, 0.1);
        }
        
        .tech-footer-version {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        }
        
        @media (max-width: 768px) {
          .tech-footer-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          
          .tech-footer-sections {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
          
          .tech-footer-bottom {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }
          
          .tech-footer-social {
            order: -1;
          }
        }
        
        @media (max-width: 480px) {
          .tech-footer-sections {
            grid-template-columns: 1fr;
          }
          
          .tech-footer-main {
            padding: 24px 0 16px;
          }
        }
      `}</style>
      
      <footer className={`tech-footer ${className}`} style={style}>
        <Container variant="fixed" maxWidth={1280} paddingX={16}>
          <div className="tech-footer-main">
            <div className="tech-footer-grid">
              {/* 品牌区域 */}
              <div className="tech-footer-brand">
                {brand && <div className="tech-footer-brand-name">{brand}</div>}
                {description && <div className="tech-footer-description">{description}</div>}
              </div>
              
              {/* 链接区域 */}
              {sections.length > 0 && (
                <div className="tech-footer-sections">
                  {sections.map((section, index) => (
                    <div key={index}>
                      <div className="tech-footer-section-title">{section.title}</div>
                      <div className="tech-footer-links">
                        {section.links.map((link, linkIndex) => (
                          <a
                            key={linkIndex}
                            className="tech-footer-link"
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
          <div className="tech-footer-bottom">
            <div>
              {copyright || `© ${new Date().getFullYear()} All rights reserved.`}
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* 社交链接 */}
              {socialLinks.length > 0 && (
                <div className="tech-footer-social">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      className="tech-footer-social-link"
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
                <div className="tech-footer-version">
                  <span>v{version}</span>
                </div>
              )}
              
              {/* 回到顶部 */}
              {showBackToTop && (
                <button className="tech-footer-back-to-top" onClick={handleBackToTop}>
                  <TechIcon name="chevron-right" size={12} style={{ transform: 'rotate(-90deg)' }} />
                  Back to top
                </button>
              )}
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
}
