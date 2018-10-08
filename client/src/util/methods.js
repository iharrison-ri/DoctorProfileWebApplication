import moment from "moment";

import {EDIT_NAME, ADD_DETAILS_ENTRY, REMOVE_DETAILS_ENTRY, EDIT_DROPDOWN, TOGGLE_NAME_EDITOR} from "../store/actions";

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
    // builds the payload for deployment in the dispatch
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

        // close the editor input box
        const action2 = {
            type: TOGGLE_NAME_EDITOR,
            payload: params.fieldName
        }
        dispatch(action2);

        // if the input value is empty, the state stays the same
        if (isEmptyString(payload.value)) {
            return null
        }
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

        // if the input value is empty, the state stays the same
        if (isEmptyString(payload.value)) {
            return null
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
    return parseInt(ageMonthDiff / 12);
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
        .map(data => data.Name || data.RestrictionName);
    return fieldArr;
}

export const getProfileDetails = (data, profileTablesObject, profileTableMappersObject) => {
    const {Id, DOB, FirstName, LastName, SysId} = data;

    const {
        Affiliates,
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
        ProfileToCredentials,
        ProfileToExpertise,
        ProfileToExpertiseTypes,
        ProfileToInstitutions,
        ProfileToNotes,
        ProfileToRestrictions,
        ProfileToSpeciality
    } = profileTableMappersObject;

    const detailsObj = {
        age: {
            name: "Age",
            value: getAge(DOB),
            isTextEdit: true
        },
        apmAbbrev: {
            name: "APM Abbrev",
            value: SysId,
            isTextEdit: true
        },
        dob: {
            name: "Date of birth",
            value: formatDOB(DOB),
            isTextEdit: true
        },
        expertise: {
            name: 'Expertise',
            value: mapProfileIdToField(Id, Expertise, ProfileToExpertise, "ExpertiseId"),
            isList: true
        },
        name: {
            name: "name",
            value: `${FirstName} ${LastName}`,
            isTextEdit: true
        },
        officeLocations: {
            name: 'Office Locations',
            value: null,
            isList: true
        },
        partnerStatus: {
            name: "Partner Status",
            value: null,
            options: null
        },
        patientExceptions: {
            isList: true,
            name: "Patient Exceptions",
            value: mapProfileIdToField(Id, Restrictions, ProfileToRestrictions, "RestrictionId")
        },
        suffix: {
            name: "suffix",
            value: mapProfileIdToField(Id, Credentials, ProfileToCredentials, "CredentialId"),
            isTextEdit: true
        },
        surgicalLocations: {
            name: 'Surgical Locations',
            value: mapProfileIdToField(Id, Affiliates, ProfileToAffiliates, "AffiliateId"),
            isList: true
        }
    }

    return detailsObj;
}

export const getProfileContacts = (data, profileTablesObject) => {
    const {Id} = data;
    const {ContactInfo} = profileTablesObject;
    const profileContact = ContactInfo.filter(contact => contact.Id === Id);
    return {
        ...profileContact[0]
    };
}

export const getProfileNotes = (data, profileTablesObject) => {
    const {Id} = data;
    const {Notes} = profileTablesObject;
    const notes = Notes.filter(contact => contact.Id === Id);
    return [...notes];
}

export const getExcludedRightColumn = () => {
    return [
        "expertise",
        "surgicalLocations",
        "officeLocations",
        "name",
        "suffix",
        "apmAbbrev",
        "partnerStatus",
        "dob",
        "age"
    ]
}

export const extractProfileData = (data) => {
    const recordKeys = Object.keys(data);
    const profileTableMappersArray = recordKeys.filter(data => data.includes("ProfileTo"));
    const profileTablesArray = recordKeys.filter(data => !data.includes("ProfileTo") && data !== "Profiles");

    const profileTableMappersObject = arrayToObject(profileTableMappersArray, data);
    const profileTablesObject = arrayToObject(profileTablesArray, data);
    const profiles = data["Profiles"];

    const appState = [];

    profiles.forEach(data => {
        appState.push({
            id: data.Id,
            img: data.ImageLocation,
            details: getProfileDetails(data, profileTablesObject, profileTableMappersObject),
            excludedInRightSideColumn: getExcludedRightColumn(),
            contactInfo: getProfileContacts(data, profileTablesObject),
            notes: getProfileNotes(data, profileTablesObject)
        });
    })
    // debugger
    console.log(appState);

    return appState;
}

export const isEmptyString = (string) => {
    return (string.trim().length === 0);
}

export const capitalizeFirstLetter = (string) => {
    return `${string
        .charAt(0)
        .toUpperCase()}${string
        .substr(1)}`;
}

export const formatAddress = (obj) => {
    (obj["Address1"])
        ? obj["Address"] = `${obj["Address1"]} ${obj["City"]}, ${obj["State"]} ${obj["Zip"]}`
        : null;
    (obj["Address2"])
        ? obj["Second_Address"] = `${obj["Address2"]} ${obj["City"]}, ${obj["State"]} ${obj["Zip"]}`
        : null;
    delete obj["Address1"];
    delete obj["Address2"];
    delete obj["City"];
    delete obj["State"];
    delete obj["Zip"];
    formatPhoneNumber(obj)
    // obj["Address"] = `${obj["Address1"]} ${obj["City1"]}, ${obj["State1"]}
    // ${obj["Zip1"]}`; obj["Second_Address"] = `${obj["Address2"]} ${obj["City2"]},
    // ${obj["State2"]} ${obj["Zip2"]}`; delete obj["Address1"]; delete
    // obj["City1"]; delete obj["State1"]; delete obj["Zip1"]; delete
    // obj["Address2"]; delete obj["City2"]; delete obj["State2"]; delete
    // obj["Zip2"];
}

export const formatPhoneNumber = (obj) => {
    if (obj.Phone1) {
        const areaCode = obj
            .Phone1
            .substring(0, 3);
        const firstDigits = obj
            .Phone1
            .substring(3, 6);
        const lastDigits = obj
            .Phone1
            .substring(6, 10);
        obj["Phone"] = `(${areaCode}) ${firstDigits} - ${lastDigits}`;
    } else if (obj.Phone2) {
        const areaCode = obj
            .Phone1
            .substring(0, 3);
        const firstDigits = obj
            .Phone1
            .substring(3, 6);
        const lastDigits = obj
            .Phone1
            .substring(6, 10);
        obj["Phone_2"] = `(${areaCode}) ${firstDigits} - ${lastDigits}`;
    }
    delete obj["Phone1"];
    delete obj["Phone2"];
}
