import React, {Component} from 'react';
import cpu from '../../Components/Images/cpu.png'
import ram from '../../Components/Images/ram.png';
import gpu from '../../Components/Images/gpu.png';
import ssd from '../../Components/Images/m2_ssd_oc_new.png';
import hdd from '../../Components/Images/sale_sata_35.png';
import scale from '../../Components/Images/sale_warranty.png';
import category from '../../Components/Images/category.png';
import price from '../../Components/Images/price.png';
import officeBg from '../../Components/Images/office_bg.jpg';
import budgetGamingBg from '../../Components/Images/budget-gaming_bg.jpg';
import gamingBg from '../../Components/Images/gaming_bg.jpeg';
import allCategoryBg from '../../Components/Images/allCategory_bg.jpg';
import mobileAllCategoryBg from '../../Components/Images/allCategoryMobileBg.jpg';
import {deletePC, fetchPc} from "../../store/actions/pcAction";
import {connect} from 'react-redux';
import WOW from 'wow.js';
import './MainComputers.css';
import './MediaComputers.css';
import 'animate.css';
import {apiURL} from "../../apiURL";
import {Categories} from '../../Categories';
import {toast, ToastContainer} from "react-toastify";
import Spinner from "../../Components/UI/Spinner/Spinner";

class MainComputers extends Component {

    state = {
        fromPrice:'',
        toPrice:'',
        sortComputers: null,
        key:'',
    };

    findByCategory = () => {
        let url = '/computers';
        if (this.props.match.params.id) {
            url += `/category/${this.props.match.params.id}`;
        }
        this.props.fetchPc(url);
    };

    findByPrice = () => {
        const computers = this.props.computers;
        if(this.state.fromPrice === ''||this.state.toPrice === ''){
            toast.error('Введите цену от и до!');
            this.setState({sortComputers: null})
        }else {
            const filter = computers.filter(price => price.price >= this.state.fromPrice && price.price <= this.state.toPrice);
            if(filter.length === 0){
                this.setState({sortComputers: null});
                toast.error('К сожелению по вашей ценовой сортировке компьютеров не найдено!')
            }else {
                this.setState({sortComputers: filter});
                toast.dark(`Найдено компьютеров (${filter.length})`)
            }
        }
    };


    deleteHanlder = (id) => {
        this.props.deletePC(id);
    };

    inputValHandler = (e) => {
      this.setState({[e.target.name]: e.target.value});
    };

    componentDidMount() {
        new WOW().init();
        this.findByCategory();

        const bg = document.getElementById('MainContainer');
        const footer = document.getElementById('footer');
        footer.style.display = "block";

        if(this.props.match.params.id === 'office'){
            bg.style.background = `url(${officeBg})100% 50% no-repeat`;
            bg.style.backgroundAttachment = "fixed";
            bg.style.backgroundSize = "cover";
            bg.style.height = "100%";
            bg.style.width = "100%";
        }else if(this.props.match.params.id === 'budget-gaming'){
            bg.style.background = `url(${budgetGamingBg})100% 50% no-repeat`;
            bg.style.backgroundAttachment = "fixed";
            bg.style.backgroundSize = "cover";
            bg.style.height = "100%";
            bg.style.width = "100%";
        }else if(this.props.match.params.id === 'gaming'){
            bg.style.background = `url(${gamingBg})100% 50% no-repeat`;
            bg.style.backgroundAttachment = "fixed";
            bg.style.backgroundSize = "cover";
            bg.style.height = "100%";
            bg.style.width = "100%";
        }else if(window.innerWidth <= 380){
            bg.style.background = `url(${mobileAllCategoryBg})100% 50% no-repeat`;
            bg.style.backgroundAttachment = "fixed";
            bg.style.backgroundSize = "cover";
            bg.style.height = "100%";
            bg.style.width = "100%";
        }else {
            bg.style.background = `url(${allCategoryBg})100% 50% no-repeat`;
            bg.style.backgroundAttachment = "fixed";
            bg.style.backgroundSize = "cover";
            bg.style.height = "100%";
            bg.style.width = "100%";
        }
    }
    componentDidUpdate(prevProps)  {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.findByCategory();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps !== this.props || nextState !== this.state;
    }

