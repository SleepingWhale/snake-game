export type SettingsState = {
  width: number;
  height: number;
  speed: number;
  isTeleportationAllowed: boolean;
}

export type SettingsActionPayload = {
  name: string;
  value: number | boolean;
}

declare const SETTINGS_UPDATE = 'SETTINGS_UPDATE';
export type settingsUpdate = typeof SETTINGS_UPDATE;

export interface ChangeSettingsAction {
  type: settingsUpdate;
  payload: SettingsActionPayload;
}
