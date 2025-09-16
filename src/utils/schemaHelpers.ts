export function parseOptionString(option: string): { label: string; value: string } {
  if (!option) {
    return { label: "", value: "" };
  }

  const [leftRaw, rightRaw] = option.split("=");
  const label = leftRaw?.trim() || "";
  const value = rightRaw?.trim();

  if (value) {
    return { label: label || value, value };
  }

  return { label, value: label };
}