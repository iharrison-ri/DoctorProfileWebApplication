import React, {Component} from 'react';

import {Consumer} from '../store';
import ProfileImg from './ProfileImg';
import List from './List';

class ProfileTop extends Component {
    render() {

        let {img, details} = this.props.profile;
        const style = this.props.addStlye;
        const imgLocation = process.env.PUBLIC_URL + img;
        const name = details.name.value;
        const suffix = details.suffix.value;
        const apmAbbrev = details.apmAbbrev.value;
        const partnerStatus = details.partnerStatus.value;
        const dob = details.dob.value;
        const age = details.age.value;
        const officeLocations = details.officeLocations.value;
        const surgicalLocations = details.surgicalLocations.value;

        return (
            <Consumer>
                {value => {
                    return (
                        <div className="top flexRow" style={style}>

                            <ProfileImg img={imgLocation}/>

                            <div className="topRight">

                                <div className="doctorName flexRow">
                                    <p>{name}, {suffix}</p>
                                </div>

                                <div className="topRightTop flexRow">
                                    <div className="flexCol">
                                        <p>({apmAbbrev})</p>
                                        <p>{partnerStatus}</p>
                                    </div>
                                    <div className="flexRow">
                                        <p>Birthdate: {dob}</p>
                                    </div>
                                    <div className="flexRow">
                                        <p>Age: {age}</p>
                                    </div>
                                </div>

                                <div className="topRightBottom flexRow">
                                    <List heading={"Office Location"} list={officeLocations}/>
                                    <List heading={"Surgical Locations"} list={surgicalLocations}/>
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
