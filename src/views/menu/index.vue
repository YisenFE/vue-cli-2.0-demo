<template>
  <div id="app">
    <el-container>
      <el-header style="background: #66b1ff line-height: 60px color: #fff">
        try
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!--todo 用数据控制菜单权限 点击控制二级路由-->
          <el-menu class="el-menu-vertical-demo">
            <el-submenu v-for="(item, index) in menu"
                        :key="index"
                        :index="item.title + index">
              <template slot="title">
                <i :class="item.class ? item.class : 'el-icon-tickets'"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item :index="childItem.title + i"
                              v-for="(childItem, i) in item.children"
                              :key="i">
                  <router-link tag="li"
                               :to="childItem.path">
                    {{childItem.title}}
                  </router-link>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'leftNav',
  data() {
    // todo 用数据控制菜单权限 点击控制二级路由
    return {
      menu: [
        {
          title: '城市联动',
          class: 'el-icon-menu',
          children: [
            {
              title: '城市联动',
              path: '/region'
            }
          ]
        },
        {
          title: 'ECharts',
          class: 'el-icon-menu',
          children: [
            {
              title: 'demo1',
              path: '/echarts1'
            }
          ]
        },
        {
          title: 'demo',
          class: 'el-icon-menu',
          children: [
            {
              title: 'demo',
              path: '/demo'
            }
          ]
        },
        {
          title: 'form',
          class: 'el-icon-menu',
          children: [
            {
              title: 'form',
              path: '/form'
            }
          ]
        },
        {
          title: 'input',
          class: 'el-icon-menu',
          children: [
            {
              title: 'input',
              path: '/input'
            }
          ]
        },
        {
          title: 'slot',
          class: 'el-icon-menu',
          children: [
            {
              title: 'slot',
              path: '/slot'
            }
          ]
        },
        {
          title: 'is',
          class: 'el-icon-menu',
          children: [
            {
              title: 'is',
              path: '/is'
            }
          ]
        },
        {
          title: 'Cropper',
          class: 'el-icon-menu',
          children: [
            {
              title: 'cropper',
              path: '/cropper'
            }
          ]
        },
        {
          title: 'asyncComponent',
          class: 'el-icon-menu',
          children: [
            {
              title: 'asyncComponent',
              path: '/asyncComponent'
            }
          ]
        }
      ]
    }
  },
  mounted() {},
  methods: {
    init() {}
  }
}
</script>
