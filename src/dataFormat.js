
//Schmea Structure for Response
function getSchemaOfSurveyStat(queryObj){
    let queryResponseArray = [];
    let responeObjStructure = {};
  
    for(let qsObj of queryObj){
        responeObjStructure.staticName = qsObj.StaticName;
        responeObjStructure.query = qsObj.DisplayName;
        responeObjStructure.answer = {};
        queryResponseArray.push(responeObjStructure);
        responeObjStructure = {};
    }
  
    return queryResponseArray;
}
//Complete Object Schema by getting count of users for each option type/question for choice type queries
function assignResponseCountToChoiceTypeQueryResults(choiceTypeQuerySchema, choiceTypeQueryResponses){
  
    for(let response of choiceTypeQueryResponses){
        let indexOfQuery = choiceTypeQuerySchema.findIndex(obj => obj.staticName === response.staticName);
        let targetQueryObj = choiceTypeQuerySchema[indexOfQuery];
        let answerOfQuery = response.answer;
        if(targetQueryObj.answer.hasOwnProperty(answerOfQuery))
            targetQueryObj.answer[answerOfQuery]+= 1;
        else
            targetQueryObj.answer[answerOfQuery]= 1;
    }
  
    return choiceTypeQuerySchema;
}
//Complete Object Schema by getting count of users for each option type/question for boolean type queries
function assignResponseCountToBooleanTypeQueryResults(booleanTypeQuerySchema, booleanTypeQueryResponses){
  
    for(let response of booleanTypeQueryResponses){
        let indexOfQuery = booleanTypeQuerySchema.findIndex(obj => obj.staticName === response.staticName);
        let targetQueryObj = booleanTypeQuerySchema[indexOfQuery];
        let answerOfQuery = response.answer;
        if(targetQueryObj.answer.hasOwnProperty(answerOfQuery))
            targetQueryObj.answer[answerOfQuery]+= 1;
        else
            targetQueryObj.answer[answerOfQuery] = 1;
    }
  
    return booleanTypeQuerySchema;
}
//Complete Object Schema by getting count of users for each option type/question for multichoice type queries
function assignResponseCountToMultiChoiceTypeQueryResults(multiChoiceTypeQuerySchema, multiChoiceTypeQueryResponses){
    for(let response of multiChoiceTypeQueryResponses){
        let indexOfQuery = multiChoiceTypeQuerySchema.findIndex(obj => obj.staticName === response.staticName);
        let targetQueryObj = multiChoiceTypeQuerySchema[indexOfQuery];
        let answersOfQuery = response.answer.split(',');
        for(let i of answersOfQuery){
            if(targetQueryObj.answer.hasOwnProperty(i))
                targetQueryObj.answer[i]+= 1;
            else
                targetQueryObj.answer[i]= 1;
        }
    }
  
    return multiChoiceTypeQuerySchema;
}
//Complete Object Schema by getting count of users for each option type/question for gridchoice type queries
function assignResponseCountToGridChoiceTypeQueryResults(gridchoiceTypeQuerySchema, gridChoiceTypeQueryResponses){
  
    for(let response of gridChoiceTypeQueryResponses){
        let indexOfQuery = gridchoiceTypeQuerySchema.findIndex(obj => obj.staticName === response.staticName);
        let targetQueryObj = gridchoiceTypeQuerySchema[indexOfQuery];
        let parameters = getAllParametersForRating(response);  //['CL', 'ED', 'CO']
        let values = getAllRatingValues(response);             //[2, 3, 4]
        for(let index in parameters){
            if(targetQueryObj.answer.hasOwnProperty(parameters[index])){
                if(targetQueryObj.answer[parameters[index]].hasOwnProperty(values[index]))
                    targetQueryObj.answer[parameters[index]][values[index]] += 1;
                else
                    targetQueryObj.answer[parameters[index]][values[index]] = 1;
            }else
                targetQueryObj.answer[parameters[index]] = {};
        }
    }
    return gridchoiceTypeQuerySchema;
}
//Get all subqueries/Parameters of GridChoice type questions
function getAllParametersForRating(responseObj){
    let parameters = responseObj.answer.split(/;#[\d]#/gim);    // Get ratting parameters
    parameters.splice((parameters.length -1), 1);     //Remove blank element from the end of array
    
    return parameters;
}
//Get ratings of subqueries/Parameters of GridChoice type questions
function getAllRatingValues(responseObj){
    let items = responseObj.answer.split(/(\w+)/gim);
    let values = items.filter(item => !(isNaN(item) || item === '' || item === ' '))
    return values;
}
  
//get the count of user responded from each department
function getUserCountByDepartment(response){
    let countSummary = [];
    let countData = {};
    for(let data of response){
        if(data.Department === null || data.Department === '' || data.Department === ' ')
            countData.department = "UNKNOWN"
        else
            countData.department = data.Department.toUpperCase()
  
        countData.totalNoOfUsersToRespond = data.TotalNoOfSurveyUser;
        countData.noOfUsersReesponded = data.Responded;
        countSummary.push(countData);
        countData= {};
    }
    // set the state for department related data count
    this.setState({
      departmentChartData : countSummary
    })
}
// Categorize All the responses based on their type( choice, boolean, ...)
function categoriseResponsesForEachResponseType(response){
    // Get all response and question set as array
    let questionsObj = response.Questions;
    let responseObj = response.Response;
    // Filter Questions w.r.t their response type
    let choiceTypeQueries = questionsObj.filter((obj) => obj.Type==="Choice");
    let booleanTypeQueries = questionsObj.filter((obj) => obj.Type==="Boolean");
    let multiChoiceTypeQueries = questionsObj.filter((obj) => obj.Type==="MultiChoice");
    let gridChoiceTypeQueries = questionsObj.filter((obj) => obj.Type==="GridChoice");
    // Filter Responses w.r.t their response type
    let choiceTypeQueryResponses = responseObj.filter((obj) => obj.responseType==="Choice");
    let booleanTypeQueryResponses = responseObj.filter((obj) => obj.responseType==="Boolean");
    let multiChoiceTypeQueryResponses = responseObj.filter((obj) => obj.responseType==="MultiChoice");
    let gridChoiceTypeQueryResponses = responseObj.filter((obj) => obj.responseType==="GridChoice");
    //Get Schema/Structure of target response object for each query type( choice, boolean, ...)
    let choiceTypeQuerySchema = getSchemaOfSurveyStat(choiceTypeQueries);
    let booleanTypeQuerySchema = getSchemaOfSurveyStat(booleanTypeQueries);
    let multiChoiceTypeQuerySchema = getSchemaOfSurveyStat(multiChoiceTypeQueries);
    let gridChoiceTypeQuerySchema = getSchemaOfSurveyStat(gridChoiceTypeQueries);
    //Preapre the final object for every response type with count of user's responses
    let choiceTypeQueryResponseSummary = assignResponseCountToChoiceTypeQueryResults(choiceTypeQuerySchema, choiceTypeQueryResponses);
    let booleanTypeQueryResponseSummary = assignResponseCountToBooleanTypeQueryResults(booleanTypeQuerySchema, booleanTypeQueryResponses);
    let multiChoiceTypeQueryResponseSummary = assignResponseCountToMultiChoiceTypeQueryResults(multiChoiceTypeQuerySchema, multiChoiceTypeQueryResponses);
    let gridchoiceTypeQueryResponseSummary = assignResponseCountToGridChoiceTypeQueryResults(gridChoiceTypeQuerySchema, gridChoiceTypeQueryResponses);
    //set the state of diffrent question type responses count
    console.log("Boolean Chart Data: "+JSON.stringify(multiChoiceTypeQueryResponseSummary));
    console.log("Multichoice Chart Data: "+JSON.stringify(booleanTypeQueryResponseSummary));
    console.log("Choice Chart Data: "+JSON.stringify(choiceTypeQueryResponseSummary));
    console.log("Gridchoice Chart Data: "+JSON.stringify(gridchoiceTypeQueryResponseSummary));
    updateState.call(this, choiceTypeQueryResponseSummary, booleanTypeQueryResponseSummary, multiChoiceTypeQueryResponseSummary, gridchoiceTypeQueryResponseSummary)
}
//Update the state Object
function updateState(choiceTypeQueryResponseSummary, booleanTypeQueryResponseSummary, multiChoiceTypeQueryResponseSummary, gridchoiceTypeQueryResponseSummary){
    //Update the state
    this.setState((prevState, prevProps) => {
        return {
            choiceChartData : choiceTypeQueryResponseSummary,
            booleanChartData : booleanTypeQueryResponseSummary,
            multiChoiceChartData : multiChoiceTypeQueryResponseSummary,
            gridChoiceChartData : gridchoiceTypeQueryResponseSummary
        }
    })
}
exports.getUserCountByDepartment = getUserCountByDepartment;
exports.categoriseResponsesForEachResponseType = categoriseResponsesForEachResponseType;