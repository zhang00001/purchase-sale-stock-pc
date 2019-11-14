import { Message, MessageBox } from 'element-ui'
/* 合法uri*/
// export function validateURL(textval) {
//     const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
//     return urlregex.test(textval)
// }

/* 小写字母*/
// export function validateLowerCase(str) {
//     const reg = /^[a-z]+$/
//     return reg.test(str)
// }

/* 大写字母*/
// export function validateUpperCase(str) {
//     const reg = /^[A-Z]+$/
//     return reg.test(str)
// }

// /* 大小写字母*/
// export function validatAlphabets(str) {
//     const reg = /^[A-Za-z]+$/
//     return reg.test(str)
// }

/**
 * @param {校验类型  'numDecimal':最多保留两位, 'alphabets':大小写, upperCase, lowerCase， nonzero：非零数字} type
 */
export const validate = (str, type) => {
    let isMatch = false,
        isNumDecimal = /^[+-]?\d+(?:\.\d{1,2})?$/, // 最多保留两位
        isNonzero = /^-?[1-9]\d*$/ // 非零数字
        // isAlphabet = /^[A-Za-z]+$/ // 大小写
        // isUpperCase = /^[A-Z]+$/
        // isLowerCase = /^[a-z]+$/
        // isUrl = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/

    switch (type) {
        case 'numDecimal':
            if (isNumDecimal.test(str)) {
                isMatch = true
            }
            break
        case 'nonzero':
            if (isNonzero.test(str)) {
                isMatch = true
            }
            break

            // case 'alphabets':
            //     if (isAlphabet.test(str)) {
            //         isMatch = true
            //     }
            //     break

            // case 'upperCase':
            //     if (isUpperCase.test(str)) {
            //         isMatch = true
            //     }
            //     break

            // case 'lowerCase':
            //     if (isLowerCase.test(str)) {
            //         isMatch = true
            //     }
            //     break

            // case 'url':
            //     if (isUrl.test(str)) {
            //         isMatch = true
            //     }
            //     break
    }
    return isMatch
}