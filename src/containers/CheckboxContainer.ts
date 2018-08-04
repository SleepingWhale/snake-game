import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IStore } from '../store';
import { OwnProps, ConnectedState, ConnectedDispatch, Checkbox } from '../components/Checkbox';
import { set, SettingsActionPayload } from '../redux/settings';


const mapStateToProps = (state: IStore, ownProps: OwnProps): ConnectedState => ({
  value: state.settings[ownProps.name]
});

const mapDispatchToProps = (dispatch: Dispatch<SettingsActionPayload>, ownProps: OwnProps): ConnectedDispatch => ({
  onClick: (event) => dispatch(set({value: event.currentTarget.checked, name: ownProps.name})),
});


export const CheckboxContainer =
  connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps, mapDispatchToProps)(Checkbox);
