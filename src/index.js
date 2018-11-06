import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import NotFound from './components/pageNotFound/view/notFound';

import 'chartjs-plugin-datalabels'; //plugin to show survey count
import registerServiceWorker from './registerServiceWorker';
import 'babel-polyfill';

//Check for List Id in Query Parameter
if(window.location.search){
    const parameter = window.location.search.substring(1);
    const paramValue = parameter.split("=")[1];
    if(!paramValue)
        ReactDOM.render(<NotFound />, document.getElementById('root'));
    else{
        const surveyListId = paramValue.replace(/[{}]/g, "");   // Regex to remove curly braces
        if(surveyListId == '' || surveyListId == ' ')
            ReactDOM.render(<NotFound />, document.getElementById('root'));
        else
            ReactDOM.render(<App surveyListId={surveyListId}/>, document.getElementById('root'));   //Render App compoment
    }
}else
    ReactDOM.render(<NotFound />, document.getElementById('root'));
                      
registerServiceWorker();