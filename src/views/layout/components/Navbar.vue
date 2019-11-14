<template>
  <el-menu class="navbar" mode="horizontal">
 <div class="top"  >
          {{navbar.meta.title}}
        
          </div>
    <div
      style="     margin-left: auto;  display: flex;  justify-content: center;align-items: center;margin-right:365px;"
    >
 
   <div class="avatar-wrapper">
          <img class="user-avatar" :src="require('@/assets/images/user_gry.png') || ''" alt :onerror="defaultHeadImg" />
          <span style="margin-right:52px;">{{ info }}</span>
           <img class="user-avatar" @click="logout" :src="require('@/assets/images/tuichufffpx.png')" />
          
        </div>
   
  
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
 
 
 
 
import http from "@/utils/request"
export default {
  components: {
   
  },
  computed: {
    ...mapGetters(["sidebar"])
  },
  data() {
    return {
		defaultHeadImg: this.$store.state.defaultHeadImg,	 // 默认头像
    levelList: null,
 navbar:"",
      name:""
    };
  },
  props: ["info"],
  created() {    this.getBreadcrumb();},
   watch: {
    $route() {
      this.getBreadcrumb();
    }},
  methods: {
     getBreadcrumb() {
    this.navbar=this.$route.matched[1]
        this.levelList = this.$route.matched.filter(item => item.meta.title);
    
      },
     toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$confirm("您确定要退出吗?", "退出管理平台", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {


            
   sessionStorage.clear();
          this.$router.push({ path: "/login" });
            
       
        })
        .catch(() => {});
    },
    refView() {
      location.reload();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.top{
      margin-left: 151px;
    line-height: 80px;
    font-size: 18px;
 border-bottom: 3px solid rgba(85,161,255,1);
    font-weight: 500;
    color: rgba(85,161,255,1);
}
.ref_home {
  display: flex;
  align-content: center;
  margin-left: 20px;
  a {
    display: flex;
    align-content: center;
  }
  i {
    padding: 0 40px;
    border-left: 1px solid #fff;
    cursor: pointer;    color: #fff;font-size: 24px;
  }
}
.navbar {
    
  height:80px;
  line-height: 50px;
  border-radius: 0px !important;
  display: flex;
  margin-left: -20px; 
height:80px;
background:rgba(255,255,255,1);
box-shadow:0px 6px 9px 0px rgba(235,235,235,0.5);
border-bottom:none;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;

    right: 35px;
    .avatar-wrapper {
      cursor: pointer;

      position: relative;
      display: flex;
      align-content: center;
      span {font-size: 20px;
 
        margin: 0 10px;
      }
      
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 12px;
        font-size: 24px;
     
      }
    }
  }
}
.title {
  margin-left: 60px;
  width: 124px;

font-size:24px;
 
  font-weight: bold;
 
  line-height: 70px;

  
 
}
</style>

