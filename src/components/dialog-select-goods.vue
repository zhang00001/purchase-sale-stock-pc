<template>
  <div>
    <div class="table_header" v-if="order == '1' || order=='2' || order=='3' || order=='4' || order == '6' || order == '7' || order == '7' || order == '8' || status == '5' || status == '7' || status == '11' || status == '16' || status == '20' || status == '26'">
      <span>扫码枪录入：</span>
      <el-input
        style="width:230px;margin-right:5px;"
        placeholder="请扫描商品或商品条形码"
        :disabled="this.type === 'look'"
      ></el-input>
      <p>选择产品后手动输入数量</p>
      <el-button type="primary" @click="addGood" class="newAdd">新增商品</el-button>
    </div>

    <div class="table_header-message">
      <template v-if="status == '10'">
        <span>最近留言：</span>
        <p>{{msgList.length>0?msgList[0].content:""}}</p>
        <el-button v-if="msgList.length>0" type="text" @click="dialogVisibleList=true">查看更多留言</el-button>
        <el-button type="text" @click="addMessag" class="ml-20">点击添加留言</el-button>
      </template>
    </div>

		<el-form :model="formData" ref="form">
			<el-table
				:data="formData.tableData"
				border
				show-summary
				:summary-method="getSummaries"
				style="width: 100%;font-size:14px; margin-bottom: 30px"
				:header-cell-style="{background:'rgba(247,247,247,1)'}">
				<el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>

				<template v-if="order=='1' || order=='2' || order=='3' || order=='4' || order =='5' || order =='6' || order =='7' || order =='8' || status=='5' | status=='11' || status=='13' || status=='16' || status =='20' || status =='26' || status=='27' || status=='28' || status=='29' || status=='31' || status=='32' || status=='33' || status=='34' || status=='36'">
					<el-table-column label="操作" width="110" align="center">
						<template slot-scope="scope">
							<el-button @click="handleClick(scope.row, scope.$index)" type="text" size="small">删除</el-button>
						</template>
					</el-table-column>
				</template>
			
				<template v-if="order=='4'">
					<el-table-column prop="goods_status" label="退/销" align="center">
						<template slot-scope="scope">
							<el-switch
								v-model="scope.row.goods_status"
								:active-value = "0"
								:inactive-value = "1">
							</el-switch>
						</template>
					</el-table-column>
				</template>

				<template v-if="status=='14' || status=='15' || type=='2'">
					<el-table-column prop="goods_status" label="退/销" align="center">
						<template slot-scope="scope">
							<el-switch
								v-model="scope.row.goods_status"
								:disabled="status == '14' || status == '15'">
							</el-switch>
						</template>
					</el-table-column>
				</template>

				<template v-if="status=='0' || status=='1' || status=='2' || status=='3' || status=='4' || status=='5' || status=='13'|| status=='6' || this.status=='7' || status=='8' || status=='9' || status=='10' || status=='11' || status=='12' || status=='14' || status=='15' || status=='16' || status=='17' || status=='18' || status=='19' || status =='20' || status =='21' || status =='22' || status =='23' || status=='24' || status=='25' || status=='26' || status=='27' || status=='28' || status=='29' || status=='30' || status=='31' || status=='32' || status=='33' || status=='34' || status=='35' || status=='36' || status=='37' || status=='38' || status=='39' || status=='40' || status=='41' || status=='42' || order=='1' || order=='2' || order=='3' || order=='4' || order =='5' || order =='6' || order =='7' || order =='8'">
					
				<el-table-column prop="name" label="商品" align="center"></el-table-column>
				<el-table-column prop="item" label="货号" align="center"></el-table-column>
				<el-table-column prop="goods_code" label="条码" align="center"></el-table-column>
				<el-table-column prop="color" label="颜色" align="center"></el-table-column>
				<el-table-column prop="size" label="尺码" align="center"></el-table-column>
				<el-table-column prop="unit" label="单位" align="center"></el-table-column>

				<template v-if="order=='6' || status=='24' || status=='26'">
					<el-table-column prop="put_number" label="调拨数量" align="center">
						<template slot-scope="scope">
							<el-form-item :rules="fromaDataRules.put_number" :prop="'tableData.'+scope.$index+'.put_number'">
                <el-input v-model="scope.row.put_number" style="width:90px;"></el-input>
              </el-form-item>
						</template>
				</el-table-column>
				</template>

				<template v-if="order=='6' || status=='24' || status=='25' || status=='26'">
					<el-table-column prop="call_out_total" label="调出仓库当前总量" align="center"></el-table-column>
					<el-table-column prop="call_in_total" label="调入仓库当前总量" align="center"></el-table-column>
				</template>

				<template v-if="order=='8' || status =='20'">
					<el-table-column prop="num" label="入库数量" align="center">
						<template slot-scope="scope">
							<el-form-item :rules="fromaDataRules.put_number" :prop="'tableData.'+scope.$index+'.put_number'">
                <el-input v-model="scope.row.put_number" style="width:90px;"></el-input>
              </el-form-item>
						</template>
					</el-table-column>
				</template>

				<template v-if="status=='17' || status=='18' || status=='19'">
					<el-table-column prop="num" label="入库数量" align="center"></el-table-column>
					<el-table-column prop="front_stock" label="当前库存" align="center"></el-table-column>
					<el-table-column prop="instock" label="入库后库存" align="center"></el-table-column>
				</template>

				<template v-if="status=='17' || status=='18' || status=='19' || status=='20' || order=='8'">
					<el-table-column prop="front_stock" label="当前库存" align="center"></el-table-column>
					<el-table-column prop="instock" label="入库后库存" align="center"></el-table-column>
				</template>

				<template v-if="status=='18' || status=='19'">
					<el-table-column prop="num" label="入库数量" align="center"></el-table-column>
				</template>

				<template v-if="status=='1' || status=='2' || status=='3' || status=='4' || status=='6' || status=='8'">
					<el-table-column prop="put_number" label="数量" align="center"></el-table-column>
					<el-table-column prop="price" label="单价" align="center"></el-table-column>
					<el-table-column prop="discount" label="折扣%" align="center"></el-table-column>
				</template>
					
				<el-table-column prop="money" label="金额" sortable  align="center" v-if="status=='0' || status=='1' || status=='2' || status=='3' || status=='4' || status=='5' || this.status=='11' || status=='13'|| status=='6' || this.status=='7' || status=='8' || status=='9' || status=='10' || status=='12' || status=='14' || status=='15' || status=='16' || order=='1' || order=='2' || order=='3' || order=='4' || order =='5' || status=='37' || status=='38' || status=='39' || status=='40' || status=='41' || status=='42'"></el-table-column>
				</template>

				<template v-if="status=='27' || status=='28' || status=='29' || status=='30' || status=='31'">
					<el-table-column prop="number" label="已出库数量" align="center"></el-table-column>
					<el-table-column prop="put_number" label="待出库数量" align="center"></el-table-column>
					<template  v-if="status=='27' || status=='28' || status=='30'">
						<el-table-column prop="num" label="出库数量" align="center">
							<template slot-scope="scope">
								<el-input
									v-model="scope.row.num"
									style="width:90px;"
								></el-input>
							</template>
						</el-table-column>
					</template>
					<el-table-column prop="price" label="单价" align="center"></el-table-column>
					<el-table-column prop="money" label="金额" align="center"></el-table-column>

					<template v-if="status=='29' || status=='31'">
						<el-table-column prop="num" label="出库数量" align="center"></el-table-column>
					</template>
				</template>

				

				<template v-if="status=='30' || status=='32' || status=='33' || status=='34' || status=='35' || status=='36'">
					<el-table-column prop="num" label="入库数量" align="center" v-if="status=='30' || status=='31' || status=='32' || status=='33'">
						<template slot-scope="scope">
							<el-form-item :rules="fromaDataRules.put_number" :prop="'tableData.'+scope.$index+'.put_number'">
								<el-input
									v-model="scope.row.put_number"
									style="width:90px;"
								></el-input>
							</el-form-item>
						</template>
					</el-table-column>
					
					<el-table-column prop="put_number" label="待入库数量" align="center"></el-table-column>
					<el-table-column prop="number" label="已入库数量" align="center"></el-table-column>

					<template v-if="status=='34' || status=='35' || status=='36'">
						<el-table-column prop="num" label="入库数量" align="center"></el-table-column>
					</template>
				</template>

				<template v-if="order=='1' || order=='2' || order=='3' || order=='4' || order =='5' || status=='5' || this.status=='7' || this.status=='11' || status=='14' || status=='15' || status=='16'">
					<el-table-column prop="put_number" label="数量" align="center">
						<template slot-scope="scope">
							<el-form-item :rules="fromaDataRules.put_number" :prop="'tableData.'+scope.$index+'.put_number'">
                <el-input v-model="scope.row.put_number" style="width:90px;"></el-input>
              </el-form-item>
						</template>
					</el-table-column>
				</template>
					
				<template v-if="order=='1' || order=='2' || order=='4' || order =='5' || status=='5' || this.status=='7' || status=='14' || status=='15' || status=='16'">
					<el-table-column prop="price" label="单价" align="center">
						<template slot-scope="scope">
							<el-form-item :rules="fromaDataRules.price" :prop="'tableData.'+scope.$index+'.price'">
                <el-input v-model="scope.row.price" style="width:90px;" @blur="checkNumDiscont(scope.row)"></el-input>
              </el-form-item>
						</template>
					</el-table-column>
				</template>

				<template v-if="status=='9' || status=='10' || status=='12' || status=='13'">
					<el-table-column prop="put_number" label="数量" align="center"></el-table-column>
					<el-table-column prop="price" label="单价" align="center"></el-table-column>
				</template>

				<template v-if="order=='1' || order=='2' || order =='5' || status=='5' || status=='7' || status=='37'">
					<el-table-column prop="discount" label="折扣%" align="center">
						<template slot-scope="scope">
							<el-form-item :rules="fromaDataRules.discount" :prop="'tableData.'+scope.$index+'.discount'">
                <el-input v-model="scope.row.discount" style="width:90px;" @blur="checkNum(scope.row)"></el-input>
              </el-form-item>
						</template>
					</el-table-column>

					<template v-if="status=='38' || status=='39' || status=='40' || status=='41' || status=='42'">
						<el-table-column prop="discount" label="折扣%" align="center"></el-table-column>
					</template>
				</template>

				<template v-if="order == '3' || this.status=='11'">
					<el-table-column prop="price" label="单价" align="center"></el-table-column>
				</template>


				<template v-if="status=='0' || status=='1' || status=='2' || status=='3' || status=='4' || status=='5' || status=='6' || this.status=='7' || order=='1' || order=='2' || order =='5' || status=='37'">
					<el-table-column prop="discount_price" label="折后价" align="center">
						<template slot-scope="scope">
							<el-form-item :rules="fromaDataRules.discount_price" :prop="'tableData.'+scope.$index+'.discount_price'">
                <el-input v-model="scope.row.discount_price" style="width:90px;" @blur="checkNum(scope.row)"></el-input>
              </el-form-item>
						</template>
					</el-table-column>

					<template v-if="status=='38' || status=='39' || status=='40' || status=='41' || status=='42'">
						<el-table-column prop="price" label="折后价" align="center"></el-table-column>
					</template>
					
					<el-table-column prop="discount_money" label="折后金额" sortable align="center"></el-table-column>
				</template>

				<template v-if="this.status=='8'">
					<el-table-column prop="discount_price" label="折后价" sortable align="center"></el-table-column>
					
					<el-table-column prop="discount_money" label="折后金额" sortable align="center"></el-table-column>
				</template>

				<template v-if="order=='7' || status =='22' || status =='23'">
					<el-table-column prop="put_number" label="盘点数量" align="center">
						<template slot-scope="scope">
							<el-form-item :rules="fromaDataRules.put_number" :prop="'tableData.'+scope.$index+'.put_number'">
                <el-input v-model="scope.row.put_number" style="width:90px;"></el-input>
              </el-form-item>
						</template>
					</el-table-column>
				</template>

				<template v-if="order=='7' || status =='21' || status =='23'">
					<el-table-column prop="front" label="盘点前数量" align="center"></el-table-column>
					<el-table-column prop="loss_num" label="盈亏数量" align="center"></el-table-column>
					<el-table-column prop="loss_price" label="盈亏金额" align="center"></el-table-column>
				</template>

				<template v-if="order=='21' || status =='21' || status =='22'">
					<el-table-column prop="put_number" label="盘点数量" align="center"></el-table-column>
				</template>
			</el-table>
		</el-form>

    <el-dialog title="选择商品" :visible.sync="dialogVisible" width="40%" class="dialog-select-goods">
      <div class="goodList">
        <div>
          <el-input v-model="form.name" style="width:300px;" placeholder="货号、名称、条码"></el-input>
          <el-button type="primary" @click="searchList">搜索</el-button>
        </div>
        <div style="margin-top:20px;">
          <div
            v-for="item in goods"
            :key="item.id"
            @click="selsctGood(item)"
            class="goodDiv"
          >{{item.name }}</div>
        </div>

        <el-pagination
				@current-change="handleCurrentChange"
				:page-size="10"
				layout="total, prev, pager, next"
				:total="total">
			</el-pagination>
      </div>
    </el-dialog>

    <el-dialog :title="selectGood.name" :visible.sync="dialogVisibleNew" class="dialog-input-table">
      <div style="display:flex">
        <div v-show="isFlag" class="search-input">
          <el-form>
            <el-button type="text" @click="setAll" class="set-btn">
              批量设置所有
              <i class="el-icon-edit el-input__icon" slot="suffix" @click="setAll"></i>
            </el-button>
            <span class="info">点击任意颜色或尺码，可批量设置该颜色或尺码的数量</span>

            <div class="number-input">
              <span>包装数 :</span>
              <el-input v-model="form.PackageNumber"></el-input>
            </div>
          </el-form>
        </div>

        <div v-show="!isFlag" class="sure-btn">
          <el-input placeholder="输入" v-model="form.input1"></el-input>
          <el-button type="primary" @click="set" style="margin-left: 20px">设置</el-button>
          <el-button type="primary" @click="cancleSet">取消</el-button>
        </div>
      </div>

      <el-table
        :data="goodons"
        border
        style="font-size:14px;"
        size="small"
        :header-cell-style="{background:'rgba(247,247,247,1)'}"
      >
        <el-table-column prop="color" label="颜色" align="center"></el-table-column>
        <el-table-column prop="size" label="尺码" align="center"></el-table-column>
        <el-table-column prop="put_number" label="数量" align="center">
          <template slot-scope="scope">	
						<el-form-item>
							<el-input v-model="scope.row.put_number" style="width:90px;"></el-input>
						</el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="库存" align="center"></el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveLocal">确 定</el-button>
      </span>
    </el-dialog>

     <el-dialog title="新增留言" :visible.sync="dialogVisibleAdd" width="500px" class="dialog-message">
				<el-input
					type="textarea"
					:rows="3"
					:autosize="{ minRows: 3, maxRows: 8}"
					v-model="form.content"
					placeholder="内容"
					maxlength="200"
					show-word-limit>
				</el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveMsg">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="留言列表" :visible.sync="dialogVisibleList" class="dialogVisibleList">
      <el-table :data="msgList" border>
        <el-table-column prop="id" label="id" align="center"></el-table-column>
        <el-table-column prop="create_time" label="时间" align="center"></el-table-column>
        <el-table-column prop="content" label="详情" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="delMsg(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
			<el-pagination
				@current-change="handleCurrentChange"
				:page-size="10"
				layout="total, prev, pager, next"
				:total="total">
			</el-pagination>
    </el-dialog>
  </div>
