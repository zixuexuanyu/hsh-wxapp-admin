/* eslint-disable */
import Mock from 'mockjs'

const List = []
const count = 100

const baseContent = '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        // id: '@increment',
        // timestamp: +Mock.Random.date('T'),
        // author: '@first',
        // name: '@first',
        // // title: '@title(5, 10)',
        // phone: 'mock data',
        // rolename: '@float(0, 100, 2, 2)',
        // display_time2: '@datetime',
        // display_time: '@datetime',
        // comment_disabled: true,
        // platforms: ['a-platform']
        id: '@increment',
        name: '@cname()',
        realname: '@cname()',
        phone: '@integer(11)',
        rolename: '@cname()',
        createtime: '@now()',
        endtime: '@now()',
        // states: '@integer(1, 2)',
        'states|1': ['', '开启', '关闭'],
        // id: 1,
        // name: '111',
        // realname: '111',
        // phone: '13211111111',
        // rolename: '111',
        // createtime: '2019-04-15',
        // endtime: '2019-04-16',
        // states: 1,
    }))
}

export default [{
        url: '/platform/list',
        type: 'get',
        response: config => {
            // const { importance, type, title, page = 1, limit = 20, sort } = config.query
            const { name, phone, states, page = 1, limit = 20, sort } = config.query

            let mockList = List.filter(item => {
                // if (importance && item.importance !== +importance) return false
                // if (type && item.type !== type) return false
                if (name && item.name.indexOf(name) < 0) return false
                if (phone && item.phone.indexOf(phone) < 0) return false
                if (states && item.states !== states) return false
                return true
            })

            if (sort === '-id') {
                mockList = mockList.reverse()
            }

            const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

            return {
                code: 20000,
                data: {
                    total: mockList.length,
                    items: pageList
                }
            }
        }
    },

    // {
    //     url: '/article/detail',
    //     type: 'get',
    //     response: config => {
    //         const { id } = config.query
    //         for (const article of List) {
    //             if (article.id === +id) {
    //                 return {
    //                     code: 20000,
    //                     data: article
    //                 }
    //             }
    //         }
    //     }
    // },

    // {
    //     url: '/article/pv',
    //     type: 'get',
    //     response: _ => {
    //         return {
    //             code: 20000,
    //             data: {
    //                 pvData: [
    //                     { key: 'PC', pv: 1024 },
    //                     { key: 'mobile', pv: 1024 },
    //                     { key: 'ios', pv: 1024 },
    //                     { key: 'android', pv: 1024 }
    //                 ]
    //             }
    //         }
    //     }
    // },

    // {
    //     url: '/article/create',
    //     type: 'post',
    //     response: _ => {
    //         return {
    //             code: 20000,
    //             data: 'success'
    //         }
    //     }
    // },

    // {
    //     url: '/article/update',
    //     type: 'post',
    //     response: _ => {
    //         return {
    //             code: 20000,
    //             data: 'success'
    //         }
    //     }
    // }
]