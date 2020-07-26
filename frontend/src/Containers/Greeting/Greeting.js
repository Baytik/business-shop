import React, {Component} from 'react';
import './Greeting.css';
import './GreetingMedia.css';
import 'animate.css';

class Greeting extends Component {

    render() {
        return (
            <div className="GreetingContainer">
                <div className="about">
                    <div className="name animate__animated animate__bounceInDown">
                        <img src="https://logotypemaker.com/logo-previews/lr_ckd1co74p0002yhetiq7esf06/logo.png" alt=""/>
                    </div>
                    <div className="about_us">
                            <p className="textAbout animate__animated animate__fadeInDownBig">О нас</p>
                    </div>
                    <div className="title">
                        <div className="block">
                        <p className="title_1 animate__animated animate__fadeInLeft">Наша компания продает качественные компьтеры пригодные для игр,учебы,програмирования,<br/> для работы и многое другое.</p>
                        <div className="text-1 animate__animated animate__rollIn">
                            <p>1</p>
                        </div>
                        </div>

                        <div className="block">
                        <hr className="hr1"/>
                        <div className="text-2 animate__animated animate__fadeInRight">
                            <p>2</p>
                        </div>
                        <p className="title_2 animate__animated animate__fadeInRight">Вы можете заказать компютер на ваше усмотрение, то есть вы можете выбрать любые комплектующие для вашего будущего компьютера!</p>
                        </div>

                        <div className="block">
                        <hr className="hr2"/>
                        <div className="text-3 animate__animated animate__rollIn">
                            <p>3</p>
                        </div>
                        <p className="title_3 animate__animated animate__fadeInLeft">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, voluptate!</p>
                    </div>
                    </div>
                    <div className="lets animate__animated animate__fadeInLeftBig">
                        <button onClick={() => this.props.history.push('/login')} className="btn effect04" data-sm-link-text="список компьютеров"
                                target="_blank"><span>просмотреть</span></button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Greeting;