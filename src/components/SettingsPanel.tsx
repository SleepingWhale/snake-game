import * as React from 'react';
import { RangeContainer } from '../containers';



export const SettingsPanel: React.SFC = () => {
  return (
    <div>
      <div>
        <label htmlFor="">Width</label>
        <RangeContainer name="width" min={5} max={60} />
      </div>
      <div>
        <label htmlFor="">Height</label>
        <RangeContainer name="height" min={5} max={30} />
      </div>
    </div>
  );
};
