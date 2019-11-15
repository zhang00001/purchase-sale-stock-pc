<template>
  <div class="app-container">
		<div class="nav">
			<div class="back" @click="goBack">
				<i class="el-icon-arrow-left">返回</i>
			</div>
			<div class="back">
				<span v-if="status=='0' || status=='5'">采购单 — {{ number }} — 管理员</span>
				<span v-if="status=='1'">采购单 — {{ number }} — 管理员</span>
				<span v-if="status=='2'">采购单 — {{ number }} — 管理员</span>
				<span v-if="status=='3'">采购单 —{{ number }} — 管理员</span>
				<span v-if="status=='4'">采购单 — {{ number }} — 管理员</span>
				<template v-if="status=='6' || status=='7' || status=='8'">
					<span>采购退货单 — {{ number }} — 管理员</span>
				</template>		
				<span v-if="status=='9'">配货单 — {{ number }} — 管理员</span>
				<span v-if="status=='10'">配货单 — {{ number }} — 管理员</span>
				<span v-if="status=='11'">配货单 — {{ number }} — 管理员</span>
				<span v-if="status=='12'">配货单 — {{ number }} — 管理员</span>
				<span v-if="status=='13'">配货单 — {{ number }} — 管理员</span>
				<span v-if="status=='14'">配货退货单 — {{ number }} — 管理员</span>
				<span v-if="status=='15'">配货退货单 — {{ number }} — 管理员</span>
				<span v-if="status=='16'">配货退货单 — {{ number }} — 管理员</span>
				<span v-if="status=='17'">生产入库单 — {{ number }} — 管理员</span>
				<span v-if="status=='18'">生产入库单 — {{ number }} — 管理员</span>
				<span v-if="status=='19'">生产入库单 — {{ number }} — 管理员</span>
				<span v-if="status=='20'">生产入库单 — {{ number }} — 管理员</span>
				<span v-if="status=='20'">生产入库单 — {{ number }} — 管理员</span>
				<span v-if="status=='24'">库存调拨单 — {{ number }} — 管理员</span>
				<span v-if="status=='25'">库存调拨单 — {{ number }} — 管理员</span>
				<span v-if="status=='26'">库存调拨单 — {{ number }} — 管理员</span>
				<span v-if="status=='27'">出库单 — {{ number }} — 管理员</span>
				<span v-if="status=='28'">出库单 — {{ number }} — 管理员</span>
				<span v-if="status=='29'">出库单 — {{ number }} — 管理员</span>
				<span v-if="status=='30'">出库单 — {{ number }} — 管理员</span>
				<span v-if="status=='31'">出库单 — {{ number }} — 管理员</span>
				<span v-if="status=='32'">入库单 — {{ number }} — 管理员</span>
				<span v-if="status=='33'">入库单 — {{ number }} — 管理员</span>
				<span v-if="status=='34'">入库单 — {{ number }} — 管理员</span>
				<span v-if="status=='35'">入库单 — {{ number }} — 管理员</span>
				<span v-if="status=='36'">入库单 — {{ number }} — 管理员</span>

				<span v-if="status=='37'">微商城订单 — {{ number }} — 待付款</span>
				<span v-if="status=='38'">微商城订单 — {{ number }} — 待确认</span>
				<span v-if="status=='39'">微商城订单 — {{ number }} — 待出货</span>
				<span v-if="status=='40'">微商城订单 — {{ number }} — 待收货</span>
				<span v-if="status=='41'">微商城订单 — {{ number }} — 已完成</span>
				<span v-if="status=='42'">微商城订单 — {{ number }} — 已撤销</span>
			</div>
			<el-button class="detail-botton" type="primary" @click="goBuild" v-if="status == '37' || status == '38' || status == '39' || status == '40' || status == '41' || status == '42'">查看销售订单</el-button>

			<div :class="{'nav-btn2': status=='10' || status=='11' || status=='12' || status=='16' || status=='9',  'nav-btn': status=='1' || status=='2' || status=='3' || status=='4' || status=='5' || status=='6' || status=='7' || status=='8' || status=='13' || status=='17' || status=='18' || status=='19' || status=='20' || status=='21' || status=='22' || status=='23' || status=='27' || status=='28' || status=='29' || status=='30' || status=='35'}">
				<div v-if="status=='1' || status=='2' || status=='3' || status=='4' || status=='6' || status=='8' || status=='9' || status=='10' || status=='12' || status=='13' || status=='17' || status=='18' || status=='19' || status=='21' || status=='22'">
					<el-button type="primary" @click="sure" class="new-add">复制为新增</el-button>
				</div>

				<div v-if="status=='21' || status=='22' || status=='23'">
					<el-button type="primary" @click="sure" class="new-add">新建盘点单</el-button>
				</div>
				
				<div v-if="status=='1' || status=='2' || status=='3' || status=='4' || status=='5' || status=='6' ||  status=='7' || status=='8' || status=='9' || status=='10' || status=='11' ||  status=='12' || status=='13'  || status=='17' || status=='18' || status=='19' || status=='20' || status=='29' || status=='30' || status=='35'">
					<el-button type="primary" @click="print" class="ml-20">打印</el-button>
				</div>

				<div v-if="status=='5' || status=='1' || status=='2' || status=='3' || status=='4'  || status=='9' || status=='10' || status=='11' ||  status=='12' || status=='13'  || status=='17' || status=='18' || status=='19' || status=='20'">
					<el-button type="primary" @click="sure" class="new-add">打印条码</el-button>
				</div>

				<div v-if="status=='11' ">
					<el-button type="primary" @click="sure" class="new-add">筛出有货并新增</el-button>
				</div>

				<div v-if="status=='17' || status=='18' || status=='19'">
					<el-button type="primary" @click="sure" class="new-add">新增生产入库单</el-button>
				</div>

				<div v-if="status=='5' || status=='1' || status=='2' || status=='3' || status=='4'">
					<el-button type="primary" @click="sure" class="new-add">新增采购单</el-button>
				</div>

				<div v-if="status=='9' || status=='10' || status=='11' || status=='12' || status=='13' || status=='20'">
					<el-button type="primary" @click="sure" class="ml-20">新增配货单</el-button>
				</div>

				<div v-if="status=='9' || status=='10' || status=='11' || status=='12' || status=='13' ">
					<el-button type="primary" @click="sure" class="ml-20">新增配货退货单</el-button>
				</div>

				<div v-if="status=='4' || status=='10'">
					<el-button type="primary" @click="sure" class="new-add">复制为销售单</el-button>
				</div>

				<div v-if="status=='27' || status=='28' || status=='29' || status=='30'">
					<el-button type="primary" @click="sure" class="new-add">复制为销售退货单</el-button>
				</div>

				<div v-if="status=='3' || status=='4' || status=='5'" class="new-add">
					<el-button type="primary" @click="sure">复制为库存调拨单</el-button>
				</div>

				<div v-if="this.status=='6' || this.status=='7' || this.status=='8'" class="new-add">
					<el-button type="primary" @click="sure">新增采购退货购单</el-button>
				</div>

				<div v-if="status=='11' || status=='10' || status=='12'" class="new-add">
					<el-button type="primary" @click="sure">复制为调拨单</el-button>
					<el-button type="primary" @click="sure">复制为配货退货单</el-button>
					<el-button type="primary" @click="sure">复制为采购单</el-button>
				</div>

				<div v-if="status=='11' ">	
					<el-button type="primary" @click="sure" class="new-add">复制为生产单</el-button>
				</div>

				<div v-if="status=='5'">	
					<el-button type="primary" @click="sure" class="new-add">复制为生产入库单</el-button>
				</div>

				<div v-if="status=='9' ||  status=='13'">	
					<el-button type="primary" @click="sure" class="new-add">发送物流短信提醒</el-button>
					<el-button type="primary" @click="sure" class="new-add">邮件</el-button>
				</div>
			</div>
		</div>

		<el-form ref="form" :model="form" class="order-detail" :rules="rules">
			<div class="box-card">
				<div class="top">

					<el-col :span="5">
						<h5 class="label" v-if="order =='1'">新建采购单</h5>
						<h5 class="label" v-if="order=='2'">新建采购退货单</h5>
						<h5 class="label" v-if="order=='3'">新建配货单</h5>
						<h5 class="label" v-if="order=='4'">新建配货退货单</h5>
						<h5 class="label" v-if="order=='5'">新建智能补货单</h5>
						<h5 class="label" v-if="order=='6'">新建库存调拨单</h5>
						<h5 class="label" v-if="order=='7'">新建库存盘点单</h5>
						<h5 class="label" v-if="order=='8'">新建生产入库单</h5>
						<h5 class="label" v-if="status=='5'">采购单 — 草稿</h5>
						<h5 class="label" v-if="status=='1'">采购单 — 待入库 — 详情</h5>
						<h5 class="label" v-if="status=='2'">采购单 — 部分入库 — 详情</h5>
						<h5 class="label" v-if="status=='3'">采购单 — 撤销 — 详情</h5>
						<h5 class="label" v-if="status=='4'">采购单 — 已采购 — 详情</h5>
						<h5 class="label" v-if="status=='8'">采购退货 — 已退货 — 详情</h5>
						<h5 class="label" v-if="status=='6'">采购退货 — 已撤销 — 详情</h5>
						<h5 class="label" v-if="status=='7'">采购退货 — 草稿</h5>
						<h5 class="label" v-if="status=='9'">配货单 — 待出库 — 详情</h5>
						<h5 class="label" v-if="status=='10'">配货单 — 已撤销 — 详情</h5>
						<h5 class="label" v-if="status=='11'">配货单 — 草稿</h5>
						<h5 class="label" v-if="status=='13'">配货单 — 部分出库 — 详情</h5>
						<h5 class="label" v-if="status=='14'">配货退货单 — 已退货 — 详情</h5>
						<h5 class="label" v-if="status=='15'">配货退货单 — 已撤销 — 详情</h5>
						<h5 class="label" v-if="status=='16'">配货退货单 — 草稿</h5>
						<h5 class="label" v-if="status=='17'">生产入库单 — 已入库-详情</h5>
						<h5 class="label" v-if="status=='18'">生产入库单 — 待入库-详情</h5>
						<h5 class="label" v-if="status=='19'">生产入库单 — 已撤销-详情</h5>
						<h5 class="label" v-if="status=='20'">生产入库单 — 草稿</h5>
						<h5 class="label" v-if="status=='21'">库存盘点单 — 已盘点 — 详情</h5>
						<h5 class="label" v-if="status=='22'">库存盘点单 — 已撤销 — 详情</h5>
						<h5 class="label" v-if="status=='23'">库存盘点单 — 草稿</h5>
						<h5 class="label" v-if="status=='24'">库存调拨单 — 已调拨 — 详情</h5>
						<h5 class="label" v-if="status=='25'">库存调拨单 — 已撤销 — 详情</h5>
						<h5 class="label" v-if="status=='26'">库存调拨单 — 草稿</h5>
						<h5 class="label" v-if="status=='27'">出库单 — 待出库 — 详情</h5>
						<h5 class="label" v-if="status=='28'">出库单 — 部分出库 — 详情</h5>
						<h5 class="label" v-if="status=='29'">出库单 — 已撤销 — 详情</h5>
						<h5 class="label" v-if="status=='30'">出库单 — 已出库 — 详情</h5>
						<h5 class="label" v-if="status=='31'">出库单 — 已经撤销 — 详情</h5>
						<h5 class="label" v-if="status=='32'">入库单 — 待入库 — 详情</h5>
						<h5 class="label" v-if="status=='33'">入库单 — 部分入库 — 详情</h5>
						<h5 class="label" v-if="status=='34'">入库单 — 已撤销 — 详情</h5>
						<h5 class="label" v-if="status=='35'">入库单 — 已入库 — 详情</h5>
						<h5 class="label" v-if="status=='36'">入库单 — 已撤销 — 详情</h5>
						<h5 class="label" v-if="this.order==''">新建调拨单</h5>
					</el-col>
					<el-col :span="6">
						<div class="info" v-if="status=='0' || order =='1' || order =='2' || order =='5' || status=='5' || status=='1' || status=='2' || status=='3' || status=='4' || status=='13' || status=='6' || status=='7' || status=='8'">
							<h6>尚欠供应商款 : &nbsp;¥{{ this.newArrear }}</h6>
						</div>
					</el-col>
				</div>
				<!-- 采购订单 退货详情  -->
				<template v-if="status=='1' || status=='2' || status=='3' || status=='4' || status=='6' || status=='6' || this.status=='8'">
					<el-row class="search-form-input">
						<el-col :span="6">
							<el-form-item label="供应商 :" label-width="62px">
								<span> {{ form.supplier_name }}</span>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="仓库 :" label-width="48px">
								<span> {{ form.warehouse_name }}</span>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="结算账户 :" label-width="76px">
								<span> {{ form.set_account_name }}</span>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="实付金额 :" label-width="76px">
								<span> {{ form.payment }} </span>
							</el-form-item>
						</el-col>
					</el-row>			
					<el-row class="search-form-input"> 
						<el-col :span="6">
							<el-form-item label="日期 :" label-width="62px"> 
								<span> {{ form.create_time }} </span>
							</el-form-item>
						</el-col>

						<el-col :span="6">
							<el-form-item label="备注 :" label-width="48px">
								<span> {{ form.des }} </span>
							</el-form-item>
						</el-col>
					</el-row>
				</template>

				<template v-if="status=='27' || status=='28' || status=='29' || status=='30' || status=='31' || status=='32' || status=='33' || status=='34' || status=='35' || status=='36'">
					<el-row class="search-form-input">
						<el-col :span="6" v-if="status=='27' || status=='28' || status=='29' || status=='30' || status=='31'">
							<el-form-item label="客户 :" label-width="62px">
								<span> {{ form.kid_name }}</span>
							</el-form-item>
						</el-col>
						<el-col :span="6" v-show="status=='32' || status=='33' || status=='34' || status=='35' || status=='36'">
							<el-form-item label="供应商 :" label-width="62px">
								<span> {{ form.supplier_name }}</span>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="仓库 :" label-width="76px">
								<span> {{ form.warehouse_name }}</span>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="联系人 :" label-width="90px">
								<span> {{ form.maker_name }}</span>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="联系方式 :" label-width="76px">
								<span> {{ form.maker_phone }} </span>
							</el-form-item>
						</el-col>
					</el-row>			
					<el-row class="search-form-input"> 
						<el-col :span="6">
							<el-form-item label="日期 :" label-width="62px"> 
								<span>{{ form.create_time }}</span>
							</el-form-item>
						</el-col>

						<el-col :span="6">
							<el-form-item label="发货方式 :" label-width="76px">
								<span> {{ form.mode_name }} </span>
							</el-form-item>
						</el-col>		
						<el-col :span="6">
							<el-form-item label="备注 :" label-width="76px">
								<span> {{ form.des }} </span>
							</el-form-item>
						</el-col>
					</el-row>
				</template>


				<!-- 微商城订单详情 -->
				<template v-if="status=='37' || status=='38' || status=='39' || status=='40' || status=='41' || status=='42'">
					<el-row class="search-form-input">
						<el-col :span="6">
							<el-form-item label="会员 :" prop="member_name" label-width="65px">
								<span>{{ form.member_name }}</span>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="手机 :" prop="member_phone" label-width="75px">
								<span>{{ form.member_phone }}</span>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="时间 :" prop="create_date" label-width="130px">
								<span>{{ form.create_date }}</span>
							</el-form-item>			
						</el-col>
						<el-col :span="6">
							<el-form-item label="付款方式 :" prop="payment_name">
								<span>{{ form.payment_name }}</span>
							</el-form-item>
						</el-col>
					</el-row>		

					<el-row class="search-form-input">				
						<el-col :span="6">
							<el-form-item label="已收款 :" prop="pay_money" label-width="65px">
								<span>{{ form.pay_money }}</span>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="配货方式 :" prop="delivery_name">
								<span>{{ form.delivery_name }}</span>
							</el-form-item>			
						</el-col>
						<el-col :span="6" v-if="status=='37'">
							<el-form-item label="关联至进销存客户 :" prop="Supplier">
								<el-select v-model="form.keeper_name" filterable placeholder="请输入会员、手机号"	@change="selsectRelation">
									<el-option
										v-for="item in clientList"
										:key="item.id" 
										:label="item.name"
										:value="item.id"
									></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6" v-if="status=='38' || status=='39' || status=='40' || status=='41' || status=='42'">
							<el-form-item label="关联至进销存客户 :" prop="delivery_name">
								<span>{{ form.keeper_name }}</span>
							</el-form-item>			
						</el-col>
						<el-col :span="6">
							<el-form-item label="留言 :" prop="remark" label-width="78px">
								<span>{{ form.remark }}</span>
							</el-form-item>			
						</el-col>
					</el-row>
				</template>





				<!-- 配货订单详情 -->
				<template v-if="status=='9' || status=='10' || status=='12' || status=='13' || status=='14' || status=='15'">
					<el-row class="search-form-input">
						<el-col :span="6">
							<el-form-item label="仓库 :" prop="Supplier">
								<span>{{ form.warehouse_name }}</span>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="门店 :" prop="Supplier" label-width="75px">
								<span>{{ form.store_name }}</span>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="仓管员 :" prop="Supplier">
								<span>{{ form.keeper_name }}</span>
							</el-form-item>
						</el-col>
					</el-row>								
					<el-row class="search-form-input">
						<el-col :span="6">
							<el-form-item label="日期 :" prop="Supplier">
								<span>{{ form.create_time }}</span>
							</el-form-item>
						</el-col>					
						<el-col :span="6">
							<el-form-item label="备注 :" prop="Supplier" label-width="65px">
								<span>{{ form.des }}</span>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="发货方式 :" prop="Supplier">
								<span>{{ form.mode }}</span>
								
								<span class="detail" @click="styleDetail" v-show="this.mode !=='自提'">发货方式详情</span>
							</el-form-item>			
						</el-col>
					</el-row>
				</template>
				<template v-if="status=='21' || status=='22'">
					<el-row class="search-form-input">
						<el-col :span="6">
							<el-form-item label="仓库 :" prop="Supplier" label-width="75px">
								<span>{{ form.warehouse_name }}</span>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="盘点人 :" prop="Supplier" label-width="80px">
								<span>{{ form.store_name }}</span>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="备注 :" prop="Supplier" label-width="90px">
								<span>{{ form.des }}</span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row class="search-form-input">
						<el-col :span="6">
							<el-form-item label="盘点总数 :" prop="Supplier">
								<span>{{ form.num }}</span>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="盈亏总数 :" prop="Supplier" label-width="76px">
								<span>{{ form.loss_num }}</span>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="盈亏总金额 :" prop="Supplier">
								<span>{{ form.loss_price }}</span>
							</el-form-item>
						</el-col>
						<el-button class="build-botton" type="primary" @click="getDetail">盘点明细</el-button>
						<dialog-inventory-datil  ref="inventoryDatil" @refresh="init"></dialog-inventory-datil>
					</el-row>
				</template>

				<!-- 新增 采购单  采购退货单-->
				<template v-if="status=='0' || order=='1' || order=='2' || order=='5' || status=='5' || this.status=='7'">
					<el-row class="search-form-input">
						<el-form-item label="供应商 :" prop="supplier" label-width="72px">
							<el-select v-model="form.supplier" placeholder="请选择" @change="selectSupplier">
								<el-option
									v-for="item in supplierList"
									:key="item.id"
									:label="item.name"
									:value="item.id"
								></el-option>
							</el-select>
						</el-form-item>

						<el-form-item label="仓库 :" prop="warehouse" label-width="120px">
							<el-select v-model="form.warehouse" placeholder="请选择">
								<el-option
									v-for="item in warehouseList"
									:key="item.id"
									:label="item.name"
									:value="item.id"
								></el-option>
							</el-select>
						</el-form-item>

						<el-form-item label="结算账户 :" prop="set_account" label-width="145px">
							<el-select v-model="form.set_account" placeholder="请选择">
								<el-option
									v-for="item in acountList"
									:key="item.id"
									:label="item.name"
									:value="item.id"
								></el-option>
							</el-select>
						</el-form-item>

						<el-form-item label="实付金额 :" prop="payment" label-width="145px">
							<el-input v-model="form.payment"  placeholder="请输入"></el-input>
						</el-form-item>
					</el-row>

					<el-row class="search-form-input"> 
						<el-form-item label="日期 :" prop="create_time" label-width="72px"> 
							<el-date-picker 
								v-model="form.create_time" 
								type="date" 
								placeholder="请选择日期" 
								value-format="yyyy-MM-dd">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="备注 :" prop="des" label-width="120px">
							<el-input v-model="form.des"  placeholder="请输入"></el-input>
						</el-form-item>
					</el-row>
				</template>
		
				<template v-if="order=='3' || order=='4' || status=='11' || status=='16'">
					<el-row class="search-form-input">
						<el-form-item label="仓库 :" prop="warehouse" label-width="58px">
							<el-select v-model="form.warehouse" placeholder="请选择">
								<el-option
									v-for="item in warehouseList"
									:key="item.id"
									:label="item.name"
									:value="item.id"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="门店 :" prop="store" label-width="156px">
							<el-select v-model="form.store" placeholder="请选择">
								<el-option
									v-for="item in storeList"
									:key="item.id"
									:label="item.name"
									:value="item.id"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="仓管员 :" prop="keeper" label-width="142px">
							<el-select v-model="form.keeper" placeholder="请选择">
								<el-option
									v-for="item in KeeperList"
									:key="item.id"
									:label="item.name"
									:value="item.id"
								></el-option>
							</el-select>
						</el-form-item>
					</el-row>

					<el-row class="search-form-input"> 
						<el-form-item label="日期 :" prop="create_time" label-width="58px"> 
							<el-date-picker 
								v-model="form.create_time" 
								type="date" 
								placeholder="请选择日期" 
								value-format="yyyy-MM-dd">
							</el-date-picker>
						</el-form-item>
						
						<el-form-item label="备注 :" prop="des" label-width="156px">
							<el-input v-model="form.des"  placeholder="请输入"></el-input>
						</el-form-item>

						<el-form-item label="发货方式 :" prop="mode" label-width="142px" v-if="order=='3' || order=='4'">
							<el-select v-model="form.mode" placeholder="请选择" @change="selectMode">
								<el-option
									v-for="item in modeList"
									:key="item.id"
									:label="item.name"
									:value="item.name"
								></el-option>
							</el-select>
						</el-form-item>	

						<el-form-item label="发货方式 :" prop="mode" label-width="142px" v-else>
							<el-select v-model="form.mode" placeholder="请选择" @change="selectMode">
								<el-option
									v-for="item in modeList"
									:key="item.id"
									:label="item.name"
									:value="item.name"
								></el-option>
							</el-select>
							<span v-show="this.mode !=='自提'" class="detail" @click="lookDetail('draft')">发货方式详情</span>
						</el-form-item>	
					</el-row>
				</template>

				<template v-if="order=='6' || order=='17' || order=='18' || order=='19' || status=='26'">
					<el-row class="search-form-input">
						<el-form-item label="调出仓库 :" prop="call_out" label-width="86px">
							<el-select v-model="form.call_out" placeholder="请选择">
								<el-option
									v-for="item in warehouseList"
									:key="item.id"
									:label="item.name"
									:value="item.id"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="调入仓库 :" prop="call_in" label-width="136px">
							<el-select v-model="form.call_in" placeholder="请选择">
								<el-option
									v-for="item in warehouseList"
									:key="item.id"
									:label="item.name"
									:value="item.id"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item  label="日期 :" prop="create_time" label-width="118px"> 
							<el-date-picker 
								v-model="form.create_time" 
								type="date" 
								placeholder="请选择日期" 
								value-format="yyyy-MM-dd">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="备注 :" prop="des" label-width="118px">
							<el-input v-model="form.des"  placeholder="请输入"></el-input>
						</el-form-item>
					</el-row>
				</template>

				<template v-if="order == 7 || status == '23'">
					<el-row class="search-form-input">
						<el-form-item label="仓库 :" prop="warehouse" label-width="58px">
							<el-select v-model="form.warehouse" placeholder="请选择">
								<el-option
									v-for="item in warehouseList"
									:key="item.id"
									:label="item.name"
									:value="item.id"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="盘点人 :" prop="maker" label-width="142px">
							<el-select v-model="form.maker" placeholder="请选择">
								<el-option
									v-for="item in MakerList"
									:key="item.id"
									:label="item.name"
									:value="item.id"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="备注 :" prop="des" label-width="142px">
							<el-input v-model="form.des"  placeholder="单行输入"></el-input>
						</el-form-item>
					</el-row>
				</template>

				<template v-if="order == '8' || status =='20'">
					<el-row class="search-form-input">
						<el-form-item label="入库仓库 :" prop="warehouse" label-width="86px">
							<el-select v-model="form.warehouse" placeholder="请选择">
								<el-option
									v-for="item in warehouseList"
									:key="item.id"
									:label="item.name"
									:value="item.id"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="仓管员 :" prop="keeper" label-width="142px">
							<el-select v-model="form.keeper" placeholder="请选择">
								<el-option
									v-for="item in KeeperList"
									:key="item.id"
									:label="item.name"
									:value="item.id"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="日期 :" prop="create_time" label-width="128px"> 
							<el-date-picker 
								v-model="form.create_time" 
								type="date" 
								placeholder="请选择日期" 
								value-format="yyyy-MM-dd">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="备注 :" prop="des" label-width="128px">
							<el-input v-model="form.des"  placeholder="单行输入"></el-input>
						</el-form-item>
					</el-row>
				</template>

				<template v-if="status=='17' || status=='18' || status=='19'">
					<el-row class="search-form-input">
						<el-col :span="6">
							<el-form-item label="入库仓库 :" label-width="76px">
								<span> {{ form.warehouse_name }}</span>
							</el-form-item>
						</el-col>

						<el-col :span="6">
							<el-form-item label="仓管员 :" label-width="62px">
								<span> {{ form.keeper_name }}</span>
							</el-form-item>
						</el-col>

						<el-col :span="6">
							<el-form-item label="日期 :" label-width="48px">
								<span> {{ form.create_time }}</span>
							</el-form-item>
						</el-col>

						<el-col :span="6">
							<el-form-item label="备注 :" label-width="48px">
								<span> {{ form.des }} </span>
							</el-form-item>
						</el-col>
					</el-row>
				</template>

				<template v-if="status=='24' || status=='25'">
					<el-row class="search-form-input">
						<el-col :span="5">
							<el-form-item label="调出仓库 :" label-width="76px">
								<span> {{ form.call_out_name }}</span>
							</el-form-item>
						</el-col>

						<el-col :span="5">
							<el-form-item label="调入仓库 :" label-width="76px">
								<span> {{ form.call_in_name }}</span>
							</el-form-item>
						</el-col>

						<el-col :span="5">
							<el-form-item label="日期 :" label-width="48px">
								<span> {{ form.create_time }}</span>
							</el-form-item>
						</el-col>

						<el-col :span="5">
							<el-form-item label="备注 :" label-width="48px">
								<span> {{ form.des }} </span>
							</el-form-item>
						</el-col>
					</el-row>
				</template>
			</div>

			<div :class="  status == '10' ? 'box-card-message' : 'box-card'  " style="height: auto;">
				<dialogSelectGoods
					ref="cmpCollectDetailTable" 
					class="mb-30"
					@goods="getGoods"
					@tableData="UpdatetableData"
					:tableData="tableData"
					@getTotal="getTotals"
					:storeGood="storeGood"
				></dialogSelectGoods>


				<!-- 采购单 新建采购单 -->
					<div v-if="isFlagp">
					<el-row class="search-form-input">
						<el-form-item label="其他账目类型 :" prop="type" label-width="115px">
							<el-select v-model="form.type" placeholder="请选择">
								<el-option
									v-for="item in accountList"
									:key="item.id"
									:label="item.name"
									:value="item.id"
								></el-option>
							</el-select>
						</el-form-item>
			
						<el-form-item label="费用金额 :" prop="money" label-width="156px">
							<el-input v-model.number="form.money"  placeholder="单行输入"></el-input>
						</el-form-item>

						<el-form-item label="抹零 :" prop="small" label-width="140px">
							<el-input v-model.number="form.small"  placeholder="单行输入" @input="changeInput"></el-input>
						</el-form-item>
					</el-row>
					<div class="all">
						<p>
							总合计 :
							<span style="color:#FC2D1F; margin-left: 20px">￥{{ newData }}</span>
						</p>
					</div>	
				</div>


				<div v-if="isFlag">
					<el-row class="search-form-input">
						<el-form-item label="其他账目类型 :" label-width="115px">
							<el-select v-model="form.type" placeholder="请选择">
								<el-option
									v-for="item in accountList"
									:key="item.id"
									:label="item.name"
									:value="item.id"
								></el-option>
							</el-select>
						</el-form-item>
			
						<el-form-item label="费用金额 :" label-width="156px">
							<el-input v-model.number="form.money"  placeholder="单行输入"></el-input>
						</el-form-item>

						<el-form-item label="抹零 :" label-width="140px">
							<el-input v-model.number="form.small"  placeholder="单行输入" @input="changeInput"></el-input>
						</el-form-item>
					</el-row>
					<div class="all">
						<p>
							总合计 :
							<span style="color:#FC2D1F; margin-left: 20px">￥{{ newData }}</span>
						</p>
					</div>	
				</div>

				
				
				<!-- 采购单 部分入库 草稿 详情-->
				<div v-if="status=='1' || status=='2' || status=='3' || status=='4' || order =='5' || status=='27' || status=='28' || status=='29' || status=='30' || status=='31'">
					<el-row class="search-form-input">
						<el-col :span="6">
							<el-form-item label="账目类型 :">
								<span>{{ form.account_type_name }}</span>
							</el-form-item>
						</el-col>

						<el-col :span="6">
							<el-form-item label="费用金额 :">
								<span>{{ form.money }}</span>
							</el-form-item>
						</el-col>

						<el-col :span="6" v-if="status=='1' || status=='2' || status=='3' || status=='4' || order =='5'">
							<el-form-item label="抹零">
								<span>{{ form.small }}</span>
							</el-form-item>
						</el-col>
					</el-row>
					<div class="all" v-if="status=='1' || status=='2' || status=='3' || status=='4' || order =='5'">
						<p>
							总合计 :
							<span style="color:#FC2D1F; margin-left: 10px"> ¥{{ form.total }} </span>
						</p>
					</div>
				</div>

				<div v-if="this.status == '37' || this.status == '38' || this.status == '39' || this.status == '40' || this.status == '41' || this.status == '42'">
					<el-form-item label="运费 :" class="search-form-input" v-if="this.status == '37'">
						<el-input v-model.number="form.fare"  placeholder="单行输入"></el-input>
					</el-form-item>

					<el-form-item label="运费 :" v-if="this.status == '38' || this.status == '39' || this.status == '40' || this.status == '41' || this.status == '42'">
						<span>{{ form.fare }}</span>
					</el-form-item>
					<p>
							总合计 :
							<span style="color:#FC2D1F; margin-left: 10px"> ¥{{ form.money }} </span>
						</p>
				</div>

				<div v-if="order=='1' || order=='3' || order=='4' || order =='5' || status=='1' || status=='2' || status=='3' || status=='4' || status=='5' || status=='9' || status=='10' || status=='11' || status=='12' || status=='13' || status=='14' || status=='15'|| status=='16'">
					<h5 class="label">附图</h5>
					<commonUpload :limit='3' ref='comUpload' :imagesList="form.images" :pictureType="picture"></commonUpload>
				</div>
				

				<div class="botton-bottom">
					<el-button class="order-botton" type="primary" @click="purchase('form', '5', status, 'newadd', order, type)" v-if="status=='0' || status=='5' || status=='11'">保存草稿</el-button>
					<el-button class="order-botton" type="primary" @click="saveDraft('form', '3')" v-if="order =='2' || status == '7'">保存草稿</el-button>
					<el-button class="order-botton" type="primary" @click="saveDraftImg('form', '3')" v-if="order =='3' || order =='4'">保存草稿</el-button>
					<el-button class="order-botton" type="primary" @click="saveDraftImg('form', '4')" v-if="order =='3'">配货</el-button>
					<el-button class="order-botton" type="primary" @click="saveDraftImg('form', '4')" v-if="order =='4'">退货</el-button>
					<el-button class="order-botton" type="primary" @click="turnSale" v-if="status == '38'">转销售单</el-button>
					<el-button class="order-botton" type="primary" @click="revoke(type)" v-if="status=='1' || status=='4' || status=='8' || status=='9' || status=='12' || status=='14' || status=='17' || status == '18' || status == '21' || status == '24' || status=='30' || status=='35' || status=='38'">撤销</el-button>
					<el-button class="order-botton" type="primary" @click="goEntered" v-if="status=='27' || status=='28'">出库</el-button>
					<el-button class="order-botton" type="primary" @click="jumpTo" v-if="status=='1' || status=='2'">去入库</el-button>
					<el-button class="order-botton" type="primary" @click="jumpTo" v-if="status =='9' || status == '13'">去出库</el-button>
					<el-button class="order-botton" type="primary" @click="goEnter" v-if="status=='9' || status=='13'">全部出库</el-button>
					<el-button class="order-botton" type="primary" @click="allEnter" v-if="status=='1' || status=='2'">全部入库</el-button>
		
					<el-button class="order-botton" type="primary" @click="purchase('form', '1', status, 'draft', )" v-if="status=='5'">采购</el-button>
					<el-button class="order-botton" type="primary" @click="purchaseOrder('form', '5', status)" v-if="order =='1' || order =='5'  || status=='16'">保存草稿</el-button>
					<el-button class="order-botton" type="primary" @click="purchaseOrder('form', '1')" v-if="order =='1' || order =='5'">采购</el-button>
					
					
					<el-button class="order-botton" type="primary" @click="saveDraft('form', '1')" v-if="order =='2' || status=='7'">退货</el-button>
					<el-button class="order-botton" type="primary" @click="checkPrice" v-if="status == '37'">改价</el-button>
					<el-button class="order-botton" type="primary" @click="allocation('form', '2')" v-if="order =='6' || status =='26'">调拨</el-button>
					<el-button class="order-botton" type="primary" @click="allocation('form', '1')" v-if="order =='6' || status =='26'">保存草稿</el-button>
					<el-button class="order-botton" type="primary" @click="InventoryAdd('form', '3')" v-if="order =='7' || order == '8' || status == '20' || status == '23'">保存草稿</el-button>
					<el-button class="order-botton" type="primary" @click="InventoryAdd('form', '4')" v-if="order =='8' || status == '18' || status == '20' || status == '32' || status == '33'">入库</el-button>
					<el-button class="order-botton" type="primary" @click="InventoryAdd('form', '1')" v-if="order =='7' || status == '23'">盘点</el-button>
					<el-button class="order-botton" type="primary" @click="sale" v-if="status=='11' || status=='16'">出售</el-button>
					<el-button class="order-botton" type="primary" @click="deleteOrder" v-if="status=='5' || status=='7' || status=='11' || status=='16' || status == '20' || status == '23' || status =='26'">删除</el-button>
				</div>
				<img :src="require('@/assets/images/chexiao.png')" alt v-if="status =='3' || status =='6' || status=='10' || status=='15' || status=='19' || status=='22' || status=='29' || status=='34' || status=='36'" :class="{'imageRevoke': status=='10', 'image': status =='3' || status =='6' || status=='19' || status=='22', 'imageReturn': status=='15' || status =='25' || status=='29' || status=='31' || status=='34' || status=='36'|| status=='34'}"/>
			</div>
		</el-form>
		<dialog-delivery-mode ref="dialogDeliveryMode"  @refresh="init"></dialog-delivery-mode>
		<dialog-delivery-detail ref="dialogDeliveryDetail"  @refresh="init"></dialog-delivery-detail>
  </div>
