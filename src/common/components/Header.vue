<template>
  <header
    ref="header"
    data-cy="header__container"
    class="z-50 w-full h-[72px] sticky top-0 px-6 flex items-center justify-between bg-white"
  >
    <h1
      ref="header-title"
      data-cy="header__title"
      class="font-roboto text-xl font-bold text-blue-gray-800 mr-4"
    >
      {{ pageName }}
    </h1>
    <div class="flex">
      <!-- Notification -->
      <!-- NOTE: Temporarily hide this feature -->
      <!-- <button
        ref="header-notification"
        title="Notification"
      >
        <JdsBadge
          :show="notification"
          class="notification__custom-badge"
          :value="1"
        >
          <JdsIcon
            fill="#069550"
            name="bell"
            size="20px"
          />
        </JdsBadge>
      </button> -->
      <!-- User Dropdown -->
      <div
        ref="header-user"
        data-cy="header__user"
        class="ml-4"
      >
        <JdsPopover :value="isUserDropdownOpen">
          <template #activator>
            <div
              v-on-clickaway="closeUserDropdown"
              class="grid grid-cols-[34px,_minmax(0,_1fr)] gap-4 items-center"
            >
              <img
                ref="header-user-avatar"
                data-cy="header__user-avatar"
                :src="userAvatar"
                alt="user avatar"
                width="34"
                height="34"
                class="w-[34px] h-[34px] max-w-full object-cover object-center rounded-full border-2 border-green-700 bg-gray-500"
              >
              <button
                ref="header-user-dropdown-button"
                data-cy="header__user-dropdown-button"
                class="flex items-center"
                :title="userRole"
                @click="toggleUserDropdown"
              >
                <p
                  ref="header-user-name"
                  data-cy="header__user-name"
                  class="max-w-[100px] text-left font-lato font-semibold text-sm text-blue-gray-800 line-clamp-1 mr-2"
                >
                  {{ userRole }}
                </p>
                <JdsIcon
                  fill="#069550"
                  name="chevron-right"
                  size="16px"
                  class="w-4 h-4 transition-all ease-in duration-150"
                  :class="isUserDropdownOpen ? 'rotate-90' : 'null'"
                />
              </button>
            </div>
          </template>
          <div class="relative z-50 w-full bg-white rounded-lg shadow-xl p-2">
            <ul
              ref="header-user-dropdown-menu"
              data-cy="header__user-dropdown-menu"
              class="flex flex-col gap-2"
            >
              <router-link
                v-slot="{ href, navigate }"
                to="/pengaturan"
                custom
              >
                <li class="p-2 rounded-md group hover:bg-green-50">
                  <a
                    :href="href"
                    class="flex gap-2 items-center font-lato font-medium text-sm
                    text-gray-800 group-hover:text-green-700"
                    @click="navigate"
                  >
                    <SettingIcon class="h-5 w-5 fill-black group-hover:fill-green-700" />
                    Pengaturan Akun
                  </a>
                </li>
              </router-link>
              <button
                data-cy="header__user-logout-button"
                class="p-2 rounded-md group hover:bg-green-50"
                @click="openLogoutModal"
              >
                <p
                  class="flex gap-2 items-center font-lato font-medium text-sm text-gray-800
                  group-hover:text-green-700"
                >
                  <LogoutIcon class="h-5 w-5 fill-black group-hover:fill-green-700" />
                  Keluar
                </p>
              </button>
            </ul>
          </div>
        </JdsPopover>
      </div>
    </div>
    <!-- Logout Modal -->
    <BaseModal
      ref="header-logout-modal"
      data-cy="header__logout-modal"
      :open="isLogoutModalOpen"
      @close="closeLogoutModal"
    >
      <div class="w-full h-full">
        <h1
          data-cy="header__logout-modal-title"
          class="font-roboto font-bold text-center text-green-700 text-[21px] leading-[34px] mb-4"
        >
          Keluar CMS
        </h1>
        <p
          data-cy="header__logout-modal-subtitle"
          class="text-center text-sm text-gray-800"
        >
          Apakah Anda yakin akan keluar dari CMS Portal Jabar?
        </p>
      </div>
      <template #footer>
        <div class="flex w-full h-full items-center justify-center gap-4">
          <BaseButton
            data-cy="header__logout-modal-cancel-button"
            class="border-green-700 hover:bg-green-50 text-sm text-green-700"
            @click="closeLogoutModal"
          >
            Batal
          </BaseButton>
          <BaseButton
            data-cy="header__logout-modal-logout-button"
            class="bg-green-700 hover:bg-green-600 text-sm text-white"
            @click="onLogout"
          >
            Ya, saya yakin
          </BaseButton>
        </div>
      </template>
    </BaseModal>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';
import { directive as onClickaway } from 'vue-clickaway';
import BaseModal from '@/common/components/BaseModal';
import BaseButton from '@/common/components/BaseButton';
import SettingIcon from '@/assets/icons/setting-outline.svg?inline';
import LogoutIcon from '@/assets/icons/logout.svg?inline';
import defaultAvatar from '@/assets/icons/user-avatar.svg';

export default {
  name: 'Header',
  directives: {
    onClickaway,
  },
  components: {
    BaseModal,
    BaseButton,
    SettingIcon,
    LogoutIcon,
  },
  data() {
    return {
      notification: false,
      isUserDropdownOpen: false,
      isLogoutModalOpen: false,
    };
  },
  computed: {
    ...mapGetters('auth', ['user']),
    pageName() {
      return this.$route.name;
    },
    userAvatar() {
      return this.user?.photo || defaultAvatar;
    },
    userRole() {
      return this.user?.role?.name || '';
    },
  },
  methods: {
    toggleUserDropdown() {
      this.isUserDropdownOpen = !this.isUserDropdownOpen;
    },
    closeUserDropdown() {
      this.isUserDropdownOpen = false;
    },
    openLogoutModal() {
      this.isUserDropdownOpen = false;
      this.isLogoutModalOpen = true;
    },
    closeLogoutModal() {
      this.isLogoutModalOpen = false;
    },
    async onLogout() {
      await this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
  },
};
</script>

<style>
.notification__custom-badge .jds-badge__indicator {
  position: relative !important;
  left: -12px !important;
}

.notification__custom-badge .jds-badge__indicator span {
  color: white !important;
  font-weight: bold !important;
}
</style>
