import * as React from 'react';
import { GameBoardContainer, SettingsPanelContainer } from '../containers';
import * as style from './layout.css';


export const Layout: React.SFC = () => {
  return (
    <React.Fragment>
      <div className={style.mainWrapper}>
        <SettingsPanelContainer />
        <GameBoardContainer />
      </div>
    </React.Fragment>
  );
};
