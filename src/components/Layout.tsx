import * as React from 'react';
import { SettingsPanel } from './SettingsPanel';
import { GameBoardContainer } from '../containers';
import * as style from './layout.css';


export const Layout: React.SFC = () => {
  return (
    <React.Fragment>
      <div className={style.mainWrapper}>
        <SettingsPanel />
        <GameBoardContainer />
      </div>
    </React.Fragment>
  );
};