</template>
 

<script>
import { goodsList, goodsOne } from "@/api/index"
import { messageAdd, messageList, messageDel, getMessage } from "@/api/api"
import http from "@/utils/request"
import { enumSaleStatus, enumSizes, enumColors } from "@/utils/enums"
import { validate } from "@/utils/validate"
export default {
  data() {
		let validateReceiptNumber = (rule, value, callback) => {
      if (!validate(value, 'numDecimal')) {
        return callback(new Error('数字且保留两位小数'))
      } else {
        callback()
      }
		}
		let validateNonzero = (rule, value, callback) => {
      if (!validate(value, 'nonzero')) {
        return callback(new Error('为非零数字'))
      } else {
        callback()
      }
    }
    return {
      isFlag: true,
      isShow: false,
      index1: 0,
      content: "",
			form: {},
			sum: "",
			newData: "",     
      goodons2: [],
      setColor: true,
      dialogVisible: false,
			dialogVisibleNew: false,
			dialogVisibleList: false,
      showColor: false,
      key: "",
			listQuery: {
				size: 10,
				page: 1,
			},
      selectGoodOne: {},
      total: 0,
      input: [],
      goodons: [],
      see: false,
      goods: [],
      msgList: [],
      sizes: [],
      colors: [],
      colors2: [],
      value: "",
      PackageNumber: "",
      region: "",
      saercGood: "", ///输入商品搜索
      orderStatus: enumSaleStatus,
      dialogImageUrl: "",
      selectGood: "",
      dialogVisibleAdd: false,
			type: this.$route.query.type,
			order: this.$route.query.order,
			status: this.$route.query.status,
			id: this.$route.query.id,
			page: 1,
			active: true,
			inactive: false,
			goods_status: false,
			formData: {
        tableData: this.tableData
			},
			fromaDataRules: {
        put_number: [
					{ required: true, message: '必填', trigger: 'blur' },
					{ validator: validateNonzero, trigger: 'blur' }
				],
				price: [
					{ required: true, message: '必填', trigger: 'blur' },
					{ validator: validateReceiptNumber, trigger: 'blur' }
				],
				discount: [
					{ required: true, message: '必填', trigger: 'blur' },
					{ validator: validateReceiptNumber, trigger: 'blur' }
				],
				discount_price: [
					{ required: true, message: '必填', trigger: 'blur' },
					{ validator: validateReceiptNumber, trigger: 'blur' }
				],
      },
    }
  },

  props: {
		// 初始化表格
    tableData: {
      type: Array,
      default() {
        return []
      }
		},
		storeGood: {
      type: Array,
      default() {
        return []
      }
    },
	},
	
	watch: {
    storeGood(e) {
			this.$store.commit("good", e)
		},
		
		$route(){
			this.status = this.$route.query.status
			console.log(this.status)
		},

		tableData(newVal) {
			this.formData.tableData = newVal
    }
	},


  created() {
		// 页面初始化获取留言内容
		this.getMsg()
		// 初始化表格数据
		this.$store.commit("good", [])
		// 初始化页面获取第一条留言
		if(status == '10') {
			this.getMessageOne()
		}
		
		this.aaa()
	
				
				
	
	},

  methods: {
		aaa() {
			this.$emit("getTotal", this.sum, this.newData)
			console.log(this.sum, this.newData)
		},
		// 留言列表删除
    delMsg(id) {
			this.$common.confirm(
			{
				title: "删除留言",
				content: "改留言将被删除，请谨慎操作"
			},() => {
				messageDel(id).then(res => {
					if(res.code == 200) {
						this.$message.success("留言删除成功")
						this.getMsg()
					} else {
						this.$message.error(res.message)
					}
				})
			})
		},

		// 页面初始化获取第一条留言
		getMessageOne() {
			getMessage({ 
				pid: this.id, 
				type: "配货单"
			}).then(res => {
					if(res.code == 200) {
					this.dialogVisibleAdd = false
					} else {
						this.$message.error(res.msg)
					}
        } 
      )
		},

		// 留言提交
    saveMsg() {
      messageAdd({ 
				pid: this.id, 
				content: this.form.content,
				type: "配货单"
			}).then(res => {
					if(res.code == 200) {
					this.$message.success("新增留言成功")
					this.dialogVisibleAdd = false
					this.getMsg()
					} else {
						this.$message.error(res.msg)
					}
        } 
      )
		},
		
    // 留言列表
    getMsg() {
      messageList({
				id: this.id,
				...this.listQuery
			}).then(res => {
				if(res.code == 200) {
					this.msgList = res.data.data
					this.total = res.data.total
					} else {
						this.$message.error(res.msg)
					}
      })
		},

		// 获取表格表单数据
    getTableForm() {
      let isValid = false
      this.$refs['form'].validate(valid => {
        if (valid) {
          isValid = true
        } else {
          isValid = false
        }
      })
      return isValid ? this.formData.tableData : ''
    },
		
		// 点击添加留言弹出弹框
    addMessag() {
			this.dialogVisibleAdd = true
			this.form = {}
		},
		
		// 输入框失去焦点，自动合计
    checkNum(item, cum) {
      item.discount_price = (Number(item.price) * Number(item.discount)) / 100
			item.money = Number(item.price) * Number(item.put_number);
			// 折后价 = 单价 * 数量 * 折扣
      item.discount_money =
        (Number(item.price) * Number(item.put_number) * Number(item.discount)) /
        100

      let goods = this.$store.state.good
      goods.forEach(val => {
        if (val.id == item.id) {
          val.put_number = item.put_number;
          val.discount_price = item.discount_price
          val.money = item.money;
          val.discount_money = item.discount_money
        }
      })
      this.$store.commit("good", goods)
		},

		checkNumDiscont() {
			// 折后价 = 单价 * 数量 * 折扣
      item.discount_money =
        (Number(item.price) * Number(item.discount)) /
        100
		},
		
		// 删除表格
    handleClick(e, index) {
			this.formData.tableData.splice(index, 1)
			// 将删除表格后的最新数据传递给父组件
			this.$emit("goods", this.formData.tableData)
			// 如果商品的id等于我所选的id，就把这个商品进行删除，并且让输入put_number这个变量初始化为0
			// this.$store.commit("good",(this.$store.state.good.find(val => val.id == e.id).put_number = 0))
		},
		
		// 输入数量后，确定
    saveLocal() {
				if(this.goodons.some(val=>Number(val.put_number)<=0)) {
					this.$message.error("请输入商品数量")
				} else {
					 this.goodons.forEach(val => {
						if (Number(val.put_number) > 0) {
							// 折扣价 = 单价 * 折扣
							val.discount_price = (Number(val.price) * Number(val.discount)) / 100
							// 金额 = 单价 * 数量
							val.money = Number(val.price) * Number(val.put_number)
							// 折后金额 = 单价 * 数量 * 折扣
							val.discount_money = (Number(val.price) * Number(val.put_number) *	Number(val.discount)) /	100
						}
					})
					// 缓存中的商品id是否包含所选商品id
					if (this.$store.state.good.map(val => val.commodity_id).indexOf(this.selectGood.id) >= 0) {

						// 缓存中的商品id如果和选择的商品id不相等，将选择的商品和缓存中的商品一起添加到缓存中
						this.$store.commit("good",this.$store.state.good.filter(val => val.commodity_id != this.selectGood.id).concat(this.goodons))
					} else {

						// 缓存中的商品id如果和选择的商品id相等，将选择的商品添加到缓存中           
						this.$store.commit("good", this.$store.state.good.concat(this.goodons))
					}

					// 调用父组件的tableData方法，并把输入数量大于0的put_number表格数据传过去
					this.$emit("tableData", this.$store.getters.set_table_good)

					// 调用父组件的goods方法，并把输入数量大于0的put_number传过去
					this.$emit("goods", this.$store.getters.set_table_good)

					this.dialogVisible = false;
					this.dialogVisibleNew = false;
				}
		 
			this.$nextTick(() => {
				this.$emit("getTotal", this.sum, this.newData)
			})
		
		},
		
		// 选择商品列表确定商品
    selsctGood(e) {
			this.dialogVisibleNew = true	
      goodsOne(e.id).then(res => {
				console.log(res.data)
				console.log(e)
        this.selectGood = e
        this.goodons = []
				//  缓存中有商品
				// return
        if (res.data.length > 0) {
					// 返回所选商品id首次在缓存商品中存在的位置>=0，没有则返回-1，则所选商品在缓存中存在
          if (this.$store.getters.set_good.map(val => val.commodity_id).indexOf(this.selectGood.id) >= 0) {
						// 过滤掉和缓存中，相同的商品，并重新赋值给我goodons
						this.goodons = this.$store.state.good.filter(val => val.commodity_id == e.id)
						
						// 缓存中没有商品
          } else {
            if (this.order == "1" || this.order == "2" || this.status == '5' || this.status == '7') {
              res.data.forEach(val => {
                this.goodons.push({
                  commodity_id: this.selectGood.id, // 所选商品的商品id
									product_id: val.id, // 新增表格里面的单品id
									name: val.name, //商品名称
									item: val.item, //货号
									goods_code: val.goods_code, //条码
                  color: val.color, // 颜色
									size: val.size,  // 尺码
									unit: val.unit, //单位
									money: 0, //金额
									put_number: 0,  //数量
									price: this.selectGood.retail_price, //单价
									discount: 100, //折扣
									discount_price: 0, //折后价
									discount_money: 0, //折扣金额
                })
              })
            } else if(this.order == "3" || this.order == "4" || this.status == '11' || this.status == '16') {
							res.data.forEach(val => {
                this.goodons.push({
                  commodity_id: this.selectGood.id, // 所选商品的商品id
									product_id: val.id, // 新增表格里面的单品id
									name: val.name, //商品名称
									item: val.item, //货号
									goods_code: val.goods_code, //条码
                  color: val.color, // 颜色
									size: val.size,  // 尺码
									unit: val.unit, //单位
									money: 0, //金额
									put_number: 0,  //数量
									price: this.selectGood.retail_price, //单价
                })
              })
						}	else if(this.order == "6" || this.order == "7" || this.order == '8' || this.status == '26' || this.status == '20' || this.status == '23') {
							res.data.forEach(val => {
                this.goodons.push({
									commodity_id: this.selectGood.id, // 所选商品的商品id
									product_id: val.id, // 新增表格里面的单品id
									name: val.name, //商品名称
									item: val.item, //货号
									goods_code: val.goods_code, //条码
                  color: val.color, // 颜色
									size: val.size,  // 尺码
									unit: val.unit, //单位
									put_number: 0,  // 调拨数量
                })
              })
						} 
          }
          this.sizes = [...new Set(this.goodons.map(val => val.size))];
          this.colors = [...new Set(this.goodons.map(val => val.color))];
        }
      });
    },

    // 批量设置所有
    setAll() {
      this.isFlag = false;
    },

    // 设置
    set() {
      this.goodons.forEach(val => (val.put_number = this.form.input1));
      this.form.input1 = "";
      this.isFlag = true;
    },

    // 取消设置
    cancleSet() {
      this.isFlag = true;
    },

    addGood() {
			this.dialogVisible = true
			// 初始化，查询新增商品列表
    	this.init()
		},
		
		// 初始化列表
		init() {
			goodsList({ 
				params: { 
					...this.listQuery,
					...this.form
			 	} 
			 }).then(res => {
        this.goods = res.data.data
        this.total = res.data.total
      })
		},

		// 新增商品搜索
		searchList() {
			this.init()
		},
		
		// 表格分页
		handleCurrentChange(val) {
			this.listQuery.page = val
      this.init()
		},
		
			// 表格合计
		getSummaries(param) {
			const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计"
          return
        }
        if (index == 8 || index == 9 || index == 10 || index==11 ||index == 12 || index == 13) {
					if(data) {
						const values = data.map(item => Number(item[column.property]))
						if (!values.every(value => isNaN(value))) {
							sums[index] = values.reduce((prev, curr) => {
								const value = Number(curr)
								if (!isNaN(value)) {
									return prev + curr
								} else {
									return prev
								}
							}, 0)
							sums[index] += ""
						} else {
							sums[index] = ""
						}
					}
				}
				console.log(sums[13])
				if(sums[13] > 0) {
					this.sum = sums[13]
					this.newData = sums[13]	
				} else {
					this.sum = sums[13]
					this.newData = sums[13]	
				}
      })
			return sums
		}
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.goodDiv {
  height: 50px;
  border-bottom: 1px solid #e9e9e9;
  font-size: 18px;
  line-height: 50px;
  text-indent: 20px;
}
.color {
  margin-bottom: 10px;
  .el-input {
    width: 100px;
    margin-right: 10px;
  }
}

