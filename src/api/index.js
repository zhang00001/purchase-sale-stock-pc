import http from '@/utils/request'





export const login = data => http.post('/admin/login', data); // 登录
export const register = data => http.post('/admin/register', data); //注册

//公共

export const getAllSales = id => http.get(`/api/getAllSales`); //获取所有销售员
export const getSpec = data => http.post('/api/getSpec', data); //缓存规格
export const getEditProduct = data => http.post('/api/getEditProduct', data); //修改规格
export const getCacheColor = id => http.get(`/api/getCacheColor/${id}`); //获取颜色
export const getCacheSize = id => http.get(`/api/getCacheSize/${id}`); //获取尺码
export const getCacheSpec = data => http.get(`/api/getCacheSpec`, data); //获取规格
export const getGoodsStock = data => http.post(`/api/getGoodsStock`, data); //查询单品库存
export const getGroupSpec = id => http.get(`/api/getGroupSpec/${id}`); //获取分组及规格
export const getAllMaker = (data) => http.get("/api/getAllMaker", data) //////获取所有制单人
// 用户
export const userList = (page, size, category, status, name, source, time) => http.get('/api/userList', { params: { page, size, category, status, name, source, time } }); //用户列表
export const customerCategory = data => http.post('/api/customerCategory', data); //新增客户分类
export const customerCategoryList = data => http.get('/api/customerCategoryList', data); //客户分类列表
export const updatecustomerCategory = (id, data) => http.put(`/api/customerCategory/${id}`, data); //客户分类列表
export const delcustomerCategory = (id, data) => http.delete(`/api/customerCategory/${id}`, data); //客户分类列表
export const addCus = data => { return http.post("/api/user", data) }; //新增客户
export const editCus = (id, data) => { return http.put(`/api/user/${id}`, data) }; //新增客户
export const delCus = id => http.delete(`api/user/${id}`); //删除客户
export const cusDetail = id => http.get(`/api/user/${id}`); //获取客户
// 商品
export const goodsList = (data) => http.get("/api/commodity", data); //商品列表
export const goodsAdd = data => http.post("/api/commodity", data); //新增商品
export const goodsDetail = id => http.get(`/api/commodity/${id}`); //商品详情
export const goodsDel = id => http.delete(`/api/commodity/${id}?recursive=true`); //删除商品
export const goodsUpdate = (id, data) => http.put(`/api/commodity/${id}`, data); //商品更新
export const goodsOne = id => http.get(`/api/getProducts/${id}`); //获取商品下的单品
//商品分类
export const CategoryList = (data) => http.get(`/api/CategoryList`, data) //商品分类
export const categoryAdd = (data) => http.post(`/api/categoryAdd`, data) //商品分类新增
export const categoryEdit = (id, data) => http.put(`/api/categoryEdit/${id}`, data) //商品分类编辑
export const CategoryDel = id => http.delete(`api/CategoryDel/${id}`); //商品分类删除


//颜色
export const ColorDelGroup = id => http.delete(`/api/ColorDelGroup/${id}`); //颜色组删除
export const ColorAddGroup = data => http.post(`/api/ColorAddGroup`, data); //颜色组新增
export const ColorEditGroup = (id, data) => http.put(`/api/ColorEditGroup/${id}`, data) //颜色组编辑
export const ColorGroupList = (data) => http.get(`/api/ColorGroupList`, data) //颜色组列表
export const ColorAdd = (data) => http.post(`/api/ColorAdd`, data) //颜色新增
export const ColorEdit = (id, data) => http.post(`/api/ColorEdit/${id}`, data) //颜色编辑
export const ColorList = (data) => http.get(`/api/ColorList`, data) //颜色列表
export const ColorDel = id => http.delete(`/api/ColorDel/${id}`); //颜色删除

