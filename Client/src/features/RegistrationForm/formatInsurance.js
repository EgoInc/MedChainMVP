export const formatInsuranceNumber = (value) => {
  const digits = value.replace(/\D/g, "");

  if (digits.length > 11) {
    return digits.slice(0, 11);
  }
  return digits;
};

