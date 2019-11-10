/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { getPlatform } from '../platform';

/** IDs are deliminated by an empty space, as per the spec. */
const ID_DELIMINATOR = ' ';

/** ID used for the body container where all messages are appended. */
const MESSAGES_CONTAINER_ID = 'cdk-describedby-message-container';

/** ID prefix used for each created message element. */
const CDK_DESCRIBEDBY_ID_PREFIX = 'cdk-describedby-message';

/** Attribute given to each host element that is described by a message element. */
const CDK_DESCRIBEDBY_HOST_ATTRIBUTE = 'cdk-describedby-host';

/**
 * Adds the given ID to the specified ARIA attribute on an element.
 * Used for attributes such as aria-labelledby, aria-owns, etc.
 */
function addAriaReferencedId(el: Element, attr: string, id: string) {
  const ids = getAriaReferenceIds(el, attr);

  if (ids.some(existingId => existingId.trim() === id.trim())) {
    return;
  }
  ids.push(id.trim());

  el.setAttribute(attr, ids.join(ID_DELIMINATOR));
}

/**
 * Gets the list of IDs referenced by the given ARIA attribute on an element.
 * Used for attributes such as aria-labelledby, aria-owns, etc.
 */
function getAriaReferenceIds(el: Element, attr: string): string[] {
  // Get string array of all individual ids (whitespace deliminated) in the attribute value
  return (el.getAttribute(attr) || '').match(/\S+/g) || [];
}

/**
 * Removes the given ID from the specified ARIA attribute on an element.
 * Used for attributes such as aria-labelledby, aria-owns, etc.
 */
function removeAriaReferencedId(el: Element, attr: string, id: string) {
  const ids = getAriaReferenceIds(el, attr);
  const filteredIds = ids.filter(val => val !== id.trim());

  el.setAttribute(attr, filteredIds.join(ID_DELIMINATOR));
}

/**
 * Interface used to register message elements and keep a count of how many registrations have
 * the same message and the reference to the message element used for the `aria-describedby`.
 */
export interface RegisteredMessage {
  /** The element containing the message. */
  messageElement: Element;

  /** The number of elements that reference this message element via `aria-describedby`. */
  referenceCount: number;
}

/** Global incremental identifier for each registered message element. */
let nextId = 0;

/** Global map of all registered message elements that have been placed into the document. */
const messageRegistry = new Map<string | HTMLElement, RegisteredMessage>();

/** Container for all registered messages. */
let messagesContainer: HTMLElement | null = null;

export function getAriaDescriber() {
  if (!getPlatform().isBrowser) {
    return null;
  }

  return new AriaDescriber();
}

/**
 * Utility that creates visually hidden elements with a message content. Useful for elements that
 * want to use aria-describedby to further describe themselves without adding additional visual
 * content.
 */
export class AriaDescriber {
  /**
   * Adds to the host element an aria-describedby reference to a hidden element that contains
   * the message. If the same message has already been registered, then it will reuse the created
   * message element.
   */
  describe(hostElement: Element, message: string | HTMLElement) {
    if (!this._canBeDescribed(hostElement, message)) {
      return;
    }

    if (typeof message !== 'string') {
      // We need to ensure that the element has an ID.
      this._setMessageId(message);
      messageRegistry.set(message, { messageElement: message, referenceCount: 0 });
    } else if (!messageRegistry.has(message)) {
      this._createMessageElement(message);
    }

    if (!this._isElementDescribedByMessage(hostElement, message)) {
      this._addMessageReference(hostElement, message);
    }
  }

  /** Removes the host element's aria-describedby reference to the message element. */
  removeDescription(hostElement: Element, message: string | HTMLElement) {
    if (!this._isElementNode(hostElement)) {
      return;
    }

    if (this._isElementDescribedByMessage(hostElement, message)) {
      this._removeMessageReference(hostElement, message);
    }

    // If the message is a string, it means that it's one that we created for the
    // consumer so we can remove it safely, otherwise we should leave it in place.
    if (typeof message === 'string') {
      const registeredMessage = messageRegistry.get(message);
      if (registeredMessage && registeredMessage.referenceCount === 0) {
        this._deleteMessageElement(message);
      }
    }

    if (messagesContainer && messagesContainer.childNodes.length === 0) {
      this._deleteMessagesContainer();
    }
  }

  /** Unregisters all created message elements and removes the message container. */
  ngOnDestroy() {
    const describedElements = document.querySelectorAll(`[${CDK_DESCRIBEDBY_HOST_ATTRIBUTE}]`);

    for (let i = 0; i < describedElements.length; i++) {
      this._removeCdkDescribedByReferenceIds(describedElements[i]);
      describedElements[i].removeAttribute(CDK_DESCRIBEDBY_HOST_ATTRIBUTE);
    }

    if (messagesContainer) {
      this._deleteMessagesContainer();
    }

    messageRegistry.clear();
  }

