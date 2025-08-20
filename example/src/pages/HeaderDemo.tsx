import React from 'react';
import { Header, Container } from 'yggjs_rlayout';

export default function HeaderDemo(){
  return (
    <div className="page">
      <h2>Header 演示</h2>

      <div className="panel">
        <h3>常规 Header（容器包裹）</h3>
        <Header style={{ background: 'var(--panel)', borderBottom: '1px solid #1b2550' }}>
          <Container variant="fluid" paddingX={16}>
            <div className="box">Site Title</div>
          </Container>
        </Header>
      </div>

      <div className="panel">
        <h3>吸顶 Header</h3>
        <Header sticky top={0} style={{ background: 'var(--panel)' }}>
          <Container variant="fluid" paddingX={16}>
            <div className="box">Sticky Header</div>
          </Container>
        </Header>
      </div>

      <div className="panel">
        <h3>固定 Header + 内容区留白</h3>
        <Header fixed top={0} height={64} style={{ background: 'var(--panel)' }}>
          <Container variant="fluid" paddingX={16}>
            <div className="box">Fixed Header</div>
          </Container>
        </Header>
        <div style={{ paddingTop: 64 }}>
          <div className="box">内容区 (padding-top: 64px)</div>
        </div>
      </div>
    </div>
  );
}

