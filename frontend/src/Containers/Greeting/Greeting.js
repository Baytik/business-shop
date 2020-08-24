import React, {Component} from 'react';
import WOW from 'wow.js';
import './Greeting.css';
import './GreetingMedia.css';
import 'animate.css';

class Greeting extends Component {

    componentDidMount() {
        new WOW().init()
    }

    render() {
        return (
            <div className="GreetingContainer">
                <div className="about">
                    <div className="name wow animate__animated animate__bounceInDown">
                        <img src="https://logotypemaker.com/logo-previews/lr_ckd1co74p0002yhetiq7esf06/logo.png"
                             alt=""/>
                    </div>
                    <div className="about_us">
                        <p className="textAbout wow animate__animated animate__fadeInDownBig">О нас</p>
                    </div>
                    <div className="title">
                        <div className="block">
                            <p className="title_1 wow animate__animated animate__fadeInLeft">Наша компания продает
                                качественные компьютеры по низким ценам,
                                пригодные для игр, учебы, програмирования, работы<br/> и многое
                                другое.</p>
                            <div className="text-1 wow animate__animated animate__rollIn">
                                <p>1</p>
                            </div>
                        </div>

                        <div className="block">
                            <hr className="hr1"/>
                            <div className="text-2 wow animate__animated animate__fadeInRight">
                                <p>2</p>
                            </div>
                            <p className="title_2 wow animate__animated animate__fadeInRight">Вы можете заказать компютер на
                                ваше усмотрение, то есть вы можете выбрать любые комплектующие для вашего будущего
                                компьютера!</p>
                        </div>

                        <div className="block">
                            <hr className="hr2"/>
                            <div className="text-3 wow animate__animated animate__rollIn">
                                <p>3</p>
                            </div>
                            <p className="title_3 wow animate__animated animate__fadeInLeft">Большой выбор компьютеров,
                                такие как
                                офисные, игровые, бюджетно-игровые</p>
                        </div>
                    </div>
                    <div className="lets wow animate__animated animate__fadeInLeftBig">
                        <a href="/computers">
                            <button className="btn effect04" data-sm-link-text="Список компьютеров"><span>Просмотреть</span></button>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Greeting;