</template>

<script>
import {goodsOne} from "@/api/index"
import http from "@/utils/request"
import { enumSaleStatus } from "@/utils/enums"
import { validate } from "@/utils/validate"
import Region from "@/components/Region"
import selectDdate from "@/components/select-date"
import dialogDeliveryMode from "@/views/distribution/dialog-delivery-mode"
import dialogDeliveryDetail from "@/views/distribution/dialog-delivery-detail"
import dialogAddCommodity from "@/components/dialog-add-commodity"
import dialogSelectGoods from "@/components/dialog-select-goods"
import commonUpload from "@/components/common-upload"
import dialogInventoryDatil from "../warehouse/dialog-inventory-datil"
import {
  supplierSelectList,
  warehouseSelectList,
	purchaseList,
	setAcountList,
	acountSelectList,
	purchaseAdd,
	purchaseDetail,
	purchaseRevoke,
	purchaseAllDepot,
	purchaseDel,
	getDraft,
	getPutStock,
	// purchaseDepot,
	ReturnDetail,
	ReturnRevoke,
	ReturnDraft,
	ReturnDepot,
	ReturnAdd,
	ReturnDel,
	storeList,
	KeeperList,
	PrepareAdd,
	PrepareBuild,
	returnGoods,
	DistributionRevoke,
	DistributionDel,
	DistributionSale,
	PrepareOrderDetail,
	allReturn,
	PrepareOrderRevoke,
	PrepareOrderDelet,
	PrepareOrderDraft,
	PrepareOrderSale,
	PrepareReturnDraft,
	AllotAdd,
	Allot,
	MakerList,
	InventorySave,
	productionAdd,
	productionDetail,
	productionRevoke,
	productionDraft,
	productionDepot,
	productionDel,
	InventoryDetail,
	InventoryRevoke,
	getInventoryDraft,
	AllotDetail,
	AllotRevoke,
	AllotDraft,
	AllotDel,
	OutStockDetail,
	OutStockDepot,
	StorageDetail,
	StorageDepot,
	returnOrder,
	InventoryDel,
	getInventory,
	orderInfo,
	clientList,
	memberRelation,
	OrderRevision,
	OrderTurn,
	orderRevoke
} from "@/api/api.js"
export default {
  components: {
		Region,
		commonUpload,
		dialogAddCommodity,
		dialogSelectGoods,
		dialogInventoryDatil,
		dialogDeliveryMode,
		dialogDeliveryDetail
	},

watch: {
	$route(){
		this.status = this.$route.query.status
	}
},
data() {
		let validateReceiptNumber = (rule, value, callback) => {
      if (!validate(value, 'numDecimal')) {
        return callback(new Error('必须为数字且保留两位小数'))
      } else {
        callback()
      }
    }
    return {
			number: "", // 单号
			value: 0,
			newArrear: "0.00", // 商欠供应商款
			goodtotal: 0,
			goods: [],
			clientList: [],
			picture: "picture-card",
			images: "", // 详情图片回显
			// 新建  1采购 2采购退货  3配货  4配货退货  5智能补货 6库存调拨单 7库存盘点单  8生产入库单
			order: this.$route.query.order,
			// 详情  采购订     1待入库  		2部分入库  		 3撤销  			4已采购  			5草稿 
			//       采购退货  	6已撤销  		7草稿      		8已退货  
			//       配货单					9 待出库 		 10已撤销  		11草稿  		 12已配货			 13 部分出库
			// 			 配货退货单     14已退货     15已撤销      16草稿
			//       生产入库单     17已入库     18待入库      19已撤销     20草稿
			//       库存盘点单     21已盘点     22已撤销      23草稿
			//       库存调拨单     24已调拨     25已撤销      26草稿
			//       待出库单       27 待出库    28 部分出库   29 已撤销
			// 			 已出库         30已出库     31已撤销
			//       待入库单       32待入库     33部分入库    34 已撤销
			// 			 已入库         35已入库     36已撤销
			//       商城订单       37待付款     38待确认      39待出货     40待收货     41已完成     42已撤销

			status: this.$route.query.status,
			id: this.$route.query.id,
			mallId: this.$route.query.sale_id,
			type: this.$route.query.type,
			supplierList: [],
			warehouseList: [],
			accountList: [], // 账目类型
			planState: [],
			acountList: [],
			storeList: [],
			KeeperList: [],
			makerList: [],
			MakerList: [],
			storeGood: [],
			modeList: [
				{id: 1, name: "自提"},
				{id: 2, name: "送车"},
				{id: 3, name: "送指定点"},
				{id: 4, name: "发物流"},
				{id: 5, name: "电子单面"},
			],
			form: {},
      dialogVisible: false,
			tableData: [],
			newData: "0.00", // 总合计
			sum: "0.00", // 折后金额合计
			rules: {
				supplier: [
					{ required: true, message: '必填', trigger: 'change' },
				],
				warehouse: [
					{ required: true, message: '必填', trigger: 'change' },
				],
				set_account: [
					{ required: true, message: '必填', trigger: 'change' },
				],
				store: [
					{ required: true, message: '必填', trigger: 'change' },
				],
				
				mode: [
					{ required: true, message: '必填', trigger: 'change' },
				],
				name: [
					{ required: true, message: '必填', trigger: 'change' },
				],
				keeper: [
					{ required: true, message: '必填', trigger: 'change' },
				],
				maker: [
					{ required: true, message: '必填', trigger: 'change' },
				],
				payment: [
					{ required: true, message: '必填', trigger: 'blur' },
					{ validator: validateReceiptNumber, trigger: 'blur' }
				],
				create_time: [
					{ required: true, message: '必填', trigger: 'change' },
				],
				des: [
					{ required: true, message: '必填', trigger: 'blur' },
				],
				type: [
					{ required: true, message: '必填', trigger: 'change' },
				],
				call_out: [
					{ required: true, message: '必填', trigger: 'change' },
				],
				call_in: [
					{ required: true, message: '必填', trigger: 'change' },
				],
				money: [
					{ required: true, message: '必填', trigger: 'blur' },
					{ validator: validateReceiptNumber, trigger: 'blur' }
				],
				small: [
					{ required: true, message: '必填', trigger: 'blur' },
					{ validator: validateReceiptNumber, trigger: 'blur' }
				],
			},
			firstArr: [{ id: null, name: '全部' }], // 下拉列表全部
			isFlag: false,
			isFlagp: false,
			mode: ""
		}
	},

	 mounted() {
    this.getSupplierDetail()
	},
	
	created() {
		this.getSelectValue()
		this.getTableData()
		this.trigger()
	},

  methods: { 
	  
	  print(row) {
	  let printStatus=""
	//   采购-采购订单
	  if(this.status=='1'||this.status=='2'||this.status=='3'||this.status=='4'||this.status=='5'){
		  printStatus="purchase"
	  }
	  //   采购-采购退货
	  if(this.status=='6'||this.status=='7'||this.status=='8'){
		  printStatus="purchase_retreat"
	  }
	//   配货--配货订单
	  if(this.status=='9'||this.status=='10'||this.status=='11'||this.status=='12'||this.status=='13'){
		  printStatus="cargo"
	  }
	    //  已出库
	  if(this.status=='30'||this.status=='31'){
		  printStatus="outstock_out"
	  }
	     //  已入库
	  if(this.status=='35'||this.status=='36'){
		  printStatus="outstock_in"
	  }
      this.$common.printPdf(printStatus,this.$route.query.id);
    },
		getTotals(sum, newData) {
			this.sum = sum 
			this.newData = newData
		},
		
		// 接受子组件穿过来的发货方式对象集合
		init(params) {
			// this.mode_address = params
			this.form.mode_address = params
		},

		changePublic(event) {
		},

		trigger() {
			if(this.order=='2') {
				this.isFlag = false
			} else if(this.order=='1' || this.status=='0' || this.status=='5') {
				this.isFlagp = true
			}
		},

		// 表单抹零
		changeInput() {
			if(this.form.small) {
				this.newData = this.sum - this.form.small
			} else {
				this.newData = this.sum
			}
		},

		// 盘点明细
		getDetail() {
			this.$refs.inventoryDatil.init()
		},

		// 选择发货方式
		selectMode(val) {
			this.$refs.dialogDeliveryMode.init(val, this.mode_address, 'add')
		},

		// 草稿状态下发货方式详情
		lookDetail(draft) {
			this.$refs.dialogDeliveryMode.showDetail(this.mode_address, this.mode, draft)
		},

		// 送车 /送指定点 /发物流 /电子单面 发货方式详情
		styleDetail() {
			this.$refs.dialogDeliveryDetail.styleDetail(this.mode_address, this.mode)
		},

		// 采购单 待入库 部分入库 = 仓库单 待入库 部分入库
		getCommonApi() {
			if(this.status == "1" || this.status == "2" || this.status == "3" || this.status == "4" || this.status == "5" || this.type =='88' || this.type =='99') {
				purchaseDetail(this.id).then(res => {
					if(res.code === 200) {
						this.form = res.list
						this.images = res.list.images
						this.tableData = res.list.goods
						this.number = res.list.number
						let goodId = [...new Set(res.list.goods.map(val => val.commodity_id))]; // 单品id
								
						this.getGoodTable(goodId).then(x => {
							let a = x;
							a.forEach(val => {
								res.list.goods.forEach(item => { // 表格商品详情
									if (val.commodity_id == item.commodity_id) {
										val.product_id = item.product_id; // 单品id
										(val.put_number = item.put_number), // 数量
										(val.price = item.price), //单价
										(val.discount = item.discount), //折扣
										(val.discount_price = item.discount_price); // 折后价 
										val.money = item.money; // 金额
										val.discount_money = item.discount_money; // 折扣金额
									}
								});
							});
							this.storeGood = a;
						});
					}
				})
				
		// 配货单 待出库 部分出库 = 仓库单 待出库 部分出库
			} else if(this.status == "9" || this.status == "10" || this.status == "11" || this.status == "12" || this.status == "13" || this.type == "77" || this.type =="66") {
				PrepareOrderDetail(this.id).then(res => {
					if(res.code === 200) {
						this.form = res.list
						this.mode = res.list.mode
						this.images = res.list.images
						this.tableData = res.list.goods
						this.number = res.list.number
						this.mode_address = res.list.mode_address
						let goodId = [...new Set(res.list.goods.map(val => val.commodity_id))];
						this.getGoodTable(goodId).then(x => {
							let a = x;
							a.forEach(val => {
								res.list.goods.forEach(item => {
									if (val.commodity_id == item.commodity_id) {
										val.product_id = item.product_id; // 单品id
										(val.put_number = item.put_number), // 数量
										(val.price = item.price), //单价			
										val.money = item.money; // 金额	
									}
								});
							});
							this.storeGood = a;
						});
					}
				})
			}
		},

		// goodId： 单据详情pid 
		async getgoodsOnes(goodId) {
			// 获取商品下的单品
			let res = await goodsOne(goodId)
			// 返回goodsOne接口数据结果
      return res.data
		},
		
		// goodId 商品id
		async getGoodTable(goodId) {
      let goodtable = []
			let goodtable2 = []
			// 通过商品id，调用goodsOne接口，查询该Id下面的所有单品，返回所有单品结合peomises
			let peomises = goodId.map(item => this.getgoodsOnes(item))

      for (const peomise of peomises) {
        const res = await peomise
				goodtable.push(res) // 单品数据集合
			}
      let goods = []
			goodtable.forEach(val => val.forEach(e => goods.push(e)));
      goods.forEach(item => {  // goods单品数据集合
        goodtable2.push({
          commodity_id: item.commodity_id, // 所选商品的商品id
				  product_id: item.product_id, // 单品id
          color: item.color,
          size: item.size,
          put_number: 0,
          price: item.purchase_price, //单价
          discount: 100, //折扣
          stock: item.stock ? item.stock : 0,
          unit: item.unit, //单位
          goods_code: item.goods_code, //条码
          item: item.item, //货号
          name: item.name, //商品名称
          discount_price: 0, //折后价
          money: 0, //金额
          discount_money: 0 //折扣金额
        })
      })
      return goodtable2
		},
		
		// 改价
		checkPrice() {
			// this.$common.confirm(
			// {
			// 	title: this.operate + this.title + "单",
			// 	content: "该" + this.title + "单 , " + "将被" + this.operate + " , 请谨慎操作"
			// },
			// () => {

			// })
			this.$common.confirm(
			{
				title: "订单改价",
				content: "该订单将被改价，请谨慎操作"
			},
			() => {
				OrderRevision({
					option: this.tableData
				}).then(res => {
					if (res.code === 200) {
						this.$message.success("订单改价成功")
					} else {
						this.$message.error(res.message)
					}
				})
			})
		},

		// 转销售单
		turnSale() {
			this.$common.confirm(
			{
				title: "转销售订单",
				content: "该订单将被转为销售订单，请谨慎操作"
			},
			() => {
				OrderTurn(this.id).then(res => {
					if (res.code === 200) {
						this.$message.success("转销售单成功")
						this.$router.push({ path: "/mall/order" })
					} else {
						this.$message.error(res.message)
					}
				})
			})
		},

		// 查看销售订单
		goBuild() {
			this.$router.push({
        path: "/sale/orderDetail",
        query: { type: "detail", id: this.mallId }
      });
		},

		getSupplierDetail() {
			// 采购订单
			if(this.status == "1" || this.status == "2" || this.status == "3" || this.status == "4" || this.status == "5" || this.type =='88' || this.type =='99') {
				this.getCommonApi()

			// 采购退货订单
			} else if(this.status == "6" || this.status == "7" || this.status == "8") {
				ReturnDetail(this.id).then(res => {
					if(res.code === 200) {
						this.form = res.list
						this.images = res.list.images
						this.tableData = res.list.goods
						this.number = res.list.number
						let goodId = [...new Set(res.list.goods.map(val => val.commodity_id))];
						this.getGoodTable(goodId).then(x => {
							
							let a = x;
							a.forEach(val => {
								res.list.goods.forEach(item => {
									if (val.commodity_id == item.commodity_id) {
										val.product_id = item.product_id; // 单品id
										(val.put_number = item.put_number), // 数量
										(val.price = item.price), //单价
										(val.discount = item.discount), //折扣
										(val.discount_price = item.discount_price); // 折后价 
										val.money = item.money; // 金额
										val.discount_money = item.discount_money; // 折扣金额
									}
								});
							});
							this.storeGood = a;
						});
					}
				})
				
			// 配货单详情
			} else if(this.status == "9" || this.status == "10" || this.status == "11" || this.status == "12" || this.status == "13" || this.type == "77" || this.type =="66") {
				this.getCommonApi()

				// 配货退货单
			} else if(this.status == "14" || this.status == "15" || this.status == "16") {
				returnGoods(this.id).then(res => {
					if(res.code === 200) {
						this.form = res.list
							this.mode = res.list.mode
						this.images = res.list.images
						this.tableData = res.list.goods
						this.number = res.list.number
						this.mode_address = res.list.mode_address
						let goodId = [...new Set(res.list.goods.map(val => val.commodity_id))];
						this.getGoodTable(goodId).then(x => {
							let a = x;
							a.forEach(val => {
								res.list.goods.forEach(item => {
									if (val.commodity_id == item.commodity_id) {
										val.product_id = item.product_id; // 单品id
										(val.put_number = item.put_number), // 数量
										(val.price = item.price), //单价			
										val.money = item.money; // 金额	
									}
								});
							});
							this.storeGood = a;
						});
					}
				})
			
			// 生产入库单详情
			} else if(this.status == "17" || this.status == "18" || this.status == "19" || this.status == "20") {
				productionDetail(this.id).then(res => {
					if(res.code === 200) {
						this.form = res.list
						this.tableData = res.list.goods
						this.number = res.list.number
						let goodId = [...new Set(res.list.goods.map(val => val.commodity_id))];
						this.getGoodTable(goodId).then(x => {
							let a = x;
							a.forEach(val => {
								res.list.goods.forEach(item => {
									if (val.commodity_id == item.commodity_id) {
										val.product_id = item.product_id; // 单品id
										(val.put_number = item.put_number); // 数量
									}
								});
							});
							this.storeGood = a;
						});
					}
				})

				// 盘点单详情
			} else if(this.status == "21" || this.status == "22" || this.status == "23") {
				InventoryDetail(this.id).then(res => {
					if(res.code === 200) {
						this.form = res.list
						this.tableData = res.list.goods
						this.number = res.list.number
						let goodId = [...new Set(res.list.goods.map(val => val.commodity_id))];
						this.getGoodTable(goodId).then(x => {
							let a = x;
							a.forEach(val => {
								res.list.goods.forEach(item => {
									if (val.commodity_id == item.commodity_id) {
										val.product_id = item.product_id; // 单品id
										(val.put_number = item.put_number); // 数量
									}
								});
							});
							this.storeGood = a;
						});
					}
				})

				// 库房调拨单详情
			} else if(this.status == "24" || this.status == "25" || this.status == "26") {
				AllotDetail(this.id).then(res => {
					if(res.code === 200) {
						this.form = res.list
						this.tableData = res.list.goods
						this.number = res.list.number
						let goodId = [...new Set(res.list.goods.map(val => val.commodity_id))];
						this.getGoodTable(goodId).then(x => {
							let a = x;
							a.forEach(val => {
								res.list.goods.forEach(item => {
									if (val.commodity_id == item.commodity_id) {
										val.product_id = item.product_id; // 单品id
										(val.put_number = item.put_number); // 数量
									}
								});
							});
							this.storeGood = a;
						});
					} else {
						this.$message.error(res.message)
					}
				})

			// 出库单详情
			} else if(this.status == "27" || this.status == "28" || this.status == "29" || this.status == "30" || this.status == "31") {
				OutStockDetail(this.id).then(res => {
					if(res.code === 200) {
						this.form = res.list
						this.tableData = res.list.goods
						this.number = res.list.number
					} else {
						this.$message.error(res.message)
					}
				})

				// 入库单详情
			} else if(this.status == "32" || this.status == "33" || this.status == "34" || this.status == "35" || this.status == "36") {
				StorageDetail(this.id).then(res => {
					if(res.code === 200) {
						this.form = res.list
						this.tableData = res.list.goods
						this.number = res.list.number
					} else {
						this.$message.error(res.message)
					}
				})
				// 智能补货 补货详情
			} else if(this.order == "5") {
				purchaseDetail(this.id).then(res => {
					if(res.code === 200) {
						this.form = res.list
						this.tableData = res.list.goods
						this.number = res.list.number
					} else {
						this.$message.error(res.message)
					}
				})
				// 商城订单详情
			} else if(this.status == "37" || this.status == "38" || this.status == "39" || this.status == "40" || this.status == "41" || this.status == "42") {
				orderInfo(this.id).then(res => {
					if(res.code === 200) {
						this.form = res.data
						this.tableData = res.data.goods
						this.number = res.data.order_num
						this.member = res.data.member
					} else {
						this.$message.error(res.message)
					}
				})

				clientList().then(res => {
					if(res.code === 200) {
						this.clientList = res.data.data
					} else {
						this.$message.error(res.message)
					}
				})

			}
		},
		
		// 获取供应商对应欠款
		selectSupplier(val) {
			this.supplierList.forEach((item) => {
				if(item.id === val) {
					this.newArrear = item.arrear
				}
			})
		},

		// 获取表格数据
		getTableData() {
			this.tableData = JSON.parse(sessionStorage.getItem("good"))
		},

		// 获取下拉值
    getSelectValue() {
      // 查询供应商下拉列表
      supplierSelectList().then(res => {
        if (res.code === 200) {
					this.supplierList = this.firstArr.concat(res.data)
        } else {
					this.$message.error(res.message)
				}
      })

      // 查询仓库下拉列表  /调出仓库  /调入仓库
      warehouseSelectList().then(res => {
        if (res.code === 200) {
					this.warehouseList = this.firstArr.concat(res.data)
        } else {
					this.$message.error(res.message)
				}
			})
			
			// 结算账户下拉列表
      setAcountList().then(res => {
        if (res.code === 200) {
					this.acountList = this.firstArr.concat(res.data)
        } else {
					this.$message.error(res.message)
				}
			})

			// 结算账户下拉列表
      acountSelectList().then(res => {
        if (res.code === 200) {
					this.accountList = this.firstArr.concat(res.data)
        } else {
					this.$message.error(res.message)
				}
			})

			// 门店下拉列表
      storeList().then(res => {
        if (res.code === 200) {
					this.storeList = this.firstArr.concat(res.data)
        } else {
					this.$message.error(res.message)
				}
			})

			// 仓管员下拉列表
      KeeperList().then(res => {
        if (res.code === 200) {
					this.KeeperList = this.firstArr.concat(res.data)
        } else {
					this.$message.error(res.message)
				}
			})

			// 盘点人下拉列表
      MakerList().then(res => {
        if (res.code === 200) {
					this.MakerList = this.firstArr.concat(res.data)
        } else {
					this.$message.error(res.message)
				}
			})
		},

		// 表格失去焦点触发
		checkNum(item) {
			item.discount_price = (Number(item.price) * Number(item.discount)) / 100
      item.money = Number(item.price) * Number(item.put_number)
			item.discount_money = (Number(item.discount) * Number(item.put_number)) / 100
			
			let goods = this.$store.state.good
			goods.forEach(val => {
        if (val.id == item.id) {
          val.put_number = item.put_number;
          val.discount_price = item.discount_price;
          val.money = item.money;
          val.discount_money = item.discount_money
        }
			})
			his.$store.commit("good", goods)
		},

		// 接受子组件数量大于0的put_number表格数据参数
		UpdatetableData(e) {
      this.tableData = e;
		},
		
		// 接受子组件执行删除操作后，传过来的最新表格数据
		getGoods(e) {
      this.goodTable = e
      this.total = this.goodTable.map(val => Number(val.price))
        .reduce((accumulator, currentValue) => accumulator + currentValue);
    },
		
		// 新增商品
		addCommodity() {
			this.$refs.dialogAddCommodity.init()
		},

		// 删除
		handleClick(e, index) {
			this.tableData.splice(index, 1)
			// let goods = JSON.parse(sessionStorage.getItem("good"))
      // goods.find(item => item.id == e.id).put_number = ""
			// sessionStorage.setItem("good", JSON.stringify(goods))
		},

		// 确定
		sure() {

		},

		// 选择关联进销存客户
		selsectRelation(id) {
			this.$common.confirm(
			{
				title: "关联至进销存客户",
				content: "该客户将被关联至进销存客户，请谨慎操作"
			},
			() => {
				memberRelation({
					user_id: id,
					member_id: this.member
				}).then(res => {
					if (res.code === 200) {
						this.$message.success("关联客户成功")
					} else {
						this.$message.error(res.message)
					}
				})
			})
		},

		purchase(form, params, status, draft, order, type) {
			this.$refs[form].validate((vaild) => {
				if(vaild) {
					if(this.tableData.length == "0") {
						this.$message.error("请先新增表格数据")
					} else if(this.$refs.comUpload.fileList.length == "0") {
						this.$message.error("请先上传图片")
					} else {
						if(status == "5" && draft !== "draft") {
							this.title = "采购"
							this.operate = "保存为草稿"
						} else if(status == "5" && draft == 'draft') {
							this.title = "采购"
							this.operate = "采购"
						} else if(type == "1") {
							this.title = "采购退货"
							this.operate = "保存为草稿"
						} else if(status == '5' && params == '1') {
							this.title = "采购"
							this.operate = "采购"
						} else if(status == '5' && params == '5') {
							this.title = "采购"
							this.operate = "保存为草稿"
						} else if(status == '11') {
							this.title = "配货"
							this.operate = "保存为草稿"
						} else if(this.order == "5") {
							this.title = "智能补货"
							this.operate = "采购"
						}
						this.$common.confirm(
							{
								title: this.operate + this.title + "单",
								content: "该" + this.title + "单 , " + "将被" + this.operate + " , 请谨慎操作"
							},
							() => {
							if(status == "5" && draft !== "draft") {
									getDraft(this.id, {
										...this.form,
										goods: this.tableData,
										images: this.images
									}).then(res => {
										if (res.code === 200) {
											this.$message.success("采购单保存草稿成功")
											this.$router.push({ path: "/purchase/order" })
										} else {
											this.$message.error(res.message)
										}
									})
								} else if(status == "5" && draft == 'draft') {
									getPutStock(this.id, {
										...this.form,
										goods: this.tableData,
										images: this.images
									}).then(res => {
										if (res.code === 200) {
											this.$message.success("采购采购单成功")
											this.$router.push({ path: "/purchase/order" })
										} else {
											this.$message.error(res.message)
										}
									})
								} else if(status == "11") {
									PrepareOrderDraft(this.id, 
									{
										...this.form,
										...this.deliveryMode,
										goods: this.tableData,
										images: this.images
									}
									).then(res => {
										if (res.code === 200) {
											this.$message.success("配货单保存草稿成功")
											this.$router.push({ path: "/distribution/order" })
										} else {
											this.$message.error(res.message)
										}
									})
								}	
							}
						)
					}
				}
			})
		},

		// 盘点单
		InventoryAdd(form, params) {
			this.$refs[form].validate((valid) => {
				if (valid) {
					if(!this.tableData) {
						this.$message.error("请先新增表格数据")
					} else {
						 if(params == "3" && this.order == "7") {
								this.title = "库存盘点草稿"
								this.operate = "保存"
								this.operateResult = "保存为草稿"
							} else if(params == "1" && this.order == "7") {
								this.title = "库存盘点"
								this.operate = "盘点"
							}	else if(params == "3" && this.order == "8") {
								this.title = "生产入库草稿"
								this.operate = "保存"
							} else if(params == "4" && this.order == "8") {
								this.title = "生产入库"
								this.operate = "入库"
							} else if(params == "3" && this.status == "20") {
								this.title = "生产入库草稿"
								this.operate = "保存"
							} else if(params == "4" && this.status == "20") {
								this.title = "生产入库"
								this.operate = "入库"
							} else if(params == "4" && this.status == "18") {
								this.title = "生产入库"
								this.operate = "入库"
							} else if(params == "3" && this.status == "23") {
								this.title = "库房盘点草稿"
								this.operate = "保存"
							} else if(params == "1" && this.status == "23") {
								this.title = "库房盘点"
								this.operate = "盘点"
							} else if(params == "4" && this.status == "32") {
								console.log('2222')
								this.title = "待入库"
								this.operate = "入库"
							} else if(params == "4" && this.status == "33") {
								this.title = "部分入库"
								this.operate = "入库"
							}
							this.$common.confirm(
								{
									title: this.operate + this.title + "单",
									content: "该" + this.title + "单" + "将被" + this.operate + "，请谨慎操作"
								},
								() => {
									if(this.order == "7") {
										InventorySave({
											...this.form,
											status: params == "3" ? 3 : 1,
											goods: this.tableData,
										}).then(res => {
											if (res.code === 200) {
												if(params == "3") {
													this.$message.success("库存盘点单保存草稿成功")
												} else if(params == "1") {
													this.$message.success("库存调拨单盘点成功")
												}
												
												this.$router.push({ path: "/warehouse/inventory" })
											} else {
												this.$message.error(res.message)
											}
										})
									} else if(this.order == "8") {
										productionAdd({
											...this.form,
											status: params == "3" ? 1 : 4,
											goods: this.tableData,
										}).then(res => {
											if (res.code === 200) {
												if(params == "3") {
													this.$message.success("生产入库单保存草稿成功")
												} else if(params == "4") {
													this.$message.success("生产入库单入库成功")
												}
												this.$router.push({ path: "/warehouse/production" })
											} else {
												this.$message.error(res.message)
											}
										})
									} else if(this.status == "20" && params == "1") {
										productionDraft(this.id,{
										...this.form,
										status: params == "3" ? 1 : 2,
										goods: this.tableData,
									}).then(res => {
										if(res.code == 200) {
											if(params == "3") {
												this.$message.success("生产入库单保存草稿成功")
											} else if(params == "4") {
												this.$message.success("生产入库单入库成功")
											}
											this.$router.push({ path: "/warehouse/production" })
											} else {
												this.$message.error(res.message)
											}
										})
									} else if(this.status == "20" && params == "3") {
										productionDraft(this.id,{
											...this.form,
											status: 1,
											goods: this.tableData,
										}).then(res => {
											if(res.code == 200) {
												this.$message.success("生产入库单保存草稿成功")
												this.$router.push({ path: "/warehouse/production" })
											} else {
													this.$message.error(res.message)
												}
											})
										} else if(this.status == "20" && params == "4") {
											productionDepot(this.id).then(res => {
											if(res.code == 200) {
												this.$message.success("生产入库单入库成功")
												this.$router.push({ path: "/warehouse/production" })
											} else {
													this.$message.error(res.message)
												}
										})
									} else if(this.status == "18" && params == "4") {
											productionDepot(this.id).then(res => {
											if(res.code == 200) {
												this.$message.success("生产入库单入库成功")
												this.$router.push({ path: "/warehouse/production" })
											} else {
													this.$message.error(res.message)
												}
										})
									} else if(params == "3" && this.status == "23") {
										getInventoryDraft(this.id, {
											...this.form,
											goods: this.tableData,
										}).then(res => {
											if (res.code === 200) {
												this.$message.success("库存盘点单保存草稿成功")
												this.$router.push({ path: "/warehouse/inventory" })
											} else {
												this.$message.error(res.message)
											}
										})
									} else if(params == "1" && this.status == "23") {
										getInventory(this.id, {
											...this.form,
											goods: this.tableData,
										}).then(res => {
											if (res.code === 200) {
												this.$message.success("库存盘点单盘点成功")
												this.$router.push({ path: "/warehouse/inventory" })
											} else {
												this.$message.error(res.message)
											}
										})
									}	else if(this.status == "32" || this.status == "33") {
										StorageDepot(this.id, {
											goods: this.tableData,
										}).then(res => {
											if (res.code === 200) {
												this.$message.success("入库单入库成功")							
												this.$router.push({ path: "/warehouse/OutboundFinished" })
											} else {
												this.$message.error(res.message)
											}
										})
									}
								}
							)
						}	
					}
			})
		},

		// 采购单
		purchaseOrder(form, params, status) {
			this.$refs[form].validate((valid) => {
				if (valid) {
					if(!this.tableData) {
						this.$message.error("请先新增表格数据")
					} else if(this.order == "1" && this.$refs.comUpload.fileList.length == "0") {
						this.$message.error("请先上传图片")
					}
					else if(!this.images && this.status == "16") {
						this.$message.error("请先上传图片")
					}  else {
						if(params == "1" && this.order =='1') {
							this.title = "采购"
							this.operate = "采购"
						} else if(params == "5" && this.order =='1') {
							this.title = "采购"
							this.operate = "保存为草稿"
						} else if(status == "16") {
							this.title = "配货退货草稿"
							this.operate = "保存"
						} else if(params == "5" && this.order =='5') {
							this.title = "采购草稿"
							this.operate = "保存"
						} else if(params == "1" && this.order =='5') {
							this.title = "采购"
							this.operate = "采购"
						} 
							this.$common.confirm(
								{
									title: this.operate + this.title + "单",
									content: "该" + this.title + "单" + "将被" + this.operate + "，请谨慎操作"
								},
								() => {
									if(status == "16") {
										PrepareReturnDraft(this.id, {
											...this.form,
											goods: this.tableData,
											images: this.images,
										}).then(res => {
											if (res.code === 200) {
												this.$message.success("配货退货草稿保存成功")
												this.$router.push({ path: "/distribution/retreat" })
											} else {
												this.$message.error(res.message)
											}
										})
									} else {
										// 1采购 5草稿
										purchaseAdd({
											...this.form,
											status: params === '1' ? 1 : 5,
											goods: this.tableData,
											images: this.$refs.comUpload.fileList,
											total: this.newData
										}).then(res => {
											if (res.code === 200) {
												if(params === '1') {
													this.$message.success("采购单采购成功")
												} else if(params === '5') {
													this.$message.success("采购单保存草稿成功")
												}
												this.$router.push({ path: "/purchase/order" })
											} else {
												this.$message.error(res.message)
											}
										})
									}
								}
							)
						}	
					}
			})
		},

		// 撤销
		revoke(type) {
			if(this.status == "1" || this.status == "4") {
				this.title = "待入库采购"
			} else if (type == "1") {
				this.title = "采购退货"
			} else if(type == "2") {
				this.title = "配货退货"
			} else if(this.status == "9") {
				this.title = "配货待出库"
			} else if(this.status == "12") {
				this.title = "配货已配货"
			} else if(this.status == "17") {
				this.title = "生产入库"
			} else if(this.status == "21") {
				this.title = "库存盘点"
			} else if(this.status == "24") {
				this.title = "库存调拨"
			} else if(this.status == "30") {
				this.title = "出库单"
			} else if(this.status == "38") {
				this.title = "订"
			} 
			this.$common.confirm(
				{
					title: "撤销" + this.title + "单",
					content: "该" + this.title + "单" + "将被撤销 , 请谨慎操作"
				},
				() => {
					if(this.status == "1" || this.status == "4") {
						purchaseRevoke(this.id).then(res => {
							if(res.code == 200) {
								this.$message.success(this.title + "单撤销成功") 
								this.$router.push({ path: "/purchase/order" })
							} else {
								this.$message.error(res.message)
							}
						})
					} else if(type == "1") {
							ReturnRevoke(this.id).then(res => {
							if(res.code == 200) {
								this.$message.success(this.title + "单撤销成功") 
								this.$router.push({ path: "/purchase/retreat" })
							} else {
								this.$message.error(res.message)
							}
						})
					}	else if(type == "2") {
							DistributionRevoke(this.id).then(res => {
							if(res.code == 200) {
								this.$message.success(this.title + "单撤销成功") 
								this.$router.push({ path: "/purchase/retreat" })
							} else {
								this.$message.error(res.message)
							}
						})
					}	else if(this.status == "9" || this.status == "12") {
						PrepareOrderRevoke(this.id).then(res => {
							if(res.code == 200) {
								this.$message.success(this.title + "单撤销成功")
								if(this.status == "9") {
									this.$router.push({ path: "/distribution/order" })
								} else if(this.status == "12") {
									this.$router.push({ path: "/purchase/retreat" })
								}
							} else {
								this.$message.error(res.message)
							}
						})
					} else if(this.status == "17") {
						productionRevoke(this.id).then(res => {
							if(res.code == 200) {
								this.$message.success(this.title + "单撤销成功")
								this.$router.push({ path: "/warehouse/production" })
							} else {
								this.$message.error(res.message)
							}
						})
					} else if(this.status == "21") {
						InventoryRevoke(this.id).then(res => {
							if(res.code == 200) {
								this.$message.success(this.title + "单撤销成功")
								this.$router.push({ path: "/warehouse/production" })
							} else {
								this.$message.error(res.message)
							}
						})
					} else if(this.status == "24") {
						AllotRevoke(this.id).then(res => {
							if(res.code == 200) {
								this.$message.success(this.title + "单撤销成功")
								this.$router.push({ path: "/warehouse/allocation" })
							} else {
								this.$message.error(res.message)
							}
						})
					} else if(this.status == "30") {
						AllotRevoke(this.id).then(res => {
							if(res.code == 200) {
								this.$message.success(this.title + "单撤销成功")
								this.$router.push({ path: "/warehouse/orderFinished" })
							} else {
								this.$message.error(res.message)
							}
						})
					} else if(this.status == "38") {
						orderRevoke(this.id).then(res => {
							if(res.code == 200) {
								this.$message.success(this.title + "单撤销成功")
								this.$router.push({ path: "/warehouse/orderFinished" })
							} else {
								this.$message.error(res.message)
							}
						})
					}
				}
			)
		},

		// 采购订单删除
		deleteOrder() {
			if(this.status == "5") {
				this.title = "采购"
			} else if (this.status == "7") {
				this.title = "采购退货"
			} else if(this.status == "11") {
				this.title = "配货"
			}	else if(this.status == "16") {
				this.title = "配货退货"
			} else if(this.status == "20") {
				this.title = "生产入库"
			} else if(this.status == "23") {
				this.title = "库存盘点"
			} else if(this.status == "26") {
				this.title = "库存调拨"
			} 
			this.$common.confirm(
				{
					title: "删除" + this.title + "草稿单",
      		content: "该" + this.title + "草稿单将被删除，请谨慎操作"
				},
				() => {
					if(this.status == "5") {
						purchaseDel(this.id).then(res => {
							if(res.code == 200) {
								this.$message.success(this.title + "草稿单删除成功")
								this.$router.push({ path: "/purchase/order" })
							} else {
								this.$message.error(res.message)
							}
						})
					} else if(this.status == "7") {
							ReturnDel(this.id).then(res => {
							if(res.code == 200) {
								this.$message.success(this.title + "草稿单删除成功")
								this.$router.push({ path: "/purchase/retreat" })
							} else {
								this.$message.error(res.message)
							}
						})
					}	else if(this.status == "11") {
							PrepareOrderDelet(this.id).then(res => {
							if(res.code == 200) {
								this.$message.success(this.title + "草稿单删除成功")
								this.$router.push({ path: "/distribution/order" })
							} else {
								this.$message.error(res.message)
							}
						})
					}	else if(this.status == "16") {
							DistributionDel(this.id).then(res => {
							if(res.code == 200) {
								this.$message.success(this.title + "草稿单删除成功")
								this.$router.push({ path: "/distribution/retreat" })
							} else {
								this.$message.error(res.message)
							}
						})
					}	else if(this.status == "20") {
							productionDel(this.id).then(res => {
							if(res.code == 200) {
								this.$message.success(this.title + "草稿单删除成功")
								this.$router.push({ path: "/warehouse/production" })
							} else {
								this.$message.error(res.message)
							}
						})
					}	else if(this.status == "23") {
							InventoryDel(this.id).then(res => {
							if(res.code == 200) {
								this.$message.success(this.title + "草稿单删除成功")
								this.$router.push({ path: "/warehouse/inventory" })
							} else {
								this.$message.error(res.message)
							}
						})
					}	else if(this.status == "26") {
							AllotDel(this.id).then(res => {
							if(res.code == 200) {
								this.$message.success(this.title + "草稿单删除成功")
								this.$router.push({ path: "/warehouse/allocation" })
							} else {
								this.$message.error(res.message)
							}
						})
					}	 
				}
			)
		},

		// 出售
		sale() {
			if(this.status == "11") {
				this.title = "配货"
				this.operate = "出售"
			} else if(this.status == "16") {
				this.title = "配货退货"
				this.operate = "出售"
			}
			this.$common.confirm(
				{
					title: this.operate + this.title + "草稿单",
      		content: "该" + this.title + "草稿单" + "将被" + this.operate  + " ， 请谨慎操作"
				},
				() => {
					if(this.status == "11"){
						PrepareOrderSale(this.id, {
							...this.form,
							goods: this.tableData,
							images: this.images,
						}).then(res => {
							if(res.code == 200) {
								this.$message.success("配货草稿单出售成功")
								this.$router.push({ path: "/distribution/order" })
							} else {
								this.$message.error(res.message)
							}
						})
					} else if(this.status == "16") {
						DistributionSale(this.id).then(res => {
							if(res.code == 200) {
								this.$message.success("配货退货草稿单出售成功")
								this.$router.push({ path: "/distribution/retreat" })
							} else {
								this.$message.error(res.message)
							}
						})
				}	
			})
		},

		// 全部入库
		allEnter() {
			this.$common.confirm(
				{
					title: "全部入库待入库采购单",
      		content: "该采购单将被全部入库，请谨慎操作"
				},
				() => {
					purchaseAllDepot(this.id).then(res => {
						if(res.code == 200) {
							this.$message.success("待入库采购单全部入库成功")
							this.$router.push({ path: "/purchase/order" })
						} else {
							this.$message.error(res.message)
						}
					})
				}
			)
		},

		// 页面跳转
		jumpTo() {
			switch(this.status) {
				case 1:
					this.$router.push({ 
						path: "/purchase/newBuild", query: { status: "32", id: this.id, type: "88" } 
					})
					this.getCommonApi()
					break
				case 2:
					this.$router.push({ 
						path: "/purchase/newBuild", query: { status: "33", id: this.id, type: "99" } 
					})
					this.getCommonApi()
					break
				case 9:
					this.$router.push({ 
						path: "/purchase/newBuild", query: { status: "27", id: this.id, type: "77" } 
					})
					this.getCommonApi()
					break
				case 13:
					this.$router.push({ 
						path: "/purchase/newBuild", query: { status: "28", id: this.id, type: "66" } 
					})
					this.getCommonApi()
					break
			}
		},

		// 页面返回
		goBack() {
			if(this.status == "32" || this.status == "33") {
				this.$router.push({path: "/warehouse/OutboundFinished"})
			} else if(this.status == "27" || this.status == "28") {
				this.$router.push({path: "/warehouse/outbound"})
			}
			else {
				this.$router.go(-1)
			}
    },

		// 全部出库
		goEnter() {
			if(this.status == "9") {
				this.title = "配货待出库"
				this.operate = "全部出库"
			}	else if(this.status == "13") {
				this.title = "配货部分出库"
				this.operate = "全部出库"
			} else if(this.status == "16") {
				this.title = "配货退货"
				this.operate = "出售"
			} else if(this.status == "28") {
				this.title = "配货退货"
				this.operate = "出售"
			} 
			this.$common.confirm(
				{
					title: this.operate + this.title + "单",
      		content: "该" + this.title + "单"  + "将被" + this.operate  + "，请谨慎操作"
				},
				() => {
					if(this.status == "9" || this.status == "13" || this.status == "16") {
						allReturn(this.id).then(res => {
							if(res.code == 200) {
								this.$message.success("配货单全部出库成功")
								if(this.status == "9" || this.status == "13") {
									this.$router.push({ path: "/distribution/order" })
								} else if(this.status == "16") {
									this.$router.push({ path: "/distribution/retreat" })
								}	
							} else {
								this.$message.error(res.message)
							}
						})
					}	
				}
			)
		},

		goEntered() {
			this.$common.confirm(
				{
					title: "出库出库单",
      		content: "该出库单将被出库, 请谨慎操作"
				},
				() => {
					OutStockDepot(this.id, {
						goods: this.tableData,
					}).then(res => {
						if(res.code == 200) {
							this.$message.success("出库单出库成功")
							this.$router.push({ path: "/warehouse/outbound" })
						} else {
							this.$message.error(res.message)
						}
					})
				})
		},

		// 退货
		returnGoods(form) {
			this.$refs[form].validate((valid) => {
				if (valid) {
					if(!this.tableData) {
						this.$message.error("请先添加表格数据")
					} else {
						this.$common.confirm(
							{
								title: "采购退货单退货",
								content: "该采购退货单将被退货，请谨慎操作"
							},
							() => {
								if(this.status == "7") {
									ReturnDepot(this.id).then(res => {
										if(res.code == 200) {
											this.$message.success("采购退货单退货成功")
											this.$router.push({ path: "/purchase/retreat" })
										} else {
											this.$message.error(res.message)
										}
									})
								} else if(this.order == "2") {
									ReturnAdd({
										status: '1',
										...this.form,
										goods: this.tableData,
									}).then(res => {
										if(res.code == 200) {
											this.$message.success("采购退货单退货成功")
											this.$router.push({ path: "/purchase/retreat" })
										} else {
											this.$message.error(res.message)
										}
									})
								}
							}
						)
					}
				}
			})
		},

		// 调拨
		allocation(form, params) {
			this.$refs[form].validate((valid) => {
				if (valid) {
					if(!this.tableData) {
						this.$message.error("请先添加表格数据")
					} else {
						if(params == "1" && this.order == "6") {
							this.title = "库存调拨草稿"
							this.operate = "保存"
						}	else if(params == "2" && this.order == "6") {
							this.title = "库存调拨"
							this.operate = "调拨"
						} else if(params == "1" && this.status == "26") {
							this.title = "库存调拨草稿"
							this.operate = "保存"
						} else if(params == "2" && this.status == "26") {
							this.title = "库存调拨"
							this.operate = "调拨"
						} 
						this.$common.confirm(
							{
								title: this.operate + this.title + "单",
      					content: "该" + this.title + "单"  + "将被" + this.operate  + " ， 请谨慎操作"
							},
							() => {
								if(this.order == "6") {
									AllotAdd({
										...this.form,
										status: params == "1" ? 1 : 2,
										goods: this.tableData,
									}).then(res => {
										if(res.code == 200) {
											if(params == "1") {
												this.$message.success("库存调拨单保存草稿成功")
											} else if(params == "2") {
												this.$message.success("库存调拨单调拨成功")
											}
											this.$router.push({ path: "/warehouse/allocation" })
										} else {
											this.$message.error(res.message)
										}
									})
								} else if(params == "1" && this.status == "26") {
									AllotDraft(this.id, {
										...this.form,
										status: "1",
										goods: this.tableData,
									}).then(res => {
										if(res.code == 200) {
											this.$message.success("库存调拨单保存草稿成功")
											this.$router.push({ path: "/warehouse/allocation" })
										} else {
											this.$message.error(res.message)
										}
									})
								} else if(params == "2" && this.status == "26") {
									Allot(this.id, {
										...this.form,
										status: "2",
										goods: this.tableData,
									}).then(res => {
										if(res.code == 200) {
											this.$message.success("库存调拨单调拨成功")
											this.$router.push({ path: "/warehouse/allocation" })
										} else {
											this.$message.error(res.message)
										}
									})
								} 
							}
						)
					}
				}
			})
		},

		saveDraftImg(form, params) {
			this.$refs[form].validate((valid) => {
				if (valid) {
					if(!this.tableData) {
						this.$message.error("请先添加表格数据")
					} else if(this.$refs.comUpload.fileList.length == "0") {
						this.$message.error("请先上传图片")
					} else {
						if(this.order == "3" && params == "3") {
							this.title = "配货"
							this.operate = "保存"
						} else if(this.order == "3" && params == "4") {
							this.title = "配货"
							this.operate = "配货"
						} else if(this.order == "4" || params == "3") {
							this.title = "配货退货"
							this.operate = "保存"
						} else if(this.order == "4" || params == "4") {
							this.title = "配货退货"
							this.operate = "退货"
						}
						this.$common.confirm(
						{
							title: this.operate + this.title + "单",
							content: "该" + this.title + "单"  + "将被" + this.operate + "， 请谨慎操作"
						},
						() => {
							if(this.order == "3") {
								PrepareAdd({
									...this.form,
									...this.deliveryMode,
									status: params === '3' ? 3 : 4,
									goods: this.tableData,
									images: this.$refs.comUpload.fileList,
								}).then(res => {
									if (res.code === 200) {
										this.$router.push({ path: "/distribution/order" })
										if(params === '4') {
											this.$message.success("配货单退货成功")
										} else if(params === '3') {
											this.$message.success("配货单保存草稿成功")
										}
									} else {
										this.$message.error(res.message)
									}
								})
							} else if(this.order == "4") {
								let total1=0
							  this.tableData.forEach(val=>{
									if(val.goods_status=='0'){
										total1=total1-(Number(val.price)*Number(val.put_number))
									}else{
										total1=total1+(Number(val.price)*Number(val.put_number))
									}
								})
						 
								PrepareBuild({
									...this.form,
									status: params === '3' ? 3 : 1,
									goods: this.tableData,
									images: this.$refs.comUpload.fileList,
									total:total1
								}).then(res => {
									if (res.code === 200) {
										this.$router.push({ path: "/distribution/retreat" })
										if(params === '4') {
											this.$message.success("配货退货单退货成功")
										} else if(params === '3') {
											this.$message.success("配货单保存草稿成功")
										}
									} else {
										this.$message.error(res.message)
									}
								})
							}
						})
					}
				}
			})
		},

		// 采购退货保存草稿
		saveDraft(form, params) {
			this.$refs[form].validate((valid) => {
				if (valid) {
					if(!this.tableData) {
						this.$message.error("请先添加表格数据")
					} else {
						if(this.order == "2" && params == "3") {
							this.title = "采购退货草稿"
							this.operate = "保存"
						} else if(this.order == "2" && params == "1") {
							this.title = "采购退货"
							this.operate = "保存"
						}	else if(this.status == "7" && params == "3") {
							this.title = "采购退货草稿"
							this.operate = "保存"
						} else if(this.status == "7" && params == "1") {
							this.title = "采购退货草稿"
							this.operate = "退货"
						}
						this.$common.confirm(
						{
							title: this.operate + this.title + "单",
							content: "该" + this.title + "单"  + "将被" + this.operate  + "， 请谨慎操作"
						},
						() => {
							if(this.order == "2") {
								ReturnAdd({
									status: params == "3" ? 3 : 1,
									...this.form,
									goods: this.tableData,
								}).then(res => {
									if (res.code === 200) {
										if(params == "3") {
											this.$message.success("采购退货单保存草稿成功")
										} else {
											this.$message.success("采购退货单保存成功")
										}
										this.$router.push({ path: "/purchase/retreat" })
									} else {
										this.$message.error(res.message)
									}
								})
							} else if(this.status == "7" && params == "3") {
								ReturnDraft(this.id, {
									...this.form,
									goods: this.tableData,
								}).then(res => {
									if(res.code == 200) {
										this.$message.success("采购退货草稿单保存成功")
										this.$router.push({ path: "/purchase/retreat" })
									} else {
										this.$message.error(res.message)
									}
								})
							} else if(this.status == "7" && params == "1") {
								returnOrder(this.id, {
									...this.form,
									goods: this.tableData,
								}).then(res => {
									if(res.code == 200) {
										this.$message.success("采购退货草稿单退货成功")
										this.$router.push({ path: "/purchase/retreat" })
									} else {
										this.$message.error(res.message)
									}
								})
							}
						})
					} 		
				}
			})
		},

		// 保存
		save() {
			// console.log(this.$refs.comUpload)
		}
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

.delivery {
  margin-left: 39%;
  span {
    width: 65px;
    text-align: right;
    display: inline-block;
  }
  .el-input {
    width: 190px;
    margin-right: 40px;
    margin-bottom: 20px;
  }
}

.delivery /deep/ .map {
  position: relative;
  top: -11px;
  margin-right: 20px;
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
	padding-bottom: 30px;
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
	min-width: 1620px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px 0px rgba(217, 217, 217, 0.5);
  padding: 30px 30px 1px 30px;
	margin: 20px 0;
}
.box-card-message {
	min-width: 1620px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px 0px rgba(217, 217, 217, 0.5);
  padding: 0 30px 0 30px;
	margin: 20px 0;
}
.back {
  cursor: pointer;
}
.table_header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  p {
    color: rgba(153, 153, 153, 1);
    margin: 0 30px 0 25px;
  }
}
.info {
  margin: 0 0 0 0px;
  display: flex;
  align-items: center;
  h6 {
    font-size: 18px;

    font-weight: 600;
    color: rgba(255, 58, 58, 1);
  }
}
.el-select {
  width: 190px;
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
	margin-bottom: 26px;
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
.search-form-input {
	display: flex;
	.el-input {
		width: 190px;
	}
}
.imageRevoke {
	position: absolute;
	top: 173px;
	right: 280px;
}
.imageReturn {
	position: absolute;
	top: 182px;
	right: 255px;
}
.image {
	position: absolute;
	top: 185px;
	right: 815px;
}
.goodList {
	cursor: pointer;
	font-size: 15px;
	color: #999999;
  margin: 20px 0 30px 0;
}
.el-input {
		width: 445px;
}
.el-form {
	.el-button {
		padding: 0;
		width: 80px;
		height: 42px;
		padding-bottom: 42px;
		span {
				color: #fff;
		}
	}
	.botton-bottom {
		.el-button {
			width: 200px;
		}
	}
	.all {
		span {
			font-size: 18px;
		}
	}
}
.nav-btn2 {
	display: flex;
	margin-left: 70px;
	.el-button  {
		height: 30px;
		line-height: 0;
		background-color:#FFF;
		color: #55A1FF;
		border: none;
		box-shadow:0px 2px 4px 0px rgba(217,217,217,0.5);
	}
	.new-add {
		margin-left: 15px;
	}
}
.nav-btn {
	display: flex;
	margin-left: 480px;
	.el-button  {
		height: 30px;
		line-height: 0;
		background-color:#FFF;
		color: #55A1FF;
		border: none;
		box-shadow:0px 2px 4px 0px rgba(217,217,217,0.5);
	}
	.new-add {
		margin-left: 15px;
	}
}
.el-form-item {
	span {
		color: #606266;
	}
}
.el-form-item__content {
	.detail {
		color: #55A1FF;
		cursor: pointer;
		margin-left: 20px;
	}
}
.detail-botton {
	margin-left: 920px;
}
</style>
