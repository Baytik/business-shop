import React, {Component} from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {loginUser} from "../../store/actions/usersAction";
import {toast,ToastContainer} from "react-toastify";
import './Login.css';
import 'animate.css';
import './LoginMedia.css';

class Login extends Component {

    state = {
        username: '',
        password: '',
        animate1: true,
    };

    changeInputHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    loginUserHandler = async (event) => {
        event.preventDefault();
            const User = {
                username: this.state.username,
                password: this.state.password
            };
            await this.props.loginUser(User);
            if(this.props.loginError){
                this.setState({animate1: false});
                toast.error(`${this.props.loginError.error}`);
            }
    };

    render() {
        if (this.props.user) return <Redirect to="/computers"/>;
        return (
            <div className="LoginContainer">
                <ToastContainer/>
                <div className={this.state.animate1 === true ? "login animate__animated animate__fadeInDown" : "login animate__animated animate__bounce"}>
                    <p className="text_login">Вход</p>
                <form onSubmit={this.loginUserHandler}>
                    <div className="inputs">
                        <p>Логин</p>
                        <input type="text" placeholder="Введите вашу роль" name="username"
                               onChange={this.changeInputHandler}/>
                    </div>
                    <div className="inputs">
                        <p>Пароль</p>
                        <input type="password" placeholder="Введите ваш пароль" name="password"
                               onChange={this.changeInputHandler}/>
                    </div>
                    <div className="button">
                        <button type="submit" id="login">Login</button>
                    </div>
                </form>
            </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user,
    loginError: state.user.loginError,
});

const mapDispatchToProps = dispatch => ({
    loginUser: (user) => dispatch(loginUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);