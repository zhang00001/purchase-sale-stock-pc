<template>
  <div>
    <div style="display:flex">
      <p style="margin-right:20px;">选择商品</p>
      <el-select v-model="classify_id" placeholder="一级分类" clearable @change="loadClassTwo2">
        <el-option label="一级分类" value></el-option>
        <el-option :key="item.id" :label="item.name" :value="item.id" v-for="item in classOnes"></el-option>
      </el-select>
      <el-select v-model="classify_id2" placeholder="二级分类" clearable>
        <el-option label="二级分类" value></el-option>
        <el-option :key="item.id" :label="item.name" :value="item.id" v-for="item in classTwos"></el-option>
      </el-select>
      <el-input v-model="serchTitle" placeholder="关键词" style="width:200px;"></el-input>
      <el-button type="primary" @click="searchRelation">搜索</el-button>
    </div>
    <div style="margin-top:20px;display: flex;    align-items: center;
   " class="transfer">
      <ul
        class="infinite-list"
        v-infinite-scroll="load"
        style="overflow:auto;height:300px;width:400px;"
      >
        <!-- <li  class="infinite-list-item">{{ i }}</li> -->
        选择商品
        <el-checkbox-group
          v-model="checkList"
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
        >
          <el-checkbox v-for="item in goodcounts" :key="item.id" :label="item">{{item.title}}</el-checkbox>
        </el-checkbox-group>

        <p v-if="noMore">没有更多了</p>
      </ul>

      <!-- <i class="el-icon-d-arrow-right" @click="add"></i> -->
      <div style="margin: 30px;">
        <el-button type="primary" plain @click="add">
          确认选择
          <i class="el-icon-arrow-right el-icon--right"></i>
        </el-button>
      </div>
      <!-- <i class='el-icon-remove-outline' @click="remove"></i>  -->
      <div class="infinite-list" style="overflow:auto;height:300px;width:400px;">
        <!-- <li  class="infinite-list-item">{{ i }}</li> -->
        已选择
        <div style="    margin-top: 32px;">
          <!-- <template v-if="isShow">
            <div class="row" v-for="(item,index) in selectGoods" :key="index">
              <i class="el-icon-circle-close" @click="delGood(item)"></i>
              <p>{{item.title}}</p>
            </div>
          </template>-->
          <template v-if="isShow">
            <div class="row" v-for="(item,index) in goods" :key="index">
              <i class="el-icon-circle-close" @click="delGood(item)"></i>
              <p>{{item.title}}</p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import {
  goods_class_more,
  brand_more,
  goods_more,
  advertisement_log_data,
  special_goods_data
} from "@/api/index";
export default {
  data() {
    return {
      loading: false,
      noMore: false,
      isShow: true,
      selectGoods: [],
      checkList: [],
      goodcounts: [],
      classify_id: "",
      classify_id2: "",
      serchTitle: "",
      classOnes: [],
      classTwos: [],
goods:[],
      checkList2: [],
      page: 0
    };
  },
  props: ["Id", "status", "isintegral",'spGood'],
  created() {
    this.getClsss();
 
    // 新商品
    this.getGoods1(1, this.classify_id, this.classify_id_two, this.serchTitle);
 
     if(this.spGood){
    this.goods =  this.spGood
     }else{
   this.$store.state.selectGood.length>0? this.goods =   this.$store.state.selectGood:this.goods=[]; 
 
     }
  },
  methods: {
    delGood(e) {
      
     this.goods= this.goods.filter(val => val.id != e.id);

      
    },
     load() {
      this.page = this.page + 1;
      this.getGoods1(
        this.page,
        this.classify_id,
        this.classify_id_two,
        this.serchTitle
      );
    },
    searchRelation() {
      this.getGoods1(
        1,
        this.classify_id,
        this.classify_id_two,
        this.serchTitle
      );
    },
    getClsss() {
      goods_class_more({ page: 1, limit: 10000, pid: 0 }).then(res => {
        this.classOnes = res.data.data;
      });
    },
    loadClassTwo2(e) {
      this.classify_id2 = "";
      this.classTwos2 = [];
      if (e == "") {
        this.classify_id2 = "";
      } else {
        goods_class_more({
          page: 1,
          limit: 10000,
          pid: e
        }).then(res => {
          if (res.code == 200) {
            this.classTwos = res.data.data;
          } else {
            this.$message.error(res.msg);
          }
        });
      }
    },
      add() {
      if (this.status == "Vip") {
        if (this.checkList.length > 1) {
          this.$message.error("最多添加一个商品");
          this.checkList = [];
        } else {
          this.goods = this.checkList;
          this.checkList = [];
        }
      } else {
        let a = this.goods;
        if(a.length>0){
 this.checkList = this.checkList.filter(e => {
          if (a.some(val => val.id == e.id)) {
            this.$message.error(e.title + "已添加");
            return;
          } else {
            return true;
          }
        });

        if (a.length + this.checkList.length > 4) {
          this.$message("最多添加四个");
          this.checkList = [];
        } else {
          this.$nextTick(() => {
            let b = a.concat(this.checkList);

            this.goods = b;
            this.checkList = [];
          });
        }
        }else{
          this.goods=this.checkList
          this.checkList=[]
        }
       
      }
    },
    getGoods1(page, classify_id, classify_id_two, serchTitle) {
      let parmas = {
        page: page,
        limit: 10,
        classify_id: classify_id,
        classify_id_two: classify_id_two,
        title: serchTitle
      };

      if (this.status == "Add") {
        parmas.del_goods_id = this.Id;
      }
      this.loading = true;
      goods_more(parmas).then(res => {
        this.loading = false;
        if (res.data.data.length > 0) {
          if (page == 1) {
            this.goodcounts = res.data.data;
          } else {
            (this.noMore = false),
              (this.goodcounts = this.goodcounts.concat(res.data.data));
          }
        } else {
          if (page == 1) {
            this.noMore = true;
            this.goodcounts = [];
          } else {
            this.noMore = true;
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.transfer .el-transfer-panel {
  width: 400px;
}
.infinite-list .el-checkbox-group {
  flex-direction: column;
  display: flex;
}
.el-checkbox {
  margin-top: 15px;
}
.infinite-list .row {
  display: flex;
  margin-top: 15px;
  align-items: center;
}
.infinite-list p {
  font-size: 14px;
  color: #606266;
  line-height: 19px;
  white-space: nowrap;
}
.infinite-list i {
  cursor: pointer;
  margin-right: 15px;
}
</style>
  