import { connect } from 'react-redux';
import ActionView from './actionView.js';
import { removeActionView } from '../../../store/actions.js';

const mapStateToProps = (state) => ({
  actionType: state.views.actionView.actionType,
});

const mapDispatchToProps = (dispatch) => ({
  onClose: () => dispatch(removeActionView())
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionView);
