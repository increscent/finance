import { connect } from 'react-redux';
import Login from './login.js';
import { postRequest } from '../../store/api.js';
import { initData } from '../../store/data.js';
import store from '../../store/store.js';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
    onLogin: (username, password) => {
        postRequest('/login', {username, password})
        .then(data => data.success && location.reload())
        .catch(error => console.log(error));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
