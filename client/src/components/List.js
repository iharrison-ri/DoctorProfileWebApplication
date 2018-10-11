import React, {Component} from 'react';

class List extends Component {
    render() {
        
        let {heading, list} = this.props;
        //set the list to n/a if none was set
        list = (list && list.length > 0) ? list : [""];

        debugger
        
        return (
            <div className="listGroup">
                <p className="listHeading">{heading}</p>
                {list.map((location, index) => <p key={index}>{location}</p>)}
            </div>
        );
    }
}

export default List;
