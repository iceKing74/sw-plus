<template>
  <div class="container">
    <h2>尺寸：小 中 大 -- 主题：默认、主要的、危险的、警告的、成功的</h2>
    <h3>方向：上</h3>
    <sw-motion-switch size="small" />
    <sw-motion-switch />
    <sw-motion-switch size="large" />
    <sw-motion-switch type="primary" size="small" />
    <sw-motion-switch type="primary" />
    <sw-motion-switch type="primary" size="large" />
    <sw-motion-switch type="danger" size="small" />
    <sw-motion-switch type="danger" />
    <sw-motion-switch type="danger" size="large" />
    <sw-motion-switch type="warning" size="small" />
    <sw-motion-switch type="warning" />
    <sw-motion-switch type="warning" size="large" />
    <sw-motion-switch type="success" size="small" />
    <sw-motion-switch type="success" />
    <sw-motion-switch type="success" size="large" />
    <br /><br />

    <h3>方向：下</h3>
    <sw-motion-switch direction="down" size="small" />
    <sw-motion-switch direction="down" />
    <sw-motion-switch direction="down" size="large" />
    <sw-motion-switch type="primary" direction="down" size="small" />
    <sw-motion-switch type="primary" direction="down" />
    <sw-motion-switch type="primary" direction="down" size="large" />
    <sw-motion-switch type="danger" direction="down" size="small" />
    <sw-motion-switch type="danger" direction="down" />
    <sw-motion-switch type="danger" direction="down" size="large" />
    <sw-motion-switch type="warning" direction="down" size="small" />
    <sw-motion-switch type="warning" direction="down" />
    <sw-motion-switch type="warning" direction="down" size="large" />
    <sw-motion-switch type="success" direction="down" size="small" />
    <sw-motion-switch type="success" direction="down" />
    <sw-motion-switch type="success" direction="down" size="large" />
    <br /><br />

    <h3>方向：左</h3>
    <sw-motion-switch direction="left" size="small" />
    <sw-motion-switch direction="left" />
    <sw-motion-switch direction="left" size="large" />
    <sw-motion-switch type="primary" direction="left" size="small" />
    <sw-motion-switch type="primary" direction="left" />
    <sw-motion-switch type="primary" direction="left" size="large" />
    <sw-motion-switch type="danger" direction="left" size="small" />
    <sw-motion-switch type="danger" direction="left" />
    <sw-motion-switch type="danger" direction="left" size="large" />
    <sw-motion-switch type="warning" direction="left" size="small" />
    <sw-motion-switch type="warning" direction="left" />
    <sw-motion-switch type="warning" direction="left" size="large" />
    <sw-motion-switch type="success" direction="left" size="small" />
    <sw-motion-switch type="success" direction="left" />
    <sw-motion-switch type="success" direction="left" size="large" />
    <br /><br />

    <h3>方向：右</h3>
    <sw-motion-switch size="small" />
    <sw-motion-switch direction="right" />
    <sw-motion-switch direction="right" size="large" />
    <sw-motion-switch type="primary" direction="right" size="small" />
    <sw-motion-switch type="primary" direction="right" />
    <sw-motion-switch type="primary" direction="right" size="large" />
    <sw-motion-switch type="danger" direction="right" size="small" />
    <sw-motion-switch type="danger" direction="right" />
    <sw-motion-switch type="danger" direction="right" size="large" />
    <sw-motion-switch type="warning" direction="right" size="small" />
    <sw-motion-switch type="warning" direction="right" />
    <sw-motion-switch type="warning" direction="right" size="large" />
    <sw-motion-switch type="success" direction="right" size="small" />
    <sw-motion-switch type="success" direction="right" />
    <sw-motion-switch type="success" direction="right" size="large" />
    <br /><br />

    <h3>禁用</h3>
    <sw-motion-switch disable />
    <sw-motion-switch type="primary" disable />
    <sw-motion-switch type="danger" disable />
    <sw-motion-switch type="warning" disable />
    <sw-motion-switch type="success" disable />

    <h3>Dark 环境</h3>
    <div class="dark">
      <sw-motion-switch dark />
      <sw-motion-switch disable dark />
    </div>
  </div>
</template>
<style lang="scss">
.container {
  padding: 20px;
  width: 55vw;

  .sw-motion-switch {
    margin-right: 40px;
  }

  .dark {
    padding: 16px;
    background-color: #000;
  }
}
</style>
