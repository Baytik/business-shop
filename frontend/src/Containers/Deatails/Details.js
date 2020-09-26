import React, {Component} from 'react';
import {fetchPcForDetails,postIdForSold} from "../../store/actions/pcAction";
import {logoutUser} from "../../store/actions/usersAction";
import {connect} from 'react-redux';
import cpu from '../../Components/Images/cpu.png'
import ram from '../../Components/Images/ram.png';
import gpu from '../../Components/Images/gpu.png';
import ssd from '../../Components/Images/m2_ssd_oc_new.png';
import hdd from '../../Components/Images/sale_sata_35.png';
import cooler from '../../Components/Images/cooler.svg';
import board from '../../Components/Images/mother-board.svg';
import monitor from '../../Components/Images/monitor.png';
import box from '../../Components/Images/box.svg';
import power from '../../Components/Images/psu.svg';
import night from '../../Components/Images/bg-1.jpg';
import noon from '../../Components/Images/bg-2.jpg';
import dawn from '../../Components/Images/bg-3.jpg';
import warranty from '../../Components/Images/sale_warranty.png';
import price from '../../Components/Images/price.png';
import {apiURL} from "../../apiURL";
import Modal from '../../Components/UI/Modal/Modal';
import {toast,ToastContainer} from "react-toastify";
import './Details.css'
import Spinner from "../../Components/UI/Spinner/Spinner";
import WOW from 'wow.js';
import './DetailsMedia.css';

class Details extends Component {

    state = {
        modal: false,
        buyModal: false,
        rebate:'',
        editModal: false,
    };

    componentDidMount() {
        new WOW().init();
        this.props.fetchPcForDetails(this.props.match.params.id);

        const date = new Date();
        const hours = date.getHours();
        const bg = document.getElementById('container');
        const header = document.getElementById('head');
        const footer = document.getElementById('footer');
        footer.style.display = "none";
        header.style.display = "block";

        if(hours >= 4 && hours <= 13){
            bg.style.background = `url('${dawn}')100% 100% no-repeat`;
            bg.style.backgroundSize = "cover";
            bg.style.backgroundAttachment = "fixed";
            bg.style.height = "100%";
            bg.style.width = "100%";
        }else if(hours >= 14 && hours <= 19){
            bg.style.background = `url('${noon}')100% 100% no-repeat`;
            bg.style.backgroundSize = "cover";
            bg.style.backgroundAttachment = "fixed";
            bg.style.height = "100%";
            bg.style.width = "100%";
        }else {
            bg.style.background = `url('${night}')100% 100% no-repeat`;
            bg.style.backgroundSize = "cover";
            bg.style.backgroundAttachment = "fixed";
            bg.style.height = "100%";
            bg.style.width = "100%";
        }
    }

    inputValHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    sendId = async (id) => {
        await this.props.postIdForSold(id,{rebate: this.state.rebate});
        if(this.props.keyForCommentError !== null){
            toast.error(`${this.props.keyForCommentError}`);
        }else{
            this.setState({modal: true});
        }
    };

    closeModal = () => {
      this.setState({modal: false});
    };

    closeBuyModal = () => {
        this.setState({buyModal: false});
    };