.size {
  // display: flex;
  margin-left: 70px;
  margin-bottom: 10px;
  p {
    width: 110px;
  }
}
.setColor {
  display: flex;
  align-items: center;
  span {
    margin: 0 20px;
  }
}
.setColor /deep/ .el-input {
  width: 190px;
  margin-right: 20px;
}
.goodList {
  cursor: pointer;
  margin-bottom: 10px;
  /deep/ .el-radio-group {
    display: flex;
    flex-direction: column;

    min-height: 300px;
    /deep/ .el-radio {
      margin-bottom: 20px;
    }
  }
}
.zfb {
  margin-left: 53px;
  display: flex;
  align-items: center;
  .el-select {
    width: 118px;
    margin: 0;
    margin-right: 12px;
  }
}
.zfb /deep/ .el-input-group__append {
  padding: 9px 7px;
}
.receivables
  /deep/
  .el-radio-button__orig-radio:checked
  + .el-radio-button__inner {
  background: rgba(225, 238, 255, 1);
  color: rgba(85, 161, 255, 1);
  border: none;
  box-shadow: none;
}
.receivables {
  margin: 27px 0;
  display: flex;
}

.receivables /deep/ .el-radio-button {
  // width: 118px;height:32px;
}
.receivables /deep/ .el-radio-button--small .el-radio-button__inner {
  padding: 9px 27px;

  background: rgba(239, 239, 239, 1);
  border: none;
  font-size: 16px;
}
.all {
  margin-bottom: 47px;
  p {
    font-size: 18px;

    font-weight: 600;
    color: rgba(51, 51, 51, 1);
  }
}
.upload {
  margin-top: 20px;
  margin-left: 20px;
}
.upload /deep/ .el-upload--picture-card {
  width: 100px;
  height: 100px;
  line-height: 100px;
}
.upload /deep/ .el-upload-list--picture-card .el-upload-list__item {
  width: 100px;
  height: 100px;
}
.box-card {
  width: 1620px;
  height: 219px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px 0px rgba(217, 217, 217, 0.5);
	padding: 30px 22px;
	.table_header {
		display: flex;
		align-items: center;
		margin-bottom: 20px;
		span {
			color: #606266;
			margin-right: 5px;
		}
		.newAdd {
			width: 90px;
			height: 40px;
			padding: 0;
		}
		p {
			color: #606266;
			margin: 0 20px 0 17px;
		}
	}
}
.box-card-message {
	.table_header {
		p {
			color: #999999;
			font-size: 14px;
		}
	}
}
.back {
  margin-bottom: 14px;
  cursor: pointer;
}
.table_header-message {
  display: flex;
	align-items: center;
  span {
    color: #606266;
    margin-right: 5px;
  }
  p {
		color: #999999;
		font-size: 14px;
    margin: 0 20px 0 17px;
  }
}
.info {
  margin-left: 20px;
  display: flex;
  align-items: center;
  h6 {
    font-size: 18px;

    font-weight: 600;
    color: rgba(255, 58, 58, 1);
  }
  p {
    font-size: 16px;

    margin: 0 40px;
    color: rgba(51, 51, 51, 1);
    span {
      margin-left: 10px;
    }
  }
}
.el-select {
  width: 190px;
  margin-right: 70px;
}
.searchInput {
  width: 190px;
}
.date {
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    margin-right: 16px;
  }
  .datepicker {
    margin-left: 16px;
  }
}
.top {
  display: flex;
  align-items: center;
}
.label {
  font-size: 18px;
  font-family: PingFangSC;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  line-height: 18px;
  position: relative;
  text-indent: 10px;
}
.center {
  margin: 26px;
}
.label::after {
  content: "";
  left: 0;
  top: 3px;
  position: absolute;
  width: 4px;
  height: 14px;
  background: rgba(51, 51, 51, 1);
  border-radius: 3px;
}
// input 表格
.input-table {
  display: flex;
  padding-top: 20px;
  .input-color {
    display: flex;
    flex-direction: column;
    width: 80px;
    .color-row {
      display: flex;
      flex-direction: column;
    }
  }
  .el-input {
    width: 100%;
  }
  .el-row {
    width: 400px;
  }
}
.el-dialog__body {
  .look-store {
    float: right;
    color: #0590ff;
    cursor: pointer;
    margin-top: 10px;
  }
}
.dialog-select-goods {
  .el-button {
    width: 80px;
    height: 40px;
    margin-left: 20px;
    padding: 0;
  }
}
.search-input {
  display: flex;
  .number-input {
    margin: 13px 0 0 30px;
    .el-input {
      width: 80px;
      margin-left: 10px;
    }
  }
}
.dialog-input-table {
  .sure-btn {
    .el-button {
      width: 80px;
      height: 40px;
      margin-left: 20px;
			padding: 0;
			margin-bottom: 26px;
    }
  }
}
/deep/.dialog-message {
	.el-dialog__body {
		padding: 20px 30px 10px 30px;
	}
	.el-dialog__footer {
		padding: 20px 30px 30px 10px;
	}
}
.dialogVisibleList {
	.el-button {
		padding: 0;
	}
}	
</style>
