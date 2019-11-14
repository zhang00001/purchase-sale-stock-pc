<template>
  <div>
    <el-dialog
      title="发货方式"
      :visible.sync="dialogVisible"
			width="1000px"
			class="inform-dialog">
      <el-form ref="form" :model="form" :rules="rules">
				<template v-if="type == '送车' && orderType == 'add'">
					<el-row class="search-form">
						<el-form-item label="车牌 :" prop="cardNo" label-width="90px">
							<el-input v-model="form.cardNo"></el-input>
						</el-form-item>
						<el-form-item label="司机姓名 :" prop="cardname" label-width="136px">
							<el-input v-model="form.cardname"></el-input>
						</el-form-item>
						<el-form-item label="司机电话 :" prop="cardmobie" label-width="136px"> 
							<el-input v-model="form.cardmobie"></el-input>
						</el-form-item>
					</el-row>

					<el-row class="search-form">
						<el-form-item label="发货地址 :" prop="cardaddress" label-width="90px">
							<el-input v-model="form.cardaddress"></el-input>
						</el-form-item>
						<el-form-item label="收件人 :" label-width="136px">
							<el-input v-model="form.people"></el-input>
						</el-form-item>
						<el-form-item label="联系电话 :" label-width="136px">
							<el-input v-model="form.phone"></el-input>
						</el-form-item>
					</el-row>
					<el-row class="search-adress">
						<el-form-item label="收件人地址 :" prop="email" class="input-large">
							<area-select  type="text" :level='2' v-model="selected" :data="pcaa" :placeholders="placeArr" @change="selectChange"></area-select>
						</el-form-item>

						<el-form-item prop="email" class="input-large ml-5">
							<el-input  v-model='form.detailAddress' placeholder="请输入详细地址"></el-input>
						</el-form-item>		
					</el-row>
				</template>

				<template v-if="type == '送车' && pageType == 'draftDetail'">
					<el-row class="search-form">
						<el-form-item label="车牌 :" prop="cardNo" label-width="90px">
							<el-input v-model="form.cardNo"></el-input>
						</el-form-item>
						<el-form-item label="司机姓名 :" prop="cardname" label-width="136px">
							<el-input v-model="form.cardname"></el-input>
						</el-form-item>
						<el-form-item label="司机电话 :" prop="cardmobie" label-width="136px"> 
							<el-input v-model="form.cardmobie"></el-input>
						</el-form-item>
					</el-row>

					<el-row class="search-form">
						<el-form-item label="发货地址 :" prop="cardaddress" label-width="90px">
							<el-input v-model="form.cardaddress"></el-input>
						</el-form-item>
						<el-form-item label="收件人 :" label-width="136px">
							<el-input v-model="form.people"></el-input>
						</el-form-item>
						<el-form-item label="联系电话 :" label-width="136px">
							<el-input v-model="form.phone"></el-input>
						</el-form-item>
					</el-row>
					<el-row class="search-adress">
						<el-form-item label="收件人地址 :" prop="email" class="input-large">
							<area-select  type="text" :level='2' v-model="selected" :data="pcaa" :placeholders="placeArr" @change="selectChange"></area-select>
						</el-form-item>

						<el-form-item prop="email" class="input-large ml-5">
							<el-input  v-model='form.detailAddress' placeholder="请输入详细地址"></el-input>
						</el-form-item>		
					</el-row>
				</template>

				<template v-if="type == '送车' && pageType == 'draftDetail'">
					<el-row class="search-form">
						<el-form-item label="车牌 :" prop="cardNo" label-width="90px">
							<el-input v-model="form.cardNo"></el-input>
						</el-form-item>
						<el-form-item label="司机姓名 :" prop="cardname" label-width="136px">
							<el-input v-model="form.cardname"></el-input>
						</el-form-item>
						<el-form-item label="司机电话 :" prop="cardmobie" label-width="136px"> 
							<el-input v-model="form.cardmobie"></el-input>
						</el-form-item>
					</el-row>

					<el-row class="search-form">
						<el-form-item label="发货地址 :" prop="cardaddress" label-width="90px">
							<el-input v-model="form.cardaddress"></el-input>
						</el-form-item>
						<el-form-item label="收件人 :" label-width="136px">
							<el-input v-model="form.people"></el-input>
						</el-form-item>
						<el-form-item label="联系电话 :" label-width="136px">
							<el-input v-model="form.phone"></el-input>
						</el-form-item>
					</el-row>
					<el-row class="search-adress">
						<el-form-item label="收件人地址 :" prop="email" class="input-large">
							<area-select  type="text" :level='2' v-model="selected" :data="pcaa" :placeholders="placeArr" @change="selectChange"></area-select>
						</el-form-item>

						<el-form-item prop="email" class="input-large ml-5">
							<el-input  v-model='form.detailAddress' placeholder="请输入详细地址"></el-input>
						</el-form-item>		
					</el-row>
				</template>

				<template v-if="type == '送车' && pageType == 'detail'">
					<el-row class="search-form">
						<el-col :span="8">
							<el-form-item label="车牌 :" prop="cardNo" label-width="90px">
								<span> {{ form.cardNo }} </span>
							</el-form-item>
						</el-col>

						<el-col :span="8">
							<el-form-item label="司机姓名 :" prop="cardname" label-width="136px">
								<span> {{ form.cardname }} </span>
							</el-form-item>
						</el-col>

						<el-col :span="8">
							<el-form-item label="司机电话 :" prop="cardmobie" label-width="136px"> 
								<span> {{ form.cardmobie }} </span>
							</el-form-item>
							</el-col>
					</el-row>

					<el-row class="search-form">
						<el-col :span="8">
							<el-form-item label="发货地址 :" prop="cardaddress" label-width="90px">
								<span> {{ form.cardaddress }} </span>
							</el-form-item>
						</el-col>

						<el-col :span="8">
							<el-form-item label="收件人 :" label-width="136px">
								<span> {{ form.people }} </span>
							</el-form-item>
						</el-col>

						<el-col :span="8">
							<el-form-item label="联系电话 :" label-width="136px">
								<span> {{ form.phone }} </span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row class="search-adress">
						<el-col :span="12">
							<el-form-item label="收件人地址 :" prop="email" class="input-large">
								<span> {{ form.province }} </span>
								<span> {{ form.city }} </span>
								<span> {{ form.area }} </span>
								<span> {{ form.detailAddress }} </span>
							</el-form-item>
						</el-col>
					</el-row>
				</template>

				

				<template v-if="type == '送指定点'">
					<el-row class="search-form search-form-other">
						<el-form-item label="说明 :" prop="cardNo" label-width="58px">
							<el-input v-model="form.cardNo"></el-input>
						</el-form-item>
						<el-form-item label="联系人 :" prop="cardname" label-width="136px">
							<el-input v-model="form.cardname"></el-input>
						</el-form-item>
						<el-form-item label="联系电话 :" prop="phone" label-width="136px"> 
							<el-input v-model="form.phone"></el-input>
						</el-form-item>
					</el-row>
				</template>

				<template v-if="type == '送指定点' && pageType == 'draftDetail'">
					<el-row class="search-form search-form-other">
						<el-form-item label="说明 :" prop="cardNo" label-width="58px">
							<el-input v-model="form.cardNo"></el-input>
						</el-form-item>
						<el-form-item label="联系人 :" prop="cardname" label-width="136px">
							<el-input v-model="form.cardname"></el-input>
						</el-form-item>
						<el-form-item label="联系电话 :" prop="phone" label-width="136px"> 
							<el-input v-model="form.phone"></el-input>
						</el-form-item>
					</el-row>
				</template>

				<template v-if="type == '送车' && pageType == 'detail'">
					<el-row class="search-form">
						<el-col :span="8">
							<el-form-item label="车牌 :" prop="cardNo" label-width="90px">
								<span> {{ form.cardNo }} </span>
							</el-form-item>
						</el-col>

						<el-col :span="8">
							<el-form-item label="司机姓名 :" prop="cardname" label-width="136px">
								<span> {{ form.cardname }} </span>
							</el-form-item>
						</el-col>

						<el-col :span="8">
							<el-form-item label="司机电话 :" prop="cardmobie" label-width="136px"> 
								<span> {{ form.cardmobie }} </span>
							</el-form-item>
							</el-col>
					</el-row>

					<el-row class="search-form">
						<el-col :span="8">
							<el-form-item label="发货地址 :" prop="cardaddress" label-width="90px">
								<span> {{ form.cardaddress }} </span>
							</el-form-item>
						</el-col>

						<el-col :span="8">
							<el-form-item label="收件人 :" label-width="136px">
								<span> {{ form.people }} </span>
							</el-form-item>
						</el-col>

						<el-col :span="8">
							<el-form-item label="联系电话 :" label-width="136px">
								<span> {{ form.phone }} </span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row class="search-adress">
						<el-col :span="12">
							<el-form-item label="收件人地址 :" prop="email" class="input-large">
								<span> {{ form.province }} </span>
								<span> {{ form.city }} </span>
								<span> {{ form.area }} </span>
								<span> {{ form.detailAddress }} </span>
							</el-form-item>
						</el-col>
					</el-row>
				</template>

				<template v-if="type == '发物流'">
					<el-row class="search-form">
						<el-form-item label="物流 :" label-width="90px" prop="logistics">
							<el-select placeholder="请选择" v-model="form.logistics">
								<el-option 
									v-for="item in logList"
									:label="item.name" 
									:value="item.id" 
									:key="item.id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="收件人 :" label-width="132px" prop="people">
							<el-input v-model="form.people"></el-input>
						</el-form-item>
						<el-form-item label="联系电话 :" prop="phone" label-width="136px"> 
							<el-input v-model="form.phone"></el-input>
						</el-form-item>
					</el-row>

					<el-row class="search-form">
						<el-form-item label="网点 :" label-width="90px" prop="networks">
							<el-select placeholder="请选择" v-model="form.networks">
								<el-option 
									v-for="item in netList"
									:label="item.name" 
									:value="item.id" 
									:key="item.id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="单号 :" label-width="132px" prop="number">
							<el-input v-model="form.number"></el-input>
						</el-form-item>
					</el-row>
					<el-row class="search-adress">
						<el-form-item label="收件人地址 :" prop="email" class="input-large">
							<area-select  type="text" :level='2' v-model="selected" :data="pcaa" :placeholders="placeArr" @change="selectChange"></area-select>
						</el-form-item>

						<el-form-item prop="email" class="input-large ml-5">
							<el-input  v-model='form.detailAddress' placeholder="请输入详细地址"></el-input>
						</el-form-item>		
					</el-row>
				</template>

				<template v-if="type == '电子单面'">
					<el-row class="search-form">
						<el-form-item label="物流 :" label-width="90px" prop="logistics">
							<el-select placeholder="请选择" v-model="form.logistics">
								<el-option 
								v-for="item in logList"
								:label="item.name" 
								:value="item.id" 
								:key="item.id">
							</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="收件人 :" label-width="136px" prop="people">
							<el-input v-model="form.people"></el-input>
						</el-form-item>

						<el-form-item label="联系电话 :" prop="phone" label-width="136px"> 
							<el-input v-model="form.phone"></el-input>
						</el-form-item>
					</el-row>
					<el-row class="search-adress">
						<el-form-item label="收件人地址 :" prop="email" class="input-large">
							<area-select  type="text" :level='2' v-model="selected" :data="pcaa" :placeholders="placeArr" @change="selectChange"></area-select>
						</el-form-item>

						<el-form-item prop="email" class="input-large ml-5">
							<el-input  v-model='form.detailAddress' placeholder="请输入详细地址"></el-input>
						</el-form-item>		
					</el-row>
				</template>
      </el-form>

      <span slot="footer" class="dialog-footer" v-if="type == '电子单面' || type == '发物流' || type == '送指定点' || type == '送车'">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>

			<span slot="footer" class="dialog-footer" v-else>
        <el-button type="primary"  @click="cancel">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { pca, pcaa } from 'area-data'
