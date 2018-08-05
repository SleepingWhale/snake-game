import {
  ChangeSettingsAction,
  SettingsActionPayload,
  SettingsState,
  settingsUpdate,
} from '../@types/settings';


const initialState: SettingsState = {
  width: 10,
  height: 10,
  speed: 10,
  isTeleportationAllowed: false
};
const SETTINGS_UPDATE: settingsUpdate = 'SETTINGS_UPDATE';

export default function reducer(state: SettingsState = initialState, action: ChangeSettingsAction): SettingsState {
  switch (action.type) {
    case SETTINGS_UPDATE:
      return {
        ...state,
        [action.payload.name]: action.payload.value
      };
    default:
      return state;
  }
}

export const updateSettings = (payload: SettingsActionPayload): ChangeSettingsAction => ({
  type: SETTINGS_UPDATE,
  payload
});
