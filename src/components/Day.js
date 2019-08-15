import React, { Component } from 'react';
import Hour from './Hour.js';

class Day extends Component {

    getHours = () => {
        return this.props.day.hours.map((hours) => {

            return <Hour key={hours.id} hours={hours} markHour= {this.props.markHour.bind(this, this.props.day.dayName)}/>
        });
    }
    render() {
        return (
            <div className="row">
                <button className="cellBorder">{this.props.day.dayName}</button>
                <button className="cellBorder">All</button>
                {this.getHours()}
            </div>
        );
    }
}

export default Day;