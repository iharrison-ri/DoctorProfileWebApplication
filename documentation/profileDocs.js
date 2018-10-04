const profileDocs = {
    id: 0,                                                                      // the id of the profile
    img: "./img/doctor1.png",                                        // the id of the profile
    excludedInRightSideColumn: [                                  // the fields on the right side of the expertise table
        "expertise",
        "surgicalLocations"
    ],
    details: {                                                                // the profile details ex name, suffix, dob, etc
        name: {
            name: "name",                                                // name of the profile
            value: "Kris C. Dodson",                                   // the name to be display in the UI
            isTextEdit: true                                                // displays as an input box edit on teh edit profile page
        },
        partnerStatus: {
            name: "Partner Status",
            value: "Partner",
            options: [                                                        // display a drop down on the edit page
                "Partner", "Associate"
            ]
        },
        patientAgeRange: {
            name: 'Patient Age Range',
            value: "12+",
            hasSlider: true,                                                 // set to true when using the slider
            sliderValues: {                                                  // the high and low of a slider field
                low: 12,
                high: 100
            }
        },
        expertise: {
            name: 'Expertise',
            value: [                                                            // displays as a list on the ui
                "AC Joint Seperation",
                "Achilles Tendon Rupture",
                "ACL",
                "Athletic Injuries",
                "Distal Bicep Tendon Tear/Rupture"
            ],
            isList: true                                                        // displays as a list on the UI
        }
    }
}
