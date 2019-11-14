<template>
  <div class="app-container">
		<div class="nav">
			<div class="back" @click="goBack">
				<i class="el-icon-arrow-left">返回</i>
			</div>
			<div class="backadd">新增供应商</div>
		</div>
		
		<div class="box-inform">
			<div class="top">
				<div style="margin:0 60px 0 20px;">
				</div>
			</div>
			<div class="center">
				<el-form :model="form" ref="form" :rules="rules" label-width="140px">
					<el-row class="search-form">
						<el-form-item label="供应商名称 :" label-width="100px" prop="name" class="input-large">
							<el-input v-model='form.name' placeholder="请输入供应商名称"></el-input>
						</el-form-item>
						<el-form-item label="负责人 :" label-width="145px" prop="contact" class="input-large">
							<el-input  v-model='form.contact' placeholder="请输入负责人姓名或手机"></el-input>
						</el-form-item>
						<el-form-item label="启用 :" prop="status" label-width="130px" class="input-short">
							<el-select v-model="form.status" placeholder="启用">
								<el-option
									v-for="(item, index) in statusList" :key="index" :label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="手机 :" label-width="145px" prop="phone" class="input-large">
							<el-input v-model='form.phone' placeholder="请输入手机号"></el-input>
						</el-form-item>
					</el-row>
					
					<el-row class="search-form">
						<el-form-item label="电话 :" label-width="100px" prop="tel" class="input-large">
							<el-input  v-model='form.tel' placeholder="请输入座机号"></el-input>
						</el-form-item>
						<el-form-item label="传真 :" label-width="145px" prop="fax" class="input-large">
							<el-input v-model='form.fax' placeholder="请输入传真号"></el-input>
						</el-form-item>
						<el-form-item label="开户行 :" label-width="130px" prop="bank" class="input-large">
							<el-input  v-model='form.bank' placeholder="请输入开户行"></el-input>
						</el-form-item>
						<el-form-item label="银行账户 :" label-width="145px" prop="bank_account" class="input-large">
							<el-input  v-model='form.bank_account' placeholder="请输入银行账户"></el-input>
						</el-form-item>
					</el-row>

					<el-row class="search-form">
						<el-form-item label="邮箱 :" label-width="100px" prop="email" class="input-large">
							<el-input  v-model='form.email' placeholder="请输入邮箱"></el-input>
						</el-form-item>
						<el-form-item label="默认折扣 :" label-width="145px" prop="discount" class="input-large">
							<el-input  v-model.number='form.discount' placeholder="100%"></el-input>
						</el-form-item>
						<el-form-item label="网址 :" label-width="130px" prop="website" class="input-large">
							<el-input  v-model='form.website' placeholder="请输入网址"></el-input>
						</el-form-item>
						<el-form-item label="排序 :" label-width="145px" prop="sort" class="input-large">
							<el-input  v-model.number='form.sort' placeholder="123"></el-input>
						</el-form-item>
					</el-row>

					<el-row class="search-form">
						<el-form-item label="地址 :" label-width="100px" prop="email" class="input-large">
							<area-select  type="text" :level='2' v-model="selected" :data="pcaa" :placeholders="placeArr" @change="selectChange"></area-select>
						</el-form-item>

						<el-form-item label="详细地址 :" label-width="138px" prop="email" class="input-large">
							<el-input  v-model='form.detailAddress' placeholder="请输入详细地址"></el-input>
						</el-form-item>		
					</el-row>
				</el-form>
					<div class="botton-bottom">
						<el-button type="primary" class="order-botton" @click="save('form')">保存</el-button>
						<el-button type="primary" class="order-botton" @click="reset">重置</el-button>
					</div>
			</div>
		</div>
  </div>

</template>

<script>
import { pca, pcaa } from 'area-data'
import http from "@/utils/request"
import { enumSaleStatus } from "@/utils/enums"
import { supplierAdd } from "@/api/api.js"
export default {
  data() {
    return {
			placeArr:['省','市','县/区'],
			selected: [],
			pca: pca,
			pcaa: pcaa,
      SupplierList: [
        {
          value: 0,
          label: "全部"
        },
        {
          value: 1,
          label: "供应商1"
        }
      ],
      form: {},
      statusList: [
        {
          value: 0,
          label: "启用"
        },
        {
          value: 1,
          label: "禁用"
        }
      ],
			rules: {
				name: [
					{ required: true, message: '必填', trigger: 'blur' },
				],
				sort: [
					{ required: true, message: '必填', trigger: 'blur' },
					{ type: 'number', message: '排序必须为数字值'}
				],
				discount: [
					{ required: true, message: '必填', trigger: 'blur' },
					{ type: 'number', message: '折扣必须为数字值'}
				],
			},
      orderStatus: enumSaleStatus,
    };
	},
	
  methods: {
		// 获取省市区联动
		selectChange(addressList) {
			this.form.province = addressList[0]
			this.form.city = addressList[1]
			this.form.area = addressList[2]
		},

		// 保存
		save(form) {
			this.$refs[form].validate((valid) => {
				if(valid) {
					supplierAdd({...this.form}).then(res => {
						if(res.code == 200 ) {
							this.$message.success("新增供应商成功") 
							this.goBack()
						} else {
							this.$message.error(res.message)
						}
					})
				}	
			})	
		},

		// 返回
    goBack() {
      this.$router.go(-1);
		},

		// 重置
		reset() {
			this.form = {}
			this.selected = []
		}
  }
};
</script>

<style lang="scss" scoped>
.nav {
	margin-bottom: 10px;
	.backadd {
		font-size: 14px;
		line-height: 25px;
		text-align: center;
		margin: 5px 0 0 30px;
		height: 25px;
		color: #999999;
	}
}
</style>
