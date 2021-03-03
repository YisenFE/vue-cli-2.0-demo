<template>
  <div>
    <img
      ref="tupian"
      v-for="item in 3"
      :key="item"
      :src="`./static/pg${item}.jpeg`"
      @click="handleClick">
    <el-carousel
      v-if="isShow"
      height="500px"
      indicator-position="outside"
      :autoplay="false" arrow="never"
      trigger="click"
      :initial-index="recordIndex">
      <el-carousel-item v-for="i in 3" :key="i">
        <img :src="`./static/pg${i}.jpeg`" class="imgPlay">
      </el-carousel-item>
    </el-carousel>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currPage"
      :page-size="pageSize || 20"
      background
      layout="slot, sizes, pager, prev, next"
      align="right"
      :total="pageCfg.totalCount">
      <span @click="reset2">每页条数</span>
    </el-pagination>
    <el-pagination
      @size-change="handleSizeChange2"
      @current-change="handleCurrentChange2"
      :current-page="currPage2"
      :page-size="pageSize2 || 20"
      background
      layout="slot, sizes, pager, prev, next"
      align="right"
      :total="pageCfg.totalCount">
      <span @click="reset">每页条数</span>
    </el-pagination>

    <i class="el-icon-edit"></i>
    <i class="el-icon-share"></i>
    <i class="el-icon-delete"></i>
    <el-button type="primary" icon="el-icon-search">搜索</el-button>
  </div>
</template>
<script>
export default {
  name: 'demo',
  data() {
    return {
      imgSrc: './pg1.jpeg',
      recordIndex: 0,
      isShow: true,

      pageCfg: {
        totalCount: 121
      },
      currPage: 1,
      pageSize: 20,
      currPage2: 5,
      pageSize2: 10
    }
  },
  methods: {
    handleClick(e) {
      this.isShow = false
      this.$refs.tupian.forEach((item, index) => {
        if (item === e.target) {
          this.recordIndex = index
          this.$nextTick(() => {
            this.isShow = true
          })
        }
      })
    },

    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currPage = val
    },
    handleSizeChange2(val) {
      this.pageSize2 = val
    },
    handleCurrentChange2(val) {
      this.currPage2 = val
    },
    reset() {
      this.currPage = 1
      this.pageSize = 20
    },
    reset2() {
      this.currPage2 = 5
      this.pageSize2 = 10
    }
  },
  created() {
  }
}
</script>
<style>
  .imgPlay {
    width: 100%;
  }
</style>
