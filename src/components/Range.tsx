import * as React from 'react';


export type OwnProps = {
  min: number;
  max: number;
  name: string;
}

export type ConnectedState = {
  value: number;
}

export type ConnectedDispatch = {
  onValueChange: (value: number, name: string) => void;
}

export class Range extends React.Component<ConnectedState & ConnectedDispatch & OwnProps, {}> {
  
  handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value, name } = event.currentTarget;
    const { onValueChange } = this.props;
  
    onValueChange(parseInt(value, 10), name);
  };
  
  render() {
    const {
      onValueChange,
      ...inputProps
    } = this.props;
    
    return (
      <input
        {...inputProps}
        type="range"
        onChange={this.handleChange}
      />
    );
  }
}
