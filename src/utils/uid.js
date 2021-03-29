let uid = 1;

export function getUid() {
  return uid++ % Number.MAX_SAFE_INTEGER;
}
