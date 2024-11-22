export const formatPassport = (value) => {
  const digits = value.replace(/\D/g, "");

  if (digits.length <= 4) {
    return digits;
  }
  if (digits.length <= 10) {
    return `${digits.slice(0, 4)} ${digits.slice(4)}`;
  }
  return `${digits.slice(0, 4)} ${digits.slice(4, 10)}`;
};
