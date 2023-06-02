import store from '@/store';

function userHasPermission(to, from, next) {
  const { permission } = to.meta;
  const permissions = store.getters['auth/permissions'];
  if (Array.isArray(permissions) && permissions.includes(permission)) {
    next();
  } else {
    next('/');
  }
}

export default [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/pages/Home'),
    meta: {
      layout: 'AppLayoutPrivate',
    },
  },
  {
    path: '/landing-page',
    name: 'Landing Page',
    component: () => import('@/pages/LandingPage'),
    meta: {
      layout: 'AppLayoutPrivate',
      permission: 'landing-page.manage',
    },
    beforeEnter: userHasPermission,
  },
  {
    path: '/popup-banner/tambah',
    name: 'Tambah Pop-up Banner',
    component: () => import('@/pages/LandingPage/CreateEditPopupBanner.vue'),
    meta: {
      mode: 'create',
      layout: 'AppLayoutPrivate',
    },
  },
  {
    path: '/popup-banner/detail/:id/ubah',
    name: 'Ubah Pop-up Banner',
    component: () => import('@/pages/LandingPage/CreateEditPopupBanner.vue'),
    meta: {
      mode: 'edit',
      layout: 'AppLayoutPrivate',
    },
  },
  {
    path: '/popup-banner/detail/:id',
    name: 'Pop-up Banner Detail',
    component: () => import('@/pages/LandingPage/PopupBannerDetailPage'),
    meta: {
      layout: 'AppLayoutPrivate',
    },
  },
  {
    path: '/infographics-banner/detail/:id/ubah',
    name: 'Ubah Infografis Banner',
    component: () => import('@/pages/LandingPage/CreateEditInfographicsBanner.vue'),
    meta: {
      mode: 'edit',
      layout: 'AppLayoutPrivate',
    },
  },
  {
    path: '/infographics-banner/tambah',
    name: 'Tambah Infografis Banner',
    component: () => import('@/pages/LandingPage/CreateEditInfographicsBanner.vue'),
    meta: {
      mode: 'create',
      layout: 'AppLayoutPrivate',
    },
  },
  {
    path: '/layanan',
    name: 'Layanan Pemerintah Daerah Provinsi Jawa Barat',
    component: () => import('@/pages/Services'),
    meta: {
      layout: 'AppLayoutPrivate',
    },
  },
  {
    path: '/layanan/master-data/tambah',
    name: 'Layanan Pemerintah Daerah Provinsi Jawa Barat',
    component: () => import('@/pages/Services/CreateEditMasterData.vue'),
    meta: {
      mode: 'create',
      layout: 'AppLayoutPrivate',
    },
  },
  {
    path: '/layanan/master-data/:id/ubah',
    name: 'Ubah Data Layanan Pemerintah Daerah Provinsi Jawa Barat',
    component: () => import('@/pages/Services/CreateEditMasterData.vue'),
    meta: {
      mode: 'edit',
      layout: 'AppLayoutPrivate',
    },
  },
  {
    path: '/layanan/master-data/detail/:id',
    name: 'Master Data Detail',
    component: () => import('@/pages/Services/MasterDataServiceDetail.vue'),
    meta: {
      layout: 'AppLayoutPrivate',
    },
  },
  {
    path: '/agenda',
    name: 'Agenda Jawa Barat',
    component: () => import('@/pages/Agenda'),
    meta: {
      layout: 'AppLayoutPrivate',
    },
  },
  {
    path: '/agenda/detail/:id',
    name: 'Agenda Jawa Barat',
    component: () => import('@/pages/Agenda/AgendaDetail'),
    meta: {
      layout: 'AppLayoutPrivate',
    },
  },
  {
    path: '/agenda/detail/:id/ubah',
    name: 'Ubah Agenda',
    component: () => import('@/pages/Agenda/CreateEditAgenda'),
    meta: {
      mode: 'edit',
      layout: 'AppLayoutPrivate',
    },
  },
  {
    path: '/agenda/tambah',
    name: 'Tambah Agenda Baru',
    component: () => import('@/pages/Agenda/CreateEditAgenda'),
    meta: {
      mode: 'create',
      layout: 'AppLayoutPrivate',
    },
  },
  {
    path: '/berita-dan-artikel',
    name: 'Berita dan Artikel',
    component: () => import('@/pages/News'),
    meta: {
      layout: 'AppLayoutPrivate',
    },
  },
  {
    path: '/berita-dan-artikel/:id/ubah',
    name: 'Ubah Berita',
    component: () => import('@/pages/News/CreateEditNews'),
    meta: {
      mode: 'edit',
      layout: 'AppLayoutPrivate',
    },
  },
  {
    path: '/berita-dan-artikel/tambah',
    name: 'Tulis Berita Baru',
    component: () => import('@/pages/News/CreateEditNews'),
    meta: {
      mode: 'create',
      layout: 'AppLayoutPrivate',
    },
  },
  {
    path: '/berita-dan-artikel/:id/pratinjau',
    name: 'Pratinjau Berita',
    component: () => import('@/pages/News/NewsPreview'),
    meta: {
      layout: 'AppLayoutPublic',
    },
  },
  {
    path: '/pengaturan',
    name: 'Pengaturan',
    component: () => import('@/pages/Settings'),
    meta: {
      layout: 'AppLayoutPrivate',
    },
  },
  {
    path: '/pengaturan/member/detail/:id',
    name: 'Pengaturan - Akun',
    component: () => import('@/pages/Settings/MemberDetail'),
    meta: {
      layout: 'AppLayoutPrivate',
      permission: 'user.manage',
    },
    beforeEnter: userHasPermission,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login'),
    meta: {
      public: true,
      layout: 'AppLayoutPublic',
    },
  },
  {
    path: '/daftar',
    name: 'Buat Akun',
    component: () => import('@/pages/CreateAccount'),
    meta: {
      public: true,
      layout: 'AppLayoutPublic',
    },
  },
  {
    path: '/daftar/error',
    name: 'Link Tidak Valid',
    component: () => import('@/pages/Errors/InvalidRegistrationLink'),
    meta: {
      public: true,
      layout: 'AppLayoutPublic',
    },
  },
  {
    path: '*',
    redirect: '/',
  },
];
