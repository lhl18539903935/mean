
const Index = () => import('../views/shop/index')
const Shop = () => import ('../views/shop/shop.vue')
export default {
    path: '/shop',
    component: Index,
    children: [
        {
            path: '',
            component: Shop
        }
    ]
}
