import React, {Component} from 'react';
import WOW from 'wow.js';
import {sendPc} from "../../store/actions/pcAction";
import {connect} from 'react-redux';
import Spinner from "../../Components/UI/Spinner/Spinner";
import {Categories} from "../../Categories";
import {toast,ToastContainer} from "react-toastify";
import 'animate.css';
import './AddComputer.css';
import './MediaAddComputer.css';

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
        image: '',
        category: Categories[0],
        text:'Загрузите фото',
        assembly: '',
    };

    componentDidMount() {
        new WOW().init();
    }

    inputValHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    fileChangeHandler = e => {
        this.setState({[e.target.name]: e.target.files[0]})
    };

    addPcHandler = async () => {
        const computer = new FormData();
        Object.keys(this.state).forEach(key => {
            computer.append(key, this.state[key]);
        });
        await this.props.sendPc(computer);
        if(this.props.postPcError){
            toast.error(`${this.props.postPcError._message}`);
        } else {
            toast.success('Компьютер добавлен успешно!');
        }
    };

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps !== this.props || nextState !== this.state;
    }

    render() {

        if(this.props.user && this.props.user.role === 'operator') {
            this.props.history.push('/computers')
        }else if (! this.props.user){
            this.props.history.push('/computers')
        }

        return (
            <div className="AddComputersContainer">
                <ToastContainer/>
                <h1 className="text_add">Добавляй что-бы заработать!</h1>
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
                            <input type="number" placeholder="price..." onChange={this.inputValHandler} name="price"/>
                        </div>

                        <div className="inputs_block_5">
                            <input type="number" placeholder="сборка..." onChange={this.inputValHandler} name="assembly"/>
                            <input type="file" name="image" id="image" className="inputfile"
                                   onChange={this.fileChangeHandler}/>
                            <div className="label_for_file">
                                <label htmlFor="image" id="label_for_file">{this.state.image ? 'Фото загружено': this.state.text}</label>
                            </div>
                            <select onChange={this.inputValHandler} name="category">
                                {Categories.map(category => (
                                    <option key={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        <div className="btns">
                            <button onClick={this.addPcHandler} className="add">Добавить</button>
                            <button onClick={() => this.props.history.push('/computers')} className="cancel">Отмена</button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    spinner: state.pc.spinner,
    postPcError: state.pc.postPcError,
    user: state.user.user,
});

const mapStateToDispatch = (dispatch) => ({
    sendPc: (computer) => dispatch(sendPc(computer))
});

export default connect(mapStateToProps, mapStateToDispatch)(AddComputers);