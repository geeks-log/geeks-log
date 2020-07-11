import React, { FunctionComponent, HTMLProps } from 'react';

export type ButtonProps = HTMLProps<HTMLButtonElement>;

export const Button: FunctionComponent<ButtonProps> = ({ children, className }) => (
  <button className={className}>{children}</button>
);