//尺码
export const SizeDelGroup = id => http.delete(`/api/SizeDelGroup/${id}`);
export const SizeAddGroup = data => http.post(`/api/SizeAddGroup`, data);
export const SizeEditGroup = (id, data) => http.put(`/api/SizeEditGroup/${id}`, data)
export const SizeGroupList = (data) => http.get(`/api/SizeGroupList`, data)
export const SizeAdd = (data) => http.post(`/api/SizeAdd`, data)
export const SizeEdit = (id, data) => http.post(`/api/SizeEdit/${id}`, data)
export const SizeList = (data) => http.get(`/api/SizeList`, data)
export const SizeDel = id => http.delete(`/api/SizeDel/${id}`);

//款式
export const StyleDelGroup = id => http.delete(`/api/StyleDelGroup/${id}`);
export const StyleAddGroup = data => http.post(`/api/StyleAddGroup`, data);
export const StyleEditGroup = (id, data) => http.put(`/api/StyleEditGroup/${id}`, data)
export const StyleGroupList = (data) => http.get(`/api/StyleGroupList`, data)
export const StyleAdd = (data) => http.post(`/api/StyleAdd`, data)
export const StyleEdit = (id, data) => http.put(`/api/StyleEdit/${id}`, data)
export const StyleList = (data) => http.get(`/api/StyleList`, data)
export const StyleDel = id => http.delete(`/api/StyleDel/${id}`);

//供应商
export const supplierList = (data) => http.get(`/api/supplierList`, { params: data })
export const supplierAdd = (data) => http.post(`/api/supplierAdd`, data)
export const supplierEdit = (id, data) => http.put(`/api/supplierEdit/${id}`, data)
export const supplierDel = id => http.delete(`/api/supplierDel/${id}`);
export const supplierInfo = id => http.get(`/api/supplierInfo/${id}`);

//商品材质
export const MaterialList = (data) => http.get(`/api/MaterialList`, { params: data }) // 材质列表 查询
export const MaterialAdd = (data) => http.post(`/api/MaterialAdd`, data) // 新增商品材质
export const MaterialEdit = (id, data) => http.put(`/api/MaterialEdit/${id}`, data)
export const MaterialDel = id => http.delete(`/api/MaterialDel/${id}`) // 删除商品材质列表
export const MaterialDetail = id => http.get(`/api/info/${id}`)

//商品单位
export const UnitList = (data) => http.get(`/api/UnitList`, { params: data })
export const UnitAdd = (data) => http.post(`/api/UnitAdd`, data)
export const UnitEdit = (id, data) => http.put(`/api/UnitEdit/${id}`, data)
export const UnitDel = id => http.delete(`/api/UnitDel/${id}`);
//商品季节
export const SeasonList = (data) => http.get(`/api/SeasonList`, { params: data })
export const SeasonAdd = (data) => http.post(`/api/SeasonAdd`, data)
export const SeasonEdit = (id, data) => http.put(`/api/SeasonEdit/${id}`, data)
export const SeasonDel = id => http.delete(`/api/SeasonDel/${id}`);
//品牌
export const BrandList = (data) => http.get(`/api/BrandList`, { params: data }) // 品牌列表
export const BrandAdd = (data) => http.post(`/api/BrandAdd`, data) // 新增商品品牌
export const BrandDetail = (id, data) => http.get(`/api/BrandInfo/${id}`, data) // 商品品牌详情
export const BrandDel = id => http.delete(`/api/BrandDel/${id}`) // 品牌列表删除

//采购订单
export const purchaseList = (data) => http.get(`/api/purchaseList`, data)
export const PurchaseAdd = (data) => http.post(`/api/PurchaseAdd`, data)
export const purchaseDel = id => http.delete(`/api/purchaseDel/${id}`);
export const purchaseDetail = id => http.delete(`/api/purchaseDetail/${id}`); //详情
export const purchaseRevoke = id => http.get(`/api/purchaseRevoke/${id}`); //撤销
export const purchaseDepot = (data) => http.pist(`/api/purchaseDepot/`, data); // 部分入库
export const purchaseAllDepot = (data) => http.get(`/api/purchaseAllDepot/`, data); // 全部入库


