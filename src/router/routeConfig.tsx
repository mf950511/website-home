import { lazy } from 'react'
const Home = lazy(() => import('pages/home'))
// 外层主路由
export const rootRouter = [
  {
    component: Home,
    path: '/home'
  },
  {
    to: '/home',
    from: '/',
    redirect: true,
  }
]
