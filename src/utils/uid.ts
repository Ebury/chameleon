let uid = 1;

export function getUid(): number {
  return uid++ % Number.MAX_SAFE_INTEGER;
}
