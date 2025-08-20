import React from 'react';
import { Container } from 'yggjs_rlayout';

export default function ContainerDemo(){
  return (
    <div className="page">
      <h2>Container 演示</h2>

      <div className="panel">
        <h3>.container（固定宽度）</h3>
        <Container variant="fixed" maxWidth={960} paddingX={16}>
          <div className="box">fixed 960px</div>
        </Container>
      </div>

      <div className="panel">
        <h3>.container-fluid（流式）</h3>
        <Container variant="fluid" paddingX={16}>
          <div className="box">fluid 100%</div>
        </Container>
      </div>

      <div className="panel">
        <h3>.container-md（响应式 md 起固定）</h3>
        <Container variant="responsive" breakpoint="md" maxWidth={960}>
          <div className="box">responsive md</div>
        </Container>
      </div>
    </div>
  );
}

