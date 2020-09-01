import React, {Component} from 'react';
import './Footer.css';
import './MediaFooter.css';

class Footer extends Component {
    componentDidMount() {

        const footer = document.getElementById('footer');

        if (window.location.pathname === '/' || window.location.pathname === '/login'){
            footer.style.display = "none";
        }else{
            footer.style.display = "block";
        }
    }

    render() {
        return (
                <footer id="footer">
                    <p className="footer_text">© copyright: 2020 Anonymous™ HAGAPS <br/>All Rights Reserved</p>
                </footer>
        );
    }
}

export default Footer;