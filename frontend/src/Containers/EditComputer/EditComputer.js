import React, {Component} from 'react';
import {Categories} from "../../Categories";
import './EditComputer.css';
import './MediEditComputer.css';
import {connect} from 'react-redux';
import {editComputer, fetchPcForDetails} from "../../store/actions/pcAction";
import {toast,ToastContainer} from "react-toastify";
import Spinner from "../../Components/UI/Spinner/Spinner";

class EditComputer extends Component {

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
        text:'Загрузите фото'
    };

    componentDidMount() {
        this.props.fetchPcForDetails(this.props.match.params.id);

        const header = document.getElementById('head');
        const footer = document.getElementById('footer');
        footer.style.display = 'block';
        header.style.display = 'block';
    }

    inputValHandler = (e) => {
      this.setState({[e.target.name]: e.target.value});
    };

    fileChangeHandler = (e) => {
      this.setState({[e.target.name]: e.target.files[0]});
    };

    editComputerHandler = async () => {
        const editComputer = new FormData();

        Object.keys(this.state).forEach(key => {
            const keys = this.state[key] === '' ? this.props.detailsPc[key] : this.state[key];
            editComputer.append(key, keys);
        });

        await this.props.editComputer(this.props.match.params.id,editComputer);

        if(this.props.editComputerError){
          toast.error(`${this.props.editComputerError}`);
        }else {
          toast.success('Изменения прменены!');
        }
    };

    render() {
        return (
            <div className="EditContainer">
                <ToastContainer/>
                {this.props.spinner === true ? (
                    <Spinner/>
                ) : (
                    <>
                    <div className="inputs_edit">
                        <h3 className="title_edit">Редактирование</h3>
                        <div className="many_inputs_edit">
                            {this.props.detailsPc ? (
                                <>
                                    <input type="text" placeholder={this.props.detailsPc.box} onChange={this.inputValHandler} name="box"/>
                                    <input type="text" placeholder={this.props.detailsPc.motherBoard} onChange={this.inputValHandler} name="motherBoard"/>
                                    <input type="text" placeholder={this.props.detailsPc.cooler} onChange={this.inputValHandler} name="cooler"/>

                                    <input type="text" placeholder={this.props.detailsPc.cpu} onChange={this.inputValHandler} name="cpu"/>
                                    <input type="text" placeholder={this.props.detailsPc.gpu} onChange={this.inputValHandler} name="gpu"/>
                                    <input type="text" placeholder={this.props.detailsPc.ram} onChange={this.inputValHandler} name="ram"/>

                                    <input type="text" placeholder={this.props.detailsPc.hdd} onChange={this.inputValHandler} name="hdd"/>
                                    <input type="text" placeholder={this.props.detailsPc.ssd} onChange={this.inputValHandler} name="ssd"/>
                                    <input type="text" placeholder={this.props.detailsPc.power} onChange={this.inputValHandler} name="power"/>

                                    <input type="text" placeholder={this.props.detailsPc.monitor} onChange={this.inputValHandler} name="monitor"/>
                                    <input type="text" placeholder={this.props.detailsPc.pcName} onChange={this.inputValHandler} name="pcName"/>
                                    <input type="number" placeholder={this.props.detailsPc.price} onChange={this.inputValHandler} name="price"/>

                                    <input type="file" name="image" id="image" className="inputfile_edit"
                                           onChange={this.fileChangeHandler}/>
                                    <div className="label_for_file_edit">
                                        <label htmlFor="image" id="label_for_file_edit">{this.state.image ? 'Фото загружено': this.state.text}</label>
                                    </div>
                                    <select onChange={this.inputValHandler} className="category_edit" name="category">
                                        {Categories.map(category => (
                                            <option key={category}>{category}</option>
                                        ))}
                                    </select>
                                </>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                    <div className="back_and_edit">
                        <button className="back_edit" onClick={() => this.props.history.push(`/details/${this.props.match.params.id}`)}>назад</button>
                        <button className="edit_edit" onClick={this.editComputerHandler}>изменить</button>
                    </div>
                    </>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    detailsPc: state.detailsPc.detailsPc,
    editComputerError: state.pc.putPcError,
    spinner: state.pc.spinner,
});

const mapDispatchToProps = dispatch => ({
    fetchPcForDetails: (id) => dispatch(fetchPcForDetails(id)),
    editComputer: (id,edit) => dispatch(editComputer(id,edit)),
});

export default connect(mapStateToProps,mapDispatchToProps)(EditComputer);