import React from 'react';

const ProfileImg = (props) => {
    return (
        <div className="doctorImage">
            <img src={props.img} alt="doctor img"/>
        </div>
    );
}

export default ProfileImg;
