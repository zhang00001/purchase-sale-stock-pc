import { MessageBox } from 'element-ui'
import { getLodop } from "@/utils/lodop";

import { printNote } from "@/api/index";
// 公共方法
export const common = {
    // confirm弹出框
    confirm: function (params, okCall, cancalCall) {
        MessageBox.confirm(params.content || '', params.title || '', {
            customClass: 'cus-confirm' + (params.className ? ' ' + params.className : ''),
            showClose: params.showClose || false,
            showCancelButton: params.showCancelButton || true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            center: true,
            dangerouslyUseHTMLString: true
            // showClose: false
        })
            .then(() => {
                okCall && okCall()
            })
            .catch(() => {
                cancalCall && cancalCall()
            })
    },

    // 获取前天 后一天日期
    getDayTime: function (status, date) {
        switch (status) {
            case 1:
                return {
                    startTime: new Date(new Date(new Date(date).setHours(0, 0, 0, 0)).getTime() + 8 * 60 * 60 * 1000 - 1 * 24 * 60 * 60 * 1000).toISOString(),
                    endTime: new Date(new Date(new Date(date).setHours(23, 59, 59, 0)).getTime() + 8 * 60 * 60 * 1000 - 1 * 24 * 60 * 60 * 1000).toISOString()

                }
            case 2:
                return {
                    startTime: new Date(new Date(new Date(date).setHours(0, 0, 0, 0)).getTime() + 8 * 60 * 60 * 1000 + 1 * 24 * 60 * 60 * 1000).toISOString(),
                    endTime: new Date(new Date(new Date(date).setHours(23, 59, 59, 0)).getTime() + 8 * 60 * 60 * 1000 + 1 * 24 * 60 * 60 * 1000).toISOString(),


                }

        }
    },
    // 打印

    async  printPdf(type, id) {
        let res = await printNote({ type: type, id: id, tim: 'pc' });
        if (res) {
            console.log(res.data.template_str);

            let LODOP = getLodop();

            //   LODOP.PRINT_INIT("訂貨單");

            LODOP.SET_PRINT_STYLEA(0, "HtmWaitMilSecs", 1000);

            //     LODOP.ADD_PRINT_HTM(100, 400, 100, 20, ` <div class='box1'>
            //     <h4>玛尼服饰有限公司销售单</h4>
            //     <div class='content'>


            //         <p>客户名称：深圳潮品服饰李先生</p>
            //         <p>单号:PF1707131154122046</p>
            //         <p>联系方式：1776371318</p>

            //         <p>单据日期：2016-09-08</p>

            //     </div>
            // </div>`);//眉脚项，禁止第一页输出，也就是第二页往后
            //     LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);//眉脚项，每页输出页/共&

            // LODOP.ADD_PRINT_HTM(730, 450, 300, 100, "<font color='#0000ff' format='ChineseNum'><span tdata='pageNO'>第##页</span>/<span tdata='pageCount'>共##页</span></font>");
            // LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
            LODOP.SET_PRINT_STYLEA(0, "Horient", 1)
            LODOP.SET_PRINT_PAGESIZE(2, 2100, 2970, "");
            LODOP.ADD_PRINT_HTM("10mm", 50, "RightMargin:10mm", "BottomMargin:15mm", res.data.template_str);
            LODOP.PREVIEW();
            // LODOP.PRINT()
        }








    }
}

