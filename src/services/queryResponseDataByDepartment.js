const queryResponseDataURI = "http://msweb02/saysowebapi/isurvey/api/GetSurveyResponseById/";

export default function surveyQueryResponseDataFilterByDepartmentAPI(surveyListId, department){
    let options = { 
        method: 'GET',
        url: queryResponseDataURI+surveyListId+"/"+department,
        headers: 
                { 
                    'Content-Type': 'application/json' 
                 } 
    };

    return options;
}
