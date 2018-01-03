import { connect } from 'react-redux';
import Views from '../views/views.js';

const mapStateToProps = (state) => ({
  viewStack: state.viewStack
});

export default connect(mapStateToProps)(Views);
