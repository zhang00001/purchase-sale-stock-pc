import http from '@/utils/request'

// 下拉框
export const supplierSelectList = (data) => http.get(`/api/getAll`, data) // 供应商
export const warehouseSelectList = (data) => http.get(`/api/getAllWarehouse`, data) // 仓库
export const KeeperList = (data) => http.get(`/api/getAllKeeper`, data) // 仓管员
export const storeList = (data) => http.get(`/api/getAllStore`, data) // 门店
export const commodityList = (data) => http.get(`/api/commodity`, data) // 商品
export const CategoryList = (data) => http.get(`/api/getAllCategory`, data) // 分类
export const getFreightList = (data) => http.get(`/api/getFreightList`, data) // 分类
export const SizeList = (data) => http.get(`/api/SizeList`, data) // 尺码
export const ColorList = (data) => http.get(`/api/ColorList`, data) // 颜色
export const acountSelectList = (data) => http.get(`/api/getAllAcount`, data) // 账目类型
export const clientList = (data) => http.get(`/api/clientList`, data) // 关联进销存客户
export const warehouseDel = id => http.delete(`/api/warehouse/${id}`) // 仓库列表删除
export const warehouseEdit = (id, data) => http.put(`/api/warehouse/${id}`, data) // 仓库更新
export const warehouseDetail = (id) => http.get(`/api/warehouse/${id}`) // 仓库详情
export const setAcountList = (data) => http.get(`/api/getSetAcount`, data) // 结算账户
export const goodsTag = (data) => http.get(`/api/goodsTag`, data) // 商品标签

// 配货单
// 留言
export const messageAdd = (data) => http.post(`/api/messageAdd`, data) // 配货留言新增
export const messageList = (data) => http.get(`/api/messageList`, { params: data }) // 配货留言列表
export const messageDel = (id) => http.delete(`/api/messageDel/${id}`) // 配货留言删除
export const getMessage = (data) => http.get(`/api/getMessage`, { params: data }) // 配货留言列表

export const materialDetail = (id) => http.get(`/api/MaterialInfo/${id}`) // 材质详情

export const seasonlDetail = (id) => http.get(`/api/SeasonInfo/${id}`) // 季节详情
export const seasonList = (data) => http.get(`/api/SeasonList`, { params: data }) // 季节列表
export const seasonAdd = (data) => http.post(`/api/SeasonAdd`, data) // 新增季节列表
export const seasonDel = id => http.delete(`/api/SeasonDel/${id}`) // 季节列表删除

export const companyList = (data) => http.get(`/api/UnitList`, { params: data }) // 单位列表
export const companyDetail = (id) => http.get(`/api/UnitInfo/${id}`) // 单位详情
export const companyAdd = (data) => http.post(`api/UnitAdd`, data) // 新增单位列表
export const companyDel = id => http.delete(`/api/UnitDel/${id}`) // 单位列表删除

// 采购
// 采购订单
export const purchaseList = (data) => http.get(`/api/purchaseList`, data) // 采购订单列表 查询
export const purchaseAdd = (data) => http.post(`/api/PurchaseAdd`, data) // 新增采购订单
export const purchaseDetail = (id) => http.get(`api/purchaseDetail/${id}`) // 采购订单详情
export const purchaseDepot = (id) => http.post(`/api/purchaseDepot/${id}`) // 采购订单去入库
export const purchaseRevoke = (id) => http.get(`/api/purchaseRevoke/${id}`) // 采购订单撤销
export const getDraft = (id, data) => http.post(`/api/PurchaseDraft/${id}`, data) // 采购订草稿状态下保存草稿
export const getPutStock = (id, data) => http.post(`/api/getPutPurchase/${id}`, data) // 采购订草稿状态下采购
export const purchaseDel = (id) => http.delete(`/api/purchaseDel/${id}`) // 草稿状态下删除
export const purchaseAllDepot = (id) => http.get(`/api/purchaseAllDepot/${id}`) // 采购订单全部入库
export const supplierList = (data) => http.get(`/api/supplierList`, data) // 供应商列表
export const supplierDel = id => http.delete(`/api/supplierDel/${id}`) // 供应商列表删除
export const supplierAdd = (data) => http.post(`/api/supplierAdd`, data) // 新增供应商

// 采购退货
export const retreatList = (data) => http.get(`/api/purchaseReturnList`, data) // 采购退货单列表
export const ReturnAdd = (data) => http.post(`/api/purchaseReturnAdd`, data) // 采购退货单新增保存草稿
export const ReturnDetail = (id) => http.get(`/api/purchaseReturnDetail/${id}`) // 采购退货单详情
export const ReturnRevoke = (id) => http.get(`/api/purchaseReturnRevoke/${id}`) // 采购退货单撤销
export const ReturnDraft = (id, data) => http.post(`/api/purchaseReturnDraft/${id}`, data) // 采购退货单保存草稿
export const returnOrder = (id, data) => http.post(`/api/purchaseReturn/${id}`, data) // 采购退货草稿单退货
export const ReturnDepot = (id) => http.post(`/api/purchaseReturnDepot/${id}`) // 采购退货单退货
export const ReturnDel = (id) => http.delete(`/api/purchaseReturnDel/${id}`) // 采购退货单删除

