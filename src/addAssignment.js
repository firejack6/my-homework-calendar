
var num2month = {1:"Jan", 2:"Feb", 3:"Mar", 4:"Apr", 5:"May", 6:"Jun", 7:"Jul", 8:"Aug", 9:"Sep", 10:"Oct", 11:"Nov", 12:"Dec"};

function setDefaults(buttonLocation){
    
    if(buttonLocation == "topButton"){
        var time = new Date();
        var year = String(time.getFullYear());
        var month = (num2month[time.getMonth() + 1]);
        var date = String(time.getDate());
        var hours = time.getHours();
        var hourString = String(hours);    
        var minutes = time.getMinutes();
        var minuteString = String(minutes);
        if (hourString.length == 1){
            var hourString = "0" + hourString;
        }

        if(minuteString.length == 1){
            var minuteString = "0" + minuteString;
        }
        var timeCombined = hourString + minuteString; //string time
        var timeSorting = +timeCombined //integer instead of string
        var timeCombined = hourString + ":" + minuteString;

        var form = document.getElementById("iframe").contentWindow.document;
        var dateField = form.firstChild.nextSibling.firstChild.nextElementSibling.firstChild.nextSibling.firstChild.nextElementSibling.nextElementSibling.nextElementSibling.firstChild.nextElementSibling.nextElementSibling;
        dateField.placeholder = date;
        var monthField = dateField.nextElementSibling;
        monthField.placeholder = month;
        var yearField = monthField.nextElementSibling;
        yearField.placeholder = year;
        var timeField = yearField.parentElement.nextElementSibling.firstChild.nextElementSibling.nextElementSibling;
        timeField.placeholder = timeCombined;
        var currentDate = [year,month,date,timeCombined];
        return currentDate
    }
    else{
        // console.log(buttonLocation)
        var newloc = buttonLocation.parentElement.firstChild.nextElementSibling
        var date = newloc.innerHTML;
        var newloc = buttonLocation.parentElement.parentElement.parentElement
        var month = newloc.id;
        var year = "2023";

        var form = document.getElementById("iframe").contentWindow.document;
        var dateField = form.firstChild.nextSibling.firstChild.nextElementSibling.firstChild.nextSibling.firstChild.nextElementSibling.nextElementSibling.nextElementSibling.firstChild.nextElementSibling.nextElementSibling;
        dateField.placeholder = date;
        var monthField = dateField.nextElementSibling;
        monthField.placeholder = month;
        var yearField = monthField.nextElementSibling;
        yearField.placeholder = year;
        var timeField = yearField.parentElement.nextElementSibling.firstChild.nextElementSibling.nextElementSibling;
        timeField.placeholder = "23:59";
        var currentDate = [year,month,date,timeCombined];
        return currentDate
    }
}

var checks = [];
function submitAssignment(){
    var monthCheck = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    var date = document.getElementsByName("dateEntry")[0].value;
    if (date){}
    else{
        var date = document.getElementsByName("dateEntry")[0].placeholder;
    }
    var month = document.getElementsByName("monthEntry")[0].value;
    if (month){}
    else{
        var month = document.getElementsByName("monthEntry")[0].placeholder;
    }

    checks[0] = monthCheck.includes(month)
    if(checks[0] == false){
        alert("Month should be 3 letters, starting with a capital");
        return
    }

    var year = document.getElementsByName("yearEntry")[0].value;
    if (year){}
    else{
        var year = document.getElementsByName("yearEntry")[0].placeholder;
    }
    var time = document.getElementsByName("timeEntry")[0].value;
    var time = time.replace(":","");
    var time = + time;
    if (time){}
    else{
        var time = document.getElementsByName("timeEntry")[0].placeholder;
        var time = time.replace(":","");
        var time = + time;
    }

    var assignmentClass = document.getElementsByName("classEntry")[0].value;
    if (assignmentClass){}
    else {var assignmentClass = document.getElementsByName("classEntry")[0].placeholder}

    var assignmentName = document.getElementsByName("nameEntry")[0].value;
    if(assignmentName){
        var assignmentDetails = [date,month,year,time,assignmentName,assignmentClass]
        assignmentDetails[3] = +assignmentDetails[3]
        // console.log(assignmentDetails)
        
        var finalCheck = checks.includes(false)
        if(finalCheck == false ){
            assignmentsData(assignmentDetails)
        }
    }
    else{
        alert("Error creating assignment")
    }
    



  
}

