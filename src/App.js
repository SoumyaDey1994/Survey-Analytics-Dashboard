import React, { Component } from 'react';
import './App.css';

import * as rp from 'request-promise';
import { CardColumns} from 'reactstrap';
//Import child components
import Header from './components/header/container/header';
import DepartmentUserChart from './components/departmentChart/container/departmentChart';
import ChoiceChart from './components/choiceQueryChart/container/choiceChart';
import BooleanChart from './components/booleanQueryChart/container/booleanChart';
import MultiChoiceChart from './components/multiChoiceQueryChart/container/multiChoiceChart';
import GridChoiceChart from './components/gridChoiceQueryChart/view/gridChoiceChart';
//Import services
import departmentDataAPI from './services/departmentDataService';
import surveyQueryResponseDataAPI from './services/queryResponseData';
import departmentUserCounrPerDepartmentAPI from './services/departmentCountPerDepartment';
import surveyQueryResponseDataFilterByDepartmentAPI from './services/queryResponseDataByDepartment';
//Import functions to process data
import {getUserCountByDepartment} from './dataFormat';
import {categoriseResponsesForEachResponseType} from './dataFormat';
let surveyListIdd = null;

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
    surveyListIdd = surveyListId;
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
// Handle Department Filter
  handleDepartmentFilterResponse = (department)=>{
    if(department.toLowerCase() === 'all departments')
      department = '';
    const surveyResponseOfUserFilterByDepartmentParams = surveyQueryResponseDataFilterByDepartmentAPI(surveyListIdd, department);
    const departmentUserCountPerDeptParams = departmentUserCounrPerDepartmentAPI(surveyListIdd, department);

    rp(departmentUserCountPerDeptParams)
      .then((responseBody) =>{
        const response = JSON.parse(responseBody);
        getUserCountByDepartment.call(this, response);  //call function with this argument
      })
      .catch((error)=>console.log('Error Occured while getting per department user count: '+error));

    rp(surveyResponseOfUserFilterByDepartmentParams )
      .then((responseBody)=>{
        const response = JSON.parse(responseBody);
        categoriseResponsesForEachResponseType.call(this, response);  //call function with this argument
      })
      .catch((error)=>console.log('Error Occured during getting per department user response: '+error));
  }
//Export data to excel and download that file
  exportDataToExcelAndDownload = ()=>{
    const {choiceChartData, booleanChartData, multiChoiceChartData, gridChoiceChartData} = this.state;
    let data = [...choiceChartData, ...booleanChartData, ...multiChoiceChartData, ...gridChoiceChartData];
    console.log(data);
  }
//render the components
  render() {
    return (
      // If all API responses is present, load the charts, otherwise show the loader
      this.state.departmentChartData.length > 0 && this.state.choiceChartData.length > 0? 
      <React.Fragment>
        <Header departmentList={this.state.departmentChartData} 
                handleDepartmentFilter={this.handleDepartmentFilterResponse} 
                exportAsExcel={this.exportDataToExcelAndDownload}
                className="container-fluid"
        />
        <div id="charts" className="container-fluid fadein" style={{marginTop : '60px'}}>  
          <CardColumns className="cols-2">
              <DepartmentUserChart chartData={this.state.departmentChartData}/>
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
