export function validateEmail(
  email: string,
  emptyMessage: string,
  invalidMessage: string
) {
  const cleanEmail = email.trim();
  if (!cleanEmail) return emptyMessage;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) return invalidMessage;
  return "";
}

export function validatePassword(
  password: string,
  emptyMessage: string,
  shortMessage: string,
  minLength: number = 6
) {
  if (!password) return emptyMessage;
  if (password.length < minLength) return shortMessage;
  return "";
}