//采购退货单
export const purchaseReturnList = (data) => http.get(`/api/purchaseReturnList`, data)
export const purchaseReturnAdd = (data) => http.post(`/api/purchaseReturnAdd`, data)
export const purchaseReturnDel = id => http.delete(`/api/purchaseReturnDel/${id}`);
export const purchaseReturnDetail = id => http.get(`/api/purchaseReturnDetail/${id}`); //详情
export const purchaseReturnDepot = (data) => http.post(`/api/purchaseReturnDepot/`, data); // 入库
export const purchaseReturnRevoke = (data) => http.get(`/api/purchaseReturnRevoke`, data); // 撤销






// 销售订单
export const saleList = (data) => http.get(`/api/saleList`, data) //销售订单 ------- 列表
export const saleMessageDel = (id) => http.delete(`/api/messageDel/${id}`) //销售订单 ------- 留言删除
export const saleAdd = (data) => http.post("/api/saleAdd", data) //销售订单 ------- 新增
export const saleDetail = (id) => http.get(`/api/saleDetail/${id}`) //销售订单 ------- 详情

export const getPutSale = (id, data) => http.post(`/api/getPutSale/${id}`, data) //销售订单 ------- 编辑 --去出售
export const getDraft = (id, data) => http.post(`/api/getDraft/${id}`, data) //销售订单 ------- 编辑 --保存草稿
export const returnDraft = (id, data) => http.post(`/api/returnDraft/${id}`, data) //销售退货单 ------- 编辑 --保存草稿
export const saleReturnDepot = (id, data) => http.post(`/api/saleReturnDepot/${id}`, data) //销售退货单 ------- 编辑 --出库

export const saleDel = (id) => http.delete(`/api/saleDel/${id}`) //销售订单 ------- 删除	
export const saleRevoke = (id) => http.get(`/api/saleRevoke/${id}`) //销售订单 ------- 撤销
export const saleDepot = (id, data) => http.post(`/api/saleDepot/${id}`, data) //销售订单 ------- 部分出库
export const saleAllDepot = (id) => http.get(`/api/saleAllDepot/${id}`) //销售订单 ------- 全部出库
export const messageAdd = (data) => http.post("/api/messageAdd", data) //销售订单 ------- 留言新增	
export const saleReturnList = (data) => http.get(`/api/saleReturnList`, data) //销售退货单 ------- 列表	
export const saleReturnAdd = (data) => http.post("/api/saleReturnAdd", data) //销售退货单 ------- 新增	
export const saleReturnDetail = (id) => http.get(`/api/saleReturnDetail/${id}`) //销售退货单 ------- 详情		
// export const saleReturnDepot = (data) => http.post("/api/saleReturnDepot", data) //销售退货单 ------- 出库
export const saleReturnDel = (id) => http.delete(`/api/saleReturnDel/${id}`) //销售退货单 ------- 删除		
export const saleReturnRevoke = (id) => http.get(`/api/saleReturnRevoke/${id}`) //销售退货单 ------- 撤销		
export const collectList = (data) => http.get(`/api/collectList`, data) //前台收银 ------- 列表			
export const collectDetail = (id) => http.get(`/api/collectDetail/${id}`) //前台收银 ------- 详情		
export const collectRevoke = (id) => http.get(`/api/collectRevoke/${id}`) //前台收银 ------- 撤销		
export const collectAdd = (data) => http.post("/api/collectAdd", data) //前台收银 ------- 列表
export const saleMessageGet = (data) => http.get(`/api/messageList`, { params: data }) //留言 ------- 列表






