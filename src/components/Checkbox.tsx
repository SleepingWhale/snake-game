import * as React from 'react';


export type OwnProps = {
  name: string;
}

export type ConnectedState = {
  value: boolean;
}

export type ConnectedDispatch = {
  onClick(event: React.FormEvent<HTMLInputElement>): void;
}

export const Checkbox: React.SFC<ConnectedState & ConnectedDispatch & OwnProps> = ({ value, onClick, ...inputProps }) => (
  <input
    {...inputProps}
    type="checkbox"
    checked={value}
    onChange={onClick}
  />
);
