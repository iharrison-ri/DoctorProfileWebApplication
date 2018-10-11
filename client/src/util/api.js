//bring in axios to make requests
import axios from "axios";
import {manualChangefields, fieldToArray} from "./methods";

export const saveProfile = (profile) => {
    return null;
    // debugger
    // profile.editedFields.map(field => {
    //     const serverFieldName = getServerFieldName(field);
    //     if(serverFieldName !== "isManualFieldEntry" && typeof profile.details[field].value === "string"){
    //         debugger
    //         const includedInDatabase = fieldToArray[serverFieldName].includes(profile.details[field].value);

    //     } else if(serverFieldName !== "isManualFieldEntry"){
    //         console.log("update array field");
    //     } else {
    //         console.log("update manual field");
    //     }
    // })
}

export const getServerFieldName = (field) => {
    let serverField;
    switch (field) {
        case "officeLocations":
            serverField = "Affiliates";
        case "suffix":
            serverField = "Credentials";
        case "expertise":
            serverField = "Expertise";
        case "Institutions":
            serverField = "Institutions";
        case "notes":
            serverField = "Notes";
        case "patientExceptions":
            serverField = "Restrictions"
        default:
            serverField = "isManualFieldEntry"
            break;
    }
    return serverField;
}

export const clientFieldToServerField = (field) => {
    let serverField;
    switch (field) {
        case "Affiliates":
            serverField = "Affiliates";
        case "ContactInfo":
            serverField = "ContactInfo";
        case "ContactTypes":
            serverField = "ContactTypes";
        case "Credentials":
            serverField = "Credentials";
        case "Expertise":
            serverField = "Expertise";
        case "ExpertiseTypes":
            serverField = "ExpertiseTypes";
        case "Institutions":
            serverField = "Institutions";
        case "Notes":
            serverField = "Notes";
        case "Profiles":
            serverField = "Profiles";
        case "ProfileToAffiliates":
            serverField = "ProfileToAffiliates";
        case "ProfileToContactInfo":
            serverField = "ProfileToContactInfo"
        case "ProfileToCredentials":
            serverField = "ProfileToCredentials"
        case "ProfileToExpertise":
            serverField = "ProfileToExpertise"
        case "ProfileToNotes":
            serverField = "ProfileToNotes"
        case "ProfileToRestrictions":
            serverField = "ProfileToRestrictions"
        case "ProfileToSpeciality":
            serverField = "ProfileToSpeciality"
        case "Restrictions":
            serverField = "Restrictions"
        case "Speciality":
            serverField = "Speciality"
        default:
            break;
    }
}