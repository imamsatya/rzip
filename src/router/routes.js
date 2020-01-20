
const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('pages/S-Login.vue')
    // children: [{
    //   path: '',
    //   component: () => import('pages/S-Login.vue')
    // }]
  },
  {
    path: '/home',
    meta: {
      kunci: true
    },
    component: () => import('layouts/S-Layout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/tabel',
    meta: {
      kunci: true
    },
    component: () => import('layouts/S-Layout.vue'),
    children: [{
      path: '',
      component: () => import('pages/S-Tabel.vue')
    }]
  },
  {
    path: '/about',
    meta: {
      kunci: true
    },
    component: () => import('layouts/S-Layout.vue'),
    children: [{
      path: '',
      component: () => import('pages/S-About.vue')
    }]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
