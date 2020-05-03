export const VALUE = 'valie';

export function hello() {
  return 'hello';
}

export function pizza(object: { name: string } | null) {
  return object?.name ?? 'cheese';
}

async function asyncFn() {
  const val1 = await Promise.resolve(1);
  const val2 = await Promise.resolve(3);

  return val1 + val2;
}
