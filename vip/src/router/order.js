
const Index = () => import('../views/order/index')
const Order = () => import ('../views/order/order.vue')
const AllOrder = () => import ('../views/order/allOrder.vue')
export default {
    path: '/order',
    component: Index,
    children: [
        {
            path: '',
            component: Order
        },
        {
            path:'/order/all-order',
            component:AllOrder
        }
    ]
}
