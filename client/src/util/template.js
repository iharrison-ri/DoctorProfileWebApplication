export const getProfileTemplate = (params) => {
    return {
        acuteInjuries: {
            name: 'Acute Injuries',
            value: params.acuteInjuries.value,
            options: params.acuteInjuries.options
        },
        age: {
            name: "Age",
            value: params.age,
            isTextEdit: true
        },
        apmAbbrev: {
            name: "APM Abbrev",
            value: params.apmAbbrev,
            isTextEdit: true
        },
        auto: {
            name: 'Auto',
            value: params.auto.value,
            options: params.auto.options
        },
        dob: {
            name: "Date of birth",
            value: params.dob,
            isTextEdit: true
        },
        expertise: {
            name: 'Expertise',
            value: params.expertise,
            isList: true
        },
        name: {
            name: "name",
            value: params.name,
            isTextEdit: true
        },
        officeLocations: {
            name: 'Office Locations',
            value: params.officeLocations,
            isList: true
        },
        partnerStatus: {
            name: "Partner Status",
            value: params.partnerStatus.value,
            options: params.partnerStatus.list
        },
        patientAgeRange: {
            name: 'Patient Age Range',
            value: params.patientAgeRange.value,
            hasSlider: true,
            sliderValues: params.patientAgeRange.range
        },
        patientExceptions: {
            name: 'Patient Exceptions',
            value: params.patientExceptions,
            isList: true
        },
        suffix: {
            name: "suffix",
            value: params.suffix,
            isTextEdit: true
        },
        surgicalLocations: {
            name: 'Surgical Locations',
            value: params.surgicalLocations,
            isList: true
        },
        workComp: {
            name: 'Work Comp',
            value: params.workComp,
            options: []
        }
    }
}