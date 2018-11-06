const queryResponseDataURI = "http://msweb02/saysowebapi/isurvey/api/GetSurveyResponseById/";

export default function surveyQueryResponseDataAPI(surveyListId){
    let options = { 
        method: 'GET',
        url: queryResponseDataURI+surveyListId,
        headers: 
                { 
                    'Content-Type': 'application/json' 
                 } 
    };

    return options;
}
