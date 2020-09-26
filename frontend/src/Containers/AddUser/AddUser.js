import React, {Component} from 'react';
import {categories} from "../../Userscategories";
import {connect} from 'react-redux';
import {toast,ToastContainer} from 'react-toastify';
import {addUser} from "../../store/actions/usersAction";
import './AddUser.css';
import Spinner from "../../Components/UI/Spinner/Spinner";

class AddUser extends Component {

    componentDidMount() {
        const header = document.getElementById('head');
        const footer = document.getElementById('footer');
        header.style.display = 'block';
        footer.style.display = 'block';
    }

    state = {
      userName:'',
      displayName:'',
      password1:'',
      password2:'',
      role: categories[0],
    };

    inputValHandler = (e) => {
      this.setState({[e.target.name]: e.target.value});
    };

    addUserHandler = async () => {
        if(this.state.userName !== ''){
            if(this.state.displayName !== ''){
                if(this.state.password1 !== ''){
                    if(this.state.password2 !== ''){
                        if(this.state.password1 === this.state.password2){
                            const user = {
                                username: this.state.userName,
                                displayName: this.state.displayName,
                                password: this.state.password2,
                                role: this.state.role,
                            };
                            await this.props.addUser(user);
                            if(this.props.addUserError){
                                toast.error(`${this.props.addUserError}`);
                            }else {
                                toast.success('Пользователь добавлен!');
                            }
                        }else {
                            toast.error('Пароли не совпадают');
                        }
                    }else {
                        toast.error('Введите пароль для сравнения');
                    }
                }else {
                    toast.error('Введите пароль');
                }
            }else {
                toast.error('Введите отображаемое имя пользователя')
            }
        }else {
            toast.error('Введите имя пользователя')
        }
    };

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps !== this.props || nextState !== this.state;
    }

    render() {
        if (!this.props.user){
            this.props.history.push('/computers');
        }else if(this.props.user && this.props.user.role !== 'admin'){
            this.props.history.push('/computers');
        }
        return (
            <div className="AddUserContainer">
                <ToastContainer/>
                {this.props.spinner === true ? (
                    <Spinner/>
                ) : (
                    <>
                        <div className="titles">
                            <p>Добавляй пользователей и пусть наша компания рассветает!</p>
                        </div>
                        <div className="inputs_user">
                            <input type="text" onChange={this.inputValHandler} name="userName" placeholder="имя пользователя.."/>
                            <input type="text" onChange={this.inputValHandler} name="displayName" placeholder="Отображаемое имя.."/>
                            <input type="password" onChange={this.inputValHandler} name="password1" placeholder="пароль"/>
                            <input type="password" onChange={this.inputValHandler} name="password2" placeholder="пароль для сравнения"/>
                            <select name="role" onChange={this.inputValHandler}>
                                {categories.map(cat => (
                                    <option key={cat}>{cat}</option>
                                ))}
                            </select>
                            <div className="btns_user">
                                <button className="add_user" onClick={this.addUserHandler}>добавить</button>
                                <button className="cancel_add" onClick={() => this.props.history.push('/computers')}>отмена</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user,
    spinner: state.user.spinner,
    addUserError: state.user.addUserError,
});

const mapDispatchToProps = dispatch => ({
    addUser: (user) => dispatch(addUser(user)),
});

export default connect(mapStateToProps,mapDispatchToProps)(AddUser);