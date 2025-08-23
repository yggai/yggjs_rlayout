/**
 * 科技风格用户中心组件
 * 
 * 提供用户头像、信息展示和下拉菜单功能
 * 支持多种尺寸和自定义菜单项，具有科技风格的视觉效果
 */

import React, { useState, useRef, useEffect } from 'react';
import { TechIcon } from './TechIcon';
import type { TechIconName } from './types';
import styles from './TechUserCenter.module.css';

export interface TechUserCenterItem {
  key: string;
  label: string;
  icon?: TechIconName;
  onClick?: () => void;
  href?: string;
  danger?: boolean;
}

export interface TechUserCenterProps {
  avatar?: string;
  username?: string;
  userInfo?: string;
  items?: TechUserCenterItem[];
  size?: 'small' | 'medium' | 'large';
  showUsername?: boolean;
  onAvatarClick?: () => void;
  className?: string;
}

const defaultItems: TechUserCenterItem[] = [
  { key: 'profile', label: '个人中心', icon: 'profile' },
  { key: 'settings', label: '设置', icon: 'settings' },
  { key: 'help', label: '帮助', icon: 'help' },
  { key: 'logout', label: '注销', icon: 'logout', danger: true },
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
  const triggerRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  const handleTriggerClick = () => {
    onAvatarClick?.();
    setIsOpen(!isOpen);
  };

  // 当菜单项发生变化时，关闭下拉，避免状态与内容不一致
  useEffect(() => {
    setIsOpen(false);
  }, [items]);

  const handleItemClick = (item: TechUserCenterItem) => {
    item.onClick?.();
    if (item.href) window.location.href = item.href;
    setIsOpen(false);
  };

  const sizeMap = {
    small: { avatar: 28, icon: 14 },
    medium: { avatar: 32, icon: 16 },
    large: { avatar: 40, icon: 18 },
  };
  const currentSize = sizeMap[size];

  const avatarStyle = {
    width: `${currentSize.avatar}px`,
    height: `${currentSize.avatar}px`,
    fontSize: `${Math.floor(currentSize.avatar * 0.4)}px`,
  };

  return (
    <div className={[styles.userCenter, className].filter(Boolean).join(' ')}>
      <button
        ref={triggerRef}
        type="button"
        tabIndex={0}
        className={`${styles.trigger} ${isOpen ? styles.active : ''}`}
        onClick={handleTriggerClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleTriggerClick();
          }
        }}
      >
        <div className={styles.avatar} style={avatarStyle}>
          {avatar ? <img src={avatar} alt={username} /> : username.charAt(0).toUpperCase()}
        </div>
        {showUsername && (
          <div className={styles.userInfo}>
            <div className={styles.username}>{username}</div>
            {userInfo && <div className={styles.userEmail}>{userInfo}</div>}
          </div>
        )}
        <TechIcon name="chevron-down" size={currentSize.icon} className={styles.chevronIcon} />
      </button>

      <div
        ref={dropdownRef}
        className={`${styles.dropdown} ${isOpen ? styles.open : ''}`}
        aria-hidden={!isOpen}
      >
        {isOpen && (
          <>
            <div className={styles.dropdownHeader}>
              <div className={styles.dropdownAvatar}>
                {avatar ? <img src={avatar} alt={username} /> : username.charAt(0).toUpperCase()}
              </div>
              <div className={styles.dropdownName}>{username}</div>
              {userInfo && <div className={styles.dropdownInfo}>{userInfo}</div>}
            </div>
            <div className={styles.dropdownMenu}>
              {items.map((item) => (
                <button
                  key={item.key}
                  className={`${styles.dropdownItem} ${item.danger ? styles.danger : ''}`}
                  onClick={() => handleItemClick(item)}
                >
                  {item.icon && <TechIcon name={item.icon} size={16} className={styles.itemIcon} />}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
