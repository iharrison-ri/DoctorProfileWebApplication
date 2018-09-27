import React, { Component } from 'react';

import { Consumer } from '../store';

class ProfileTop extends Component {
  state = {

  }
  render() {
    return (
      <Consumer>
          {value => {
            let { img, details } = this.props.profile ||  value.profiles[0];
            const style = (this.props.addStlye) ? this.props.addStlye : {};
            return (
              <div className="top flexRow" style={style}>
                  <div className="doctorImage">
                      <img src={process.env.PUBLIC_URL + img} alt="" />
                  </div>
                  <div className="topRight">
                      <div className="doctorName flexRow">
                          <p>{details.name.value}</p>
                      </div>
                      <div className="topRightTop flexRow">
                          <div className="topRightTopOne flexCol">
                              <p>({details.apmAbbrev.value})</p>
                              <p>{details.partnerStatus.value}</p>
                          </div>
                          <div className="topRightTopTwo flexRow">
                              <p>Birthdate: {details.dob.value}</p>
                          </div>
                          <div className="topRightTopThree flexRow">
                              <p>Age: {details.age.value}</p>
                          </div>
                      </div>
                      <div className="topRightBottom flexRow">
                          <div className="specificLocation">
                              <div className="listGroup">
                                  <p className="listHeading">Office Location</p>
                                  { details.officeLocations.value.map((location, index) => <p key={index}>{location}</p>) }
                              </div>
                          </div>
                          <div className="listGroup">
                              <p className="listHeading">Surgical Locations</p>
                              { details.surgicalLocations.value.map((location, index) => <p key={index}>{location}</p>) }
                          </div>
                      </div>
                  </div>
              </div>
            )
          }}
      </Consumer>
    );
  }
}

export default ProfileTop;
