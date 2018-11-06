const departmentDataURI = "http://msweb02/saysowebapi/isurvey/api/GetSurveyDepartmentResponseInfo/";

export default function departmentDataAPI(surveyListId){
    let options = { 
        method: 'GET',
        url: departmentDataURI+surveyListId,
        headers: 
            { 
                'Content-Type': 'application/json' 
            } 
    };

    return options;
}