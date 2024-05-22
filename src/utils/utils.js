export const moneyFormat = (number) => {
  let num = number,
    result = '';
  if (num >= 100_000_000) {
    result += `${Math.floor(num / 100_000_000)}억 `;
    num %= 100_000_000;
  }

  if (num >= 10_000) {
    result += `${Math.floor(num / 10_000)}만 `;
    num %= 10_000;
  }

  if (num > 0) {
    result += `${num}`;
  }

  result += `원`;

  return result;
};

export const dealNumberFormat = (number) => {
  let num = parseFloat(number),
    result = '';

  if (num >= 10_000) {
    let n = Math.floor(num / 10_000);
    result += `${n}억 `;
    num -= n * 10_000;
  }

  if (num > 0) {
    result += Math.round(num);
  }

  return result.trim();
};

export const joinText = (object) => {
  let result = '';
  for (const [key, value] of Object.entries(object)) {
    if (value) {
      result += `${key},`;
    }
  }
  if (result.length > 0) {
    result = result.substring(0, result.length - 1);
  }
  return result;
};

export const toNumber = (string) => {
  return Number(String(string).replaceAll(',', ''));
};

export const getCookie = (name) => {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookie = (name, value, options = {}) => {
  options = {
    path: '/',
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += '; ' + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += '=' + optionValue;
    }
  }

  document.cookie = updatedCookie;
};

export const deleteCookie = (name) => {
  setCookie(name, '', {
    'max-age': -1,
  });
};

export const simplePrice = (value) => {
  const num = parseFloat(value);
  if (num >= 1000) {
    return `${parseInt(num / 1000) / 10}억`;
  }
  return `${parseInt(num)}만`;
};

export const fullDateFormat = (time) => {
  return new Date(time * 1000).toLocaleString('ko', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h24',
  });
};

export const dateFormat = (time) => {
  const date = new Date(time * 1000).toLocaleString('ko', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const now = new Date().toLocaleString('ko', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  if (date === now)
    return new Date(time * 1000).toLocaleString('ko', {
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h24',
    });

  return date;
};

export const distanceFormat = (km) => {
  if (km >= 1) {
    return `${Math.round(km * 10) / 10}km`;
  }

  return `${Math.round(km * 1000)}m`;
};
