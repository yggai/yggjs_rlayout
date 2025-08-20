import React, { useState } from 'react';
import { Row, Column, BreakpointProvider, type Breakpoint } from 'yggjs_rlayout';

const bps: Breakpoint[] = ['xs','sm','md','lg','xl'];

export default function GridDemo() {
  const [bp, setBp] = useState<Breakpoint>('lg');

  return (
    <BreakpointProvider value={bp}>
      <div className="page">
        <h2>栅格系统演示</h2>

        <div className="panel" style={{display:'flex',alignItems:'center',gap:8}}>
          <strong>断点：</strong>
          {bps.map(b => (
            <button key={b} className={`chip ${bp===b?'active':''}`} onClick={() => setBp(b)}>{b}</button>
          ))}
        </div>

        <div className="panel">
          <h3>12 栅格基础（md=6+6）</h3>
          <Row gutterX={16} gutterY={8}>
            <Column span={12} spanMd={6}><div className="box">md=6</div></Column>
            <Column span={12} spanMd={6}><div className="box">md=6</div></Column>
          </Row>
        </div>

        <div className="panel">
          <h3>三列布局（md=4+4+4）</h3>
          <Row gutterX={16} gutterY={8}>
            <Column span={12} spanMd={4}><div className="box">md=4</div></Column>
            <Column span={12} spanMd={4}><div className="box">md=4</div></Column>
            <Column span={12} spanMd={4}><div className="box">md=4</div></Column>
          </Row>
        </div>

        <div className="panel">
          <h3>复杂偏移（md 下偏移 3 列）</h3>
          <Row gutterX={16}>
            <Column span={12} spanMd={3} offsetMd={3}><div className="box">md=3 offsetMd=3</div></Column>
            <Column span={12} spanMd={6}><div className="box">md=6</div></Column>
          </Row>
        </div>

        <div className="panel">
          <h3>嵌套栅格</h3>
          <Row gutterX={16} gutterY={8}>
            <Column span={12}>
              <div className="box" style={{padding:0}}>
                <div style={{padding:12}}><strong>外层列（span=12），内部再分 3 列</strong></div>
                <div style={{borderTop:'1px solid #1b2550', padding:12}}>
                  <Row gutterX={12} gutterY={6}>
                    <Column span={12} spanMd={4}><div className="box">md=4</div></Column>
                    <Column span={12} spanMd={4}><div className="box">md=4</div></Column>
                    <Column span={12} spanMd={4}><div className="box">md=4</div></Column>
                  </Row>
                </div>
              </div>
            </Column>
          </Row>
        </div>
      </div>
    </BreakpointProvider>
  );
}

