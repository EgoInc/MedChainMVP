export const formatPhone = (value) => {
  const digits = value.replace(/\D/g, "");

  if (digits.length <= 1) {
    return `+7`;
  }
  if (digits.length <= 4) {
    return `+7 (${digits.slice(1)}`;
  }
  if (digits.length <= 7) {
    return `+7 (${digits.slice(1, 4)}) ${digits.slice(4)}`;
  }
  if (digits.length <= 9) {
    return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(
      7
    )}`;
  }
  return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(
    7,
    9
  )}-${digits.slice(9, 11)}`;
};
