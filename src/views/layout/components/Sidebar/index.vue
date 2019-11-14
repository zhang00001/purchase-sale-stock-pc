<template>
  <div>
    <div class="title">进销存</div>

    <el-menu
      :default-active="this.$route.path"
      class="el-menu-vertical-demo"
      active-text-color="rgba(0, 37, 85, 1)"
      style="height:100%;"
      :collapse="isCollapse"
      :unique-opened="true"
    >
      <template v-for="(items,index) in routers">
        <template v-if="items.meta.hidden==false">
          <template v-if="items.children.length>0">
            <el-submenu :index="items.path">
              <template slot="title">
                <i :class="items.meta.icon"></i>

                <span>{{items.meta.title }}</span>
              </template>
              <el-menu-item-group>
                <template v-for="item in items.children">
                  <template v-if="item.meta.hidden==false">
                    <router-link :to="items.path+'/'+item.path">
                      <el-menu-item :index="items.path+'/'+item.path">
                        <i :class="item.meta.icon"></i>
                        <span slot="title">{{ item.meta.title }}</span>
                      </el-menu-item>
                    </router-link>
                  </template>
                </template>
              </el-menu-item-group>
            </el-submenu>
          </template>
          <template v-else>
            <router-link :to="items.path">
              <el-menu-item :index="items.path">
                <i :class="items.meta.icon"></i>
                <span slot="title">{{ items.meta.title }}</span>
              </el-menu-item>
            </router-link>
          </template>
        </template>
      </template>
    </el-menu>
  </div>
</template>
      
      


<script>
import http from "@/utils/request";
export default {
  computed: {},
  data() {
    return {
      iconImgs: []
    };
  },
  beforeCreate: function() {},
  created: function() {
    // this.routers = this.$router.options.routes;
    this.routers = JSON.parse(sessionStorage.getItem("menu"));
  },
  props: ["isCollapse"],
  methods: {}
};
</script>
<style rel="stylesheet/scss" lang="scss"   >
.el-menu-vertical-demo:not(.el-menu--collapse) {
  height: 100vh;
  border: none;
  width: 220px;
}
.el-menu-vertical-demo {
  height: 100vh;
}
.title {
  font-size: 24px;
  font-weight: 600;
  color: rgba(127, 182, 250, 1);

  height: 80px;
  line-height: 80px;
  text-align: center;
}

.el-submenu__icon-arrow {
  right: 70px;
}

.el-submenu .el-menu-item {
  text-indent: 20px;
  height: 36px;
  line-height: 36px;
}
.el-menu-item-group__title {
  display: none;
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
/deep/ .el-submenu__title {
  padding: 0 60px !important;
  display: flex;
  align-items: center;
  align-content: center;
}
.is-active {
  position: relative;
  background: rgba(225, 238, 255, 1);
  /deep/ .el-submenu__title {
    color: #55a1ff;
  }
  /deep/ .el-menu-item {
    color: #91c0fa;
  }
  .iconfont {
    color: #55a1ff;
  }
}
.is-active::after {
  content: "";
  position: absolute;
  top: 0;
  background: rgba(85, 161, 255, 1);
  width: 6px;
  left: 0;
  height: 100%;
}
.is-active .el-menu-item {
  background: #e1eeff;
  // color: #55a1ff;
}
</style>