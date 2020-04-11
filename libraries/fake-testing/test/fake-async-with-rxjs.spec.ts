import { defer, from, timer } from 'rxjs';
import { fakeAsync, flush, tick } from '../src';

describe('fake testing with rxjs', () => {
  test('should flush async tasks.', fakeAsync(() => {
    const asyncTask = defer(() => from(Promise.resolve('done')));
    const callback = jest.fn();

    const subscription = asyncTask.subscribe(callback);
    flush();

    expect(callback).toHaveBeenCalled();
    subscription.unsubscribe();
  }));

  test('should tick timers.', fakeAsync(() => {
    const timerTask = defer(() => timer(1000));
    const callback = jest.fn();

    const subscription = timerTask.subscribe(callback);
    tick(1000);

    expect(callback).toHaveBeenCalled();
    subscription.unsubscribe();
  }));
});
