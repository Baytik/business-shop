import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchUser,deleteUser} from '../../store/actions/usersAction';
import {toast,ToastContainer} from "react-toastify";
import './UsersList.css';
import './UsersListMedia.css';

class UsersList extends Component {

    componentDidMount() {
        if(this.props.user){
            if(this.props.user.role !== 'admin'){
                this.props.history.push('/computers');
            }else {
                this.props.fetchUser();
            }
        }else {
            this.props.history.push('/computers');
        }
    }

    deleteUserHandler = async (id) => {
      await this.props.deleteUser(id);
      if(this.props.deleteUserError){
          toast.error(`${this.props.deleteUserError}`);
      }else {
          toast.success('пользователь удален!');
          this.componentDidMount();
      }
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps !== this.props;
    }

    render() {
        return (
            <div className="UsersContainer">
                <ToastContainer/>
                <p className="title_users">
                    Все Сотрудники!
                </p>
                <div className="users">
                    {this.props.users && Object.keys(this.props.users).map(info => (
                        <div key={info} className="users_block">
                            <div className="user_info">
                                <p className="user_name">Имя: {this.props.users[info].username}</p>
                                <p className="user_displayName">Отображаемое имя: {this.props.users[info].displayName}</p>
                                <p className="user_role">Роль: {this.props.users[info].role}</p>
                            </div>
                            <div className="delete_user">
                                <button onClick={() => this.deleteUserHandler(this.props.users[info]._id)}>
                                    У <br/> д <br/> а <br/> л <br/> и <br/> т <br/> ь
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    users: state.user.usersList,
    user: state.user.user,
    deleteUserError: state.user.deleteUserError,
});

const mapDispatchToProps = dispatch => ({
    fetchUser: () => dispatch(fetchUser()),
    deleteUser: (id) => dispatch(deleteUser(id)),
});

export default connect(mapStateToProps,mapDispatchToProps) (UsersList);