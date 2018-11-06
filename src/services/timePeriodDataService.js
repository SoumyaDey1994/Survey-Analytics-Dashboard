const timePeriodDataURI = "http://msweb02/saysowebapi/isurvey/api/GetSurveyOnDuration";

export default function(surveyListId, startDate, endDate){
    const options = { 
        method: 'POST',
        url: timePeriodDataURI,
        headers: 
            { 
                'Content-Type': 'application/json' 
            },
        body : {
                'ListId': surveyListId, 
                "StartDate": startDate, 
                "EndDate": endDate
            },
        json : true     
    };

    return options;
}