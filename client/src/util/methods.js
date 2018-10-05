import moment from "moment";

import {EDIT_NAME, ADD_DETAILS_ENTRY, REMOVE_DETAILS_ENTRY, EDIT_DROPDOWN, TOGGLE_NAME_EDITOR} from "../store/actions";
import {getProfileTemplate} from "./template";

// middleware for the dispatch in the context
export const update = (params, e) => {
    // the payload to be deployed
    let payload;
    // get avaliable variables from the params
    const {
        actionType,
        dispatch,
        fieldName,
        name,
        reference,
        item,
        profileEditId,
        data
    } = params;
    //builds the payload for deployment in the dispatch
    if (actionType === EDIT_NAME) {
        // this toggles the input when editing the name
        const value = document
            .getElementById("input:" + data)
            .value;
        payload = {
            value,
            fieldName,
            data
        };

        //close the editor input box
        const action2 = {
            type: TOGGLE_NAME_EDITOR,
            payload: params.fieldName
        }
        dispatch(action2)
    } else if (actionType === EDIT_DROPDOWN) {
        // this changes the value in the dropdown
        const length = e.target.options.length;
        for (let i = 0; i < length; i++) {
            if (e.target.options[i].selected) {
                payload = {
                    [fieldName]: e.target.options[i].text,
                    id: profileEditId
                }
            }
        }
    } else if (actionType === ADD_DETAILS_ENTRY) {
        // this adds an option in fields with lists
        let value,
            index,
            input;
        const inputs = document.getElementsByTagName("input");
        for (index in inputs) {
            input = inputs[index];
            if (input.name === name) {
                value = input.value;
                break;
            }
        }
        payload = {
            ref: input.name,
            value,
            id: profileEditId
        }
    } else if (actionType === REMOVE_DETAILS_ENTRY) {
        // removes an option in fields with lists
        payload = {
            ref: reference,
            item,
            id: profileEditId
        };
    } else if (actionType === TOGGLE_NAME_EDITOR) {
        // toggles the input box for editing
        payload = params.fieldName;
    }

    // dispatch the action
    dispatch({type: actionType, payload: payload});
}

export const toggleAddField = () => {
    document.getElementsByClassName("topRightEdit ")[0].scrollTop = 0;
    const isShowAddScreen = document
        .getElementsByClassName('topRightEdit')[0]
        .classList
        .contains('showAdd');
    if (isShowAddScreen) {
        document
            .getElementsByClassName('topRightEdit')[0]
            .classList
            .remove("showAdd");
        document
            .getElementsByClassName('addField')[0]
            .classList
            .remove("showAdd");
    } else {
        document
            .getElementsByClassName('topRightEdit')[0]
            .classList
            .add("showAdd");
        document
            .getElementsByClassName('addField')[0]
            .classList
            .add("showAdd");
    }
}

export const getAddHoverImg = (index) => {
    let img;
    switch (index) {
        case 1:
            img = "./img/dropdown.png";
            break;
        case 2:
            img = "./img/list.png";
            break;
        case 3:
            img = "./img/range.png";
            break;
        case 4:
            img = "./img/input.png";
            break;
        default:
            break;
    }
    return img
}

export const btnClass = (color) => {
    let btnClass = '';
    switch (color) {
        case 'red':
            btnClass = 'redBtn';
            break;
        case 'green':
            btnClass = 'greenBtn';
            break;
        case 'blue':
            btnClass = 'blueBtn';
            break;
        default:
            return null
    }
    return btnClass;
}

export const isMatchingString = (comparer, word) => {
    return comparer
        .toUpperCase()
        .includes(word.toUpperCase())
}

export const getSearchValues = (event) => {
    const values = event.target.value
    return values
        .trim()
        .split(" ")
        .filter(data => data !== "")
}

export const isInArray = (comparer, word) => {
    let returnValue = false;
    comparer.forEach(data => {
        if (data.toUpperCase().includes(word.toUpperCase())) {
            returnValue = true;
        }
    })
    return returnValue;
}

export const arrayToObject = (objectKeys, obj) => {
    const returnObj = {};
    objectKeys.forEach(data => {
        returnObj[data] = obj[data]
    })
    return returnObj;
}

export const getAge = (birthdate) => {
    const ageMonthDiff = moment().diff(birthdate, "months");
    return parseInt(ageMonthDiff/12);
}

export const formatDOB = (dob) => {
    const DOB = moment(dob).format("MM/DD/YYYY");
    return DOB
}

export const mapProfileIdToField = (id, fields, mapper, idName) => {
    const mapperIDs = mapper.filter(data => data.ProfileId === id);
    const fieldId = mapperIDs.map(data => data[idName]);
    const fieldArr = fields
        .filter(data => fieldId.includes(data.Id))
        .map(data => data.Name);
    return fieldArr;
}

export const getProfileDetails = (data, profileTablesObject, profileTableMappersObject) => {
    const {Id, DOB, FirstName, LastName, SysId} = data;

    const {
        Affiliates,
        ContactInfo,
        ContactTypes,
        Credentials,
        Expertise,
        ExpertiseTypes,
        Institutions,
        Notes,
        Restrictions,
        Speciality
    } = profileTablesObject;

    const {
        ProfileToAffiliates,
        ProfileToContactInfo,
        ProfileToContactTypes,
        ProfileToCredentials,
        ProfileToExpertise,
        ProfileToExpertiseTypes,
        ProfileToInstitutions,
        ProfileToNotes,
        ProfileToRestrictions,
        ProfileToSpeciality
    } = profileTableMappersObject;

    const detailsObj = {
        acuteInjuries: {
            value: null,
            options: null
        },
        age: getAge(DOB),
        apmAbbrev: SysId,
        auto: {
            value: null,
            options: null
        },
        dob: formatDOB(DOB),
        expertise: mapProfileIdToField(Id, Expertise, ProfileToExpertise, "ExpertiseId"),
        name: `${FirstName} ${LastName}`,
        officeLocations: null,
        partnerStatus: {
            value: null,
            list: null
        },
        patientAgeRange: {
            value: null,
            range: null
        },
        patientExceptions: null,
        suffix: null,
        surgicalLocations: mapProfileIdToField(Id, Affiliates, ProfileToAffiliates, "AffiliateId"),
        workComp: {
            value: null,
            options: null
        }
    }

    const details = getProfileTemplate(detailsObj);
    debugger
    return details;
}

export const extractProfileData = (data) => {
    const allRecordData = data.data;
    const recordKeys = Object.keys(allRecordData);
    const profileTableMappersArray = recordKeys.filter(data => data.includes("ProfileTo"));
    const profileTablesArray = recordKeys.filter(data => !data.includes("ProfileTo") && data !== "Profiles");

    const profileTableMappersObject = arrayToObject(profileTableMappersArray, allRecordData);
    const profileTablesObject = arrayToObject(profileTablesArray, allRecordData);
    const profiles = allRecordData["Profiles"];

    const appState = [];

    profiles.forEach(data => {
        const profile = {};
        profile.id = data.Id;
        profile.img = data.ImageLocation;
        profile.details = getProfileDetails(data, profileTablesObject, profileTableMappersObject);
        profile.excludedInRightSideColumn = [
            "expertise",
            "surgicalLocations",
            "officeLocations",
            "name",
            "suffix",
            "apmAbbrev",
            "partnerStatus",
            "dob",
            "age"
        ];
        appState.push(profile);
    })
    // debugger

    return appState;
}