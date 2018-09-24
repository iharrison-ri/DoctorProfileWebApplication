import {
    EDIT_NAME,
    ADD_DETAILS_ENTRY,
    REMOVE_DETAILS_ENTRY,
    EDIT_DROPDOWN,
    ADD_INPUT_REFERENCE
} from '../store/actions';

export const update = (params, e) => {
    let payload;
    const { actionType, dispatch, fieldName, name, reference, item, profileEditId } = params;

    //sets the payload if needed
    if(actionType === EDIT_NAME){
        payload = { value: document.getElementById(`${fieldName}Field`).value, id: profileEditId };
    } else if(actionType === EDIT_DROPDOWN){
        const length = e.target.options.length;
        for(let i = 0; i < length; i++){
            if(e.target.options[i].selected){
                payload = { [fieldName]: e.target.options[i].text, id: profileEditId }
            }
        }
    } else if(actionType === ADD_DETAILS_ENTRY){
        let value, index, input;
        const inputs = document.getElementsByTagName("input");
        for(index in inputs){
            input = inputs[index];
            if(input.name === name){
                value = input.value;
                break;
            }
        }
        payload = { ref: input.name, value, id: profileEditId }
    } else if(actionType === REMOVE_DETAILS_ENTRY){
        payload = { ref: reference, item, id: profileEditId};
    } else if(actionType === ADD_INPUT_REFERENCE){
        payload = params.payload;
    }

    const action = {
        type: actionType,
        payload: payload
    }

    dispatch(action);
}

export const btnClass = (color) => {
    let btnClass = '';
    switch (color) {
        case 'red':     btnClass = 'redBtn';     break;
        case 'green': btnClass = 'greenBtn';  break;
        case 'blue':   btnClass = 'blueBtn';    break;
        default: return null
    }
    return btnClass;
}