    render() {
        return (
            <div className="MainContainer" id="MainContainer">
                <ToastContainer/>
                <div className="main_container">
                    <div className="control">
                        <div className="prices">
                            <p className="text_price">Цена:</p>
                            <input type="number" onChange={this.inputValHandler} placeholder="от" name="fromPrice"/>
                            <p className="text_and">И</p>
                            <input type="number" onChange={this.inputValHandler} placeholder="до" name="toPrice"/>
                            <div>
                                <button onClick={this.findByPrice}>поиск</button>
                            </div>
                        </div>
                        <nav className="category_nav">
                            <p>выбрать категорию</p>
                            <ul className="animate__animated animate__fadeIn">
                                {Categories.map(category => (
                                    <li key={category}>
                                        <a onClick={this.findByCategory}
                                           href={`/computers${category}`}>{category === 'office' ? 'офисный' : category === 'budget-gaming' ? 'Бюджетно-Ировой' : category === 'gaming' ? 'игровой' : category}</a>
                                    </li>
                                ))}
                                <li><a href={'/computers'}>Все</a></li>
                            </ul>
                        </nav>
                    </div>
                    {this.props.spinner === true ? (
                        <Spinner/>
                    ) : (
                        <div className="pc">
                            {this.state.sortComputers !== null ? (
                                this.state.sortComputers && Object.keys(this.state.sortComputers).map(info => (
                                    <div className="computer_block" key={info}>
                                        <div className="computer_img wow animate__animated animate__fadeIn">
                                            <div>
                                                <h3>{this.state.sortComputers[info].pcName}</h3>
                                                <img onContextMenu="off" src={apiURL + '/uploads/' + this.state.sortComputers[info].image}
                                                     alt={this.state.sortComputers[info]._id}/>
                                            </div>
                                        </div>
                                        <div className="computer_info wow animate__animated animate__fadeInDown">
                                            <div className="accessories">
                                                <div className="block_info_1">
                                                    <div className="cpu">
                                                        <img src={cpu} alt=""/>
                                                        <div className="info">
                                                            <p className="tovar_name">Процессор:</p>
                                                            <p className="tovar_info">{this.state.sortComputers[info].cpu}</p>
                                                        </div>
                                                    </div>
                                                    <div className="ssd">
                                                        <img src={ssd} alt=""/>
                                                        <div className="info">
                                                            <p className="tovar_name">Системный SSD:</p>
                                                            <p className="tovar_info">{this.state.sortComputers[info].ssd}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="block_info_2">
                                                    <div className="gpu">
                                                        <img src={gpu} alt=""/>
                                                        <div className="info">
                                                            <p className="tovar_name">Видеокарта:</p>
                                                            <p className="tovar_info">{this.state.sortComputers[info].gpu}</p>
                                                        </div>
                                                    </div>
                                                    <div className="hdd">
                                                        <img src={hdd} alt=""/>
                                                        <div className="info">
                                                            <p className="tovar_name">Системный HDD:</p>
                                                            <p className="tovar_info">{this.state.sortComputers[info].hdd}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="block_info_3">
                                                    <div className="ram">
                                                        <img src={ram} alt=""/>
                                                        <div className="info">
                                                            <p className="tovar_name">Оперативная память:</p>
                                                            <p className="tovar_info">{this.state.sortComputers[info].ram}</p>
                                                        </div>
                                                    </div>
                                                    <div className="scale">
                                                        <img src={scale} alt=""/>
                                                        <div className="info">
                                                            <p className="tovar_name">Гарантия:</p>
                                                            <p className="tovar_info">7 дней</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="block_by wow animate__animated animate__fadeIn">
                                            {this.props.user && (this.props.user.role === 'admin'||this.props.user.role === 'seller') ?(
                                                <a href="/computers" className="delete" onClick={() => this.deleteHanlder(this.props.computers[info]._id)}>x</a>
                                            ) : (
                                                <></>
                                            )}
                                            <div className="block_category">
                                                <img src={category} alt=""/>
                                                <div className="info">
                                                    <p className="title_category">Категория:</p>
                                                    <p className="category">{this.state.sortComputers[info].category === 'office' ? 'офисный'
                                                        :
                                                        this.state.sortComputers[info].category === 'budget-gaming' ?
                                                            'Бюджетно-игровой' :
                                                            this.state.sortComputers[info].category === 'gaming' ?

                                                                'Игровой' : this.state.sortComputers[info].category}</p>
                                                </div>
                                            </div>
                                            <div className="block_price">
                                                <img src={price} alt=""/>
                                                <div className="info">
                                                    <p className="title_price">Цена:</p>
                                                    <p className="price">{this.state.sortComputers[info].price} сом</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => this.props.history.push(`/details/${this.state.sortComputers[info]._id}`)}
                                                className="by"><span className="text_1">Подробнее</span> <span className="text_2">О компьютере</span>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                this.props.computers && Object.keys(this.props.computers).map(info => (
                                    <div className="computer_block" key={info}>
                                        <div className="computer_img wow animate__animated animate__fadeIn">
                                            <div>
                                                <h3>{this.props.computers[info].pcName}</h3>
                                                <img src={apiURL + '/uploads/' + this.props.computers[info].image}
                                                     alt={this.props.computers[info]._id}/>
                                            </div>
                                        </div>
                                        <div className="computer_info wow animate__animated animate__fadeInDown">
                                            <div className="accessories">
                                                <div className="block_info_1">
                                                    <div className="cpu">
                                                        <img src={cpu} alt=""/>
                                                        <div className="info">
                                                            <p className="tovar_name">Процессор:</p>
                                                            <p className="tovar_info">{this.props.computers[info].cpu}</p>
                                                        </div>
                                                    </div>
                                                    <div className="ssd">
                                                        <img src={ssd} alt=""/>
                                                        <div className="info">
                                                            <p className="tovar_name">Системный SSD:</p>
                                                            <p className="tovar_info">{this.props.computers[info].ssd}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="block_info_2">
                                                    <div className="gpu">
                                                        <img src={gpu} alt=""/>
                                                        <div className="info">
                                                            <p className="tovar_name">Видеокарта:</p>
                                                            <p className="tovar_info">{this.props.computers[info].gpu}</p>
                                                        </div>
                                                    </div>
                                                    <div className="hdd">
                                                        <img src={hdd} alt=""/>
                                                        <div className="info">
                                                            <p className="tovar_name">Системный HDD:</p>
                                                            <p className="tovar_info">{this.props.computers[info].hdd}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="block_info_3">
                                                    <div className="ram">
                                                        <img src={ram} alt=""/>
                                                        <div className="info">
                                                            <p className="tovar_name">Оперативная память:</p>
                                                            <p className="tovar_info">{this.props.computers[info].ram}</p>
                                                        </div>
                                                    </div>
                                                    <div className="scale">
                                                        <img src={scale} alt=""/>
                                                        <div className="info">
                                                            <p className="tovar_name">Гарантия:</p>
                                                            <p className="tovar_info">7 дней</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="block_by wow animate__animated animate__fadeInDownBig">
                                            {this.props.user && (this.props.user.role === 'admin'||this.props.user.role === 'seller') ?(
                                                <a href="/computers" className="delete" onClick={() => this.deleteHanlder(this.props.computers[info]._id)}>x</a>
                                            ) : (
                                                <></>
                                            )}
                                            <div className="block_category">
                                                <img src={category} alt=""/>
                                                <div className="info">
                                                    <p className="title_category">Категория:</p>
                                                    <p className="category">{this.props.computers[info].category === 'office' ? 'офисный'
                                                        :
                                                        this.props.computers[info].category === 'budget-gaming' ?
                                                            'Бюджетно-игровой' :

                                                            this.props.computers[info].category === 'gaming' ?

                                                                'Игровой' : this.props.computers[info].category}</p>
                                                </div>
                                            </div>
                                            <div className="block_price">
                                                <img src={price} alt=""/>
                                                <div className="info">
                                                    <p className="title_price">Цена:</p>
                                                    <p className="price">{this.props.computers[info].price} сом</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => this.props.history.push(`/details/${this.props.computers[info]._id}`)}
                                                className="by"><span className="text_1">Подробнее</span> <span className="text_2">О компьютере</span>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    computers: state.pc.computers,
    user: state.user.user,
    spinner: state.pc.spinner,
});

const mapDispatchToProps = dispatch => ({
    fetchPc: (url) => dispatch(fetchPc(url)),
    deletePC: (id) => dispatch(deletePC(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainComputers);