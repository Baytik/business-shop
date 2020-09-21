import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {logoutUser} from "../../../store/actions/usersAction";
import menu from '../../Images/menu.png';
import close from '../../Images/delete.png';
import Modal from '../../UI/Modal/Modal';
import './Header.css';
import './MediaHeader.css';

class Header extends Component {

    state = {
        menu: false,
        display: '',
        show: '',
        logout: 'none',
        modal: false,
    };

    componentDidMount() {
        const head = document.getElementById('head');
        if(window.location.pathname === '/login'
            || window.location.pathname === '/computers'
            || window.location.pathname === '/computersgaming'
            || window.location.pathname === '/computersoffice'
            || window.location.pathname === '/computersbudget-gaming'
            || window.location.pathname === '/addComputer'
            || window.location.pathname === '/detailInfoComputers'
            || window.location.pathname === '/reviews'
            || window.location.pathname === '/notFeedbackReviews'
            || window.location.pathname === '/support'
            || window.location.pathname === '/requests'
            || window.location.pathname === '/addUser'
            || window.location.pathname === '/usersList'
            || window.location.pathname === '/reviews'){

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

    showModal = () => {
      this.setState({modal: true})
    };
    closeModal = () => {
      this.setState({modal: false})
    };

    logoutUser = () => {
      this.props.logoutUser();
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
                            <NavLink to="/support">Служба поддержки</NavLink>
                        </li>
                        <li className="link-4">
                            <NavLink to="/reviews">Отзывы</NavLink>
                        </li>
                        {this.props.user && (
                            <>
                                <li className="logout" onClick={this.showModal}>
                                    <p>Меню</p>
                                </li>
                            </>
                        )}
                    </ul>
                    {this.props.user ? (
                        <Modal show={this.state.modal} close={this.closeModal}>
                            <div className="user_block">
                                <h3>Привет {this.props.user.displayName}</h3>
                                <p>В ваши права входит: {this.props.user && this.props.user.role === 'admin' ?
                                    'Доступ ко всем скрытым разделом,ни кто кроме вас не имеет доступа ко всем разделам!':
                                    this.props.user.role === 'seller' ?
                                        'Добавлять компьютер,удалять компьютер,продавать, редактировать, делать скидку и многое другое!':
                                        this.props.user.role === 'operator' ?
                                            'Принимать звонки от клиентов, смотреть заявки' : 'вы не имеете ни каких прав!!'} Удачи!</p>
                                    <div className="links_in_modal">
                                        {this.props.user.role === 'admin' ? (
                                            <>
                                                <NavLink onClick={() => this.setState({modal:false})} to="/notFeedbackReviews">компьютеры без отзывов</NavLink>
                                                <NavLink onClick={() => this.setState({modal:false})} to="/addUser">Добавить пользователя</NavLink>
                                                <NavLink onClick={() => this.setState({modal:false})} to="/usersList">список пользователей</NavLink>
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                        {this.props.user && (this.props.user.role === 'operator' || this.props.user.role === 'admin') ? (
                                            <NavLink onClick={() => this.setState({modal:false})} to="/requests">Вопросы и жалобы</NavLink>
                                        ) : (
                                            <></>
                                        )}
                                        {this.props.user && (this.props.user.role === 'seller' || this.props.user.role === 'admin') ? (
                                            <NavLink onClick={() => this.setState({modal:false})} to="/addComputer">Добавить компьютер</NavLink>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                <div className="btns_modal_close">
                                    <button className="logout_btn" onClick={this.logoutUser}>выйти</button>
                                    <button className="close_modal_in_logout" onClick={this.closeModal}>закрыть</button>
                                </div>
                            </div>
                        </Modal>
                    ) : (
                        <></>
                    )}
                    <div className="menu">
                        <img onClick={this.showMenuHandler} src={menu} alt="" style={{display: `${this.state.show}`}}
                             className="menu_img"/>
                        <ul className="sub-nav animate__animated animate__fadeInRight" style={{display: `${this.state.display}`}}>
                            <img onClick={this.closeMenuHandler} src={close} alt="" className="close"/>
                            <li>
                                <NavLink to="/computers">Список Компьютеров</NavLink>
                            </li>
                            <li>
                                <NavLink to="/support">Служба поддержки</NavLink>
                            </li>
                            <li>
                                <NavLink to="/reviews">Отзывы</NavLink>
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
                                    <li className="logout_mobile" onClick={this.showModal}>
                                        Меню
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