import React from 'react';
import { Flex } from 'yggjs_rlayout';

export default function FlexDemo(){
  return (
    <div className="page">
      <h2>Flex 布局演示</h2>

      <div className="panel">
        <h3>行方向 + 居中/两端对齐 + 间距</h3>
        <Flex direction="row" align="center" justify="space-between" gap={12}>
          <Flex.Item grow={1}><div className="box">Left (grow=1)</div></Flex.Item>
          <Flex.Item basis={120}><div className="box">Right (basis=120)</div></Flex.Item>
        </Flex>
      </div>

      <div className="panel">
        <h3>列方向 + wrap + 纵向间距（控制 item）</h3>
        <Flex direction="column" wrap gap={{ y: 8 }}>
          <Flex.Item><div className="box">A</div></Flex.Item>
          <Flex.Item order={-1}><div className="box">B (order=-1)</div></Flex.Item>
          <Flex.Item shrink={0}><div className="box">C (shrink=0)</div></Flex.Item>
        </Flex>
      </div>
    </div>
  );
}

