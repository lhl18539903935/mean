
const Index = () => import('../views/user/index')
const User = () => import ('../views/user/user.vue')
const Evaluate = () => import('../views/user/evaluate.vue')
const Favor = () => import('../views/user/favor.vue')
export default {
    path: '/user',
    component: Index,
    children: [
        {
            path: '',
            component: User
        },
        {
            path:'/user/evaluate',
            component:Evaluate
        },
        {
            path:'/user/favor',
            component:Favor
        }
    ]
}