export const template = {
    name: {
        name: "name",
        value: null,
        isTextEdit: true
    },
    suffix: {
        name: "suffix",
        value: null,
        isTextEdit: true
    },
    apmAbbrev: {
        name: "APM Abbrev",
        value: null,
        isTextEdit: true
    },
    partnerStatus: {
        name: "Partner Status",
        value: null,
        options: []
    },
    dob: {
        name: "Date of birth",
        value: null,
        isTextEdit: true
    },
    age: {
        name: "Age",
        value: null,
        isTextEdit: true
    },
    patientAgeRange: {
        name: 'Patient Age Range',
        value: null,
        hasSlider: true,
        sliderValues: {
            low: null,
            high: null
        }
    },
    expertise: {
        name: 'Expertise',
        value: [],
        isList: true
    },
    patientExceptions: {
        name: 'Patient Exceptions',
        value: [],
        isList: true
    },
    officeLocations: {
        name: 'Office Locations',
        value: [],
        isList: true
    },
    surgicalLocations: {
        name: 'Surgical Locations',
        value: [],
        isList: true
    },
    workComp: {
        name: 'Work Comp',
        value: null,
        options: []
    },
    auto: {
        name: 'Auto',
        value: null,
        options: []
    },
    acuteInjuries: {
        name: 'Acute Injuries',
        value: null,
        options: []
    }
}