import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class NavBtn extends Component {
    render() {
        return (
            <div className="editProfileBtn activeBtn flexRow">
                <Link to={this.props.link}>
                    <p>{this.props.text}</p>
                </Link>
            </div>
        );
    }
}

export default NavBtn;
