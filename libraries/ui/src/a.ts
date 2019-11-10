const b = 10;

export function hello(abc: string) {
  return `${abc}${b}`;
}

try {
  throw new Error('error');
} catch (error) {
  console.error(error);
}
