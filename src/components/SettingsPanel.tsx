import * as React from 'react';
import { RangeContainer, CheckboxContainer } from '../containers';
import * as styles from './settingsPanel.css';



export const SettingsPanel: React.SFC = () => {
  return (
    <div className={styles.settingsPanel}>
      <div className={styles.settingsItem}>
        <label htmlFor="width">Width</label>
        <RangeContainer name="width" min={5} max={60} />
      </div>
      <div className={styles.settingsItem}>
        <label htmlFor="height">Height</label>
        <RangeContainer name="height" min={5} max={30} />
      </div>
      <div className={styles.settingsItem}>
        <label htmlFor="speed">Speed</label>
        <RangeContainer name="speed" min={1} max={100} />
      </div>
      <div className={styles.settingsItem}>
        <label htmlFor="isTeleportationAllowed">Allow teleportation</label>
        <CheckboxContainer name="isTeleportationAllowed" />
      </div>
    </div>
  );
};