  /**
   * Creates a new element in the visually hidden message container element with the message
   * as its content and adds it to the message registry.
   */
  private _createMessageElement(message: string) {
    const messageElement = document.createElement('div');
    this._setMessageId(messageElement);
    messageElement.textContent = message;

    this._createMessagesContainer();
    messagesContainer?.appendChild(messageElement);

    messageRegistry.set(message, { messageElement, referenceCount: 0 });
  }

  /** Assigns a unique ID to an element, if it doesn't have one already. */
  private _setMessageId(element: HTMLElement) {
    if (!element.id) {
      element.id = `${CDK_DESCRIBEDBY_ID_PREFIX}-${nextId++}`;
    }
  }

  /** Deletes the message element from the global messages container. */
  private _deleteMessageElement(message: string) {
    const registeredMessage = messageRegistry.get(message);
    const messageElement = registeredMessage && registeredMessage.messageElement;
    if (messagesContainer && messageElement) {
      messagesContainer.removeChild(messageElement);
    }
    messageRegistry.delete(message);
  }

  /** Creates the global container for all aria-describedby messages. */
  private _createMessagesContainer() {
    if (!messagesContainer) {
      const preExistingContainer = document.getElementById(MESSAGES_CONTAINER_ID);

      // When going from the server to the client, we may end up in a situation where there's
      // already a container on the page, but we don't have a reference to it. Clear the
      // old container so we don't get duplicates. Doing this, instead of emptying the previous
      // container, should be slightly faster.
      if (preExistingContainer) {
        preExistingContainer.parentNode?.removeChild(preExistingContainer);
      }

      messagesContainer = document.createElement('div');
      messagesContainer.id = MESSAGES_CONTAINER_ID;
      messagesContainer.setAttribute('aria-hidden', 'true');
      messagesContainer.style.display = 'none';
      document.body.appendChild(messagesContainer);
    }
  }

  /** Deletes the global messages container. */
  private _deleteMessagesContainer() {
    if (messagesContainer && messagesContainer.parentNode) {
      messagesContainer.parentNode.removeChild(messagesContainer);
      messagesContainer = null;
    }
  }

  /** Removes all cdk-describedby messages that are hosted through the element. */
  private _removeCdkDescribedByReferenceIds(element: Element) {
    // Remove all aria-describedby reference IDs that are prefixed by CDK_DESCRIBEDBY_ID_PREFIX
    const originalReferenceIds = getAriaReferenceIds(element, 'aria-describedby').filter(
      id => id.indexOf(CDK_DESCRIBEDBY_ID_PREFIX) !== 0,
    );
    element.setAttribute('aria-describedby', originalReferenceIds.join(' '));
  }

  /**
   * Adds a message reference to the element using aria-describedby and increments the registered
   * message's reference count.
   */
  private _addMessageReference(element: Element, message: string | HTMLElement) {
    const registeredMessage = messageRegistry.get(message);

    if (registeredMessage == null) {
      return;
    }

    // Add the aria-describedby reference and set the
    // describedby_host attribute to mark the element.
    addAriaReferencedId(element, 'aria-describedby', registeredMessage.messageElement.id);
    element.setAttribute(CDK_DESCRIBEDBY_HOST_ATTRIBUTE, '');

    registeredMessage.referenceCount++;
  }

  /**
   * Removes a message reference from the element using aria-describedby
   * and decrements the registered message's reference count.
   */
  private _removeMessageReference(element: Element, message: string | HTMLElement) {
    const registeredMessage = messageRegistry.get(message);

    if (registeredMessage == null) {
      return;
    }

    registeredMessage.referenceCount--;

    removeAriaReferencedId(element, 'aria-describedby', registeredMessage.messageElement.id);
    element.removeAttribute(CDK_DESCRIBEDBY_HOST_ATTRIBUTE);
  }

  /** Returns true if the element has been described by the provided message ID. */
  private _isElementDescribedByMessage(element: Element, message: string | HTMLElement): boolean {
    const referenceIds = getAriaReferenceIds(element, 'aria-describedby');
    const registeredMessage = messageRegistry.get(message);
    const messageId = registeredMessage && registeredMessage.messageElement.id;

    return !!messageId && referenceIds.indexOf(messageId) !== -1;
  }

  /** Determines whether a message can be described on a particular element. */
  private _canBeDescribed(element: Element, message: string | HTMLElement | void): boolean {
    if (!this._isElementNode(element)) {
      return false;
    }

    if (message && typeof message === 'object') {
      // We'd have to make some assumptions about the description element's text, if the consumer
      // passed in an element. Assume that if an element is passed in, the consumer has verified
      // that it can be used as a description.
      return true;
    }

    const trimmedMessage = message == null ? '' : `${message}`.trim();
    const ariaLabel = element.getAttribute('aria-label');

    // We shouldn't set descriptions if they're exactly the same as the `aria-label` of the
    // element, because screen readers will end up reading out the same text twice in a row.
    return trimmedMessage ? !ariaLabel || ariaLabel.trim() !== trimmedMessage : false;
  }

  /** Checks whether a node is an Element node. */
  private _isElementNode(element: Node): element is Element {
    return element.nodeType === document.ELEMENT_NODE;
  }
}
