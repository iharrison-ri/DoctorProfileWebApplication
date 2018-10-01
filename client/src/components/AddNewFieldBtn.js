import React, { Component } from 'react';
import { toggleAddField} from '../util/methods.js';

class AddNewFieldBtn extends Component {
    state = {
        isAdd: true
    }
    render() {
        let text = this.state.isAdd ? "add" : "back";
        const toggleAdd = () => {
            this.setState({
                isAdd: !this.state.isAdd
            })
            toggleAddField();
        }
        return (
            <div className="addNewFieldBtn activeBtn flexCol shadow"  onClick={toggleAdd}>
                <p>{text}</p>
            </div>
        );
    }
}

export default AddNewFieldBtn;
