export interface SettingsState {
  width: number;
  height: number;
  speed: number;
}

export interface SettingsActionPayload {
  name: string;
  value: number;
}

const initialState: SettingsState = {
  width: 20,
  height: 20,
  speed: 10,
};


const SETTINGS_UPDATE = 'SETTINGS_UPDATE';
type SETTINGS_UPDATE = typeof SETTINGS_UPDATE;


export interface ChangeSettingsAction {
  type: SETTINGS_UPDATE;
  payload: SettingsActionPayload;
}


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


export const set = (payload: SettingsActionPayload): ChangeSettingsAction => ({
  type: SETTINGS_UPDATE,
  payload
});
