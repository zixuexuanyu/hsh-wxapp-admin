/* eslint-disable */
import request from '@/utils/request'

export function fetchList(query) {
    return request({
        url: '/platform/list',
        method: 'get',
        params: query
    })
}
// export function supplierUserList(query) {
//     return request({
//         url: '/page/saas/supplierUser/list',
//         method: 'get',
//         params: query
//     })
// }

// export function fetchArticle(id) {
//   return request({
//     url: '/platform/detail',
//     method: 'get',
//     params: { id }
//   })
// }

// export function fetchPv(pv) {
//   return request({
//     url: '/platform/pv',
//     method: 'get',
//     params: { pv }
//   })
// }

// export function createArticle(data) {
//   return request({
//     url: '/platform/create',
//     method: 'post',
//     data
//   })
// }

// export function updateArticle(data) {
//   return request({
//     url: '/platform/update',
//     method: 'post',
//     data
//   })
// }