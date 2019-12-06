export const VALUE = 'valie';

export function hello() {
  return 'hello';
}

export function pizza(object: { name: string } | null) {
  return object?.name ?? 'cheese';
}
