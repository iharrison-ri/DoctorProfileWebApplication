import React, {Component} from 'react';

class Table extends Component {
    render() {

        let {heading, leftColumns, rightColumns} = this.props;
        leftColumns = (leftColumns && leftColumns.length > 0) ? leftColumns : ["N/A"];

        return (
            <div className="listGroup">
                <p className="listHeading">{heading}</p>
                <div className="bottomRightBody flexRow">
                    <div className="expertiseLeft">
                        {leftColumns.map((data, index) => (index % 2 !== 0)
                            ? <p key={index} className="even">{data}</p>
                            : <p key={index}>{data}</p>)}
                    </div>
                    <div className="expertiseRight">
                        {rightColumns.map((data, index) => (index % 2 !== 0)
                            ? <p key={index} className="even">{data}</p>
                            : <p key={index}>{data}</p>)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Table;
