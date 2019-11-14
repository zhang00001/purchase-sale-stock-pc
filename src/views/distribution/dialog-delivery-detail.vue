<template>
  <div>
    <el-dialog
      :title = this.type
      :visible.sync="dialogVisible"
			width="1000px"
			class="inform-dialog">
      <el-form ref="form" :model="form">
				<template v-if="type == '送车'">
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
					<el-row class="search-form">
						<el-col :span="8">
							<el-form-item label="说明 :" prop="cardNo" label-width="90px">
								<span> {{ form.cardNo }} </span>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="联系人 :" prop="cardname" label-width="136px">
								<span> {{ form.cardname }} </span>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="联系电话 :" prop="phone" label-width="136px"> 
								<span> {{ form.phone }} </span>
							</el-form-item>
							</el-col>
					</el-row>
				</template>

				<template v-if="type == '发物流' ">
					<el-row class="search-form">
						<el-col :span="8">
							<el-form-item label="物流 :" prop="logistics" label-width="90px">
								<span> {{ form.logistics }} </span>
							</el-form-item>
						</el-col>

						<el-col :span="8">
							<el-form-item label="收件人 :" prop="people" label-width="136px">
								<span> {{ form.people }} </span>
							</el-form-item>
						</el-col>

						<el-col :span="8">
							<el-form-item label="联系电话 :" prop="phone" label-width="136px"> 
								<span> {{ form.phone }} </span>
							</el-form-item>
							</el-col>
					</el-row>

					<el-row class="search-form">
						<el-col :span="8">
							<el-form-item label="网点 :" prop="networks" label-width="90px">
								<span> {{ form.networks }} </span>
							</el-form-item>
						</el-col>

						<el-col :span="8">
							<el-form-item label="单号 :" label-width="136px">
								<span> {{ form.number }} </span>
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

				<template v-if="type == '电子单面' ">
					<el-row class="search-form">
						<el-col :span="8">
							<el-form-item label="物流 :" prop="logistics" label-width="90px">
								<span> {{ form.logistics }} </span>
							</el-form-item>
						</el-col>

						<el-col :span="8">
							<el-form-item label="收件人 :" prop="people" label-width="136px">
								<span> {{ form.people }} </span>
							</el-form-item>
						</el-col>

						<el-col :span="8">
							<el-form-item label="联系电话 :" prop="phone" label-width="136px"> 
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
      </el-form>

      <span slot="footer" class="dialog-footer" >
        <el-button type="primary" @click="this.dialogVisible = false">取 消</el-button>
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
			form: {},
    }
	},

  methods: {
		styleDetail(mode_address, mode) {
			this.dialogVisible = true
			this.type = mode
			this.form = mode_address
		},
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
