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

export default {
  moneyFormat,
};
