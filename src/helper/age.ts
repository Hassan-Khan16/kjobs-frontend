const AGE_FALLBACK = "—";

export function getAgeFromDateOfBirth(dateOfBirth: string): string {
  if (!dateOfBirth) return AGE_FALLBACK;
  const birth = new Date(dateOfBirth);
  if (Number.isNaN(birth.getTime())) return AGE_FALLBACK;
  const age = new Date().getFullYear() - birth.getFullYear();
  return String(Math.max(0, age));
}
