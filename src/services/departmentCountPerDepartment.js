const departmentDataURI = "http://msweb02/saysowebapi/isurvey/api/GetSurveyDepartmentResponseInfo/";

export default function departmentDataAPI(surveyListId, department){
    let options = { 
        method: 'GET',
        url: departmentDataURI+surveyListId+'/'+department,
        headers: 
            { 
                'Content-Type': 'application/json' 
            } 
    };

    return options;
}