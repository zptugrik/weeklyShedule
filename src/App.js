import React, { Component } from 'react';
import './App.css';
import Day from './components/Day.js';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            week: this.importEntryData(this.entryData),
            mouseStateDown: false,
            isOnMouseOverHandleAllowed: false
        };
    }

    entryData = {
        "mo": [{"bt": 240, "et": 779}],
        "tu": [],
        "we": [],
        "th": [{"bt": 240, "et": 779}, {"bt": 1140, "et": 1319}],
        "fr": [{"bt": 660, "et": 1019}],
        "sa": [{"bt": 0, "et": 1439}],
        "su": []
    }

    importEntryData = (entryData) => {
        let finalData = [];
        Object.keys(entryData).map((dayName, index) => {
            let hours = [];
            Array.apply(null, Array(24)).map((value, index) => {
                let hourMark = false;
                entryData[dayName].map((timeRange) => {
                    if(index * 60 >= timeRange["bt"] && index * 60 - 1 <= timeRange["et"]){
                        hourMark = true;
                    }
                    return false;
                });
                hours.push({id: index, marked: hourMark});
                return false;
            });
            finalData.push({dayName: dayName, hours: hours});
            return false;
        });
        this.showResultData();
        return finalData;
    }

    exportDayData = (day) => {
        let startCounter = false;
        let markedRange = {"bt": 0, "et": 0};
        this.entryData[day.dayName]=[];
        day.hours.map(hour => {
            if(!startCounter && hour.marked){
                markedRange.bt = hour.id * 60;
                startCounter = true;
            }
            if(startCounter && !hour.marked){
                markedRange.et = hour.id * 60 - 1;
                startCounter = false;
                this.entryData[day.dayName].push(markedRange);
                markedRange = {"bt": 0, "et": 0};
            }
            if(startCounter && day.hours.length - 1 === hour.id){//last hour should be handle in a special way
                markedRange.et = (1 + hour.id) * 60 - 1;
                startCounter = false;
                this.entryData[day.dayName].push(markedRange);
            }
            return false;
        });
        this.showResultData();
    };

    showResultData = () => {
        document.getElementsByClassName("showResult")[0].innerText = 'MO\n' + JSON.stringify(this.entryData['mo'], undefined, 4);
        document.getElementsByClassName("showResult")[1].innerText = 'TU\n' + JSON.stringify(this.entryData['tu'], undefined, 4);
        document.getElementsByClassName("showResult")[2].innerText = 'WE\n' + JSON.stringify(this.entryData['we'], undefined, 4);
        document.getElementsByClassName("showResult")[3].innerText = 'TH\n' + JSON.stringify(this.entryData['th'], undefined, 4);
        document.getElementsByClassName("showResult")[4].innerText = 'FR\n' + JSON.stringify(this.entryData['fr'], undefined, 4);
        document.getElementsByClassName("showResult")[5].innerText = 'SA\n' + JSON.stringify(this.entryData['sa'], undefined, 4);
        document.getElementsByClassName("showResult")[6].innerText = 'SU\n' + JSON.stringify(this.entryData['su'], undefined, 4);

    }
    markHour = (dayName, hourId) => {
        if(!this.state.mouseStateDown){return;}
        this.setState({week: this.state.week.map(day => {
            if(day.dayName === dayName){
                day.hours.map(hour => {
                    if(hour.id === hourId){
                        if(!this.state.isOnMouseOverHandleAllowed){
                            if(!hour.marked){
                                this.setState({isOnMouseOverHandleAllowed: true});
                            }
                            hour.marked = !hour.marked;
                        }
                        else{
                            hour.marked = true;
                        }
                    }
                    return hour;
                });
                this.exportDayData(day);
            }
            return day;
        })});
    }

    markAllDay = (dayName) => {
        let markValue = false;
        this.setState({week: this.state.week.map(day => {
                if(day.dayName === dayName){
                    // check what we have to do mark or unmark all day
                    if(day.hours.find((hour) => {
                        return !hour.marked;
                    })){ markValue = true;}
                    // all day mark perform
                    day.hours.map(hour => {
                            hour.marked = markValue;
                        return hour;
                    });
                    this.exportDayData(day);
                }
                return day;
            })});
    }

    getDay = (day) => {
        return (<Day key={day.dayName} day={day}
                     toggleState={this.toggleState}
                     onMouseOver= {this.onMouseOver}
                     markAllDay={this.markAllDay}/>
        );
    }

    getDayRow = () => {
        return this.state.week.map((day) => {
            return this.getDay(day);
        });
    }

    getHoursTitle = () => {
        return Array.apply(null, Array(8)).map((value, hourId) => {
            return <div className="cell cellLeftBorder" key={hourId}><pre>{hourId * 3}.00</pre></div>
        });
    }

    toggleState = (dayName, hourId) => {
        this.setState({mouseStateDown: hourId !== -1}, () => {this.markHour(dayName, hourId)});
        if(hourId === -1){this.setState({isOnMouseOverHandleAllowed: false});}
    }

    onMouseOver = (dayName, hourId) => {
        if(this.state.isOnMouseOverHandleAllowed){this.markHour(dayName, hourId)}
    }

    render() {
        return (
            <div className="App" onMouseUp={this.toggleState.bind(this, null, -1)}>
                <div className="title"><h2>WEEKLY SHEDULE</h2></div>
                <div className="row">
                    <div className="cell"></div>
                    <div className="cell smallFont">ALL<br/>DAY</div>
                    {this.getHoursTitle()}
                </div>
                {this.getDayRow()}
            </div>
        );
    }
}

export default App;
