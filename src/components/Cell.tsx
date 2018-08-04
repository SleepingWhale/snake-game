import * as React from 'react';
import * as style from './cell.css';


export type CellProps = {
  status: number,
};

const colors = ['white', 'grey', 'red'];


export class Cell extends React.PureComponent<CellProps> {
  render() {
    const { status = 0 } = this.props;
    const cellStyle = {
      backgroundColor: colors[status]
    };
    
    return (
      <div style={cellStyle} className={style.cell} />
    );
  }
}
