import { extend } from 'vee-validate';
import { required, image, size, max } from 'vee-validate/dist/rules';
import { isAfter, isToday } from 'date-fns';

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
    const urlPattern = new RegExp(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig);
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

extend('max', {
  params: ['length'],
  ...max,
  message: 'Teks yang anda masukkan lebih dari {length} karakter',
});

extend('nobackdate', {
  validate(value) {
    const normalizeDate = (initialDate) => {
      if (!initialDate) return null;

      const date = initialDate.split('/');
      const year = date[2];
      const month = date[1] - 1;
      const day = date[0];

      return new Date(year, month, day);
    };

    const today = new Date();
    const selectedDate = normalizeDate(value);

    return new Promise((resolve) => {
      resolve({
        valid: isToday(selectedDate) || isAfter(selectedDate, today),
      });
    });
  },
  message: 'Tanggal yang anda pilih sudah lewat!',
});