    copyKeyHandler = () => {
        const text = document.getElementById('key');
        text.select();
        document.execCommand("copy");
        toast.dark(`Ключ скопирован в буфер обмена как - ${text.value}`);
    };

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps !== this.props || nextState !== this.state;
    }

    render() {
        return (
            <div className="DetailsContainer" id="container">
                <ToastContainer/>
                {this.props.spinner === true ? (
                    <Spinner/>
                ) : (
                    <>
                        {this.state.buyModal === true ? (
                            <Modal show={this.state.buyModal} close={this.closeBuyModal}>
                                <p className="title_buy">
                                    Позовните нам что-бы приобрести этот компьютер!
                                </p>
                                <div className="us_number">
                                    <p>+(996)-505-11-11-11</p>
                                    <p>+(996)-777-11-11-11</p>
                                    <p>+(996)-555-11-11-11</p>
                                </div>
                                <p className="or">Или</p>
                                <div className="feedback_btns" onClick={() => this.props.history.push('/support')}>
                                    <button className="request_btn">
                                        оставьте заявку
                                    </button>
                                </div>
                            </Modal>
                        ) : (
                            <></>
                        )}
                        {this.state.modal === true ? (
                            <Modal show={this.state.modal} close={this.closeModal}>
                                <div className="div_for_flex">
                                    <p className="for_float">Имя компьютера:</p>
                                    <p className="pc_name_comment">{this.props.detailsPc.pcName}</p>
                                </div>
                                <div className="div_for_flex">
                                    <p className="for_float">Ключ продукта:</p>
                                    <input type="text" className="key_for_comment" id="key" readOnly="on" value={`${this.props.keyForComment.key}`}/>
                                </div>
                                <div className="div_for_flex">
                                    <p className="for_float">Реальная цена:</p>
                                    <p className="pc_price_comment">{this.props.detailsPc.price - this.state.rebate}сом</p>
                                </div>
                                <div className="modal_btns">
                                    <button className="close_modal" onClick={() => this.props.history.push('/computers') && this.closeModal()}>закрыть</button>
                                    <button className="copy" onClick={this.copyKeyHandler}>копировать ключ</button>
                                </div>
                            </Modal>
                        ) : (
                            <></>
                        )}
                        {this.props.detailsPc === null ? (
                            <></>
                        ) : (
                            <div className="computer_all_details">
                                <div className="pc_name wow animate__animated animate__fadeInDown">
                                    <h2>Подробнее о {this.props.detailsPc.pcName}</h2>
                                </div>
                                <div className="computer_details">
                                    <div className="details_info_1">
                                        <div className="block_1">
                                            <div className="pc_cpu">
                                                <img src={cpu} alt={cpu}/>
                                                <div className="detail_title">
                                                    <p className="detail_name">Процессор:</p>
                                                    <p className="detail_info">{this.props.detailsPc.cpu}</p>
                                                </div>
                                            </div>
                                            <div className="pc_gpu">
                                                <img src={gpu} alt={gpu}/>
                                                <div className="detail_title">
                                                    <p className="detail_name">Видеокарта:</p>
                                                    <p className="detail_info">{this.props.detailsPc.gpu}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="block_2">
                                            <div className="pc_ram">
                                                <img src={ram} alt={ram}/>
                                                <div className="detail_title">
                                                    <p className="detail_name">ОЗУ:</p>
                                                    <p className="detail_info">{this.props.detailsPc.ram}</p>
                                                </div>
                                            </div>
                                            <div className="pc_board">
                                                <img src={board} alt={board}/>
                                                <div className="detail_title">
                                                    <p className="detail_name">Мат. Плата:</p>
                                                    <p className="detail_info">{this.props.detailsPc.motherBoard}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="block_3">
                                            <div className="pc_power">
                                                <img src={power} alt={power}/>
                                                <div className="detail_title">
                                                    <p className="detail_name">Блок Пиатния:</p>
                                                    <p className="detail_info">{this.props.detailsPc.power}</p>
                                                </div>
                                            </div>
                                            <div className="pc_cooler">
                                                <img src={cooler} alt={cooler}/>
                                                <div className="detail_title">
                                                    <p className="detail_name">Кулер:</p>
                                                    <p className="detail_info">{this.props.detailsPc.cooler}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="details_info_2">
                                        <div className="pc_image">
                                            <img src={apiURL + '/uploads/' + this.props.detailsPc.image} alt={this.props.detailsPc.image}/>
                                        </div>
                                    </div>
                                    <div className="details_info_3">
                                        <div className="block_1">
                                            <div className="pc_ssd">
                                                <img src={ssd} alt={ssd}/>
                                                <div className="detail_title">
                                                    <p className="detail_name">SSD:</p>
                                                    <p className="detail_info">{this.props.detailsPc.ssd}</p>
                                                </div>
                                            </div>
                                            <div className="pc_hdd">
                                                <img src={hdd} alt={hdd}/>
                                                <div className="detail_title">
                                                    <p className="detail_name">HDD:</p>
                                                    <p className="detail_info">{this.props.detailsPc.hdd}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="block_2">
                                            <div className="pc_monitor">
                                                <img src={monitor} alt={monitor}/>
                                                <div className="detail_title">
                                                    <p className="detail_name">Монитор:</p>
                                                    <p className="detail_info">{this.props.detailsPc.monitor}</p>
                                                </div>
                                            </div>
                                            <div className="pc_box">
                                                <img src={box} alt={box}/>
                                                <div className="detail_title">
                                                    <p className="detail_name">Корпус:</p>
                                                    <p className="detail_info">{this.props.detailsPc.box}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="block_3">
                                            <div className="pc_warranty">
                                                <img src={warranty} alt={warranty}/>
                                                <div className="detail_title">
                                                    <p className="detail_name">Гарантия:</p>
                                                    <p className="detail_info">7 дней</p>
                                                </div>
                                            </div>
                                            <div className="pc_price">
                                                <img src={price} alt={price}/>
                                                <div className="detail_title">
                                                    <p className="detail_name">Цена:</p>
                                                    <p className="price_info">{this.props.detailsPc.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {this.props.user && (this.props.user.role === 'seller' || this.props.user.role === 'admin') ? (
                                    <div className="rebate">
                                        <input type="number" name="rebate" onChange={this.inputValHandler} className="rebate_price" placeholder="Скида.........."/>
                                    </div>
                                ) : (
                                    <></>
                                )}
                                <div className="back_btn">
                                    <button className="back" onClick={() => this.props.history.push('/computers')}>назад</button>
                                    {this.props.user ? (
                                        <></>
                                    ) : (
                                        <button className="buy" onClick={() => this.setState({buyModal: true})}>купить</button>
                                    )}
                                </div>
                                <div className="edit_and_sold">
                                    {this.props.user && (this.props.user.role === 'seller' || this.props.user.role === 'admin') ? (
                                        <>
                                            <button className="sold" onClick={() => this.sendId(this.props.detailsPc._id)}>продано</button>
                                            <button className="edit" onClick={() => this.props.history.push(`/edit/${this.props.detailsPc._id}`)}>редактировать</button>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    detailsPc: state.detailsPc.detailsPc,
    user: state.user.user,
    keyForComment: state.keyForComment.keyForComment,
    keyForCommentError: state.keyForComment.keyForCommentError,
    spinner: state.pc.spinner,
});

const mapDispatchToProps = dispatch => ({
    fetchPcForDetails: (id) => dispatch(fetchPcForDetails(id)),
    logoutUser: (user) => dispatch(logoutUser(user)),
    postIdForSold: (id,rebate) => dispatch(postIdForSold(id,rebate))
});

export default connect(mapStateToProps,mapDispatchToProps) (Details);