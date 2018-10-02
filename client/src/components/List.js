import React, {Component} from 'react';

class List extends Component {
    render() {
        
        const {heading, list} = this.props;

        return (
            <div className="listGroup">
                <p className="listHeading">{heading}</p>
                {list.map((location, index) => <p key={index}>{location}</p>)}
            </div>
        );
    }
}

export default List;
