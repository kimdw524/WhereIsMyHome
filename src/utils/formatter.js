const moneyFormat = (number) => {
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

const dealNumberFormat = (number) => {
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

const joinText = (object) => {
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

const toNumber = (string) => {
  return Number(String(string).replaceAll(',', ''));
};

export default {
  moneyFormat,
  dealNumberFormat,
  joinText,
  toNumber,
};
