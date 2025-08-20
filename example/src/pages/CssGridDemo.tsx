import React from 'react';
import { Grid } from 'yggjs_rlayout';

export default function CssGridDemo(){
  return (
    <div className="page">
      <h2>CSS Grid 演示</h2>

      <div className="panel">
        <h3>三列等宽 + 12px 间距</h3>
        <Grid columns={3} gap={12}>
          <div className="box">A</div>
          <div className="box">B</div>
          <div className="box">C</div>
        </Grid>
      </div>

      <div className="panel">
        <h3>自定义模板 + Item 跨度</h3>
        <Grid columns="200px 1fr 1fr" rows={3} gap={{ x:12, y:8 }} autoFlow="row dense">
          <Grid.Item colSpan={2}><div className="box">colSpan=2</div></Grid.Item>
          <Grid.Item rowSpan={2}><div className="box">rowSpan=2</div></Grid.Item>
          <div className="box">X</div>
        </Grid>
      </div>
    </div>
  );
}

