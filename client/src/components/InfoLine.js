import React, {Component} from 'react';

class InfoLine extends Component {
    render() {

        const {name, value} = this.props;

        return (
            <div className="oneLineInfo">
                <p className="listHeading">{name}</p>
                <p>{value}</p>
            </div>
        );
    }
}

export default InfoLine;