// 统计
export const Purchase = (data) => http.get("/api/Purchase", { params: data })//采购报表 ----采购明细	GET
export const PurchaseMaker = (data) => http.get("/api/PurchaseMaker", { params: data })//采购报表 ----按采购员汇总	GET
export const PurchaseSingle = (data) => http.get("/api/PurchaseSingle", { params: data })//采购报表 ----按单品汇总	GET
export const PurchaseGoods = (data) => http.get("/api/PurchaseGoods", { params: data })//采购报表 ----按商品汇总	GET
export const PurchaseBill = (data) => http.get("/api/PurchaseBill", { params: data })//采购报表 ----按单据汇总	GET
export const PurchaseSupplier = (data) => http.get("/api/PurchaseSupplier", { params: data })//采购报表 ----按供应商汇总	GET

export const SaleSingle = (data) => http.get("/api/SaleSingle", { params: data })//销售报表 ----按单品汇总	 
export const SaleGoods = (data) => http.get("/api/SaleGoods", { params: data })//销售报表 ----按商品汇总	 
export const SaleBill = (data) => http.get("/api/SaleBill", { params: data })//销售报表 ----按单据汇总 
export const SaleCustom = (data) => http.get("/api/SaleCustom", { params: data })//销售报表 ----按客户汇总	 
export const SalePerson = (data) => http.get("/api/SalePerson", { params: data })//销售报表 ----按销售员汇总 
export const SaleStore = (data) => http.get("/api/SaleStore", { params: data })//销售报表 ----按销售员所属门店汇总	 
export const WareStore = (data) => http.get("/api/WareStore", { params: data })//销售报表 ----按仓库所属门店汇总
export const Sale = (data) => http.get("/api/Sale", { params: data }) ////销售报表 ----销售明细	

export const Inventory = (data) => http.get("/api/Inventory", { params: data })////盘点报表  ----盘点明细	
export const InventoryBill = (data) => http.get("/api/InventoryBill", { params: data }) //盘点报表  ----按盘点单汇总	GET
export const InventoryGoods = (data) => http.get("/api/InventoryGoods", { params: data })//盘点报表  ----按商品汇总	GET
export const InventoryWare = (data) => http.get("/api/InventoryWare", { params: data })//盘点报表  ----按仓库汇总	GET


export const Allot = (data) => http.get("/api/Allot", { params: data })//调拨报表---调拨明细	GET
export const AllotBill = (data) => http.get("/api/AllotBill", { params: data })//调拨报表---按调拨单汇总	GET
export const AllotGoods = (data) => http.get("/api/AllotGoods", { params: data })//调拨报表---按商品汇总	GET
export const AllotWare = (data) => http.get("/api/AllotWare", { params: data })//调拨报表---按仓库汇总	GET


export const Production = (data) => http.get("/api/Production", { params: data })//生产报表 ----明细	GET
export const ProductionBill = (data) => http.get("/api/ProductionBill", { params: data }) //////生产报表 ----按生产单汇总
export const ProductionGoods = (data) => http.get("/api/ProductionGoods", { params: data })////生产报表 ----按商品汇总	 
export const ProductionWare = (data) => http.get("/api/ProductionWare", { params: data })////生产报表 ----按仓库汇总

export const Prepare = (data) => http.get("/api/Prepare", { params: data })//配货报表 ----配货明细	 
export const PrepareSingle = (data) => http.get("/api/PrepareSingle", { params: data })//配货报表 ----按单品汇总 
export const PrepareGoods = (data) => http.get("/api/PrepareGoods", { params: data })//配货报表 ----按商品汇总	 
export const PrepareBill = (data) => http.get("/api/PrepareBill", { params: data })//配货报表 ----按单据汇总	 
export const PrepareStore = (data) => http.get("/api/PrepareStore", { params: data })//配货报表 ----按门店汇总 
export const PrepareKeeper = (data) => http.get("/api/PrepareKeeper", { params: data })//配货报表 ----按仓管员汇总	 
export const PrepareWareStore = (data) => http.get("/api/PrepareWareStore", { params: data })//配货报表 ----按仓库门店汇总 


export const OutStock = (data) => http.get("/api/OutStock", { params: data }) //出库报表 ----出库明细
export const OutStockSingle = (data) => http.get("/api/OutStockSingle", { params: data }) //出库报表 ----按单品汇总
export const OutStockGoods = (data) => http.get("/api/OutStockGoods", { params: data }) //出库报表 ----按商品汇总
export const OutStockCustom = (data) => http.get("/api/OutStockCustom", { params: data }) //出库报表 ----按客户汇总


