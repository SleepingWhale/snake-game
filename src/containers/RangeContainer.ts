import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IStore } from '../store';
import { Range, OwnProps, ConnectedState, ConnectedDispatch } from '../components/Range';
import { set, SettingsActionPayload } from '../redux/settings';


const mapStateToProps = (state: IStore, ownProps: OwnProps): ConnectedState => ({
  value: state.settings[ownProps.name]
});

const mapDispatchToProps = (dispatch: Dispatch<SettingsActionPayload>): ConnectedDispatch => ({
  onValueChange: (value, name) => dispatch(set({value, name})),
});


export const RangeContainer =
  connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps, mapDispatchToProps)(Range);
