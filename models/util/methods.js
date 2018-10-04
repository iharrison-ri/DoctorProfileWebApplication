module.exports = {

    handleDate: (fieldsToAdd) => {
        const dateProperties = ["EffectiveDate", "TermDate"];
        dateProperties.map(data => {
            if (fieldsToAdd.hasOwnProperty(data)) {
                fieldsToAdd[data] = Date.now();
            }
        })
    },
    
    getRecords: (table) => {
        return table.findAll();
    },
    
    arrayToObject: (objectKeys, arr) => {
        const obj = {};
        arr.forEach((data, index) => {
            obj[objectKeys[index]] = data;
        })
        return obj;
    }

}