import { logistics, logisticsOutlets } from "@/api/index"
import { PrepareOrderDetail } from "@/api/api"
import Region from "@/components/Region"
export default {
  components: {
    Region
  },
  data() {
    return {
			dialogVisible: false,
			type: "", // 发货方式 1自提 2送车 3指定地点 4发物流 5电子单面
			pageType: "",
			status1: "",
			placeArr:['省','市','县/区'],
			selected: [],
			pca: pca,
			pcaa: pcaa,
			listQuery: {
				size: 10,
				page: 1,
			},
			logList: [],
			netList: [],
			numberList: [],
			rules: {
				logistics: [
					{ required: true, message: '必填', trigger: 'blur' },
				],
				people: [
					{ required: true, message: '必填', trigger: 'blur' },
				],
				phone: [
					{ required: true, message: '必填', trigger: 'blur' },
				]
			},
			form: {},
			orderType: this.$route.query.orderType,
			status: this.$route.query.status
    }
	},

  methods: {
		init(val, mode_address) {
			this.form = mode_address
			this.type = val
			if(this.type !== "自提") {
				this.dialogVisible = true
				this.getSelectValue()
				this.form = {}
			}
		},

		// 发货方式详情
		showDetail(mode_address, mode, detail, status1) {
			this.dialogVisible = true
			this.type = mode
			this.pageType = detail
			this.status1 = status1
			this.form = mode_address
		},

		// 确定
		save() {
			this.dialogVisible = false
			this.$emit("refresh", this.form)
		},

		// 取消
		cancel() {
			this.dialogVisible = false
			this.form = {}
		},

		// 物流下拉列表
		getSelectValue() {
			logistics({ 
				...this.listQuery 
			}).then(res => {
        this.logList = res.data.data
			})
			
			// 网点下拉列表
			logisticsOutlets({
        ...this.listQuery
      }).then(res => {
        this.netList = res.data.data
			})
		},

		// 获取省市区联动
		selectChange(addressList) {
			this.form.province = addressList[0]
			this.form.city = addressList[1]
			this.form.area = addressList[2]
		}
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.inform-dialog {
	.search-form-other {
		.el-form-item {
			margin-bottom: 15px;
		}
	}
	.search-adress {
		display: flex;
		.el-form-item {
			margin-bottom: 20px;
			span:nth-child(2),span:nth-child(3),span:nth-child(4) {
				margin-left: 20px;
			}	
		}
	}
	.input-large {
		display: flex;
	}
	.el-dialog__footer {
		padding: 0;
	}
}
</style>
