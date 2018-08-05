import * as React from 'react';
import * as style from './cell.css';


export type CellProps = {
  status: number,
};


export class Cell extends React.PureComponent<CellProps> {
  render() {
    const { status = 0 } = this.props;
    const styleModifier = style[`cell__status${status}`];
    
    return (
      <div className={`${style.cell} ${styleModifier}`} />
    );
  }
}