export const InStock = (data) => http.get("/api/InStock", { params: data }) //入库报表 ----入库明细
export const InStockSingle = (data) => http.get("/api/InStockSingle", { params: data }) //入库报表 ----按单品汇总
export const InStockGoods = (data) => http.get("/api/InStockGoods", { params: data }) //入库报表 ----按商品汇总
export const InStockSupplier = (data) => http.get("/api/InStockSupplier", { params: data }) //入库报表 ----按供应商汇总


export const Analys = (data) => http.get("/api/Analys", { params: data }) //商品分析
export const Contrast = (data) => http.get("/api/Contrast", { params: data }) //进销对比
export const Revenue = (data) => { return http.get("/api/Revenue", { params: data }) }//营收报表

// 财务
export const getSetAcount = (data) => http.get("/api/getSetAcount", data)//结算账户 ---------获取所有结算账户 下拉框
export const getAllAcount = (data) => http.get("/api/getAllAcount", data)//账目类型 ---------获取所有账目类型	  下拉框

export const getSetAcount1 = (data) => http.get("/api/setAccountList", data)//结算账户 ---------获取所有结算账户	GET/api/getSetAcount
export const getAllAcount1 = (data) => http.get("/api/AccountType", data)//账目类型 ---------获取所有账目类型	GET/api/getAllAcount


export const collectionFlow = (data) => http.get("/api/collectionFlow", { params: data }) //收款流水
export const FinanceList = (data) => http.get("/api/FinanceList", { params: data })//对账汇总----	GET/api/FinanceList
export const setAccountAdd = (data) => http.post("/api/setAccountAdd", data)//结算账户----新增	POST/api/setAccountAdd
export const setAccountEdit = (id, data) => http.put(`/api/setAccountEdit/${id}`, data)//结算账户----修改	PUT/api/setAccountEdit/:id
export const setAccountDel = (id) => http.delete(`/api/setAccountDel/${id}`)//结算账户----删除	DELETE/api/setAccountDel/:id
export const setAccountInfo = (id) => http.get(`/api/setAccountInfo/${id}`)//结算账户----查找	GET/api/setAccountInfo/:id
export const AccountTypeAdd = (data) => http.post("/api/AccountTypeAdd", data)//账目类型----新增	POST/api/AccountTypeAdd
export const AccountTypeInfo = (id) => http.get(`/api/AccountTypeInfo/${id}`)//账目类型----查找	GET/api/AccountTypeInfo/:id
export const AccountTypeEdit = (id, data) => http.put(`/api/AccountTypeEdit/${id}`, data)//账目类型----修改	PUT/api/AccountTypeEdit/:id
export const AccountTypeDel = (id) => http.delete(`/api/AccountTypeDel/${id}`)//账目类型----删除	DELETE/api/AccountTypeDel/:id
export const supplier = (data) => http.get("/api/supplier", { params: data })//供应商对账	GET/api/supplier
export const customerReconciliation = (data) => http.get("/api/customerReconciliation", { params: data })//客户对账	GET/api/customer
export const setAccountFlow = (data) => http.get("/api/setAccountFlow", { params: data })//账户流水
export const setAccountFlowAdd = (data) => http.post("/api/setAccountFlow", data)//账户流水
export const customerReconciliationAdd = (data) => { return http.post("/api/customerReconciliation", data) } //客户对账---- 收款
export const adjustment = (data) => { return http.post("/api/customerReconciliation/adjustment", data) } //客户对账---- 初期调整
export const supplierReconciliation = (data) => { return http.post("/api/supplierReconciliation", data) } //供应商---- 收款
export const adjustmentSup = (data) => { return http.post("/api/supplierReconciliation/adjustment", data) }//供应商---- 初期调整
// 配置

