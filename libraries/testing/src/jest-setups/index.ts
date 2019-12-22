import './extendsDateExpectation';
import './extendsOneOf';

declare global {
  namespace jest {
    interface Matchers<R, T> {
      toBeValidDateStr(): void;
      toBeOneOf<T>(values: T[]): R;
    }
  }
}
