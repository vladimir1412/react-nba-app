import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';

class Footer extends Component {
    render() {
        return (
            <div>
                <footer>
                    <div className="container footer-content">
                        <span className="footer-content__text">Copyright © 2018 NBA Media Ventures, LLC. All rights reserved</span>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Footer;