// 物流



export const userUpdate = (data) => http.put(`/admin/user/update`, data) // 个人信息  修改个人信息
export const changePwd = (data) => http.patch(`/admin/user/changePwd`, data)
export const storeList = (data) => http.get("/api/storeList", { params: data })//门店列表
export const storeAdd = (data) => http.post("/api/storeAdd", data)//门店列表-----新增
export const storeEdit = (id, data) => http.post(`/api/storeEdit/${id}`, data) //门店列表----编辑
export const storeDel = (id) => http.delete(`/api/storeDel/${id}`) //门店列表----删除	
export const getStoreInfo = (id) => http.get(`/api/getStoreInfo/${id}`) //门店列表----查找	


export const logistics = (data) => http.get("/api/logistics", { params: data }) //物流列表
export const logisticsAss = (data) => { return http.post("/api/logistics", data) }//新增物流信息
export const logisticsUpdate = (id, data) => { return http.put(`/api/logistics/${id}`, data) }//更新物流信息
export const logisticsDel = (id) => http.delete(`/api/logistics/${id}`) //删除物流信息  
export const logisticsDetail = (id, data) => http.get(`/api/logistics/${id}`, { params: data })  //获取物流信息

export const logisticsOutletsAdd = (data) => { return http.post("/api/logisticsOutlets", data) }// POST/api/logisticsOutlets 新增物流网点
export const logisticsOutlets = (data) => http.get("/api/logisticsOutlets", { params: data }) //物流网点列表
export const logisticsOutletsUpdate = (id, data) => { return http.put(`/api/logisticsOutlets/${id}`, data) }//更新物流网点
export const logisticsOutletsDetail = (id, data) => http.get(`/api/logisticsOutlets/${id}`, { params: data }) // 获取物流网点
export const logisticsOutletsDel = (id) => http.delete(`/api/logisticsOutlets/${id}`) // 删除物流网点

export const senderAdd = (data) => http.post("/api/sender", data)//   新增发件人信息
export const sender = (data) => { return http.get("/api/sender", { params: data }) } //发件人信息列表
export const senderUpdate = (id, data) => { return http.put(`/api/sender/${id}`, data) } //更新发件人信息
export const senderDetail = (id, data) => http.get(`/api/sender/${id}`, { params: data }) // 获取发件人信息
export const senderDel = (id) => http.delete(`/api/sender/${id}`) // 删除发件人信息

export const getconfig = (data) => { return http.get("/api/config", { params: data }) }  //获取配置
export const Updateconfig = (data) => { return http.put(`/api/config`, data) }//更新配置


export const systemLogs = (data) => { return http.get("/api/systemLogs", { params: data }) }  //系统日志
export const announcementsGet = (data) => { return http.get("/api/announcements", { params: data }) }
export const announcementsAdd = (data) => { return http.post("/api/announcements", data) }
export const announcementsUpdate = (id, data) => { return http.put(`/api/announcements/${id}`, { params: data }) }
export const announcementsDel = (id) => http.delete(`/api/announcements/${id}`)
export const announcementsDetail = (id, data) => { return http.get(`/api/announcements/${id}`) }


// 营销
export const integral = (data) => { return http.get("/api/integral", { params: data }) }  //客户积分
export const integralAdd = (data) => { return http.post("/api/integralAdd", data) }
export const integralEdit = (id, data) => { return http.post(`/api/integralEdit/${id}`, data) }
export const integralDel = (id, data) => { return http.delete(`/api/integralDel/${id}`, data) }
export const integralInfo = (id, data) => { return http.get(`/api/integralInfo/${id}`, { params: data }) }
export const integralShop = (data) => { return http.get("/api/integralShop", { params: data }) }
export const customerCategoryListUse = (data) => { return http.get("/api/customerCategoryListUse", { params: data }) }

export const memberCard = (data) => { return http.post(`/api/memberCard`, data) }
export const memberCardInfo = (id, data) => { return http.get(`/api/memberCardInfo`, { params: data }) }

