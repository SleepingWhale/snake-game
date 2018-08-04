import * as React from 'react';
import { SettingsPanel } from './SettingsPanel';
import { GameBoardContainer } from '../containers';
import * as style from './layout.css';


export const Layout: React.SFC = () => {
  return (
    <React.Fragment>
      <SettingsPanel />
      <div className={style.mainWrapper}>
        <GameBoardContainer />
      </div>
    </React.Fragment>
  );
};
