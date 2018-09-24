import React, { Component } from 'react';

import { Consumer } from '../store';

class ProfileTop extends Component {
  render() {
    return (
      <Consumer>
          {value => {
            const { name, apmAbbrev, isPartner, dob, age, officeLocations, surgicalLocations } =  value.profiles[0];
            return (
              <div className="top flexRow">
                  <div className="doctorImage">
                      <img src="./img/doctor.png" alt="" />
                  </div>
                  <div className="topRight">
                      <div className="doctorName flexRow">
                          <p>{name}</p>
                      </div>
                      <div className="topRightTop flexRow">
                          <div className="topRightTopOne flexCol">
                              <p>({apmAbbrev})</p>
                              <p>{ (isPartner) ? 'Partner' : 'Associate' }</p>
                          </div>
                          <div className="topRightTopTwo flexRow">
                              <p>Birthdate: {dob}</p>
                          </div>
                          <div className="topRightTopThree flexRow">
                              <p>Age: {age}</p>
                          </div>
                      </div>
                      <div className="topRightBottom flexRow">
                          <div className="specificLocation">
                              <div className="listGroup">
                                  <p className="listHeading">Office Location</p>
                                  { officeLocations.map((location, index) => <p key={index}>{location}</p>) }
                              </div>
                          </div>
                          <div className="listGroup">
                              <p className="listHeading">Surgical Locations</p>
                              { surgicalLocations.map((location, index) => <p key={index}>{location}</p>) }
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
