<template>
  <div>
    <div style="margin-top:20px;display: flex;    align-items: center;
   " class="transfer">
      <ul
        class="infinite-list"
      
        style="overflow:auto;height:300px;width:400px;"
      >
       
        选择专题
        <el-checkbox-group
          v-model="checkList"
         
        >
          <el-checkbox v-for="item in goodcounts" :key="item.id" :label="item">{{item.name}}</el-checkbox>
        </el-checkbox-group>

        <p v-if="noMore">没有更多了</p>
      </ul>

     
      <div style="margin: 30px;">
        <el-button type="primary" plain @click="add">
          确认选择
          <i class="el-icon-arrow-right el-icon--right"></i>
        </el-button>
      </div>
      
      <div class="infinite-list" style="overflow:auto;height:300px;width:400px;">
   
        已选择
        <div style="    margin-top: 32px;">
        
          <template v-if="isShow">
            <div class="row" v-for="(item,index) in goods" :key="index">
              <i class="el-icon-circle-close" @click="delGood(item)"></i>
              <p>{{item.name}}</p>
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
  special_goods_data,special_more
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
  props: ["spGood"],
  created() {
   
 
    // 新商品
    this.getGoods1(1,);

     
    this.goods =  this.spGood
  },
  methods: {
    delGood(e) {
      
     this.goods= this.goods.filter(val => val.id != e.id);

      
    },
 
 
   
  
      add() {
      
        if (this.checkList.length > 1) {
          this.$message.error("最多添加一个");
          this.checkList = [];
        } else {
          this.goods = this.checkList;
          this.checkList = [];
        }
      
       
      }
   ,
    getGoods1(page) {
  
      
      special_more({ page: page,
        limit: 10,}).then(res => {
       
      
            this.goodcounts = res.data.data;
          
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
  