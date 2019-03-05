import React from 'react';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(field) {
        return (event) => this.setState({[field]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onLogin(this.state.username, this.state.password);
    }

    render() {
        return (
            <div className="login-view">
                <h2>&nbsp;Finance&nbsp;</h2>
                <p>A simple way to budget.</p>
                <form onSubmit={this.handleSubmit}>
                    <label>Username:</label>
                    <input type="text" value={this.state.username} onChange={this.handleChange("username")} />
                    <br/>
                    <label>Password:</label>
                    <input type="password" value={this.state.password} onChange={this.handleChange("password")} />
                    <br/>
                    <input type="submit" value="Login" />
                </form>
            </div>
        );
    }
}

