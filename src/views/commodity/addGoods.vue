<template>
  <div class="app-container">
		<div class="back" @click="goBack">
				<i class="el-icon-arrow-left">返回</i>
			</div>
    <el-row>
      <el-col :span="24">
        <el-card>
          <div class="box-card">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="auto"
              class="demo-ruleForm"
            >
              <div class="formcon">
                <el-form-item label="商品名称" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="商品货号" prop="item">
                  <el-input v-model="ruleForm.item"></el-input>
                </el-form-item>
                <el-form-item label="采购价" prop="purchase_price">
                  <el-input v-model="ruleForm.purchase_price"></el-input>
                </el-form-item>
                <el-form-item label="批发价" prop="trade_price">
                  <el-input v-model="ruleForm.trade_price"></el-input>
                </el-form-item>
                <el-form-item label="厂家建议零售价" prop="recom_price">
                  <el-input v-model="ruleForm.recom_price"></el-input>
                </el-form-item>

                <el-form-item label="零售价" prop="retail_price">
                  <el-input v-model="ruleForm.retail_price"></el-input>
                </el-form-item>
                <el-form-item label="Vip价" prop="vip">
                  <el-input v-model="ruleForm.vip_price"></el-input>
                </el-form-item>
                <el-form-item label="包装数" prop="num">
                  <el-input v-model="ruleForm.num"></el-input>
                </el-form-item>
                <el-form-item label="商品条码" prop="goods_code">
                  <el-input v-model="ruleForm.goods_code"></el-input>
                </el-form-item>
                <el-form-item label="起订量" prop="mini">
                  <el-input v-model="ruleForm.mini"></el-input>
                </el-form-item>
                <el-form-item label="商品分类" prop="category">
                  <el-select v-model="ruleForm.category" placeholder="请选择">
                    <el-option
                      :label="item.name"
                      :value="item.id"
                      v-for="(item,key) in classdatas"
                      :key="key"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="商品品牌" prop="brand">
                  <el-select v-model="ruleForm.brand" placeholder="请选择">
                    <el-option
                      :label="item.name"
                      :value="item.id"
                      v-for="(item,key) in brandLists"
                      :key="key"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="商品材质" prop="material">
                  <el-select v-model="ruleForm.material" placeholder="请选择">
                    <el-option
                      :label="item.name"
                      :value="item.id"
                      v-for="(item,key) in materialLists"
                      :key="key"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="单位" prop="unit">
                  <el-select v-model="ruleForm.unit" placeholder="请选择">
                    <el-option
                      :label="item.name"
                      :value="item.id"
                      v-for="(item,key) in unitLists"
                      :key="key"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="季节" prop="season">
                  <el-select v-model="ruleForm.season" placeholder="请选择">
                    <el-option
                      :label="item.name"
                      :value="item.id"
                      v-for="(item,key) in seasonLists"
                      :key="key"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="备注" prop="remarks">
                  <el-input v-model="ruleForm.remarks" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                  <el-radio-group v-model="ruleForm.sex">
                    <el-radio :label="2">通款</el-radio>
                    <el-radio :label="0">男款</el-radio>
                    <el-radio :label="1">女款</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="年份" class="year">
                  <el-date-picker style="width:96px;" v-model="year" type="year"></el-date-picker>
                </el-form-item>

                <el-form-item label="排序" prop="sort">
                  <el-input v-model="ruleForm.sort"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                  <el-radio-group v-model="ruleForm.status">
                    <el-radio :label="1">启用</el-radio>
                    <el-radio :label="0">停用</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
              <el-form-item label="商品规格" prop="color">
                <SelectColor ref="selectGood" :selectColor="selectColor"></SelectColor>
              </el-form-item>
              <el-form-item label="商家相册">
                <UploadImg ref="file" :fileList="fileList"></UploadImg>
              </el-form-item>
              <el-form-item label="商品详情" prop="detail">
                <el-input type="textarea" v-model="ruleForm.detail"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" v-if="this.pageType == '3' || this.pageType == '1'" @click="submitForm('ruleForm')">确认</el-button>
                <el-button type="primary" v-if="this.pageType == '2'" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  MaterialList,
  UnitList,
  SeasonList,
  BrandList,
  CategoryList,
  goodsAdd,
  goodsDetail,
  goodsUpdate
} from "@/api/index"
import { upperGoodsEdit } from "@/api/api"
import http from "@/utils/request"
import UploadImg from "@/components/UploadImg"
import SelectColor from "@/components/SelectColor"
import { enumHistorys } from "@/utils/enums"
export default {
  components: {
    UploadImg,
    SelectColor
  },

  data() {
    return {
      radio2: "",
      sizes: [],
      colors: [],
      styles: [],
      fileList: [],
      tableData: [],
      selectColor: [],
      selectSize: [],
      selectStyles: [],
      modelTitle: "",
      year: new Date(),
      dialogTableVisible: false,
      dialogTableVisible2: false,
      dialogTableVisible3: false,
      ruleForm: {
        vip_price: "",
        name: "",
        item: "",
        purchase_price: "",
        trade_price: "",
        recom_price: "",
        retail_price: "",

        num: "",

        goods: {},
        goods_code: "",
        mini: "",
        category: "",
        brand: "",

        material: "",
        sex: "",
        unit: "",
        season: "",
        year: "",
        sort: "",
        status: "",
        remarks: "",
        detail: "",
				images: [],
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        item: [{ required: true, message: "请输入货号", trigger: "blur" }],

        purchase_price: [
          { required: true, message: "请输入采购价", trigger: "blur" }
        ],
        trade_price: [
          { required: true, message: "请输入批发价", trigger: "blur" }
        ],
        retail_price: [
          { required: true, message: "请输入零售价", trigger: "blur" }
        ]
      },
      materialLists: [], //商品材质列表
      unitLists: [], //商品单位列表
      seasonLists: [], //商品季节列表

      brandLists: [], //品牌列表
			classdatas: [], //分类
			// 1商城编辑  2商品新增  3商品编辑
			pageType: this.$route.query.pageType,
			id: this.$route.query.id
    };
  },
  filters: {},
  mounted() {
    this.getGoodData();
  },
  created() {
    this.getSelectData();
  },

  methods: {
    getGoodData() {
      if (this.id) {
        goodsDetail(this.id).then(res => {
          this.selectColor = res.data.products;
          this.$nextTick(() => {
            this.ruleForm = {
              id: res.data.id,
              name: res.data.name,
              item: res.data.item,
              purchase_price: res.data.purchase_price
                ? res.data.purchase_price
                : "",
              vip_price: res.data.vip_price ? res.data.vip_price : "",
              trade_price: res.data.trade_price ? res.data.trade_price : "",
              recom_price: res.data.recom_price ? res.data.recom_price : "",
              retail_price: res.data.retail_price ? res.data.retail_price : "",

              num: res.data.num ? res.data.num : "",

              goods_code: res.data.goods_code ? res.data.goods_code : "",
              mini: res.data.mini ? res.data.mini : "",
              category: res.data.category ? res.data.category.id : "",
              brand: res.data.brand ? res.data.brand.id : "",

              material: res.data.material ? res.data.material.id : "",
              sex: res.data.sex ? res.data.sex : "",
              unit: res.data.unit ? res.data.unit.id : "",
              season: res.data.season ? res.data.season.id : "",
              year: res.data.year ? res.data.year : "",
              sort: res.data.sort ? res.data.sort : "",
              status: res.data.status ? res.data.status : "",
              remarks: res.data.remarks ? res.data.remarks : "",
              detail: res.data.detail ? res.data.detail : ""
            };
            this.fileList = res.data.images
              ? res.data.images.map(val => process.env.BASE_API + "/" + val)
              : [];
          });
        });
      }
    },
    handleClose(el, e) {
      el.splice(el.indexOf(e), 1);
    },

    getSelectData() {
      SeasonList({ page: 1, size: 1000000 }).then(res => {
        this.seasonLists = res.data.data;
      });
      UnitList({ page: 1, size: 1000000 }).then(res => {
        this.unitLists = res.data.data;
      });
      MaterialList({ page: 1, size: 1000000 }).then(res => {
        this.materialLists = res.data.data;
      });

      BrandList({ page: 1, size: 1000000 }).then(res => {
        this.brandLists = res.data.data;
      });
      CategoryList({ page: 1, size: 1000000 }).then(res => {
        this.classdatas = res.data.data;
      });
    },
    setSize() {
      (this.dialogTableVisible2 = true), (this.selectSize = this.sizes);
    },
    setColor() {
      (this.dialogTableVisible = true), (this.selectColor = this.colors);
    },
    setStyle() {
      (this.dialogTableVisible3 = true), (this.selectStyles = this.styles);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
					this.$common.confirm(
					{
						title: "更新商品",
						content: "该商品将被更新，请谨慎操作"
					},
					() => {
						this.ruleForm.images = this.$refs.file.fileList;

							this.ruleForm.year = this.year.toISOString().slice(0, 4);

							this.ruleForm.goods = this.$refs.selectGood.tableData;

							if (this.pageType == '3' || this.pageType == '1') {
								goodsUpdate(this.id, this.ruleForm).then(res => {
									if (res.code == 200) {
										this.$message.success("商品编辑成功")
										this.$router.go(-1);
									}
								});
							} 
							else {
								goodsAdd(this.ruleForm).then(res => {
									if (res.code == 200) {
										this.$message.success(res.msg);
										this.$router.go(-1);
									}
								})
							}
					})
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
		},
		
		// 页面返回
		goBack() {
			this.$router.go(-1)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.formcon {
  display: flex;
  flex-wrap: wrap;
}
.year {
  /deep/ .el-input__prefix {
    display: none;
  }
  /deep/ .el-input {
    width: 96px;
  }
}
.back {
  cursor: pointer;
	margin-bottom: 20px;
	color: rgba(153, 153, 153, 1);
}
</style>
