import React, { Component } from 'react';
import './App.css';

import * as rp from 'request-promise';
import { CardColumns} from 'reactstrap';
//Import child components
import Header from './components/header/container/header';
import DepartmentUserChart from './components/departmentChart/container/departmentChart';
import PeriodChart from './components/timePeriodChart/view/periodChart';
import ChoiceChart from './components/choiceQueryChart/container/choiceChart';
import BooleanChart from './components/booleanQueryChart/container/booleanChart';
import MultiChoiceChart from './components/multiChoiceQueryChart/container/multiChoiceChart';
import GridChoiceChart from './components/gridChoiceQueryChart/view/gridChoiceChart';
//Import services
import departmentDataAPI from './services/departmentDataService';
import surveyQueryResponseDataAPI from './services/queryResponseData';
//Import functions to process data
import {getUserCountByDepartment} from './dataFormat';
import {categoriseResponsesForEachResponseType} from './dataFormat';

class App extends Component {
  constructor(){
    super();
    this.state = {
      departmentChartData : [],
      timePeriodChartData : [],
      choiceChartData : [],
      booleanChartData : [],
      gridChoiceChartData : [],
      multiChoiceChartData : []
    }
  }
  //API Call
  componentDidMount(){
    const surveyListId = this.props.surveyListId;
    let departmentResponseApiParameters = departmentDataAPI(surveyListId);
    let surveyResponseApiParamters =  surveyQueryResponseDataAPI(surveyListId);
    //To plot the chat on department user count (Total Vs Responded)
    rp(departmentResponseApiParameters)
        .then((responseBody)=>{
          const response = JSON.parse(responseBody);
          getUserCountByDepartment.call(this, response);  //call function with this argument
        })
        .catch((error)=>console.log('Error Occured: '+error));
    //To plot the chat on survey query response count (How many user responded with which option)
    rp(surveyResponseApiParamters)
      .then((responseBody)=>{
        const response = JSON.parse(responseBody);
        categoriseResponsesForEachResponseType.call(this, response);  //call function with this argument
      })
      .catch((error)=>console.log('Error Occured: '+error));
  }
//render the components
  render() {
    return (
      // If all API responses is present, load the charts, otherwise show the loader
      this.state.departmentChartData.length > 0 && this.state.choiceChartData.length > 0? 
      <React.Fragment>
        <Header departmentList={this.state.departmentChartData} className="container-fluid"/>
        <div id="charts" className="container-fluid fadein" style={{marginTop : '60px'}}>  
          <CardColumns className="cols-2">
              <DepartmentUserChart chartData={this.state.departmentChartData}/>
              <PeriodChart chartData={this.state.timePeriodChartData}/>
              <ChoiceChart chartData={this.state.choiceChartData}/>
              <BooleanChart chartData={this.state.booleanChartData}/>
              <MultiChoiceChart chartData={this.state.multiChoiceChartData}/>
              <GridChoiceChart chartData={this.state.gridChoiceChartData}/>
          </CardColumns>
        </div>
        </React.Fragment>
        :
        <div>
           <img src='https://loading.io/spinners/equalizer/lg.equalizer-bars-loader.gif' 
                className="loader" alt="loading" title="loading"/>
        </div>
    );
  }
}

export default App;
