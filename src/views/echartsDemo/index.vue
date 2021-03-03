<template>
<div class="demo">
  <div ref="demo1" class="echarts1"></div>
</div>
</template>
<script>
export default {
  name: 'echarts1',
  data() {
    return {
      option: {
        title: {
          text: 'Echarts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (this.echarts) {
        this.echarts
          .init(this.$refs.demo1, 'macarons', {width: 600, height: 300})
          .setOption(this.option)
      }
    }
  }
}
</script>
