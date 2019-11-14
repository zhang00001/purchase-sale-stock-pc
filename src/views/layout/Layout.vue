<template>
  <el-container>
    <sidebar class="sidebar-container" :isCollapse="isCollapse"></sidebar>
    <el-container>
      <el-header>
        <navbar :info="name"></navbar>
      </el-header>

      <el-container style="    background: #f6f7fb;">
        <el-main style="    padding:40px;">
          <app-main></app-main>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { Navbar, Sidebar, AppMain } from "./components";
import http from "@/utils/request";
import { mapGetters } from "vuex";
export default {
  components: {
    Navbar,
    Sidebar,
    AppMain
  },

  computed: {},
  data() {
    return {
      routers: [],
      name: "",
      btn: [],

      icon: "el-icon-s-fold",
      isCollapse: false
    };
  },
  created() {
    this.name = sessionStorage.getItem("username");
  },

  methods: {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
.el-header {
  height: 80px !important;
  // position: fixed;
  // top: 0;
  // width: 100vw;
  //  z-index: 999;
}
.top {
  display: flex;
  font-size: 20px;
  align-items: center;
  i {
    margin-right: 20px;
  }
}
.sidebar-container {
  width: 220px;
  // height: 100vh;
  z-index: 99999;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 13px 17px 0px rgba(205, 205, 205, 0.5);
}
</style>
