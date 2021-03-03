<template>
  <div id="app">
    <router-view/>
    <div style="height: 200px;border: 2px solid #000; overflow:scroll">
      <el-scrollbar style="height: 100%">
        <div style="height: 1000px;background: red;">
          111
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<style lang="less">
@import './common/css/bass.less';
@import './common/css/common.less';
</style>
