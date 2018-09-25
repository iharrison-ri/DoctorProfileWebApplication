import React, { Component } from 'react';
import { Consumer } from '../store';
import {
    SET_RANGE,
    TOGGLE_SLIDER
} from '../store/actions';

class RangeSlider extends Component {
    state = {
        
    }
    
    componentDidMount(){
        const sliderLow = document.getElementById("myRange");
        const outputLow = document.getElementById("low");
        outputLow.innerHTML = sliderLow.value;

        const sliderHigh = document.getElementById("myRange2");
        const outputHigh = document.getElementById("high");
        outputHigh.innerHTML = sliderHigh.value;

        this.sliderLow = sliderLow.oninput = function() {
            outputLow.innerHTML = this.value;
        }

        sliderHigh.oninput = function() {
            outputHigh.innerHTML = this.value;
        }
    }

    render() {
        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    const setRange = () => {
                        const outputLow = document.getElementById("low").innerHTML;
                        const outputHigh = document.getElementById("high").innerHTML;
                        dispatch({
                            type: SET_RANGE,
                            payload: {
                                low: outputLow,
                                high: outputHigh,
                                field: this.props.fieldName,
                                index: this.props.profileEditId
                            }
                        })
                        dispatch({ type: TOGGLE_SLIDER, payload: { field: this.props.fieldName, index: this.props.profileEditId } })
                    }
                    return (
                        <div className="slidecontainer">
                            <div className='submitRangeBtn' onClick={ setRange }>
                                <p>ok</p>
                            </div>
                            <span>low:</span> <span id="low"></span>
                            <input
                                name="low"
                                type="range"
                                min="0"
                                max="99"
                                defaultValue={this.props.sliderValues.low}
                                className="slider"
                                id="myRange" />
                            <span>high:</span> <span id="high"></span>
                            <input
                                name="high"
                                type="range"
                                min="1"
                                max="100"
                                defaultValue={this.props.sliderValues.high}
                                className="slider"
                                id="myRange2" />
                        </div>
                    )
                }}
            </Consumer>
        );
    }
}

export default RangeSlider;
