export const NAVIGATION_MENU = [
  {
    link: '/',
    label: 'Dashboard',
    icon: 'DashboardIcon',
    permission: null,
  },
  {
    link: '/landing-page',
    label: 'Landing Page',
    icon: 'LandingPageIcon',
    arrow: true,
    permission: 'landing-page.manage',
  },
  {
    link: '/layanan',
    label: 'Layanan',
    icon: 'ServiceIcon',
    arrow: true,
    permission: null,
  },
  {
    link: '/agenda',
    label: 'Agenda',
    icon: 'AgendaIcon',
    permission: null,
  },
  {
    link: '/berita-dan-artikel',
    label: 'Berita dan Artikel',
    icon: 'NewsIcon',
    arrow: true,
    permission: null,
  },
  {
    link: '/profil-jawa-barat',
    label: 'Profil Jawa Barat',
    icon: 'GedungSateIcon',
    arrow: true,
    permission: 'profile-west-java.manage',
  },
];

export const AGENDA_TABLE_HEADER = [
  {
    key: 'title',
    text: 'Judul Agenda/Event',
    sortable: true,
  },
  {
    key: 'category',
    text: 'Ketegori',
    sortable: true,
  },
  {
    key: 'date',
    text: 'Tanggal',
    sortable: true,
  },
  {
    key: 'time',
    text: 'Waktu',
    sortable: true,
  },
  {
    key: 'type',
    text: 'Tipe Agenda',
    sortable: true,
  },
  {
    key: 'action',
    text: 'Aksi',
  },
];

export const AGENDA_CATEGORIES = [
  {
    label: 'Gubernur',
    value: 'Gubernur',
  },
  {
    label: 'Wakil Gubernur',
    value: 'Wakil Gubernur',
  },
  {
    label: 'Bu Atalia',
    value: 'Bu Atalia',
  },
  {
    label: 'Sekretaris Daerah',
    value: 'Sekretaris Daerah',
  },
  {
    label: 'OPD',
    value: 'OPD',
  },
  {
    label: 'Event Jawa Barat',
    value: 'Event Jawa Barat',
  },
];

export const AGENDA_TYPES = [
  {
    label: 'Agenda Offline',
    value: 'offline',
  },
  {
    label: 'Agenda Online',
    value: 'online',
  },
];

export const AGENDA_STATUS_MAP = {
  publish: 'Telah Dipublish',
  unpublish: 'Belum Dipublish',
  archive: 'Dibuang',
};

export const NEWS_CATEGORIES = [
  {
    value: 'ekonomi',
    label: 'Ekonomi',
  },
  {
    value: 'kesehatan',
    label: 'Kesehatan',
  },
  {
    value: 'pendidikan',
    label: 'Pendidikan',
  },
  {
    value: 'pemerintahan',
    label: 'Pemerintahan',
  },
  {
    value: 'infrastruktur',
    label: 'Infrastruktur',
  },
  {
    value: 'sosial',
    label: 'Sosial',
  },
  {
    value: 'teknologi',
    label: 'Teknologi',
  },
];

export const NEWS_DURATION = [
  {
    label: '5 Hari',
    value: 5,
  },
  {
    label: '1 Minggu',
    value: 7,
  },
  {
    label: '2 Minggu',
    value: 14,
  },
  {
    label: 'Tanpa Batas',
    value: -1,
  },
];

export const NEWS_TABLE_HEADER = [
  {
    key: 'title',
    text: 'Judul Berita',
    sortable: true,
  },
  {
    key: 'category',
    text: 'Kategori',
    sortable: true,
  },
  {
    key: 'created_by',
    text: 'Dibuat oleh',
    sortable: true,
  },
  {
    key: 'updated_at',
    text: 'Terakhir Diupdate',
    sortable: true,
  },
  {
    key: 'status',
    text: 'Status',
    sortable: true,
  },
  {
    key: 'action',
    text: 'Aksi',
  },
];

export const NEWS_STATUS_MAP = {
  PUBLISHED: 'Diterbitkan',
  DRAFT: 'Tersimpan',
  ARCHIVED: 'Diarsipkan',
  REVIEW: 'Menunggu Review',
};

export const MEMBER_TABLE_HEADER = [
  {
    key: 'name',
    text: 'Nama',
    // sortable: true,
  },
  {
    key: 'email',
    text: 'Email',
    // sortable: true,
  },
  {
    key: 'role',
    text: 'Keanggotaan',
    // sortable: true,
  },
  {
    key: 'last_active',
    text: 'Terakhir Aktif',
    // sortable: true,
  },
  {
    key: 'status',
    text: 'Status',
    // sortable: true,
  },
  {
    key: 'action',
    text: 'Aksi',
  },
];

