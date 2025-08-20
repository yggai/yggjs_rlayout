import React from 'react';
import { Flex } from 'yggjs_rlayout';

export default function FlexDemo(){
  return (
    <div className="page">
      <h2>Flex 布局演示</h2>

      <div className="panel">
        <h3>行方向 + 居中/两端对齐 + 间距</h3>
        <Flex direction="row" align="center" justify="space-between" gap={12}>
          <div className="box">Left</div>
          <div className="box">Right</div>
        </Flex>
      </div>

      <div className="panel">
        <h3>列方向 + wrap + 纵向间距</h3>
        <Flex direction="column" wrap gap={{ y: 8 }}>
          <div className="box">A</div>
          <div className="box">B</div>
          <div className="box">C</div>
        </Flex>
      </div>
    </div>
  );
}

