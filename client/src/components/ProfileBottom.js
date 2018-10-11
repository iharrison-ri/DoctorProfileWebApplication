import React, {Component} from 'react';

import {Consumer} from "../store";
import {getColumns} from "../util/filter";
import Table from "./Table";
import List from "./List";

import {formatAddress} from "../util/methods";

class ProfileBottom extends Component {
    render() {
        return (
            <Consumer>
                {value => {

                    const {details, excludedInRightSideColumn} = this.props.profile;
                    const {contactInfo} = details;
                    formatAddress(contactInfo)
                    const contactInfoKeys = Object.keys(contactInfo);
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

                                    {contactInfoKeys.map((data, index) => {
                                        const noData = (contactInfo[data] === null || contactInfo[data] === undefined);
                                        const isId = (data.toUpperCase().includes("ID"));
                                        const noValues = (contactInfo[data] && contactInfo[data].length === 0);
                                        return (noData || isId || noValues)
                                            ? null
                                            : <List key={index} heading={data} list={[contactInfo[data]]}/>
                                    })}

                                    {detailsKeys.map((data, index) => {
                                        return (excludedInRightSideColumn.includes(data))
                                            ? null
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