async function assignmentsData(assignmentDetails){
    var year = assignmentDetails[2];
    var month = assignmentDetails[1];
    var date = assignmentDetails[0];
    var time = assignmentDetails[3];
    var assignmentName = assignmentDetails[4];
    var assignmentClass = assignmentDetails[5];

    var assignmentsDataJson = await fetch("https://jacksonsserver.ddns.net/calendar/assignmentsPHP.json").then(response => response.json()).then(json => assignmentsJSON = json); //javascript object

    //years
    var oldYear = assignmentsJSON[0][year]
    if(oldYear == undefined){
        var oldData = assignmentsJSON[0];
        var newData = new Object();
        newData[year] = new Object();
        var combineData = new Object();
        combineData[year] = new Object()
        Object.assign(assignmentsJSON[0], combineData)
        // console.log(assignmentsJSON)
    }
    //months
    var oldMonth = assignmentsJSON[0][year][month]
    // console.log(oldMonth)
    if(oldMonth == undefined){
        var oldData = assignmentsJSON[0][year];
        var newData = new Object();
        newData[month] = new Object();
        var combineData = new Object();
        combineData[month] = new Object();
        Object.assign(assignmentsJSON[0][year], combineData)
        // console.log(assignmentsJSON)
    }
    //days
    var oldDay = assignmentsJSON[0][year][month][date]
    // console.log(oldDay)
    if(oldDay == undefined){
        var oldData = assignmentsJSON[0][year][month];
        var newData = new Object();
        newData[date] = new Object();
        var combineData = new Object();
        combineData[date] = new Object();
        Object.assign(assignmentsJSON[0][year][month],combineData);
        // console.log(assignmentsJSON)
    }


    //creates assignments
    var newAssignment = new Object();
    newAssignment[assignmentName] = new Object();
    Object.assign(assignmentsJSON[0][year][month][date],newAssignment)
    var innerData = new Object();
    innerData.time = time;
    innerData.class = assignmentClass;
    innerData.progress = 0;

    Object.assign(assignmentsJSON[0][year][month][date][assignmentName],innerData)
    //console.log(assignmentsJSON)
    jsonstring = JSON.stringify(assignmentsJSON)
    //console.log(jsonstring)

    writeJSON(jsonstring)

    // setTimeout(windowclose,200);
    //     function windowclose(){
    //         window.close()
    //     };
}

function addButtonClicked(buttonLocation){
    
    document.getElementById("iframeContainer").classList.remove("hidden");
    setDefaults(buttonLocation);
}

function deleteButtonClicked(buttonLocation){
    var text = buttonLocation.parentElement.innerHTML;
    // console.log(text)
    var endName = text.indexOf("&nbsp"); //finds invisible character displayed between name and time
    // console.log(endName)
    var name = text.substring(0,endName);
    // console.log(buttonLocation)
    var date = buttonLocation.parentElement.parentElement.previousElementSibling.id;
    var date = date.replace("day","");
    var month = buttonLocation.parentElement.parentElement.parentElement.parentElement.parentElement.id;
    var year = "2023"; //needs fixed
    deleteAssignment(name,date,month,year)
    async function deleteAssignment(){
        var assignmentsDataJson = await fetch("https://jacksonsserver.ddns.net/calendar/assignmentsPHP.json")
        .then(response => response.json())
        .then(json => assignmentsJSON = json); //javascript object
        delete assignmentsJSON[0][year][month][date][name]
        console.log(assignmentsJSON)
        var assignmentsJSON = JSON.stringify(assignmentsJSON)
        writeJSON(assignmentsJSON)
        mainCalendar()
    }
}

function completeButtonClicked(buttonLocation){
    var text = buttonLocation.parentElement.innerHTML; //assignment name
    var endName = text.indexOf("&nbsp"); //finds invisible character displayed between name and time
    // console.log(endName)
    var name = text.substring(0,endName);
    var date = buttonLocation.parentElement.parentElement.previousElementSibling.id;
    var date = date.replace("day","");
    var month = buttonLocation.parentElement.parentElement.parentElement.parentElement.parentElement.id;
    var year = "2023"; //needs fixed
    completeAssignment(text,date,month,year)
    async function completeAssignment(){
        var assignmentsDataJson = await fetch("https://jacksonsserver.ddns.net/calendar/assignmentsPHP.json")
        .then(response => response.json())
        .then(json => assignmentsJSON = json); //javascript object
        // console.log(assignmentsJSON)
        // console.log(name)
        var status = assignmentsJSON[0][year][month][date][name]['progress'];
        // console.log(status)
        if(status == 0){
            assignmentsJSON[0][year][month][date][name]["progress"] = 100;
            // console.log(assignmentsJSON)
        }
        else{
            assignmentsJSON[0][year][month][date][name]["progress"] = 0;
        }
        var assignmentsJSON = JSON.stringify(assignmentsJSON)
        writeJSON(assignmentsJSON)
        mainCalendar()
    }

}

function writeJSON(data){
    const url = "https://jacksonsserver.ddns.net/calendar/save.php";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200){
    try{
        var json = JSON.parse(xhr.responseText);
    }
    catch{
    json = xhr.responseText;
    }
    console.log(json);
    }}
    xhr.send(data);
}
