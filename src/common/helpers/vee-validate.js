import { extend } from 'vee-validate';
import { required, image, size } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: 'Field ini wajib diisi!',
});

extend('image', {
  ...image,
  message: 'File yang anda pilih bukan gambar!',
});

extend('size', {
  ...size,
  message: 'File yang anda masukan melebihi size batas maksimal!',
});

extend('url', {
  validate(value) {
    // eslint-disable-next-line no-useless-escape
    const urlPattern = new RegExp(/^(https?:\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g);
    return urlPattern.test(value);
  },
  message: 'Link yang anda masukkan salah!',
});

extend('maxdimensions', {
  params: ['width', 'height'],
  validate(files, { width, height }) {
    // eslint-disable-next-line no-shadow
    const validateImageDimensions = () => {
      const URL = window.URL || window.webkitURL;
      return new Promise((resolve) => {
        const img = new Image();
        img.onerror = () => resolve({ valid: false });
        img.onload = () => resolve({
          valid: img.width <= Number(width) && img.height <= Number(height),
        });

        img.src = URL.createObjectURL(files);
      });
    };

    return validateImageDimensions();
  },
  message: 'Resolusi gambar melebihi {width} x {height} pixel!',
});
