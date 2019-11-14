import { MessageBox } from 'element-ui'

export const POSITION = [{
    id: 1,
    name: "1"
}, {
    id: 2,
    name: "2"
}, {
    id: 3,
    name: "3"
}, {
    id: 4,
    name: "4"
}]
export const enumSizes = [
    "S",
    "M",
    "L",
    "XL",
    "2XL",
    "3XL",
    "4XL",
    "5XL",
]
export const enumColors = ["黑色", "白色", "红色", "蓝色", "黄色"]

// 销售订单
export const enumSaleStatus = [
        { id: '', name: "全部" },
        { id: 5, name: "待出库" },
        { id: 1, name: "部分出库" },
        { id: 2, name: "撤销" },
        { id: 3, name: "草稿" },
        { id: 4, name: "已出售" },
    ]
    // 销售退货单 采购退货单
export const enumReturnOrder = [
    { id: '', name: "全部" },
    { id: 1, name: "已退货" },
    { id: 2, name: "已撤销" },
    { id: 3, name: "草稿" },

]

export const enumHistorys = [
    { id: '', name: "全部" },
    { id: 1, name: "已零售" },
    { id: 2, name: "已撤销" },
]

export const enumDistribution = [
    { id: '', name: "全部" },
    { id: 5, name: "待出库" },
    { id: 1, name: "部分出库" },
    { id: 2, name: "已撤销" },
    { id: 3, name: "草稿" },
    { id: 4, name: "已配货" },
]

export const enumHistorys1 = [
    { id: "", name: "全部" },
    { id: 1, name: "待出库" },
    { id: 2, name: "部分出库" },
    { id: 4, name: "已撤销" },
]

export const enumWarehouse = [
    { id: "", name: "全部" },
    { id: 3, name: "已入库" },
    { id: 4, name: "已撤销" },
]

export const enumAllocation = [
    { id: "", name: "全部" },
    { id: 2, name: "已调拨" },
    { id: 3, name: "已撤销" },
    { id: 1, name: "草稿" },
]

export const enumInventory = [
    { id: "", name: "全部" },
    { id: 1, name: "已盘点" },
    { id: 2, name: "已撤销" },
    { id: 3, name: "草稿" },
]

export const enumProduction = [
    { id: "", name: "全部" },
    { id: 2, name: "已入库" },
    { id: 4, name: "待入库" },
    { id: 3, name: "已撤销" },
    { id: 1, name: "草稿" },
]

export const enumPurchase = [
    { id: "", name: "全部" },
    { id: 1, name: "待入库" },
    { id: 2, name: "部分入库" },
    { id: 3, name: "撤销" },
    { id: 5, name: "草稿" },
    { id: 4, name: "已采购" },
]

export const enumFinshed = [
    { id: "", name: "全部" },
    { id: 3, name: "已出库" },
    { id: 4, name: "已撤销" },
]

export const enumOut = [
    { id: "", name: "全部" },
    { id: 1, name: "待入库" },
    { id: 2, name: "部分入库" },
    { id: 4, name: "已撤销" },
]

export const enumDingdan = [
    { id: 9, name: "全部" },
    { id: 0, name: "待付款" },
    { id: 1, name: "待确认" },
    { id: 2, name: "待出货" },
    { id: 3, name: "待收货" },
    { id: 4, name: "已完成" },
    { id: 5, name: "已撤销" },
]