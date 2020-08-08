import React, {Component} from 'react';
import Header from "../../Components/Notification/Header/Header";
import Footer from "../../Components/Notification/Footer/Footer";
import WOW from 'wow.js';
import 'animate.css';
import './AddComputer.css';
import {sendPc} from "../../store/actions/pcAction";
import {connect} from 'react-redux';
import Spinner from "../../Components/Spinner/Spinner";
import {Categories} from "../../Categories";

class AddComputers extends Component {

    state = {
        box: '',
        cpu: '',
        gpu: '',
        ram: '',
        ssd: '',
        hdd: '',
        cooler: '',
        power: '',
        motherBoard: '',
        pcName: '',
        monitor: '',
        price: '',
        image: 'загрузить фото',
        categories: Categories[0]
    };

    componentDidMount() {
        new WOW().init();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((this.state.image).length >= 30) {
            this.setState({image: 'фото загружено'})
        }
    }

    inputValHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    fileChangeHandler = e => {
        this.setState({[e.target.name]: e.target.files[0]})
    };

    addPcHandler = async (event) => {
        event.preventDefault();
        const computer = new FormData();
        computer.append('box', this.state.box);
        computer.append('cpu', this.state.cpu);
        computer.append('gpu', this.state.gpu);
        computer.append('ram', this.state.ram);
        computer.append('ssd', this.state.ssd);
        computer.append('hdd', this.state.hdd);
        computer.append('cooler', this.state.cooler);
        computer.append('power', this.state.power);
        computer.append('motherBoard', this.state.motherBoard);
        computer.append('pcName', this.state.pcName);
        computer.append('monitor', this.state.monitor);
        computer.append('price', this.state.price);
        computer.append('image', this.state.image);
        computer.append('category', this.state.categories);
        await this.props.sendPc(computer);
    };

    render() {
        return (
            <div className="AddComputersContainer animate__animated animate__fadeIn">
                <Header/>
                <h1 className="text_add">Добовляй что-бы заработать!</h1>
                {this.props.spinner === true ? (
                    <Spinner/>
                ) : (
                    <div className="inputs_2">
                        <div className="inputs_block_1">

                            <input type="text" placeholder="box..." onChange={this.inputValHandler} name="box"/>
                            <input type="text" placeholder="mother board..." onChange={this.inputValHandler}
                                   name="motherBoard"/>
                            <input type="text" placeholder="cooler..." onChange={this.inputValHandler} name="cooler"/>

                        </div>

                        <div className="inputs_block_2">

                            <input type="text" placeholder="cpu..." onChange={this.inputValHandler} name="cpu"/>
                            <input type="text" placeholder="gpu..." onChange={this.inputValHandler} name="gpu"/>
                            <input type="text" placeholder="ram..." onChange={this.inputValHandler} name="ram"/>

                        </div>

                        <div className="inputs_block_3">

                            <input type="text" placeholder="hdd..." onChange={this.inputValHandler} name="hdd"/>
                            <input type="text" placeholder="ssd..." onChange={this.inputValHandler} name="ssd"/>
                            <input type="text" placeholder="power..." onChange={this.inputValHandler} name="power"/>

                        </div>

                        <div className="inputs_block_4">
                            <input type="text" placeholder="monitor..." onChange={this.inputValHandler} name="monitor"/>
                            <input type="text" placeholder="pc name..." onChange={this.inputValHandler} name="pcName"/>
                            <input type="text" placeholder="price..." onChange={this.inputValHandler} name="price"/>
                        </div>

                        <div className="inputs_block_5">
                            <input type="file" name="image" id="image" className="inputfile"
                                   onChange={this.fileChangeHandler}/>
                            <label htmlFor="image" id="label_for_file">Загрузить фото</label>
                            <select onChange={this.inputValHandler} name="categories">
                                {Categories.map(category => (
                                    <option key={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        <div className="btns">
                            <button onClick={this.addPcHandler} className="add">Добавить</button>
                            <button onClick={() => this.props.history.push('/computers')} className="cancel">Отмена
                            </button>
                        </div>
                    </div>
                )}
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    spinner: state.pc.spinner,
});

const mapStateToDispatch = (dispatch) => ({
    sendPc: (computer) => dispatch(sendPc(computer))
});

export default connect(mapStateToProps, mapStateToDispatch)(AddComputers);