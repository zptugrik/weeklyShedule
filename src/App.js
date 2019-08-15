import React, { Component } from 'react';
import './App.css';
import Day from './components/Day.js';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {};
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

    componentWillMount(){
        this.setState({week: this.importEntryData(this.entryData)});
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
        console.log(this.entryData[day.dayName]);
    };

    markHour = (dayName, hourId) => {
        this.setState({week: this.state.week.map(day => {
            if(day.dayName === dayName){
                day.hours.map(hour => {
                    if(hour.id === hourId){
                        hour.marked = !hour.marked;
                    }
                    return hour;
                });
                this.exportDayData(day);
            }
            return day;
        })});
    }

    getDay = (day) => {
        return (<Day key={day.dayName} day={day}  markHour= {this.markHour}/>);
    }

    getDayRow = () => {
        return this.state.week.map((day) => {
            return this.getDay(day);
        });
    }

    render() {
        return (
            <div className="App">
                <div className="title"><h2>WEEKLY SHEDULE</h2></div>
                {this.getDayRow()}
            </div>
        );
    }
}

export default App;