export const discount = (data) => { return http.get("/api/discount", { params: data }) }  //限时折扣
export const discountAdd = (data) => { return http.post("/api/discountAdd", data) }
export const discountEdit = (id, data) => { return http.post(`/api/discountEdit/${id}`, data) }
export const discountDel = (id, data) => { return http.delete(`/api/discountDel/${id}`, data) }
export const discountInfo = (id, data) => { return http.get(`/api/discountInfo/${id}`, { params: data }) }
export const discountShop = (data) => { return http.get("/api/discountShop", { params: data }) }
export const discountRevoke = (id, data) => { return http.get(`/api/discountRevoke/${id}`, { params: data }) }


export const Coupon = (data) => { return http.get("/api/Coupon", { params: data }) }  //优惠券
export const CouponAdd = (data) => { return http.post("/api/CouponAdd", data) }
export const CouponEdit = (id, data) => { return http.post(`/api/CouponEdit/${id}`, data) }
export const CouponDel = (id, data) => { return http.delete(`/api/CouponDel/${id}`, data) }
export const CouponInfo = (id, data) => { return http.get(`/api/CouponInfo/${id}`, { params: data }) }

export const seckill = (data) => { return http.get("/api/seckill", { params: data }) }  //秒杀
export const seckillAdd = (data) => { return http.post("/api/seckillAdd", data) } //
export const seckillEdit = (id, data) => { return http.post(`/api/seckillEdit/${id}`, data) }
export const seckillDel = (id, data) => { return http.delete(`/api/seckillDel/${id}`, data) }
export const seckillInfo = (id, data) => { return http.get(`/api/seckillInfo/${id}`, { params: data }) }
export const seckillStop = (id, data) => { return http.get(`/api/seckillStop/${id}`, { params: data }) } //秒杀停止

export const retailEdit = (data) => { return http.post(`/api/retailEdit`, data) } //分销--编辑
export const retailInfo = (id, data) => { return http.get(`/api/retailInfo`, { params: data }) } //分校规则--查找
export const retailCustomer = (data) => { return http.get(`/api/retailCustomer`, { params: data }) } //分销规则--查找分校资质客户
export const retailList = (data) => { return http.post(`/api/retailList`, data) } //分销列表

export const retailTotal = (data) => { return http.get(`/api/retailTotal`, data) } //分销列表统计
export const commodityList = (id, data) => { return http.post(`/api/commodityList`, data) }  //秒杀--商品
export const productList = (data) => { return http.get(`/api/productList`, { params: { com_id: data } }) }   //秒杀--商品下的单品
export const seckillOnline = (data) => { return http.get(`/api/seckillOnline/${data}`) }

export const index = (data) => { return http.get(`/api/index`) }



// 角色权限
export const appPermissions = (data) => { return http.get("/admin/appPermissions") }
export const permissions = (data) => { return http.get(`/admin/permissions`) } //列表------权限
export const permissionsDetail = (id) => { return http.get(`/admin/permissions/${id}`) } //详情-----权限	
export const roleList = (data) => { return http.get(`/admin/roleList`) } //角色列表	
export const roleDetails = (id) => { return http.get(`/admin/roleDetails`, { params: { id: id } }) }
export const roleSave = (data) => { return http.post(`/admin/roleSave`, data) } 	//角色更新（添加、修改）	
export const roleDel = (id) => { return http.get(`/admin/roleDel`, { params: { id: id } }) }  //角色删除

export const adminList = (data) => { return http.get(`/admin/admin`, { params: data }) }
export const adminAdd = (data) => { return http.post(`/admin/admin`, data) }

export const adminEdit = (id, data) => { return http.put(`/admin/admin/${id}`, data) }
export const adminDetail = (id) => { return http.get(`/admin/adminInfo/${id}`) }
export const adminDel = (id) => { return http.delete(`/admin/admin/${id}`) } //删除

export const printNote = (data) => { return http.post(`/api/printNote`, data) } //删除