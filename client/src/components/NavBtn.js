import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {Consumer} from '../store';

class NavBtn extends Component {
    render() {

        const isEditProfileBtn = (this.props.navId === "edit");
        const isSavedProfileBtn = (this.props.navId === "save");

        return (
            <Consumer>
                {value => {

                    const {dispatch} = value;

                    return (
                        <div className="editProfileBtn activeBtn flexRow">
                            <Link to={this.props.link}>
                                <p>{this.props.text}</p>
                            </Link>
                        </div>
                    )
                }}
            </Consumer>
        );
    }
}

export default NavBtn;
