import React, {Component} from 'react';
import Header from '../../Components/Notification/Header/Header';
import cpu from '../../Components/Images/cpu.png'
import ram from '../../Components/Images/ram.png';
import gpu from '../../Components/Images/gpu.png';
import ssd from '../../Components/Images/m2_ssd_oc_new.png';
import hdd from '../../Components/Images/sale_sata_35.png';
import scale from '../../Components/Images/sale_warranty.png';
import category from '../../Components/Images/category.png';
import price from '../../Components/Images/price.png';
import Footer from "../../Components/Notification/Footer/Footer";
import WOW from 'wow.js';
import './MainComputers.css';
import './MediaComputers.css';
import 'animate.css';

class MainComputers extends Component {

    componentDidMount() {
        new WOW().init()
    }

    render() {
        return (
            <div className="MainContainer">
                <Header/>
                <div className="pc">
                    <div className="computer_block">
                        <div className="computer_img wow animate__animated animate__fadeIn">
                            <div>
                                <h3>Asus Pro Gaming</h3>
                                <img src="https://digital-razor.ru/upload/iblock/e63/e63983a7c5f5a78c533eac3f486a6b16.png" alt=""/>
                            </div>
                        </div>
                        <div className="computer_info wow animate__animated animate__fadeInDown">
                            <div className="accessories">
                                <div className="block_info_1">
                                    <div className="cpu">
                                        <img src={cpu} alt=""/>
                                        <div className="info">
                                            <p className="tovar_name">Процессор:</p>
                                            <p className="tovar_info">4-ядерный Intel Core i3-10100 3.60 GHz</p>
                                        </div>
                                    </div>
                                    <div className="ssd">
                                        <img src={ssd} alt=""/>
                                        <div className="info">
                                            <p className="tovar_name">Системный SSD:</p>
                                            <p className="tovar_info">Нету</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="block_info_2">
                                    <div className="gpu">
                                        <img src={gpu} alt=""/>
                                        <div className="info">
                                            <p className="tovar_name">Видеокарта:</p>
                                            <p className="tovar_info">NVIDIA GeForce GTX 1660 Super 6G</p>
                                        </div>
                                    </div>
                                    <div className="hdd">
                                        <img src={hdd} alt=""/>
                                        <div className="info">
                                            <p className="tovar_name">Системный HDD:</p>
                                            <p className="tovar_info">Жесткий диск на 1TB</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="block_info_3">
                                    <div className="ram">
                                        <img src={ram} alt=""/>
                                        <div className="info">
                                            <p className="tovar_name">Оперативная память:</p>
                                            <p className="tovar_info">8GB (2x4Gb) DDR4 2400Mhz</p>
                                        </div>
                                    </div>
                                    <div className="scale">
                                        <img src={scale} alt=""/>
                                        <div className="info">
                                            <p className="tovar_name">Гарантия:</p>
                                            <p className="tovar_info">7 дней</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="block_by wow animate__animated animate__fadeInDown">
                            <div className="block_category">
                                <img src={category} alt=""/>
                                <div className="info">
                                    <p className="title_category">Категория:</p>
                                    <p className="category">Игровые,Мощные,Для Игр,Для Работы</p>
                                </div>
                            </div>
                            <div className="block_price">
                                <img src={price} alt=""/>
                                <div className="info">
                                    <p className="title_price">Цена:</p>
                                    <p className="price">78.000 сом</p>
                                </div>
                            </div>
                            <button className="by"><span className="text_1">Забронировать</span> <span className="text_2">Сейчас!</span></button>
                        </div>
                    </div>
                    <div className="computer_block">
                        <div className="computer_img wow animate__animated animate__fadeIn">
                            <div>
                                <h3>Asus Pro Gaming</h3>
                                <img src="https://digital-razor.ru/upload/iblock/e63/e63983a7c5f5a78c533eac3f486a6b16.png" alt=""/>
                            </div>
                        </div>
                        <div className="computer_info wow animate__animated animate__fadeInDown">
                            <div className="accessories">
                                <div className="block_info_1">
                                    <div className="cpu">
                                        <img src={cpu} alt=""/>
                                        <div className="info">
                                            <p className="tovar_name">Процессор:</p>
                                            <p className="tovar_info">4-ядерный Intel Core i3-10100 3.60 GHz</p>
                                        </div>
                                    </div>
                                    <div className="ssd">
                                        <img src={ssd} alt=""/>
                                        <div className="info">
                                            <p className="tovar_name">Системный SSD:</p>
                                            <p className="tovar_info">Нету</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="block_info_2">
                                    <div className="gpu">
                                        <img src={gpu} alt=""/>
                                        <div className="info">
                                            <p className="tovar_name">Видеокарта:</p>
                                            <p className="tovar_info">NVIDIA GeForce GTX 1660 Super 6G</p>
                                        </div>
                                    </div>
                                    <div className="hdd">
                                        <img src={hdd} alt=""/>
                                        <div className="info">
                                            <p className="tovar_name">Системный HDD:</p>
                                            <p className="tovar_info">Жесткий диск на 1TB</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="block_info_3">
                                    <div className="ram">
                                        <img src={ram} alt=""/>
                                        <div className="info">
                                            <p className="tovar_name">Оперативная память:</p>
                                            <p className="tovar_info">8GB (2x4Gb) DDR4 2400Mhz</p>
                                        </div>
                                    </div>
                                    <div className="scale">
                                        <img src={scale} alt=""/>
                                        <div className="info">
                                            <p className="tovar_name">Гарантия:</p>
                                            <p className="tovar_info">7 дней</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="block_by wow animate__animated animate__fadeInDown">
                            <div className="block_category">
                                <img src={category} alt=""/>
                                <div className="info">
                                    <p className="title_category">Категория:</p>
                                    <p className="category">Игровые,Мощные,Для Игр,Для Работы</p>
                                </div>
                            </div>
                            <div className="block_price">
                                <img src={price} alt=""/>
                                <div className="info">
                                    <p className="title_price">Цена:</p>
                                    <p className="price">78.000 сом</p>
                                </div>
                            </div>
                            <button className="by"><span className="text_1">Забронировать</span> <span className="text_2">Сейчас!</span></button>
                        </div>
                    </div>
                    <div className="computer_block">
                        <div className="computer_img wow animate__animated animate__fadeIn">
                            <div>
                                <h3>Asus Pro Gaming</h3>
                                <img src="https://digital-razor.ru/upload/iblock/e63/e63983a7c5f5a78c533eac3f486a6b16.png" alt=""/>
                            </div>
                        </div>
                        <div className="computer_info wow animate__animated animate__fadeInDown">
                            <div className="accessories">
                                <div className="block_info_1">
                                    <div className="cpu">
                                        <img src={cpu} alt=""/>
                                        <div className="info">
                                            <p className="tovar_name">Процессор:</p>
                                            <p className="tovar_info">4-ядерный Intel Core i3-10100 3.60 GHz</p>
                                        </div>
                                    </div>
                                    <div className="ssd">
                                        <img src={ssd} alt=""/>
                                        <div className="info">
                                            <p className="tovar_name">Системный SSD:</p>
                                            <p className="tovar_info">Нету</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="block_info_2">
                                    <div className="gpu">
                                        <img src={gpu} alt=""/>
                                        <div className="info">
                                            <p className="tovar_name">Видеокарта:</p>
                                            <p className="tovar_info">NVIDIA GeForce GTX 1660 Super 6G</p>
                                        </div>
                                    </div>
                                    <div className="hdd">
                                        <img src={hdd} alt=""/>
                                        <div className="info">
                                            <p className="tovar_name">Системный HDD:</p>
                                            <p className="tovar_info">Жесткий диск на 1TB</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="block_info_3">
                                    <div className="ram">
                                        <img src={ram} alt=""/>
                                        <div className="info">
                                            <p className="tovar_name">Оперативная память:</p>
                                            <p className="tovar_info">8GB (2x4Gb) DDR4 2400Mhz</p>
                                        </div>
                                    </div>
                                    <div className="scale">
                                        <img src={scale} alt=""/>
                                        <div className="info">
                                            <p className="tovar_name">Гарантия:</p>
                                            <p className="tovar_info">7 дней</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="block_by wow animate__animated animate__fadeInDown">
                            <div className="block_category">
                                <img src={category} alt=""/>
                                <div className="info">
                                    <p className="title_category">Категория:</p>
                                    <p className="category">Игровые,Мощные,Для Игр,Для Работы</p>
                                </div>
                            </div>
                            <div className="block_price">
                                <img src={price} alt=""/>
                                <div className="info">
                                    <p className="title_price">Цена:</p>
                                    <p className="price">78.000 сом</p>
                                </div>
                            </div>
                            <button className="by"><span className="text_1">Забронировать</span> <span className="text_2">Сейчас!</span></button>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default MainComputers;