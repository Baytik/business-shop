import React, {Component} from 'react';
import './Greeting.css';

class Greeting extends Component {
    render() {
        return (
            <div className="GreetingContainer">
                <div className="about">
                    <div className="name">
                        <i><p className="company_name">HAGAPS</p></i>
                    </div>
                    <div className="about_us">
                        <div>
                            <p className="textAbout">О нас</p>
                        </div>
                    </div>
                    <div className="title">
                        <p className="title_1">Наша компания производит отличные компьтеры пригодные для игр,учебы,програмирования,для просмотра кино
                            и многое другое.</p>
                        <div className="text-1">
                            <p>1</p>
                        </div>
                        <hr className="hr1"/>
                        <div className="text-2">
                            <p>2</p>
                        </div>
                        <p className="title_2">Вы можете заказать компютер на ваше усмотрение, то есть вы можете выбрать любые комплектующие для вашего будущего компьютера!</p>
                        <hr className="hr2"/>
                        <div className="text-3">
                            <p>3</p>
                        </div>
                        <p className="title_3">Есть и готовые варианты компьютеров такие как офисные,офисно-игровые и игровые!</p>
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