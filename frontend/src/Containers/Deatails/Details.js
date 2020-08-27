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

class Details extends Component {

    state = {
        modal: false,
        rebate:'',
    };

    componentDidMount() {
        this.props.fetchPcForDetails(this.props.match.params.id);

        const date = new Date();
        const hours = date.getHours();
        const bg = document.getElementById('container');

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

    sendId = (id) => {
        this.props.postIdForSold(id,{rebate: this.state.rebate});
        if(this.props.keyForCommentError){
            toast.error(`${this.props.keyForCommentError}`)
        }
        if(! this.props.keyForCommentError) {
            this.setState({modal: true})
        }
    };

    closeModal = () => {
      this.setState({modal: false});
    };

    copyKeyHandler = () => {
        const text = document.getElementById('key');
        text.select();
        document.execCommand("copy");
        toast.dark(`Ключ скопирован в буфер обмена как - ${text.value}`);
    };


    render() {
        return (
            <div className="DetailsContainer" id="container">
                <ToastContainer/>
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
                            <p className="pc_price_comment">{this.props.detailsPc.price}сом</p>
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
                        <div className="pc_name animate__animated animate__fadeInDown">
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
                        <div className="rebate">
                            <input type="number" name="rebate" onChange={this.inputValHandler} className="rebate_price" placeholder="Скида.........."/>
                        </div>
                        <div className="back_and_sold">
                            <button className="back" onClick={() => this.props.history.push('/computers')}>назад</button>
                            {this.props.user && (this.props.user.role === 'seller' || this.props.user.role === 'admin') ? (
                                <button className="sold" onClick={() => this.sendId(this.props.detailsPc._id)}>продано</button>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
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
});

const mapDispatchToProps = dispatch => ({
    fetchPcForDetails: (id) => dispatch(fetchPcForDetails(id)),
    logoutUser: (user) => dispatch(logoutUser(user)),
    postIdForSold: (id,rebate) => dispatch(postIdForSold(id,rebate))
});

export default connect(mapStateToProps,mapDispatchToProps) (Details);