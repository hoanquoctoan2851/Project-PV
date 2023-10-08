import HomeView from '@/views/Page/Home/index.vue'
import LayoutCreate from '@/layout/LayoutCreate.vue'

const home = {
  path: '/',
  name: 'home',
  title: 'layout.menu_main.home',
  component: LayoutCreate,
  redirect: '/home',
  hideMenu: true,
  order: 1,
  children: [
    {
      path: 'home',
      name: 'home',
      alias: '',
      component: HomeView
    }
  ]
}

export default home
