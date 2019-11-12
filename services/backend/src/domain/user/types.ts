import { createId } from '../core';

export type UserId = string;

export function createUserId(): UserId {
  return `user-${createId()}`;
}

export function isUserId(value: unknown): value is UserId {
  return typeof value === 'string' ? value.startsWith('user-') : false;
}

export enum OAuthProvider {
  GITHUB = 'github',
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  TWITTER = 'twitter',
}

interface UserBase {
  email: string;
  name: string;
  displayName?: string;
  lastLoginTimestamp: number;
}

export interface LocalUser extends UserBase {
  type: 'local';
  /** Base64 encoded string. */
  encryptedPassword: string;
  /** Base64 encoded string. */
  salt: string;
}

export interface OAuthUser extends UserBase {
  type: 'oauth';
  provider: OAuthProvider;
}

export type User = LocalUser | OAuthUser;
