<template>
  <div class="app-container">
    <sw-button size="small">小的按钮</sw-button>

    <sw-button>默认按钮</sw-button>
    <sw-button size="large">大的按钮</sw-button><br /><br />

    <sw-button type="primary">主要按钮</sw-button>
    <sw-button type="danger">危险按钮</sw-button>
    <sw-button type="warning">警告按钮</sw-button>
    <sw-button type="success">成功按钮</sw-button><br /><br />

    <sw-button disable>禁用按钮</sw-button>
    <sw-button type="primary" disable>禁用主要按钮</sw-button>
    <sw-button type="danger" disable>禁用危险按钮</sw-button>
    <sw-button type="warning" disable>禁用警告按钮</sw-button>
    <sw-button type="success" disable>禁用成功按钮</sw-button><br /><br />

    <sw-button plain>朴素按钮</sw-button>
    <sw-button type="primary" plain>朴素主要按钮</sw-button>
    <sw-button type="danger" plain>朴素危险按钮</sw-button>
    <sw-button type="warning" plain>朴素警告按钮</sw-button>
    <sw-button type="success" plain>朴素成功按钮</sw-button><br /><br />

    <sw-button size="small">
      <i class="sw-icon-lock sw-icon--left" />
      图标小按钮
    </sw-button>
    <sw-button plain>
      <i class="sw-icon-lock sw-icon--left" />
      图标按钮
    </sw-button>
    <sw-button size="large">
      <i class="sw-icon-lock sw-icon--left" />
      图标大按钮 </sw-button
    ><br /><br />

    <sw-button type="primary">
      <i class="sw-icon-lock sw-icon--left" />
      图标主要按钮
    </sw-button>
    <sw-button type="danger">
      <i class="sw-icon-lock sw-icon--left" />
      图标危险按钮
    </sw-button>
    <sw-button type="warning">
      <i class="sw-icon-lock sw-icon--left" />
      图标警告按钮
    </sw-button>
    <sw-button type="success">
      <i class="sw-icon-lock sw-icon--left" />
      图标成功按钮 </sw-button
    ><br /><br />

    <sw-button loading>加载中</sw-button>
    <sw-button type="primary" loading>加载中</sw-button>
    <sw-button type="danger" loading>加载中</sw-button>

    <sw-button loading>
      <template #loading>
        <i class="sw-icon-arrow-up"></i>
      </template>
      加载中
    </sw-button>
  </div>
</template>
