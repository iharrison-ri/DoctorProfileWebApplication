import React, { Component } from 'react';

import { Consumer } from '../store';

import Img1 from "../img/doctor1.PNG";
import Img2 from "../img/doctor1.PNG";
import Img3 from "../img/doctor1.PNG";
import Img4 from "../img/doctor1.PNG";

class ProfileTop extends Component {
  render() {
    return (
      <Consumer>
          {value => {
            let { name, apmAbbrev, isPartner, dob, age, officeLocations, surgicalLocations, img, id } = this.props.profile ||  value.profiles[0];
            
            // let profileImg = Img1;
            // if(id === 1){ img = Img1 }
            // else if(id === 2){ img = Img2 }
            // else if(id === 3){ img = Img3 }
            // else if(id === 4){ img = Img4 }
            
            return (
              <div className="top flexRow">
                  <div className="doctorImage">
                      <img src={img} alt="" />
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
