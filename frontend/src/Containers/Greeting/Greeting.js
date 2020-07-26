import React, {Component} from 'react';
import './Greeting.css';
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
                        <div>
                            <p className="textAbout animate__animated animate__fadeInDownBig">О нас</p>
                        </div>
                    </div>
                    <div className="title">
                        <p className="title_1 animate__animated animate__fadeInLeft">Наша компания производит отличные компьтеры пригодные для игр,учебы,програмирования,для просмотра кино
                            и многое другое.</p>
                        <div className="text-1 animate__animated animate__rollIn">
                            <p>1</p>
                        </div>
                        <hr className="hr1"/>
                        <div className="text-2 animate__animated animate__fadeInRight">
                            <p>2</p>
                        </div>
                        <p className="title_2 animate__animated animate__fadeInRight">Вы можете заказать компютер на ваше усмотрение, то есть вы можете выбрать любые комплектующие для вашего будущего компьютера!</p>
                        <hr className="hr2"/>
                        <div className="text-3 animate__animated animate__rollIn">
                            <p>3</p>
                        </div>
                        <p className="title_3 animate__animated animate__fadeInLeft">Есть и готовые варианты компьютеров такие как офисные,офисно-игровые и игровые!</p>
                    </div>
                    <div className="lets">
                        <button onClick={() => this.props.history.push('/login')} className="btn effect04" data-sm-link-text="GO"
                                target="_blank"><span>LETS</span></button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Greeting;