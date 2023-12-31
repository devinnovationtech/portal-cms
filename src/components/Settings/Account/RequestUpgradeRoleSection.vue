<template>
  <!-- eslint-disable vue/no-v-html -->
  <section class="px-6 py-4 bg-white rounded-lg">
    <h2 class="text-xl text-green-700 font-medium">
      Pengajuan Akun Administrator
    </h2>
    <div class="flex justify-between items-center py-4">
      <div class="flex flex-col flex-grow gap-2">
        <p class="font-lato text-sm text-blue-gray-800 mb-2">
          Saat ini akun Anda merupakan <span class="font-bold">{{ userRole }}</span> untuk <span class="font-bold">{{ userUnit }}</span>.
        </p>
        <div class="flex gap-6 items-center">
          <BaseButton
            class="border-green-700 hover:bg-green-50 text-sm text-green-700"
            @click="togglePreviewModal"
          >
            Ajukan akun sebagai Administrator
          </BaseButton>
          <a
            href="#"
            class="font-lato text-sm text-blue-700 underline hover:text-blue-800"
          >
            Pelajari lebih lanjut tentang akun Anda
          </a>
        </div>
      </div>
    </div>
    <BaseModal :open="isPreviewModalOpen">
      <div class="w-full p-2">
        <h1 class="font-roboto text-xl leading-8 font-medium text-green-700 mb-6">
          Email Pengajuan Akun Administrator
        </h1>
        <div class="mb-6">
          <p class="text-blue-gray-300 mb-1">
            Dikirimkan Kepada:
          </p>
          <p class="font-lato text-sm text-blue-gray-800 mb-4">
            {{ previewModalContent.to }}
          </p>
        </div>
        <div class="mb-6">
          <p class="text-blue-gray-300 mb-1">
            Subjek:
          </p>
          <p class="font-lato text-sm text-blue-gray-800 mb-4">
            {{ previewModalContent.subject }}
          </p>
        </div>
        <div class="mb-6">
          <p class="text-blue-gray-300 mb-1">
            Isi Pengajuan:
          </p>
          <p
            class="font-lato text-sm text-blue-gray-800 mb-4 max-w-xl"
            v-html="previewModalContent.body"
          />
        </div>
      </div>
      <template #footer>
        <div class="flex gap-4 justify-end">
          <BaseButton
            class="border-green-700 hover:bg-green-50 text-sm text-green-700"
            @click="togglePreviewModal"
          >
            Batal
          </BaseButton>
          <BaseButton
            class="bg-green-700 hover:bg-green-800 text-sm text-white"
            @click="submitRequest"
          >
            Kirim
          </BaseButton>
        </div>
      </template>
    </BaseModal>
    <BaseModal :open="hasMessageModalContent">
      <div class="w-full p-2">
        <h1 class="font-roboto text-xl leading-8 font-medium text-green-700 mb-6">
          {{ messageModalContent.title }}
        </h1>
        <div class="flex gap-4">
          <JdsIcon
            :name="messageModalIconName"
            size="xs"
            class="self-start py-1"
            :class="messageModalIconClass"
          />
          <p class="font-lato text-sm text-blue-gray-800 mb-4 max-w-md">
            {{ messageModalContent.description }}
          </p>
        </div>
      </div>
      <template #footer>
        <div class="w-full h-full flex items-center justify-center">
          <BaseButton
            class="bg-green-700 hover:bg-green-600 text-sm text-white"
            @click="clearMessageModalContent"
          >
            Ok, saya mengerti
          </BaseButton>
        </div>
      </template>
    </BaseModal>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseButton from '@/common/components/BaseButton';
import BaseModal from '@/common/components/BaseModal';
import { RepositoryFactory } from '@/repositories/RepositoryFactory';

const templateRepository = RepositoryFactory.get('template');
const userRepository = RepositoryFactory.get('user');

export default {
  name: 'RequestUpgradeRoleSection',
  components: {
    BaseButton,
    BaseModal,
  },
  data() {
    return {
      isPreviewModalOpen: false,
      previewModalContent: {
        to: '',
        subject: '',
        body: '',
      },
      messageModalContent: {
        type: '',
        title: '',
        description: '',
      },
    };
  },
  computed: {
    ...mapGetters('auth', ['user']),
    userRole() {
      return this.user?.role?.name || '';
    },
    userUnit() {
      return this.user?.unit?.name || '';
    },
    hasMessageModalContent() {
      return !!this.messageModalContent.type;
    },
    messageModalIconName() {
      return this.messageModalContent.type === 'success' ? 'check-mark-circle' : 'times-circle';
    },
    messageModalIconClass() {
      return this.messageModalContent.type === 'success' ? 'text-green-700' : 'text-red-700';
    },
  },
  async created() {
    const { data } = await templateRepository.getAccountSubmissionTemplate();
    this.previewModalContent.to = data.to;
    this.previewModalContent.subject = data.subject;
    this.previewModalContent.body = data.body;
  },
  methods: {
    togglePreviewModal() {
      this.isPreviewModalOpen = !this.isPreviewModalOpen;
    },
    setMessageModalContent(content) {
      this.messageModalContent.type = content.type;
      this.messageModalContent.title = content.title;
      this.messageModalContent.description = content.description;
    },
    clearMessageModalContent() {
      this.messageModalContent.type = '';
      this.messageModalContent.title = '';
      this.messageModalContent.description = '';
    },
    async submitRequest() {
      try {
        await userRepository.requestUpgradeRole();

        this.setMessageModalContent({
          type: 'success',
          title: 'Permintaan Pengajuan Akun Berhasil',
          description: `Pengajuan akun Anda sedang menunggu permintaan untuk disetujui admin. Setelah disetujui link akan dikirimkan ke email: ${this.user.email}`,
        });
      } catch (error) {
        this.setMessageModalContent({
          type: 'error',
          title: 'Permintaan Pengajuan Akun Gagal',
          description: 'Pengajuan akun Anda gagal dikirimkan.',
        });
      } finally {
        this.togglePreviewModal();
      }
    },
  },
};
</script>
