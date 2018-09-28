import React from 'react';

const ProfileImg = (props) => {
    return (
        <div className="doctorImage">
            <img src={props.img} alt=""/>
        </div>
    );
}

export default ProfileImg;
