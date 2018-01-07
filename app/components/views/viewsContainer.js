import { connect } from 'react-redux';
import Views from './views.js';

const mapStateToProps = (state) => ({
  views: state.views
});

export default connect(mapStateToProps)(Views);
