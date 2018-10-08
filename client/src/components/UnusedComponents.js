// import RangeSlider from './RangeSlider';
// import AddNewFieldBtn from './AddNewFieldBtn';
// import AddField from './AddField';
// import {update} from '../util/methods.js';

// EDIT_DROPDOWN,

// const sliderEditFields = detailsObjKeys.filter(data => !details[data].isList && !details[data].isTextEdit && details[data].hasSlider);
// const dropDownEditFields = detailsObjKeys.filter(data => !details[data].isList && !details[data].isTextEdit && !details[data].hasSlider);
// const toggleSlider = (dispatch, fieldName, profileEditId) => {
//     dispatch({
//         type: TOGGLE_SLIDER,
//         payload: {
//             field: fieldName,
//             index: profileEditId
//         }
//     })
// }

{/* <div className = "listGroupEdit" > {</div></div>
    dropDownEditFields.map((fieldName, index) => {
        const {name, options} = details[fieldName];
        return (
            <div key={index} className="listGroupEdit">
                <div className="oneLineInfoEdit">
                    <p className="listHeadingEdit">
                        {name}
                    </p>
                    <select
                        onBlur={update.bind(this, {
                        actionType: EDIT_DROPDOWN,
                        dispatch,
                        fieldName,
                        profileEditId
                    })}
                        className="selectBox"
                        name=""
                        id="">
                        {options.map((fieldOption, i) => (
                            <option key={i} value="">
                                {fieldOption}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        )
    })
} < /div> */}

{/* <div className="listGroupEdit">
    {sliderEditFields.map((fieldName, index) => {
        const {hasSlider, name, value, sliderValues, showSlider} = details[fieldName];
        return (
            <div key={index} className="listGroupEdit">
                {(hasSlider === true && showSlider)
                    ? <RangeSlider
                            fieldName={fieldName}
                            profileEditId={profileEditId}
                            sliderValues={sliderValues}/>
                    : null}
                <div className="oneLineInfoEdit">
                    <p className="listHeadingEdit">
                        {name}
                    </p>
                    <div className="rangeSlider">
                        <p
                            className="noMargins"
                            onClick={toggleSlider.bind(this, dispatch, fieldName, profileEditId)}>{value}
                            <i className="fas fa-exchange-alt rangeBtn"></i>
                        </p>
                    </div>
                </div>
            </div>
        )
    })}
</div> */}

{/* <AddNewFieldBtn/> */}
{/* <AddField/> */}