export const POPUP_BANNER_TABLE_HEADER = [
  {
    key: 'title',
    text: 'Judul Banner',
  },
  {
    key: 'preview',
    text: 'Preview',
  },
  {
    key: 'link',
    text: 'Link Button',
  },
  {
    key: 'duration',
    text: 'Durasi Penayangan',
  },
  {
    key: 'start_date',
    text: 'Waktu Mulai Penayangan',
  },
  {
    key: 'status',
    text: 'Status',
  },
  {
    key: 'action',
    text: 'Aksi',
  },
];

export const POPUP_BANNER_SCHEDULE_OPTIONS = [
  {
    label: '2 Hari',
    value: 2,
  },
  {
    label: '5 Hari',
    value: 5,
  },
  {
    label: '7 Hari',
    value: 7,
  },
  {
    label: '14 Hari',
    value: 14,
  },
  {
    label: '30 Hari',
    value: 30,
  },
];

export const STATUS_MODAL = {
  NONE: 'NONE',
  CONFIRMATION: 'CONFIRMATION',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

export const MASTER_DATA_TABLE_HEADER = [
  {
    key: 'title',
    text: 'Nama Layanan',
    sortable: false,
  },
  {
    key: 'author',
    text: 'Author',
    sortable: false,
  },
  {
    key: 'user',
    text: 'Pengguna Layanan',
    sortable: false,
  },
  {
    key: 'technical',
    text: 'Teknis Layanan',
    sortable: false,
  },
  {
    key: 'updated',
    text: 'Diperbarui',
    sortable: false,
  },
  {
    key: 'status',
    text: 'Status',
    sortable: false,
  },
  {
    key: 'action',
    text: 'Aksi',
    sortable: false,
  },
];

export const MASTER_DATA_STATUS_MAP = {
  ALLSERVICES: 'Semua Layanan',
  DRAFT: 'Draf',
  ARCHIVE: 'Tersimpan',
};

export const PUBLICATION_TABLE_HEADER = [
  {
    key: 'title',
    text: 'Nama Layanan',
    sortable: false,
  },
  {
    key: 'author',
    text: 'Author',
    sortable: false,
  },
  {
    key: 'user',
    text: 'Pengguna Layanan',
    sortable: false,
  },
  {
    key: 'technical',
    text: 'Teknis Layanan',
    sortable: false,
  },
  {
    key: 'updated',
    text: 'Diperbarui',
    sortable: false,
  },
  {
    key: 'status',
    text: 'Status',
    sortable: false,
  },
  {
    key: 'action',
    text: 'Aksi',
    sortable: false,
  },
];

export const PUBLICATION_STATUS_MAP = {
  ALLSERVICES: 'Semua Layanan',
  //  @NOTE: In publication status Archive property have an value or label in User as Draf
  ARCHIVE: 'Draf',
  PUBLISH: 'Terbit',
};

export const DAY_MAP = {
  MONDAY: 'Senin',
  TUESDAY: 'Selasa',
  WEDNESDAY: 'Rabu',
  THURSDAY: 'Kamis',
  FRIDAY: 'Jumat',
  SATURDAY: 'Sabtu',
  SUNDAY: 'Minggu',
};

export const INFO_GRAPHICS_BANNER_TABLE_HEADER = [
  {
    key: 'title',
    text: 'Judul Banner',
  },
  {
    key: 'preview',
    text: 'Preview',
  },
  {
    key: 'sequence',
    text: 'Urutan',
  },
  {
    key: 'link',
    text: 'Link Redirect',
  },
  {
    key: 'status',
    text: 'Status',
  },
  {
    key: 'action',
    text: 'Aksi',
  },
];

export const QUICK_LINK_TABLE_HEADER = [
  {
    key: 'title',
    text: 'Judul Program',
  },
  {
    key: 'preview',
    text: 'Preview',
  },
  {
    key: 'link',
    text: 'Link Redirect',
  },
  {
    key: 'status',
    text: 'Status',
  },
  {
    key: 'action',
    text: 'Aksi',
  },
];

export const DOCUMENT_TABLE_HEADER = [
  {
    key: 'title',
    text: 'Judul Dokumen',
    sortable: false,
  },
  {
    key: 'category',
    text: 'Kategori',
    sortable: false,
  },
  {
    key: 'status',
    text: 'Status',
    sortable: false,
  },
  {
    key: 'updated',
    text: 'Terakhir Diupdate',
    sortable: false,
  },
  {
    key: 'action',
    text: 'Aksi',
    sortable: false,
  },
];

export const DOCUMENT_STATUS_MAP = {
  DRAFT: 'Draf',
  ARCHIVED: 'Diarsipkan',
  PUBLISHED: 'Terbit',
};

export const DOCUMENT_STATUS_ADDITIONAL_BUTTON = {
  DRAFT: 'Terbitkan',
  ARCHIVED: 'Pulihkan',
  PUBLISHED: 'Arsipkan',
};
