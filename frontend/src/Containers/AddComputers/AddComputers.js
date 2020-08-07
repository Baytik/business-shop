import React, {Component} from 'react';
import Header from "../../Components/Notification/Header/Header";
import Footer from "../../Components/Notification/Footer/Footer";
import WOW from 'wow.js';
import 'animate.css';
import './AddComputer.css';
import {sendPc} from "../../store/actions/pcAction";
import {connect} from 'react-redux';
import Spinner from "../../Components/Spinner/Spinner";

class AddComputers extends Component {

    state = {
        box:'',
        cpu:'',
        gpu:'',
        ram:'',
        ssd:'',
        hdd:'',
        cooler:'',
        power:'',
        motherBoard:'',
        pcName:'',
        monitor:''
    };

    componentDidMount() {
        new WOW().init();
    }

    inputValHandler = (e) => {
      this.setState({[e.target.name]: e.target.value});
    };

    addPcHandler = () => {
      const computer = {
          box: this.state.box,
          cpu: this.state.cpu,
          gpu: this.state.gpu,
          ram: this.state.ram,
          ssd: this.state.ssd,
          hdd: this.state.hdd,
          cooler: this.state.cooler,
          power: this.state.power,
          motherBoard: this.state.motherBoard,
          pcName: this.state.pcName,
          monitor: this.state.monitor
      };
       this.props.sendPc(computer);
    };

    render() {
        return (
            <div className="AddComputersContainer">
                <Header/>
                <h1 className="text_add">Добовляй что-бы заработать!</h1>
                {this.props.spinner === true ? (
                    <Spinner/>
                ):(
                    <div className="inputs_2">
                        <div className="inputs_block_1">

                            <input type="text" placeholder="box..." onChange={this.inputValHandler} name="box"/>
                            <input type="text" placeholder="mother board..." onChange={this.inputValHandler} name="motherBoard"/>
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
                        </div>

                        <div className="btns">
                            <button onClick={this.addPcHandler} className="add">Добавить</button>
                            <button className="cancel">Отмена</button>
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
    sendPc: (computer) =>  dispatch(sendPc(computer))
});

export default connect(mapStateToProps , mapStateToDispatch)(AddComputers);