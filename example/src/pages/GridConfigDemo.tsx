import React from 'react';
import { GridConfigProvider, Row, Column } from 'yggjs_rlayout';

export default function GridConfigDemo(){
  return (
    <div className="page">
      <h2>Grid 配置演示（24 列）</h2>
      <GridConfigProvider value={{ totalColumns: 24 }}>
        <div className="panel">
          <h3>24 列模式：span=12（50%）、span=6（25%）</h3>
          <Row gutterX={16}>
            <Column span={12}><div className="box">span=12/24 =&gt; 50%</div></Column>
            <Column span={6}><div className="box">span=6/24 =&gt; 25%</div></Column>
          </Row>
        </div>
      </GridConfigProvider>
    </div>
  );
}

