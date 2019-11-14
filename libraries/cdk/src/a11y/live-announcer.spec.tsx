import React, { useCallback } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { AnnounceOptions, useLiveAnnouncer } from './live-announcer';
import { liveAnnouncerClassName } from './class-names';

const ANNOUNCE_BUTTON_ID = 'announce_button';
const CLEAR_BUTTON_ID = 'clear_button';

function TestComponent(props: AnnounceOptions) {
  const { message, politeness, duration } = props;

  const { announce, clear } = useLiveAnnouncer();

  const announceText = useCallback(() => {
    announce({ message, politeness, duration });
  }, [announce, message, politeness, duration]);

  const clearText = useCallback(() => {
    clear();
  }, [clear]);

  return (
    <>
      <button data-testid={ANNOUNCE_BUTTON_ID} onClick={announceText}>
        Announce
      </button>
      <button data-testid={CLEAR_BUTTON_ID} onClick={clearText}>
        Clear
      </button>
    </>
  );
}

function getAriaLiveElement(): HTMLElement | null {
  return document.body.querySelector(`.${liveAnnouncerClassName}`);
}

describe('a11y.live-announcer', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should correctly update the announce text', () => {
    const fixture = render(<TestComponent message="Test" />);

    fireEvent.click(fixture.getByTestId(ANNOUNCE_BUTTON_ID), {});
    jest.advanceTimersByTime(100);

    expect(getAriaLiveElement()?.textContent).toEqual('Test');
  });

  test('should correctly update the politeness attribute', () => {
    const fixture = render(<TestComponent message="Hey geeks" politeness="assertive" />);

    fireEvent.click(fixture.getByTestId(ANNOUNCE_BUTTON_ID), {});
    jest.advanceTimersByTime(100);

    expect(getAriaLiveElement()?.textContent).toEqual('Hey geeks');
    expect(getAriaLiveElement()?.getAttribute('aria-live')).toEqual('assertive');
  });

  it('should apply the aria-live value polite by default', () => {
    const fixture = render(<TestComponent message="Hey geeks" />);

    fireEvent.click(fixture.getByTestId(ANNOUNCE_BUTTON_ID), {});
    jest.advanceTimersByTime(100);

    expect(getAriaLiveElement()?.textContent).toEqual('Hey geeks');
    expect(getAriaLiveElement()?.getAttribute('aria-live')).toEqual('polite');
  });

  it('should be able to clear out the aria-live element manually', () => {
    const fixture = render(<TestComponent message="Hey geeks" />);

    fireEvent.click(fixture.getByTestId(ANNOUNCE_BUTTON_ID), {});
    jest.advanceTimersByTime(100);

    expect(getAriaLiveElement()?.textContent).toEqual('Hey geeks');

    fireEvent.click(fixture.getByTestId(CLEAR_BUTTON_ID), {});
    expect(getAriaLiveElement()?.textContent).toBeFalsy();
  });

  it('should be able to clear out the aria-live element by setting a duration', () => {
    const fixture = render(<TestComponent message="Hey geeks" duration={2000} />);

    fireEvent.click(fixture.getByTestId(ANNOUNCE_BUTTON_ID), {});
    jest.advanceTimersByTime(100);
    expect(getAriaLiveElement()?.textContent).toEqual('Hey geeks');

    jest.advanceTimersByTime(2000);
    expect(getAriaLiveElement()?.textContent).toBeFalsy();
  });

  it('should remove the aria-live element from the DOM on destroy', () => {
    const fixture = render(<TestComponent message="Hey geeks" duration={2000} />);

    fireEvent.click(fixture.getByTestId(ANNOUNCE_BUTTON_ID), {});
    jest.advanceTimersByTime(100);

    // Call the lifecycle hook manually since Angular won't do it in tests.
    fixture.unmount();

    expect(getAriaLiveElement()).toBeNull();
  });
});
