import React from 'react';
import { Row, Column } from 'yggjs_rlayout';

export default function GridDemo() {
  return (
    <div className="page">
      <h2>栅格系统演示</h2>

      <div className="panel">
        <h3>12 栅格基础</h3>
        <Row gutter={16}>
          <Column span={6}><div className="box">span=6</div></Column>
          <Column span={6}><div className="box">span=6</div></Column>
        </Row>
      </div>

      <div className="panel">
        <h3>带偏移</h3>
        <Row gutter={16}>
          <Column span={6} offset={3}><div className="box">span=6 offset=3</div></Column>
        </Row>
      </div>
    </div>
  );
}

