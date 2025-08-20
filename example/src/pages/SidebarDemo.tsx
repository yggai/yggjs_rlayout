import React from 'react';
import { Sidebar } from 'yggjs_rlayout';

export default function SidebarDemo(){
  return (
    <div className="page">
      <h2>Sidebar 演示</h2>

      <div className="panel">
        <h3>左侧 fixed（内容留白）</h3>
        <Sidebar fixed width={240} style={{ background: 'var(--panel)' }}>
          <div className="box">Fixed Left</div>
        </Sidebar>
        <div style={{ paddingLeft: 240, paddingTop: 8 }}>
          <div className="box">内容区 padding-left: 240px</div>
        </div>
      </div>

      <div className="panel">
        <h3>右侧 sticky</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 16 }}>
          <div style={{ height: 600 }} className="box">长内容用于滚动</div>
          <Sidebar sticky side="right" top={16} style={{ background: 'var(--panel)' }}>
            <div className="box">Sticky Right</div>
          </Sidebar>
        </div>
      </div>
    </div>
  );
}

