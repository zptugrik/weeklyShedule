import React, { Component } from 'react';
import Hour from './Hour.js';

class Day extends Component {
    getClassName = () => {
        let className = "cell cellBorder";
        if(this.props.day.hours[0].marked && this.props.day.hours.find((hour) => {
            return this.props.day.hours[0].marked !== hour.marked;
        }) == null){className += " blackBackground"}

        return className;
    }

    getHours = () => {
        return this.props.day.hours.map((hours) => {
            return <Hour key={hours.id} hours={hours}
                         toggleState={this.props.toggleState.bind(this, this.props.day.dayName)}
                         onMouseOver= {this.props.onMouseOver.bind(this, this.props.day.dayName)}/>
        });
    }

    render() {
        return (
            <div className="row">
                <button className="cell cellBorder">{this.props.day.dayName}</button>
                <button className={this.getClassName()} onClick={this.props.markAllDay.bind(this, this.props.day.dayName)}>All</button>
                {this.getHours()}
            </div>
        );
    }
}

export default Day;