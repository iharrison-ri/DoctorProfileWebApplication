import React, {Component} from 'react';
import {Consumer} from '../store';
import {SET_RANGE, TOGGLE_SLIDER} from '../store/actions';

class RangeSlider extends Component {
    state = {

    }

    valueSetInState = false;

    componentDidMount() {
        this.setState({
            low: this.props.sliderValues.low,
            high: this.props.sliderValues.high
        })
    }

    onChange = (e) => {
        const lowerGreaterThanHigher = (parseInt(this.state.low) > parseInt(this.state.high));
        const isMovingLower = (e.target.name === "low");
        if(lowerGreaterThanHigher && isMovingLower){
            this.setState({
                high: e.target.value
            })
        } else if(lowerGreaterThanHigher && !isMovingLower) {
            this.setState({
                low: e.target.value
            })
        }

        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onTransitionEnd = (e) => {
        const lowerGreaterThanHigher = (parseInt(this.state.low) > parseInt(this.state.high));
        const isMovingLower = (e.target.name === "low");
        if(lowerGreaterThanHigher && isMovingLower){
            this.setState({
                high: e.target.value
            })
        } else if(lowerGreaterThanHigher && !isMovingLower) {
            this.setState({
                low: e.target.value
            })
        }

        this.setState({
            [e.target.name]: e.target.value
        })
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
                        <div className="slidecontainer">
                            <div className='submitRangeBtn' onClick={setRange}>
                                <p>ok</p>
                            </div>
                            <span>low: {this.state.low} </span>
                            <span id="low"></span>
                            <input
                                name="low"
                                type="range"
                                min="0"
                                max="99"
                                value={this.state.low}
                                className="slider"
                                id="myRange"
                                onChange={this.onChange}
                                onTransitionEnd={this.onTransitionEnd}/>
                            <span>high: {this.state.high} </span>
                            <span id="high"></span>
                            <input
                                name="high"
                                type="range"
                                min="1"
                                max="100"
                                value={this.state.high}
                                className="slider"
                                id="myRange2"
                                onChange={this.onChange}
                                onTransitionEnd={this.onTransitionEnd}/>
                        </div>
                    )
                }}
            </Consumer>
        );
    }
}

export default RangeSlider;
