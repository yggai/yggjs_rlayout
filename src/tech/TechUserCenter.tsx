import React, { useState, useRef, useEffect } from 'react';
import { TechIcon } from './TechIcon';
import type { TechIconName } from './types';

export interface TechUserCenterItem {
  key: string;
  label: string;
  icon?: TechIconName;
  onClick?: () => void;
  href?: string;
  danger?: boolean;
}

export interface TechUserCenterProps {
  /** 用户头像URL */
  avatar?: string;
  /** 用户名 */
  username?: string;
  /** 用户邮箱或其他信息 */
  userInfo?: string;
  /** 下拉菜单项 */
  items?: TechUserCenterItem[];
  /** 头像大小 */
  size?: 'small' | 'medium' | 'large';
  /** 是否显示用户名 */
  showUsername?: boolean;
  /** 点击头像的回调 */
  onAvatarClick?: () => void;
  /** 自定义类名 */
  className?: string;
}

const defaultItems: TechUserCenterItem[] = [
  {
    key: 'profile',
    label: '个人中心',
    icon: 'profile',
  },
  {
    key: 'settings',
    label: '设置',
    icon: 'settings',
  },
  {
    key: 'help',
    label: '帮助',
    icon: 'help',
  },
  {
    key: 'logout',
    label: '注销',
    icon: 'logout',
    danger: true,
  },
];

export function TechUserCenter({
  avatar,
  username = '用户',
  userInfo,
  items = defaultItems,
  size = 'medium',
  showUsername = false,
  onAvatarClick,
  className = '',
}: TechUserCenterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭下拉菜单
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        triggerRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // ESC键关闭下拉菜单
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  const handleTriggerClick = () => {
    if (onAvatarClick) {
      onAvatarClick();
    }
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: TechUserCenterItem) => {
    if (item.onClick) {
      item.onClick();
    }
    if (item.href) {
      window.location.href = item.href;
    }
    setIsOpen(false);
  };

  const sizeMap = {
    small: { avatar: 28, icon: 14 },
    medium: { avatar: 32, icon: 16 },
    large: { avatar: 40, icon: 18 },
  };

  const currentSize = sizeMap[size];

  return (
    <>
      <style>{`
        .tech-user-center {
          position: relative;
          display: inline-block;
        }

        .tech-user-center-trigger {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 4px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          background: transparent;
          border: none;
          color: var(--tech-text);
        }

        .tech-user-center-trigger:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .tech-user-center-trigger.active {
          background: rgba(39, 224, 255, 0.1);
          box-shadow: 0 0 0 1px rgba(39, 224, 255, 0.2);
        }

        .tech-user-avatar {
          width: ${currentSize.avatar}px;
          height: ${currentSize.avatar}px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--tech-accent), var(--tech-primary));
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 500;
          font-size: ${Math.floor(currentSize.avatar * 0.4)}px;
          overflow: hidden;
          border: 2px solid rgba(255, 255, 255, 0.1);
          transition: all 0.2s ease;
        }

        .tech-user-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .tech-user-center-trigger:hover .tech-user-avatar {
          border-color: rgba(39, 224, 255, 0.3);
          box-shadow: 0 0 12px rgba(39, 224, 255, 0.2);
        }

        .tech-user-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .tech-username {
          font-size: 14px;
          font-weight: 500;
          color: var(--tech-text);
          line-height: 1.2;
        }

        .tech-user-email {
          font-size: 12px;
          color: var(--tech-text-muted);
          line-height: 1.2;
        }

        .tech-user-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 8px;
          min-width: 200px;
          background: var(--tech-panel);
          border: 1px solid var(--tech-border);
          border-radius: 12px;
          box-shadow:
            0 10px 25px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          z-index: 10000;
          opacity: 0;
          transform: translateY(-10px) scale(0.95);
          transition: all 0.2s ease;
          pointer-events: none;
        }

        .tech-user-dropdown.open {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        .tech-user-dropdown-header {
          padding: 16px;
          border-bottom: 1px solid var(--tech-border);
          text-align: center;
        }

        .tech-user-dropdown-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--tech-accent), var(--tech-primary));
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 18px;
          margin: 0 auto 8px;
          border: 2px solid rgba(255, 255, 255, 0.1);
        }

        .tech-user-dropdown-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .tech-user-dropdown-name {
          font-size: 16px;
          font-weight: 600;
          color: var(--tech-text);
          margin-bottom: 4px;
        }

        .tech-user-dropdown-info {
          font-size: 12px;
          color: var(--tech-text-muted);
        }

        .tech-user-dropdown-menu {
          padding: 8px;
        }

        .tech-user-dropdown-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          color: var(--tech-text);
          text-decoration: none;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          font-size: 14px;
        }

        .tech-user-dropdown-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--tech-accent);
        }

        .tech-user-dropdown-item.danger {
          color: #ff6b6b;
        }

        .tech-user-dropdown-item.danger:hover {
          background: rgba(255, 107, 107, 0.1);
          color: #ff6b6b;
        }

        .tech-user-dropdown-item-icon {
          opacity: 0.7;
          transition: opacity 0.2s ease;
        }

        .tech-user-dropdown-item:hover .tech-user-dropdown-item-icon {
          opacity: 1;
        }

        .tech-chevron-icon {
          transition: transform 0.2s ease;
          opacity: 0.6;
        }

        .tech-user-center-trigger.active .tech-chevron-icon {
          transform: rotate(180deg);
        }
      `}</style>

      <div className={`tech-user-center ${className}`}>
        <div
          ref={triggerRef}
          className={`tech-user-center-trigger ${isOpen ? 'active' : ''}`}
          onClick={handleTriggerClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleTriggerClick();
            }
          }}
        >
          <div className="tech-user-avatar">
            {avatar ? (
              <img src={avatar} alt={username} />
            ) : (
              username.charAt(0).toUpperCase()
            )}
          </div>
          
          {showUsername && (
            <div className="tech-user-info">
              <div className="tech-username">{username}</div>
              {userInfo && <div className="tech-user-email">{userInfo}</div>}
            </div>
          )}
          
          <TechIcon 
            name="chevron-down" 
            size={currentSize.icon} 
            className="tech-chevron-icon"
          />
        </div>

        <div
          ref={dropdownRef}
          className={`tech-user-dropdown ${isOpen ? 'open' : ''}`}
        >
          <div className="tech-user-dropdown-header">
            <div className="tech-user-dropdown-avatar">
              {avatar ? (
                <img src={avatar} alt={username} />
              ) : (
                username.charAt(0).toUpperCase()
              )}
            </div>
            <div className="tech-user-dropdown-name">{username}</div>
            {userInfo && <div className="tech-user-dropdown-info">{userInfo}</div>}
          </div>
          
          <div className="tech-user-dropdown-menu">
            {items.map((item) => (
              <button
                key={item.key}
                className={`tech-user-dropdown-item ${item.danger ? 'danger' : ''}`}
                onClick={() => handleItemClick(item)}
              >
                {item.icon && (
                  <TechIcon 
                    name={item.icon} 
                    size={16} 
                    className="tech-user-dropdown-item-icon"
                  />
                )}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
