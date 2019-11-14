<template>
	<el-dialog
		title="快递运费设置"
		:visible.sync="dialogVisible"
		class="batchSetupSialog"
		width="765px">

		<div>
			<el-form :inline="true" :model="form" :rules="rules" ref="form">
				<el-row>
					<el-form-item label="模板名称 :" label-width="86px" prop="name" class="template-name">
						<el-input v-model='form.name' placeholder="请输入模板名称"></el-input>
					</el-form-item>
				</el-row>
				<el-row>
					<el-form-item label="默认运费 :" label-width="76px" prop="product" class="freight">
						<el-input v-model='form.df_first_num' placeholder="首件数量"></el-input>&nbsp;&nbsp;件内&nbsp;&nbsp;
						<el-input v-model='form.df_first_cost' placeholder="首件费用"></el-input>&nbsp;&nbsp;元；
						每增加&nbsp;&nbsp;<el-input v-model='form.df_add_num' placeholder="续件数量"></el-input>
						&nbsp;件，运费增加&nbsp;&nbsp;<el-input v-model='form.df_add_cost' placeholder="续件数量"></el-input>&nbsp;&nbsp;元
					</el-form-item>
				</el-row>
				<el-row class="freight-free">
					<el-checkbox v-model="freeStatus" @change="changeStatus"></el-checkbox>
					<span>满&nbsp;</span>
					<el-input v-model='form.df_free_amount' placeholder="包邮金额"></el-input>&nbsp;
					<span class="free">元包邮</span>
					<span class="price-tip">除指定地区外，均以此运费计算</span>
				</el-row>

				<el-divider></el-divider>
				<el-row>
					<div class="tag-bton">
						<span class="are">指定地区运费 :</span>
						<span>
							<el-tag
								v-for="tag in tagList"
								:key="tag"
								:disable-transitions="false"
								@close="handleClose(tag)"
								ref="tag">
								{{tag}}
							</el-tag>
						</span>
					</div>
					
					<div class="mt-20">
						<el-form-item label="选择地区 :" label-width="103px" prop="product" class="freight">
							<el-select v-model="area" placeholder="请选择省" @change="selecProvice">
								<el-option
									v-for="item in provinceList"
									:key="item.id"
									:label="item.name"
									:value="item.id">
								</el-option>
							</el-select>
							<el-select v-model="province" placeholder="请选择市" class="ml-10" @change="selectAre">
								<el-option
									v-for="item in cityList"
									:key="item.id"
									:label="item.name"
									:value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
					</div>
					<el-form-item prop="first_num" class="freight-left">
						<el-input v-model='form.first_num' placeholder="首件数量"></el-input>&nbsp;&nbsp;件内&nbsp;&nbsp;
						<el-input v-model='form.first_cost' placeholder="首件费用"></el-input>&nbsp;&nbsp;元；
						每增加&nbsp;&nbsp;<el-input v-model='form.add_num' placeholder="续件数量"></el-input>
						&nbsp;件，运费增加&nbsp;&nbsp;<el-input v-model='form.add_cost' placeholder="续件数量"></el-input>&nbsp;&nbsp;元
					</el-form-item>
				</el-row>
				<el-row>
					<span>满&nbsp;&nbsp;</span>
					<el-input v-model='form.free_amount' placeholder="包邮金额"></el-input>&nbsp;&nbsp;
					<span class="free">元包邮</span>
					<el-checkbox v-model="setDefault" class="ml-30" @change="setMain">设为默认模板</el-checkbox>
				</el-row>
			</el-form>
		</div>

		<div slot="footer" class="dialog-footer">
			<el-button @click="dialogVisible = false">取 消</el-button>
			<el-button class="sure-btn" type="primary" @click="sure('form')">确 定</el-button>
		</div>
	</el-dialog>
</template>

<script>
import 	{ 
	getAreaList,
	addFreight,
	delFreight
} from "@/api/api"
export default {
	data() {
		return {
			form: {},
			area: "",
			province: "",
			setDefault: "",
			freeStatus: "",
			name: "",
			newTags: {},
			tagName: "",
			dynamicTags: [],
			provinceList: [],
			cityList: [],
			tagList: [],
			rules: {
				name: [
					{ required: true, message: '必填', trigger: 'blur' },
				]
			},
			dialogVisible:false,
		}
	},

	created() {
	},

	methods: {
		init() {
			this.dialogVisible = true
			this.form = {}
			this.tagList = []
			this.area = ""
			this.getSelectValue()
		},

		getSelectValue(provinceId) {
			getAreaList({
				pid: provinceId ? provinceId : "0"
			}).then(res => {
				if(res.code === 200) {
					if(provinceId) {
						this.cityList = res.data
					} else {
						this.provinceList = res.data
					}
				} else {
					this.$message.error(res.message)
				}
			})
		},

		getTag(provinceId) {
			this.newTags = this.provinceList.find(item => {
				return item.id === provinceId
			})
			this.tagName = this.newTags.name
			this.tagList.push(this.tagName)
      this.tagList = Array.from(new Set(this.tagList))
		},

		selecProvice(provinceId) {
			this.getTag(provinceId)
			this.provinceId = provinceId
			this.getSelectValue(provinceId)
		},

		selectAre(areId) {
			this.newTags = this.cityList.find(item => {
				return item.id === areId
			})
			this.tagName = this.newTags.name
			this.tagList.push(this.tagName)
			this.tagList = Array.from(new Set(this.tagList))
			this.form.area_list =  (this.newString += ',' + areId + ',' + this.provinceId).substring(10)
		},

		// 标签删除方法
    handleClose(tag) {
			console.log(tag)
			console.log(this.tagList)
			return
      this.tagList.splice(this.tagList.indexOf(tag), 1)
    },

		changeStatus(val) {
			if(val && !this.form.df_free_amount) {
				this.$message.error("请先输入包邮金额")
			} else {
				this.form.df_free_amount
			}
		},

		setMain(val) {
			if(val) {
				this.form.is_df = "1"
			} else {
				this.form.is_df = "0"
			}
		},

		sure(form) {
			this.$refs[form].validate((valid) => {
				if (valid) {
					addFreight({
						...this.form
					}).then(res => {
						if(res.code === 200) {
							this.$message.success("新建运费模板成功")
							this.dialogVisible = false
						} else {
							this.$message.error(res.message)
						}
					})
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.batchSetupSialog {
	.template-name {
		.el-input {
			width: 190px;
		}
	}
	.el-input {
		width: 90px;
	}
	.el-checkbox {
		margin-right: 5px;
	}
	.free {
		margin-right: 15px;
	}
	.freight {
		margin-bottom: 30px;
	}
	.freight-free {
		margin: 0 0 30px 32px;
	}
	.freight-left {
		margin-left: 27px;
	}
	.search-btn {
		margin-left: 345px;
		height: 20px;
		line-height: 2px;
		font-size: 12px;
	}
	.add-btn {
		height: 20px;
		line-height: 2px;
		font-size: 12px;
	}
	.are {
		font-weight: 700;
		line-height: 32px;
	}
	.tag-bton {
		height: 32px;
		.el-tag {
			margin-left: 15px;
		}
	}
}
</style>