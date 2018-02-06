
const Index = () => import('../views/cart/index')
const Cart = () => import ('../views/cart/cart.vue')
export default {
    path:'/cart',
    component:Index,
    children:[
        {
            path:'',
            component:Cart
        }
    ]
}
