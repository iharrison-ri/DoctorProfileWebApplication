import React, { Component } from 'react';

import { Consumer } from '../store';
import { getColumns } from '../util/filter';

class ProfileBottom extends Component {
  render() {
    return (
      <Consumer>
          {value => {
            const { expertise, details } =  value.profiles[0];
            const detailsKeys = Object.keys(details);
            
            const expertiseColumns = getColumns(expertise);
            return (
                <div className="bottom flexRow">
                    <div className="bottomRight">
                        <div className="listGroup">
                            <p className="listHeading">Expertise</p>
                            <div className="bottomRightBody flexRow">
                                <div className="expertiseLeft">
                                    { expertiseColumns.left.map((data, index) => (index%2 !== 0) ? <p key={index} className="even">{ data }</p> : <p key={index}>{ data }</p>) }
                                </div>
                                <div className="expertiseRight">
                                    { expertiseColumns.right.map((data, index) => (index%2 !== 0) ? <p key={index} className="even">{ data }</p> : <p key={index}>{ data }</p>) }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bottomLeft">
                        <div className="bottomLeftSection">
                            {detailsKeys.map((data, index) => {
                                if( typeof details[data].value === 'string' ){
                                    return (
                                        <div key={index} className="oneLineInfo">
                                            <p className="listHeading">{ details[data].name }</p>
                                            <p>{ details[data].value }</p>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div key={index} className="listGroup">
                                            <p className="listHeading">{ details[data].name }</p>
                                            {details[data].value.map(data => <p>{ data }</p>)}
                                        </div>
                                    )
                                }
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
