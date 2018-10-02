import React, {Component} from 'react';

import {Consumer} from "../store";
import {getColumns} from "../util/filter";
import Table from "./Table";
import InfoLine from "./InfoLine";
import List from "./List";

class ProfileBottom extends Component {
    render() {
        return (
            <Consumer>
                {value => {

                    const {details, excludedInRightSideColumn} = this.props.profile;
                    const detailsKeys = Object.keys(details);
                    const expertiseColumns = getColumns(details.expertise.value);
                    const {leftColumns, rightColumns} = expertiseColumns;

                    return (
                        <div className="bottom flexRow">

                            <div className="bottomRight">
                                <Table
                                    heading={"Expertise"}
                                    leftColumns={leftColumns}
                                    rightColumns={rightColumns}/>
                            </div>

                            <div className="bottomLeft">
                                <div className="bottomLeftSection">
                                    {detailsKeys.map((data, index) => {
                                        return (excludedInRightSideColumn.includes(data))
                                            ? null
                                            : (typeof details[data].value === 'string')
                                                ? <InfoLine key={index} name={details[data].name} value={details[data].value}/>
                                                : <List key={index} heading={details[data].name} list={details[data].value}/>
                                    })}
                                </div>
                            </div>

                        </div>
                    )
                }}
            </Consumer>
        );
    }
}

export default ProfileBottom;
