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
        display:'',
        show:'',
    };

    showMenuHandler = () => {
      this.setState({display: 'block',show: 'none'});
    };

    closeMenuHandler = () => {
      this.setState({display: 'none',show: 'block'});
    };

    render() {
        return (
            <header className="head">
                <div className="logo">
                    <NavLink to="/">Hagaps</NavLink>
                </div>
                <nav className="main-nav">
                    <ul className="main-ul">
                                <li className="link-1">
                                    <NavLink to="/">О нас</NavLink>
                                </li>
                                <li className="link-2">
                                    <NavLink to="/computers">Список Компьютеров</NavLink>
                                </li>
                                <li className="link-3">
                                    <NavLink to="/">Служба поддержки</NavLink>
                                </li>
                                <li className="link-4">
                                    <NavLink to="/">Отзывы</NavLink>
                                </li>
                        </ul>
                    <div className="menu">
                        <img onClick={this.showMenuHandler} src={menu} alt="" style={{display:`${this.state.show}`}} className="menu_img"/>
                        <ul className="sub-nav" style={{display:`${this.state.display}`}}>
                            <img onClick={this.closeMenuHandler} src={close} alt="" className="close"/>
                            <li>
                                <NavLink to="/">О нас</NavLink>
                            </li>
                            <li>
                                <NavLink to="/computers">Список Компьютеров</NavLink>
                            </li>
                            <li>
                                <NavLink to="/">Служба поддержки</NavLink>
                            </li>
                            <li>
                                <NavLink to="/">Отзывы</NavLink>
                            </li>
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