import React, {Component} from "react";
import {Consumer} from "../store";
import {SET_RANGE, TOGGLE_SLIDER} from "../store/actions";

class RangeSlider extends Component {
    state = {
        low: "",
        high: ""
    }

    componentDidMount() {
        this.setState({low: this.props.sliderValues.low, high: this.props.sliderValues.high})
    }

    onChange = (e) => {

        const theLowValue = e.target.parentElement.children[2].innerHTML;
        const theHighValue = e.target.parentElement.children[5].innerHTML;

        const value = e.target.value;
        this.setState({
            [e.target.name]: value
        })

        let low;
        let high;
        let lowerGreaterThanHigher;

        if (e.target.name === "low") {
            low = value;
            high = theHighValue;
            lowerGreaterThanHigher = (parseInt(value, 10) > parseInt(theHighValue, 10));
        } else {
            low = theLowValue;
            high = value;
            lowerGreaterThanHigher = (parseInt(theLowValue, 10) > parseInt(value, 10))
        }

        const isMovingLowerSlider = (e.target.name === "low");

        if (lowerGreaterThanHigher && isMovingLowerSlider) {
            this.setState({high: low})
        } else if (lowerGreaterThanHigher && !isMovingLowerSlider) {
            this.setState({low: high})
        }

    }

    render() {
        return (
            <Consumer>
                {value => {
                    const {dispatch} = value;
                    const setRange = () => {
                        dispatch({
                            type: SET_RANGE,
                            payload: {
                                low: this.state.low,
                                high: this.state.high,
                                field: this.props.fieldName,
                                index: this.props.profileEditId
                            }
                        })
                        dispatch({
                            type: TOGGLE_SLIDER,
                            payload: {
                                field: this.props.fieldName,
                                index: this.props.profileEditId
                            }
                        })
                    }
                    return (
                        <div className="slidecontainer shadow">
                            <div className="submitRangeBtn" onClick={setRange}>
                                <p>ok</p>
                            </div>
                            <span>low:
                            </span>
                            <span id="lowValue">{this.state.low}</span>
                            <input
                                name="low"
                                type="range"
                                min="0"
                                max="99"
                                value={this.state.low}
                                className="slider"
                                id="myRange"
                                onChange={this.onChange}/>
                            <span>high:
                            </span>
                            <span id="highValue">{this.state.high}</span>
                            <input
                                name="high"
                                type="range"
                                min="1"
                                max="100"
                                value={this.state.high}
                                className="slider"
                                id="myRange2"
                                onChange={this.onChange}/>
                        </div>
                    )
                }}
            </Consumer>
        );
    }
}

export default RangeSlider;
