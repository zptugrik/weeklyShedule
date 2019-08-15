import React, { Component } from 'react';

class Hour extends Component {
    getClassName = () => {
        let className = "cellBorder hour";
        return this.props.hours.marked ? className + " greyBack" : className;
    }

    render() {
        return <button className={this.getClassName()} onClick= {this.props.markHour.bind(this, this.props.hours.id)} />;
    }
}

export default Hour;