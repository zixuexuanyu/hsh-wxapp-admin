/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [{
            path: '/redirect/:path*',
            component: () =>
                import ('@/views/redirect/index')
        }]
    },
    {
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },
    // {
    //     path: '/auth-redirect',
    //     component: () =>
    //         import ('@/views/login/auth-redirect'),
    //     hidden: true
    // },
    {
        path: '/404',
        component: () =>
            import ('@/views/error-page/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () =>
            import ('@/views/error-page/401'),
        hidden: true
    },
    {
        path: '',
        component: Layout,
        redirect: 'dashboard',
        children: [{
            path: 'dashboard',
            component: () =>
                import ('@/views/dashboard/index'),
            name: 'Dashboard',
            meta: { title: 'dashboard', icon: 'dashboard', noCache: true, affix: true }
        }]
    },
    {
        path: '/platformAnagement',
        component: Layout,
        redirect: '/platformAnagement',
        alwaysShow: true, // will always show the root menu
        name: 'PlatformAnagement',
        meta: {
            title: 'platformAnagement',
            icon: 'peoples',
            roles: ['admin', 'editor'] // you can set roles in root nav
        },

        children: [{
                path: 'PlatformUser',
                component: () =>
                    import ('@/views/platformAnagement/platformUser'),
                name: 'PlatformUser',
                meta: {
                    title: 'platformUser',
                    roles: ['admin'] // or you can only set roles in sub nav
                }
            },
            {
                path: 'PlatformRole',
                component: () =>
                    import ('@/views/platformAnagement/platformRole'),
                name: 'PlatformRole',
                meta: {
                    title: 'platformRole',
                    roles: ['admin'] // or you can only set roles in sub nav
                }
            },
            {
                path: 'classifyManagement',
                component: () =>
                    import ('@/views/platformAnagement/classifyManagement'),
                name: 'ClassifyManagement',
                meta: {
                    title: 'classifyManagement',
                    roles: ['admin'] // or you can only set roles in sub nav
                }
            },
            {
                path: 'roleUser/:id(\\d+)',
                // path: 'roleUser',
                component: () =>
                    import ('@/views/platformAnagement/roleUser'),
                name: 'RoleUser',
                meta: { title: 'roleUser', noCache: true, activeMenu: '/platformAnagement' },
                hidden: true
            },
        ]
    },
    {
        path: '/supplierManagement',
        component: Layout,
        redirect: '/supplierManagement',
        alwaysShow: true, // will always show the root menu
        name: 'SupplierManagement',
        meta: {
            title: 'supplierManagement',
            icon: 'peoples',
            roles: ['admin'] // you can set roles in root nav
        },

        children: [{
                path: 'shopMaintenance',
                component: () =>
                    import ('@/views/supplierManagement/shopMaintenance'),
                name: 'ShopMaintenance',
                meta: {
                    title: 'shopMaintenance'
                }
            },
            {
                path: 'addShop',
                component: () =>
                    import ('@/views/supplierManagement/addShop'),
                name: 'AddShop',
                meta: {
                    title: 'addShop',
                    noCache: true,
                    activeMenu: '/supplierManagement'
                },
                hidden: true
            },
            {
                path: 'editShop/:id(\\d+)',
                component: () =>
                    import ('@/views/supplierManagement/editShop'),
                name: 'EditShop',
                meta: {
                    title: 'editShop',
                    noCache: true,
                    activeMenu: '/supplierManagement'
                },
                hidden: true
            },
            {
                path: 'commodityMaintenance/:id(\\d+)',
                component: () =>
                    import ('@/views/supplierManagement/commodityMaintenance'),
                name: 'CommodityMaintenance',
                meta: {
                    title: 'commodityMaintenance',
                    noCache: true,
                    activeMenu: '/supplierManagement'
                },
                hidden: true
            },
            {
                path: 'addMerchandise',
                component: () =>
                    import ('@/views/supplierManagement/addMerchandise'),
                name: 'AddMerchandise',
                meta: {
                    title: 'addMerchandise',
                    noCache: true,
                    activeMenu: '/supplierManagement'
                },
                hidden: true
            },
            {
                path: 'editMerchandise/:id(\\d+)',
                component: () =>
                    import ('@/views/supplierManagement/editMerchandise'),
                name: 'EditMerchandise',
                meta: {
                    title: 'editMerchandise',
                    noCache: true,
                    activeMenu: '/supplierManagement'
                },
                hidden: true
            },
            {
                path: 'addToWarehouse/:id(\\d+)',
                component: () =>
                    import ('@/views/supplierManagement/addToWarehouse'),
                name: 'AddToWarehouse',
                meta: {
                    title: 'addToWarehouse',
                    noCache: true,
                    activeMenu: '/supplierManagement'
                },
                hidden: true
            },
            {
                path: 'accountInformation/:id(\\d+)',
                component: () =>
                    import ('@/views/supplierManagement/accountInformation'),
                name: 'AccountInformation',
                meta: {
                    title: 'accountInformation',
                    noCache: true,
                    activeMenu: '/supplierManagement'
                },
                hidden: true
            },
            {
                path: 'detailsBalance/:id(\\d+)',
                component: () =>
                    import ('@/views/supplierManagement/detailsBalance'),
                name: 'DetailsBalance',
                meta: {
                    title: 'detailsBalance',
                    noCache: true,
                    activeMenu: '/supplierManagement'
                },
                hidden: true
            },
            {
                path: 'sorderDetails',
                // path: 'roleUser',
                component: () =>
                    import ('@/views/supplierManagement/sorderDetails'),
                name: 'SorderDetails',
                meta: {
                    title: 'sorderDetails',
                    roles: ['admin']
                },
            },
        ]
    },
    {
        path: '/purchaserManagement',
        component: Layout,
        redirect: '/purchaserManagement',
        alwaysShow: true, // will always show the root menu
        name: 'PurchaserManagement',
        meta: {
            title: 'purchaserManagement',
            icon: 'peoples',
            roles: ['admin'] // you can set roles in root nav
        },

        children: [{
                path: 'userManagement',
                component: () =>
                    import ('@/views/purchaserManagement/userManagement'),
                name: 'UserManagement',
                meta: {
                    title: 'userManagement',
                    roles: ['admin'] // or you can only set roles in sub nav
                }
            },
            {
                path: 'visitingHistory/:id(\\d+)',
                component: () =>
                    import ('@/views/purchaserManagement/visitingHistory'),
                name: 'VisitingHistory',
                meta: {
                    title: 'visitingHistory',
                    noCache: true,
                    activeMenu: '/purchaserManagement'
                },
                hidden: true
            },
            {
                path: 'porderDetails/:id(\\d+)',
                // path: 'roleUser',
                component: () =>
                    import ('@/views/purchaserManagement/porderDetails'),
                name: 'PorderDetails',
                meta: { title: 'porderDetails', noCache: true, activeMenu: '/purchaserManagement' },
                hidden: true
            },
        ]
    },
    {
        path: '/auditManagement',
        component: Layout,
        redirect: '/auditManagement',
        alwaysShow: true, // will always show the root menu
        name: 'AuditManagement',
        meta: {
            title: 'auditManagement',
            icon: 'documentation',
            roles: ['admin', 'editor'] // you can set roles in root nav
        },
        children: [{
            path: 'CommodityAudit',
            component: () =>
                import ('@/views/auditManagement/commodityAudit'),
            name: 'commodityAudit',
            meta: {
                title: 'commodityAudit',
                roles: ['admin'] // or you can only set roles in sub nav
            }
        }, ]
    },
    {
        path: '/financialManagement',
        component: Layout,
        redirect: '/financialManagement',
        alwaysShow: true, // will always show the root menu
        name: 'FinancialManagement',
        meta: {
            title: 'financialManagement',
            icon: 'documentation',
            roles: ['admin'] // you can set roles in root nav
        },
        children: [{
            path: 'cashWithdrawal',
            component: () =>
                import ('@/views/financialManagement/cashWithdrawal'),
            name: 'CashWithdrawal',
            meta: {
                title: 'cashWithdrawal',
                roles: ['admin'] // or you can only set roles in sub nav
            }
        }, {
            path: 'PlatformPipelining',
            component: () =>
                import ('@/views/financialManagement/platformPipelining'),
            name: 'platformPipelining',
            meta: {
                title: 'platformPipelining',
                roles: ['admin'] // or you can only set roles in sub nav
            }
        }, ]
    },
    // {
    //     path: '/documentation',
    //     component: Layout,
    //     children: [{
    //         path: 'index',
    //         component: () =>
    //             import ('@/views/documentation/index'),
    //         name: 'Documentation',
    //         meta: { title: 'documentation', icon: 'documentation', affix: true }
    //     }]
    // },
    // {
    //     path: '/guide',
    //     component: Layout,
    //     redirect: '/guide/index',
    //     children: [{
    //         path: 'index',
    //         component: () =>
    //             import ('@/views/guide/index'),
    //         name: 'Guide',
    //         meta: { title: 'guide', icon: 'guide', noCache: true }
    //     }]
    // }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
    // {
    //       path: '/permission',
    //       component: Layout,
    //       redirect: '/permission/page',
    //       alwaysShow: true, // will always show the root menu
    //       name: 'Permission',
    //       meta: {
    //           title: 'permission',
    //           icon: 'lock',
    //           roles: ['admin', 'editor'] // you can set roles in root nav
    //       },
    //       children: [{
    //               path: 'page',
    //               component: () =>
    //                   import ('@/views/permission/page'),
    //               name: 'PagePermission',
    //               meta: {
    //                   title: 'pagePermission',
    //                   roles: ['admin'] // or you can only set roles in sub nav
    //               }
    //           },
    //           {
    //               path: 'directive',
    //               component: () =>
    //                   import ('@/views/permission/directive'),
    //               name: 'DirectivePermission',
    //               meta: {
    //                   title: 'directivePermission'
    //                       // if do not set roles, means: this page does not require permission
    //               }
    //           },
    //           {
    //               path: 'role',
    //               component: () =>
    //                   import ('@/views/permission/role'),
    //               name: 'RolePermission',
    //               meta: {
    //                   title: 'rolePermission',
    //                   roles: ['admin']
    //               }
    //           }
    //       ]
    //   },

    //   {
    //       path: '/icon',
    //       component: Layout,
    //       children: [{
    //           path: 'index',
    //           component: () =>
    //               import ('@/views/svg-icons/index'),
    //           name: 'Icons',
    //           meta: { title: 'icons', icon: 'icon', noCache: true }
    //       }]
    //   },

    //   /** when your routing map is too long, you can split it into small modules **/
    //   componentsRouter,
    //   chartsRouter,
    //   nestedRouter,
    //   tableRouter,

    //   {
    //       path: '/example',
    //       component: Layout,
    //       redirect: '/example/list',
    //       name: 'Example',
    //       meta: {
    //           title: 'example',
    //           icon: 'example'
    //       },
    //       children: [{
    //               path: 'create',
    //               component: () =>
    //                   import ('@/views/example/create'),
    //               name: 'CreateArticle',
    //               meta: { title: 'createArticle', icon: 'edit' }
    //           },
    //           {
    //               path: 'edit/:id(\\d+)',
    //               component: () =>
    //                   import ('@/views/example/edit'),
    //               name: 'EditArticle',
    //               meta: { title: 'editArticle', noCache: true, activeMenu: '/example/list' },
    //               hidden: true
    //           },
    //           {
    //               path: 'list',
    //               component: () =>
    //                   import ('@/views/example/list'),
    //               name: 'ArticleList',
    //               meta: { title: 'articleList', icon: 'list' }
    //           }
    //       ]
    //   },

    //   {
    //       path: '/tab',
    //       component: Layout,
    //       children: [{
    //           path: 'index',
    //           component: () =>
    //               import ('@/views/tab/index'),
    //           name: 'Tab',
    //           meta: { title: 'tab', icon: 'tab' }
    //       }]
    //   },

    //   {
    //       path: '/error',
    //       component: Layout,
    //       redirect: 'noredirect',
    //       name: 'ErrorPages',
    //       meta: {
    //           title: 'errorPages',
    //           icon: '404'
    //       },
    //       children: [{
    //               path: '401',
    //               component: () =>
    //                   import ('@/views/error-page/401'),
    //               name: 'Page401',
    //               meta: { title: 'page401', noCache: true }
    //           },
    //           {
    //               path: '404',
    //               component: () =>
    //                   import ('@/views/error-page/404'),
    //               name: 'Page404',
    //               meta: { title: 'page404', noCache: true }
    //           }
    //       ]
    //   },

    //   {
    //       path: '/error-log',
    //       component: Layout,
    //       redirect: 'noredirect',
    //       children: [{
    //           path: 'log',
    //           component: () =>
    //               import ('@/views/error-log/index'),
    //           name: 'ErrorLog',
    //           meta: { title: 'errorLog', icon: 'bug' }
    //       }]
    //   },

    //   {
    //       path: '/excel',
    //       component: Layout,
    //       redirect: '/excel/export-excel',
    //       name: 'Excel',
    //       meta: {
    //           title: 'excel',
    //           icon: 'excel'
    //       },
    //       children: [{
    //               path: 'export-excel',
    //               component: () =>
    //                   import ('@/views/excel/export-excel'),
    //               name: 'ExportExcel',
    //               meta: { title: 'exportExcel' }
    //           },
    //           {
    //               path: 'export-selected-excel',
    //               component: () =>
    //                   import ('@/views/excel/select-excel'),
    //               name: 'SelectExcel',
    //               meta: { title: 'selectExcel' }
    //           },
    //           {
    //               path: 'export-merge-header',
    //               component: () =>
    //                   import ('@/views/excel/merge-header'),
    //               name: 'MergeHeader',
    //               meta: { title: 'mergeHeader' }
    //           },
    //           {
    //               path: 'upload-excel',
    //               component: () =>
    //                   import ('@/views/excel/upload-excel'),
    //               name: 'UploadExcel',
    //               meta: { title: 'uploadExcel' }
    //           }
    //       ]
    //   },

    //   {
    //       path: '/zip',
    //       component: Layout,
    //       redirect: '/zip/download',
    //       alwaysShow: true,
    //       name: 'Zip',
    //       meta: { title: 'zip', icon: 'zip' },
    //       children: [{
    //           path: 'download',
    //           component: () =>
    //               import ('@/views/zip/index'),
    //           name: 'ExportZip',
    //           meta: { title: 'exportZip' }
    //       }]
    //   },

    //   {
    //       path: '/pdf',
    //       component: Layout,
    //       redirect: '/pdf/index',
    //       children: [{
    //           path: 'index',
    //           component: () =>
    //               import ('@/views/pdf/index'),
    //           name: 'PDF',
    //           meta: { title: 'pdf', icon: 'pdf' }
    //       }]
    //   },
    //   {
    //       path: '/pdf/download',
    //       component: () =>
    //           import ('@/views/pdf/download'),
    //       hidden: true
    //   },

    //   {
    //       path: '/theme',
    //       component: Layout,
    //       redirect: 'noredirect',
    //       children: [{
    //           path: 'index',
    //           component: () =>
    //               import ('@/views/theme/index'),
    //           name: 'Theme',
    //           meta: { title: 'theme', icon: 'theme' }
    //       }]
    //   },

    //   {
    //       path: '/clipboard',
    //       component: Layout,
    //       redirect: 'noredirect',
    //       children: [{
    //           path: 'index',
    //           component: () =>
    //               import ('@/views/clipboard/index'),
    //           name: 'ClipboardDemo',
    //           meta: { title: 'clipboardDemo', icon: 'clipboard' }
    //       }]
    //   },

    //   {
    //       path: '/i18n',
    //       component: Layout,
    //       children: [{
    //           path: 'index',
    //           component: () =>
    //               import ('@/views/i18n-demo/index'),
    //           name: 'I18n',
    //           meta: { title: 'i18n', icon: 'international' }
    //       }]
    //   },

    //   {
    //       path: 'external-link',
    //       component: Layout,
    //       children: [{
    //           path: 'https://github.com/PanJiaChen/vue-element-admin',
    //           meta: { title: 'externalLink', icon: 'link' }
    //       }]
    //   },

    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router