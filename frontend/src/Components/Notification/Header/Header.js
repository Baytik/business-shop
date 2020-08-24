import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {logoutUser} from "../../../store/actions/usersAction";
import menu from '../../Images/menu.png';
import close from '../../Images/delete.png';
import './Header.css';
import './MediaHeader.css';

class Header extends Component {

    state = {
        menu: false,
        display: '',
        show: '',
        logout: 'none',
    };

    componentDidMount() {
        const head = document.getElementById('head');
        if(window.location.pathname === '/login'
            || window.location.pathname === '/computers'
            || window.location.pathname === '/computersgaming'
            || window.location.pathname === '/computersoffice'
            || window.location.pathname === '/computersbudget-gaming'
            || window.location.pathname === '/addComputer'
            || window.location.pathname === `/details/:id`
            || window.location.pathname === '/detailInfoComputers'){

            head.style.display = "block";
        }else{
            head.style.display = "none";
        }
    }

    showMenuHandler = () => {
        this.setState({display: 'block', show: 'none'});
    };

    closeMenuHandler = () => {
        this.setState({display: 'none', show: 'block'});
    };

    closeLogoutUser = () => {
      this.setState({logout: 'none'})
    };

    render() {
        return (
            <header className="head animate__animated animate__fadeInDown" id="head">
                <div className="logo">
                    <a href="/">Hagaps</a>
                </div>
                <nav className="main-nav">
                    <ul className="main-ul">
                        <li className="link-2">
                            <NavLink to="/computers">Список Компьютеров</NavLink>
                        </li>
                        <li className="link-3">
                            <NavLink to="/computers">Служба поддержки</NavLink>
                        </li>
                        <li className="link-4">
                            <NavLink to="/computers">Отзывы</NavLink>
                        </li>
                        {this.props.user && (this.props.user.role === 'seller' || this.props.user.role === 'admin') ? (
                            <li className="link-5">
                                <NavLink to="/addComputer">Добавить компьютер</NavLink>
                            </li>
                        ) : (
                            <></>
                        )}
                        {this.props.user && (
                            <>
                                <li className="logout" onClick={() => this.setState({logout: 'block'})}>
                                    <p>Выйти</p>
                                </li>
                                <div className="user_block" style={{display:`${this.state.logout}`}}>
                                    <div>
                                        <img onClick={this.closeLogoutUser} src={close} alt=""/>
                                        <p>Привет {this.props.user.displayName}!</p>
                                        <button onClick={() => this.props.logoutUser(this.props.user)}>Выйти</button>
                                    </div>
                                </div>
                            </>
                        )}
                    </ul>
                    <div className="menu">
                        <img onClick={this.showMenuHandler} src={menu} alt="" style={{display: `${this.state.show}`}}
                             className="menu_img"/>
                        <ul className="sub-nav animate__animated animate__fadeInRight" style={{display: `${this.state.display}`}}>
                            <img onClick={this.closeMenuHandler} src={close} alt="" className="close"/>
                            <li>
                                <NavLink to="/computers">Список Компьютеров</NavLink>
                            </li>
                            <li>
                                <NavLink to="/computers">Служба поддержки</NavLink>
                            </li>
                            <li>
                                <NavLink to="/computers">Отзывы</NavLink>
                            </li>
                            {this.props.user && (this.props.user.role === 'seller' || this.props.user.role === 'admin') ? (
                                <li>
                                    <NavLink to="/addComputer">Добавить компьютер</NavLink>
                                </li>
                            ) : (
                                <>
                                </>
                            )}
                            {this.props.user && (
                                <>
                                    <li className="logout_mobile" onClick={() => this.props.logoutUser(this.props.user)}>
                                        Выйти
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user
});

const mapDispatchToProps = dispatch => ({
    logoutUser: (user) => dispatch(logoutUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);