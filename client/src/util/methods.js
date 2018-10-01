import {EDIT_NAME, ADD_DETAILS_ENTRY, REMOVE_DETAILS_ENTRY, EDIT_DROPDOWN, TOGGLE_NAME_EDITOR} from '../store/actions';

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
    const isShowAddScreen = document.getElementsByClassName('topRightEdit')[0].classList.contains('showAdd');
    if(isShowAddScreen){
        document.getElementsByClassName('topRightEdit')[0].classList.remove("showAdd");
        document.getElementsByClassName('addField')[0].classList.remove("showAdd");
    } else {
        document.getElementsByClassName('topRightEdit')[0].classList.add("showAdd");
        document.getElementsByClassName('addField')[0].classList.add("showAdd");
    }
}

export const getAddHoverImg = (index) => {
    let img;
    switch (index) {
        case 1: img = "./img/dropdown.png";
            break;
        case 2: img = "./img/list.png";
            break;
        case 3: img = "./img/range.png";
            break;
        case 4: img = "./img/input.png";
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