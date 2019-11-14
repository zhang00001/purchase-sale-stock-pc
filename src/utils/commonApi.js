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
        let res = await printNote({ type: type, id: id });
        if (res) {
            console.log(res.data.template_str);

            let LODOP = getLodop();

            //   LODOP.PRINT_INIT("訂貨單");

            LODOP.SET_PRINT_STYLEA(0, "HtmWaitMilSecs", 1000);

            // LODOP.SET_PRINT_PAGESIZE(1, 2100, 2100, "");

            LODOP.ADD_PRINT_HTM(88, 200, "100%", "100%", res.data.template_str);
            LODOP.PREVIEW();
            // LODOP.PRINT()
        }








    }
}

