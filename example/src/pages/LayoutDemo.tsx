import React from 'react';
import { Layout } from 'yggjs_rlayout';

export default function LayoutDemo() {
  return (
    <div className="page">
      <h2>Layout 组件演示</h2>

      <div className="panel">
        <h3>水平排列 + 间距</h3>
        <Layout direction="horizontal" gap={12} align="center" justify="space-between">
          <Layout.Item flex={1}><div className="box">Left Flex</div></Layout.Item>
          <Layout.Item width={200}><div className="box">Right 200</div></Layout.Item>
        </Layout>
      </div>

      <div className="panel">
        <h3>垂直排列 + wrap</h3>
        <Layout direction="vertical" gap={{ y: 8 }}>
          <Layout.Item><div className="box">A</div></Layout.Item>
          <Layout.Item><div className="box">B</div></Layout.Item>
          <Layout.Item><div className="box">C</div></Layout.Item>
        </Layout>
      </div>
    </div>
  );
}

