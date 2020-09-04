import React, {Component} from 'react';
import WOW from "wow.js";
import InputMask from 'react-input-mask';
import './SupportService.css'
import {sendRequest} from "../../store/actions/RequestsActions";
import {toast,ToastContainer} from "react-toastify";
import {connect} from 'react-redux';
import './MediaSupportService.css';

class SupportService extends Component {

    state = {
        phone: '',
        email:'',
        description:'',
    };

    inputValHandler = (e) => {
      this.setState({[e.target.name]: e.target.value});
    };

    componentDidMount() {
        new WOW().init();
    }

    sendRequestHandler = async () => {
        const emailRegex = /(.+)@(.+)\.(.+)/;
        const email = this.state.email;
        const testEmail = email.match(emailRegex);

        if(this.state.description.length > 10){
            if(this.state.phone.length === 19){
                if(testEmail !== null){
                    const question = {
                        phone: this.state.phone,
                        email: this.state.email,
                        description: this.state.description,
                    };
                    await this.props.sendRequest(question);
                    if(this.props.postRequestError){
                        toast.error(`${this.props.postRequestError}`);
                    }else {
                        toast.dark('Ваш заявка принята!');
                        this.setState({phone:'',email:'',description:''});
                    }
                }else {
                    toast.error('Ваш email адрес некорректен')
                }
            }else{
                toast.error('Напишите правильно ваш номер телефона!')
            }
        }else {
            toast.error('Напишите корректно ваш вопрос')
        }
    };

    render() {
        return (
            <div className="SupportContainer">
                <ToastContainer/>
                <div className="dark_container">
                    <div className="titles_of_support">
                        <h2 className="big_text wow animate__animated animate__fadeInDown">Чем может помочь вам наша служба поддержки?</h2>
                        <div className="many_text_support wow animate__animated animate__fadeInDown animate__delay-2s">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, eos!</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, repudiandae!</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita, veritatis!</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime, mollitia!</p>
                        </div>
                    </div>
                    <div className="feedback_inputs_support wow animate__animated animate__fadeInDown animate__delay-4s">
                        <h3>Ваш вопрос</h3>
                        <div className="inputs_support">
                            <textarea placeholder="ваша проблема или вопрос........." className="description" name="description" onChange={this.inputValHandler}/>
                            <div className="phone_block">
                                <InputMask mask="+(\9\96)-999-99-99-99" placeholder="Ваш номер телефона..." type="text" className="phone" name="phone" onChange={this.inputValHandler}/>
                                <input placeholder="Ваш email адрес....." type="email" className="email" name="email" onChange={this.inputValHandler}/>
                            </div>
                            <button onClick={this.sendRequestHandler} className="send_question">
                                отправить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    postRequestError: state.postRequestError.postRequestError,
});

const mapDispatchToProps = dispatch => ({
    sendRequest: (request) => dispatch(sendRequest(request)),
});

export default connect(mapStateToProps,mapDispatchToProps)(SupportService);