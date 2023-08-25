import { extend } from 'vee-validate';
import { required, numeric, image, size, max, email, ext } from 'vee-validate/dist/rules';
import { isAfter, isToday, differenceInMinutes } from 'date-fns';

extend('required', {
  ...required,
  message: 'Field ini wajib diisi!',
});

extend('numeric', {
  ...numeric,
  message: 'Field ini hanya boleh diisi dengan angka',
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
    const urlPattern = new RegExp(/(http(s)?):\/\/(?:www\.|(?!www))[a-zA-Z0-9-@:%._\+~#=?]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig);
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

extend('phonenumber', {
  validate(value) {
    // eslint-disable-next-line no-useless-escape
    const phoneNumberPattern = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,8}$/im);

    return phoneNumberPattern.test(value);
  },
  message: 'Nomor telepon yang anda masukkan salah!',
});

extend('email', {
  ...email,
  message: 'Email yang anda masukkan salah!',
});

extend('timeformat', {
  validate(value) {
    // regex for testing `hh:mm` time format (ex 01:00, 3:00)
    const timeFormatPattern = new RegExp(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/gm);

    return timeFormatPattern.test(value);
  },
  message: 'Jam yang anda masukkan salah!',
});

extend('timebefore', {
  params: ['time'],
  validate(value, { time }) {
    const timeFormatPattern = new RegExp(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/gm);

    if (time && timeFormatPattern.test(time)) {
      const today = new Date();
      const selectedTime = value.split(':');
      const validatorTime = time.split(':');

      const selectedDateTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), selectedTime[0], selectedTime[1]);
      const validatorDateTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), validatorTime[0], validatorTime[1]);

      const minuteDifferences = differenceInMinutes(selectedDateTime, validatorDateTime);

      return minuteDifferences < 0;
    }

    return true;
  },
  message: 'Waktu yang dipilih tidak boleh sama atau melebihi {time}',
});

extend('numbergreaterthan', {
  params: ['target'],
  validate(value, { target }) {
    return +value > +target;
  },
  message: 'Angka tidak boleh sama atau kurang dari {target}',
});

extend('document', {
  ...ext,
  message: 'Format file tidak didukung, format yang didukung hanya doc, xls dan pdf.',
});
