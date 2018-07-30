import * as React from 'react';


export type CellProps = {
  status: number,
};

const colors = ['white', 'grey', 'red'];


export class Cell extends React.PureComponent<CellProps> {
  render() {
    const { status = 0 } = this.props;
    const cellStyle = {
      backgroundColor: colors[status],
      border: '1px solid black',
    };
    
    return (
      <div style={cellStyle} />
    );
  }
}