// 智能补货
export const ReplenishList = (data) => http.get(`/api/smartReplenish`, data) // 采购退货单列表
export const Replenish = (data) => http.post(`/api/smartReplenish`, data) // 采购退货单补货

// 配货
export const prepareList = (data) => http.get(`/api/PrepareList`, data) // 配货订单列表
export const PrepareAdd = (data) => http.post(`/api/PrepareAdd`, data) // 配货单新增
export const PrepareBuild = (data) => http.post(`/api/PrepareReturnAdd`, data) // 配货退货单新增
export const PrepareOrderDetail = (id) => http.get(`/api/PrepareDetail/${id}`) // 配货单详情
export const PrepareOrderSale = (id, data) => http.post(`/api/getPutPrepare/${id}`, data) // 配货单出售
export const PrepareOrderDraft = (id, data) => http.post(`/api/PrepareDraft/${id}`, data) // 配货单保存草稿
export const PrepareOrderDelet = (id) => http.delete(`/api/PrepareDel/${id}`) // 配货单删除
export const PrepareOrderRevoke = (id) => http.get(`/api/PrepareRevoke/${id}`) // 配货单撤销
export const allReturn = (id) => http.get(`/api/PrepareAllDepot/${id}`) // 配货单全部出库
export const returnGoods = (id) => http.get(`/api/PrepareReturnDetail/${id}`) // 配货退货单详情
export const DistributionRevoke = (id) => http.get(`/api/PrepareReturnRevoke/${id}`) // 配货退货单撤销
export const DistributionDel = (id) => http.delete(`/api/PrepareReturnDel/${id}`) // 配货退货单删除
export const DistributionSale = (id) => http.post(`/api/PrepareReturnDepot/${id}`) // 配货退货单出售
export const PrepareReturnList = (data) => http.get(`/api/PrepareReturnList`, data) // 配货退货单列表
export const PrepareReturnDraft = (id, data) => http.post(`/api/PrepareReturnDraft/${id}`, data) // 配货退货单保存草稿

// 仓库
export const MakerList = (data) => http.get(`/api/getAllMaker`, data) // 制单人
export const AllStore = (data) => http.get(`/api/getAllStore`, data) //  制单人所属门店
export const warehouseList = (data) => http.get(`/api/warehouse`, data) // 仓库列表
export const StockList = (data) => http.get(`/api/warehouse/StockList`, data) // 库存查询列表
export const turnoverList = (data) => http.get(`/api/warehouse/turnoverList`, data) // 库存流水列表
export const warehouseAdd = (data) => http.post(`/api/warehouse`, data) // 新增仓库

// 调拨
export const allocationList = (data) => http.get(`/api/AllotList`, data) // 仓库列表
export const AllotAdd = (data) => http.post(`/api/AllotAdd`, data) // 新增调拨单
export const AllotDetail = (id) => http.get(`/api/AllotDetail/${id}`) // 库房调拨单详情
export const AllotRevoke = (id) => http.get(`/api/AllotRevoke/${id}`) // 库房调拨单撤销
export const Allot = (id, data) => http.post(`/api/Allot/${id}`, data) // 库房调拨单草稿状态下调拨
export const AllotDraft = (id, data) => http.post(`/api/AllotDraft/${id}`, data) // 库房调拨草稿状态下保存草稿
export const AllotDel = (id, data) => http.delete(`/api/AllotDel/${id}`, data) // 库房调拨草稿状态下删除

// 盘点
export const InventorySave = (data) => http.post(`/api/InventoryAdd`, data) // 新增盘点单
export const InventoryList = (data) => http.get(`/api/InventoryList`, data) // 库存盘点列表
export const InventoryDetail = (id) => http.get(`/api/InventoryDetail/${id}`) // 库房盘点单详情
export const InventoryRevoke = (id) => http.get(`/api/InventoryRevoke/${id}`) // 库房盘点单撤销
export const getInventory = (id, data) => http.post(`/api/getInventory/${id}`, data) // 库房盘单草稿状态下盘点
export const getInventoryDraft = (id, data) => http.post(`/api/getInventoryDraft/${id}`, data) // 库房盘单草稿状态下保存草稿
export const InventoryDel = (id) => http.delete(`/api/InventoryDel/${id}`) // 生产入库单删除
export const InventoryDetailed = (data) => http.get(`/api/InventoryDetailed`, data) // 库房盘点明细详情


// 生产入库
export const productionAdd = (data) => http.post(`/api/productionAdd`, data) // 新增生产入库单
export const ProductionList = (data) => http.get(`/api/ProductionList`, data) // 生产入库列表
export const productionDetail = (id) => http.get(`/api/productionDetail/${id}`) // 生产入库单详情
export const productionRevoke = (id) => http.get(`/api/productionRevoke/${id}`) // 生产入库撤销
export const productionDraft = (id, data) => http.post(`/api/productionDraft/${id}`, data) // 生产入库保存草稿
export const productionDepot = (id, data) => http.get(`/api/productionDepot/${id}`, data) // 生产入库草稿状态入库
export const productionDel = (id, data) => http.get(`/api/productionDel/${id}`, data) // 生产入库单删除

