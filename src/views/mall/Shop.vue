<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div class="box-inform">
          <div class="box">
            <div class="row">
              <h6>{{ this.confirm_num }}</h6>
              <p>待确认订单</p>
            </div>
            <div class="row">
              <h6>{{ this.turn_num }}</h6>
              <p>已转销订单</p>
            </div>
            <div class="row">
              <h6>{{ this.finish_num }}</h6>
              <p>已完成订单</p>
            </div>
          </div>
          <div>
            <chart ref="chart1" :options="orgOptions" :auto-resize="true"></chart>
          </div>
        </div>
      </el-col>
      <el-col :span="24" style="margin-top:20px;">
        <div class="box-table">
          <h5 class="label">店铺信息</h5>
          <div class="form_data">
            <el-row>
              <el-col :span="15">
                <el-form ref="form" :model="form" label-width="80px">
                  <el-col :span="8">
                    <el-form-item label="店铺名称 :">
                      <el-input v-model="form.store_name"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="店铺简介 :">
                      <el-input v-model="form.store_des"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="联系电话 :">
                      <el-input v-model="form.tel"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="商户名称 :">
                      <el-input v-model="form.merchant"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="商户地址 :">
                      <el-input v-model="form.address"></el-input>
                    </el-form-item>
                  </el-col>
                </el-form>
              </el-col>
            </el-row>
            <div class="codeImage">
              <div class="qrCode">
                <img :src="require('@/assets/images/qrcode.png')" alt />
              </div>
              <el-button type="primary" @click="onSubmit">保存</el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { storeStateInfo, storeStateEdit } from "@/api/api"
import http from "@/utils/request"
export default {
  data() {
    return {
			form: {},
			turn_num: "",
			finish_num: "",
			confirm_num: "",
			orgOptions: {
				title: { text: "近七天订单数"},
				tooltip: { trigger: "axis" }, // 触发动态线轴
				xAxis: { data: [] }, // 横坐标数据
				yAxis: {}, // 纵轴数据
				series: {
					name: "订单数", // 曲线的名字
					type: "line", // 曲线类型
					symbol: "circle", // 曲线圆点显示填充颜色
					itemStyle: {
						normal: {
							color: "#55A1FF", // 曲线颜色
							// 曲线样式
							areaStyle: {
								color: {
									x2: 0, // 0不从起始位置开始填充
									y2: 1, // 曲线是否被填充
									colorStops: [
										{	offset: 0,	color: "#55A1FF"	},// 曲线颜色
										{	offset: 1,	color: "rgba(255, 255, 255, 0.5)"	} // 颜色渐变
									],
									global: false // 为false 显示曲线填充颜色  为true 不显示
								}
							}
						}
					},
					// 控制曲线走向
					data: []
				}
			}
    }
  },

  created() {
		this.init()
	},
	
  methods: {
		init() {
			// 折现图详情
			storeStateInfo().then(res => {
				if (res.code === 200) {
					this.orgOptions.xAxis.data = res.data.week.date
					this.orgOptions.series.data = res.data.week.num
					this.finish_num = res.data.cnt.finish_num
					this.turn_num = res.data.cnt.turn_num
					this.confirm_num = res.data.cnt.confirm_num
					this.form = res.data.detail
				} else {
					this.$message.error(res.message)
				}
			})	
		},

		// 点击确定
    onSubmit() {
      this.$common.confirm(
			{
				title: "保存店铺概况",
				content: "该店铺概况将被保存，请谨慎操作"
			},
			() => {
				storeStateEdit({
					...this.form
				}).then(res => {
					if (res.code === 200) {
						this.$message.success("店铺概况保存成功")
						this.form = {}
					} else {
						this.$message.error(res.message)
					}
				})
			})
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.form_data {
  margin-top: 15px;
  /deep/ .el-button {
    width: 200px;
    height: 40px;
    background: rgba(85, 161, 255, 1);
    border-radius: 4px;
  }
}
.box {
  display: flex;
  justify-content: space-around;
  text-align: center;
  padding-bottom: 30px;
  width: 60%;
  .row {
    h6 {
      font-size: 22px;
      font-family: PingFangSC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 22px;
      margin-bottom: 10px;
      text-align: center;
      color: #55a1ff;
    }
    p {
      height: 20px;
      font-size: 14px;
      font-family: PingFang-SC;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
      line-height: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        margin-left: 5px;
      }
    }
  }
}
.codeImage {
	display: flex;align-items: center;
	.qrCode {
		width: 134px;
		height: 134px;
		border-radius: 5px;
		border: 6px solid rgba(85, 161, 255, 1);
		margin-right: 418px;
		img {
			width: 100%;
		}
	}
}
/deep/.box-inform {
	margin-bottom: 0;
}
</style>
