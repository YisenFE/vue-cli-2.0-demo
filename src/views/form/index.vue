<template>
<div class="block">
  <img src="@/assets/1.jpg" alt="">
  <el-table
    ref="elTable"
    :height="tableWrapH"
    :data="tableData"
    style="width: 100%">
    <el-table-column
      v-for="(item, index) in tableConfig"
      :key="index"
      :prop="item.prop"
      :label="item.label"
      width="300">
    </el-table-column>
    <el-table-column
      label="哈喽"
      width="500">
      <template slot-scope="scope">
        <el-cascader
          v-if="scope.row.mark"
          :options="scope.row.options"
          v-model="scope.row.selectedOptions"
          @focus="handleFocus(scope)">
        </el-cascader>
        <span v-else>
          我是else
        </span>
      </template>
    </el-table-column>
    <el-table-column
      label="操作区">
      <template slot-scope="scope">
        <el-button v-if="scope.row.mark" type="text" @click="handleClick(scope.row)">已上线</el-button>
        <el-button v-else type="text" @click="handleClick(scope.row)">未上线</el-button>
      </template>

    </el-table-column>
  </el-table>
  <el-pagination
    background
    layout="prev, pager, next, ->, sizes, jumper, total"
    :total="100"
    :current-page.sync="currentPage"
    @current-change="handleChange">
  </el-pagination>
  <my-render></my-render>
</div>
</template>
<script>
/* eslint-disable */
  export default {
    components: {
      MyRender: {
        render(h) {
          let template = <div>1111</div>
          console.log(template)
          return template
        }
      }
    },
    data() {
      return {
        tableConfig: [
          {
            prop: 'date', label: '日期'
          },
          {
            prop: 'name', label: '姓名'
          },
          {
            prop: 'address', label: '地址'
          }
        ],
        tableWrapH: 300,
        tableData: [],
        options: [],
        currentPage: 2,
        internalCurrentPage: 2
      }
    },
    created() {
      this.init()
      // this.handleScroll();
    },
    mounted() {
      console.log('mounted')
      this.handleScroll();
    },
    methods: {
      init() {
        this.ajax('/b/table').then(res => {
          res.data.forEach((item, index) => {
            item.options = []
            item.selectedOptions = []
          })
          this.tableData = res.data
          for (var i = 0; i < 20; i++) {
            this.tableData = this.tableData.concat(JSON.parse(JSON.stringify(res.data)))
          }
        })
      },
      handleFocus(scope) {
        if (scope.row.options.length > 0) return
        this.ajax(`/b/cascader${scope.$index + 1}`).then(res => {
          console.log(1000)
          scope.row.options = res.data
        })
      },
      handleClick(row) {
        // console.log(row);
        row.mark = row.mark ? 0 : 1
        console.log(row.mark)
        // console.log(row, column, event)
        // console.log(row === this.tableData[0])
        // row.name = '是伊森'
      },
      handleChange(val) {
        console.log('emit:handleChange')
        this.$emit('aaa', val);
      },
      handleScroll() {
        let bodyWrapper = this.$refs.elTable.$refs.bodyWrapper
        let tableBody = this.$refs.elTable.$children.filter(item => item.$options.name === 'ElTableBody')[0]
        bodyWrapper.addEventListener('scroll', (e) => {
          if (!tableBody) {
            tableBody = this.$refs.elTable.$children.filter(item => item.$options.name === 'ElTableBody')[0]
          }
          let maxH = tableBody.$el.clientHeight
          if (e.target.scrollTop >= maxH - this.tableWrapH) {
            let copyList = JSON.parse(JSON.stringify(this.tableData))
            this.tableData.push(...copyList)
          }
        })
      }
    },
    watch: {
      currentPage: {
        immediate: true,
        handler(val) {
          console.log('currentPage')
          this.internalCurrentPage = val
        }
      },
      internalCurrentPage: {
        immediate: true,
        handler(val) {
          console.log('internalCurrentPage')
        }
      }
    }
  }
</script>