// 商品
export const BrandEdit = (id, data) => http.put(`/api/BrandEdit/${id}`, data) //品牌编辑
export const MaterialEdit = (id, data) => http.put(`/api/MaterialEdit/${id}`, data) //材质编辑
export const SeasonEdit = (id, data) => http.put(`/api/SeasonEdit/${id}`, data) //季节编辑
export const UnitEdit = (id, data) => http.put(`/api/UnitEdit/${id}`, data) //单位编辑

// 出库单
export const OutStockList = (data) => http.get(`/api/OutStockList`, data) // 出库单列表
export const OutStockDetail = (id, data) => http.get(`/api/OutStockDetail/${id}`, data) //出库单详情
export const OutStockDepot = (id, data) => http.post(`/api/OutStockDepot/${id}`, data) //出库单出库
export const OutStockRevoke = (id) => http.post(`/api/OutStockRevoke/${id}`) //出库单撤销

// 入库单
export const StorageListList = (data) => http.get(`/api/StorageList`, data) // 入库单列表
export const StorageDetail = (id, data) => http.get(`/api/StorageDetail/${id}`, data) // 入库单详情
export const StorageDepot = (id, data) => http.post(`/api/StorageDepot/${id}`, data) // 入库单入库

// 商城 
export const upperList = (data) => http.get(`/api/upperList`, data) // 商城列表
export const upperGoods = (data) => http.post(`/api/upperGoods`, data) // 上架
export const downGoods = (data) => http.post(`/api/downGoods`, data) // 下架
export const orderList = (data) => http.get(`/api/orderList`, data) // 订单列表
export const orderInfo = (id, data) => http.get(`/api/orderInfo/${id}`, data) // 订单详情
export const memberRelation = (data) => http.post(`/api/memberRelation
`, data) // 关联进销存客户
export const OrderRevision = (data) => http.post(`/api/OrderRevision
`, data) // 订单详情改价
export const OrderTurn = (id) => http.get(`/api/OrderTurn/${id}`) // 订单转销售单
export const orderRevoke = (id) => http.get(`/api/orderRevoke/${id}`) // 订单撤销
export const memberList = (data) => http.get(`/api/memberList`, data) // 会员列表
export const memberInfo = (id) => http.get(`/api/memberInfo/${id}`) // 会员详情
export const memberMove = (id) => http.post(`/api/memberMove/${id}`) // 取消关联
export const storeStateInfo = (id) => http.get(`/api/storeStateInfo`) // 店铺概况
export const storeStateEdit = (data) => http.post(`/api/storeStateEdit
`, data) // 店铺信息保存
export const shopBannerList = (data) => http.get(`/api/shopBannerList`, data) // 店面设置列表
export const shopBannerSort = (data) => http.post(`/api/shopBannerSort`, data) // 商品上移下移
export const shopBannerDel = (data) => http.post(`/api/shopBannerDel`, data) // 商品删除
export const shopBannerEdit = (data) => http.post(`/api/shopBannerEdit`, data) // 更改商品
export const shopBannerAdd = (data) => http.post(`/api/shopBannerAdd`, data) // 新增商品
export const getOnshopList = (data) => http.post(`/api/getOnshopList`, data) // 查找上架商品列表
export const salePriceShow = (data) => http.post(`/api/salePriceShow`, data) // 销量价格展示
export const batchShopTag = (data) => http.post(`/api/batchShopTag`, data) // 批量设置商品标签
export const repertoryConfig = (data) => http.post(`/api/repertoryConfig`, data) // 库存保存
export const getShopRule = (data) => http.get(`/api/getShopRule`, data) // 上架商品规则详情
export const batchShopFreight = (data) => http.post(`/api/batchShopFreight`, data) // 运费模板批量设置商品数量
export const setDefaultFreight = (data) => http.post(`/api/setDefaultFreight`, data) // 运费模板设为默认
export const delFreight = (data) => http.post(`/api/delFreight`, data) // 运费模板删除
export const getAreaList = (data) => http.post(`/api/getAreaList`, data) // 省市列表
export const addFreight = (data) => http.post(`/api/addFreight`, data) // 新增模板


// 首页
export const customerAnal = (data) => http.get(`/api/customerAnal`, data) // 客户分析
export const goodsAnal = (data) => http.get(`/api/goodsAnal`, data) // 商品分析
export const clerkAnal = (data) => http.get(`/api/clerkAnal`, data) // 店员分析
export const goodsProfit = (data) => http.get(`/api/goodsProfit`, data) // 商品利润
export const storeProfit = (data) => http.get(`/api/storeProfit`, data) // 门店利润
export const SaleSummary = (data) => { return http.get(`/api/SaleSummary`, data) } // 销售汇总