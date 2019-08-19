import React, { Component } from 'react';

class Hour extends Component {
    getClassName = () => {
        let className = "cell cellBorder hour";
        return this.props.hours.marked ? className + " greyBack" : className;
    }
    render() {
        return <button className={this.getClassName()}
                       onMouseDown={this.props.toggleState.bind(this, this.props.hours.id)}
                       onMouseOver={this.props.onMouseOver.bind(this, this.props.hours.id)}
    />;
    }
}

export default Hour;