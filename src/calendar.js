var month2num = {"Jan":1, "Feb":2, "Mar":3, "Apr":4, "May":5, "Jun":6, "Jul":7, "Aug":8, "Sep":9, "Oct":10, "Nov":11, "Dec":12};
var num2month = {1:"Jan", 2:"Feb", 3:"Mar", 4:"Apr", 5:"May", 6:"Jun", 7:"Jul", 8:"Aug", 9:"Sep", 10:"Oct", 11:"Nov", 12:"Dec"};
var slideIndexLength = Object.keys(month2num).length;
var todaysDate = new Date;
var currentMonth = (todaysDate.getMonth() + 1);
var currentMonth = num2month[currentMonth]
var numMonth = month2num[currentMonth];
var currentYear = todaysDate.getFullYear();
var todaysDay = todaysDate.getDate();
var monthData;

var firstTime = 1;
var firstTimeCompleteButton = 1;

function mainCalendar() {
    //onload stuff
    monthsJSON();
    popupListener();
    function monthsJSON(){ //gets list of month lengths
        months();
        // assignmentsData();
        async function months(){
            monthJSON = await fetch("months.json")
            .then(response => response.json())
            .then(json => monthJSON = json);
            // console.log("calling");

            var first = Object.values(monthJSON);
            var monthData = first[0];
            // console.log(monthData);
            if(firstTime == 1){
                indexDays(monthData);
            }
            assignmentsData(monthData);
        }

        async function assignmentsData(monthData){
	    try{
            assignmentsDataJson = await fetch("assignmentsPHP.json")
            .then(response => response.json()).then(json => assignmentsJSON = json);
            decodeAssignments(assignmentsJSON[0],monthData)
        }
	     catch{
            try{
                console.log("Failed Once")
                assignmentsDataJson = await fetch("assignmentsPHP.json")
                .then(response => response.json()).then(json => assignmentsJSON = json);
                decodeAssignments(assignmentsJSON[0],monthData)
            }
            catch{
                console.log("Failed");
                assignmentsDataJson = await fetch("template.json")
                .then(response => response.json())
                .then(json => assignmentsJSON = json);
                decodeAssignments(assignmentsJSON[0],monthData);
            }
        }


        // console.log(firstTimeCompleteButton)
        if(firstTimeCompleteButton == 1){
            document.getElementById(currentMonth).classList.replace("hidden","shown"); //displays current month
            document.getElementById("monthText").innerHTML = currentMonth; //displays name of month
            firstTimeCompleteButton = 2;

        }

        // console.log("load")
    }
    }
    
    function indexDays(second) { //creates box templates
        firstTime = 2;
        // console.log("called")
        forms = document.getElementsByClassName("month");
        // console.log(forms);
        for (let l = 1; l <= slideIndexLength; l++){
            var formNumber = num2month[l]; //sets form to look at
            // console.log(formNumber)
            var currentMonthLocation = document.getElementById(formNumber) //gets location of the form
            // console.log(currentMonthLocation);

            //creates weeks
            for (let i = 0; i <= 5; i++) {
                wkCt = document.createElement("div"); //creates div
                wkCt.classList.add("weekContainer"); //adds class
                currentMonthLocation.appendChild(wkCt); //adds to document
                // console.log(i);
        
                var newDivLocation = currentMonthLocation.getElementsByClassName("weekContainer")[i]; //gets i'th week location
                // console.log(newDivLocation);
        
                //creates days
                for (let j = 1; j <= 7; j++){
                        dCt = document.createElement("div"); //creates div
                        dCt.classList.add("box"); //adds class
                        newDivLocation.appendChild(dCt); //adds to document
                    }
            }
            currentMonthLocation.classList.add("hidden") //sets all months to be hidden by default

            var boxes = currentMonthLocation.getElementsByClassName("box");
            // console.log(boxes);
            for (let k = 0; k < boxes.length; k++) {
                var boxLocation = boxes[k];
                // console.log(boxLocation);
                var boxDivTemp = document.createElement("div"); //creates div
                boxDivTemp.setAttribute('id',"box" + k); //assigns id
                var boxDivDate = document.createElement("p"); //adds text element
                var assignmentContainerDiv = document.createElement("div");
                // boxDivDate.innerText = k //box number, NOT DATE
                boxLocation.appendChild(boxDivTemp);    //adds to doc
                boxLocation.appendChild(boxDivDate);    //adds to doc
                boxLocation.appendChild(assignmentContainerDiv);
            }
            setupDays(formNumber,second)
            function setupDays(formNumber,second){
                // console.log(monthJSON)
                // console.log(second)
                var ahh = second;
                var second = ahh;
                var twoone = second[formNumber];
                third = twoone[0];
                // console.log(third);
                
                var numDays = third["numDays"];
                // console.log(numDays);
                var startDay = third["startDay"]
                // console.log(startDay)
                setDates(formNumber, startDay, numDays);
            
                function setDates(formNumber,startDay,numDays){
                    //form number sends "Jan" ,"Feb", "Mar"...
                    var startingBox = startDay - 1;
                    // console.log(startingBox);
                    var check = "#box" + startingBox;
                    // console.log(check)
                    var startBoxId = currentMonthLocation.firstChild.querySelector(check);
                    // console.log(startBoxId)
                    // startBoxId.nextElementSibling.innerHTML = 1;
                    // console.log(numDays)
                    for (let x = 1; x <= numDays; x++){
                        try{
                        var date = x; //id of box
                        // console.log(date)
                        var boxNum = startingBox + x - 1;
                        var dateBox = "#box" + boxNum;
                        // console.log(dateBox)
                        var setBox = currentMonthLocation.querySelector(dateBox);
                        // console.log(setBox)
                        setBox.nextElementSibling.innerHTML = date;
                        var dateId = "day" + date;
                        setBox.nextElementSibling.setAttribute('id',dateId)
                        }
                        catch{
                            console.log("month over")
                        }
                    }
                }
                var box35 = currentMonthLocation.querySelector("#box35");
                var box35val = box35.nextElementSibling.innerText
                if(box35val){
                }
                else {
                    box35.parentElement.parentElement.classList.replace("weekContainer","hidden")
                }
            }
        }
        
        var todayLoc = document.getElementById(currentMonth) //get current date and highlights it
        todayLocParent = todayLoc.querySelector("#day" + todaysDay)
        todayLocParent.parentElement.classList.add("today")
    }
}





function changeMonth(direction){
    var month = num2month[numMonth];
    // console.log(month); 
    // console.log(direction);
    if (direction == 1){ //increases month by 1
        prevNumMonth = numMonth;
        prevDisplayMonth = num2month[prevNumMonth];
        numMonth = numMonth + 1;
        // console.log(numMonth);
        if (numMonth > slideIndexLength){ 
            numMonth = 1;
        }

        displayMonth = num2month[numMonth];
        // console.log(displayMonth);

        document.getElementById(prevDisplayMonth).classList.replace("shown","hidden"); //hides month originally showing
        document.getElementById(displayMonth).classList.replace("hidden","shown"); //displays new month
        document.getElementById("monthText").innerHTML = displayMonth;
        
    }
    
    else if (direction == -1){ //decreases month by 1
        prevNumMonth = numMonth;
        prevDisplayMonth = num2month[prevNumMonth];
        numMonth = numMonth - 1;
        // console.log(numMonth);

        if (numMonth < 1){
            numMonth = slideIndexLength;
        }
        
        displayMonth = num2month[numMonth];
        // console.log(slideIndexLength)
        // console.log(displayMonth);

        document.getElementById(prevDisplayMonth).classList.replace("shown","hidden"); //hides month originally showing
        document.getElementById(displayMonth).classList.replace("hidden","shown"); //displays new month
        document.getElementById("monthText").innerHTML = displayMonth;
    }
}

function cycleForward(){ //called by buttons
    var direction = 1;
    changeMonth(direction);
}

function cycleBackward(){ //called by buttons
    var direction = -1;
    changeMonth(direction);
}

function decodeAssignments(data,monthData){
    // console.log("decoding")
    //removes previous assignments for refreshing
    var prevAssignments = document.querySelectorAll(".assignment");
    var prevAssignments1 = document.querySelectorAll(".assignmentDone");
    clearPrevAssignments(prevAssignments)
    clearPrevAssignments(prevAssignments1);
    // console.log(prevAssignments)


    // console.log(data)
    // console.log(monthData)
    for (let m = 1; m <= 12;m++){ //month
        var year = currentYear;
        var mon = num2month[m];
        var byYear = data[year];
        var byMonth = byYear[mon];
        var monthDays = monthData[mon];
        var monthDays = monthDays[0];
        var monthDays = monthDays["numDays"]
        // console.log(monthDays);
        for(let d = 1; d <= monthDays; d++){ //day
            var byDay = byMonth[d]
            // console.log(byDay)
            var formNumber = num2month[m];   
            var monthDoc = document.getElementById(formNumber); //sets which slide to search

            var newDayDoc = "#" + "day" + d;
            var newDayDoc = monthDoc.querySelector(newDayDoc);
            // console.log(newDayDoc)
            try{
                var assignmentName = Object.keys(byDay);
                var numAssignments = assignmentName.length
                // console.log(assignmentName);
                var numAssignments = assignmentName.length;
                // console.log(numAssignments);

                var dateDoc = "#day" + d;
                var dayDocP = monthDoc.querySelector(dateDoc); //gets p element of dated box
                var dayDoc = dayDocP.nextElementSibling;
                for(let a = 0; a <= numAssignments; a++){ //assignment
                    var selectedAssignment = byDay[assignmentName[a]]
                    var dueTime = selectedAssignment["time"];
                    var dueTimeString = String(dueTime);
                    if(dueTimeString.length == 3){
                        var hour = "0" + dueTimeString.substring(0,1);
                        var minutes = dueTimeString.substring(1,3);
                        var dueTimeString = hour + ":" + minutes;
                    }
                    else{
                        var hour = dueTimeString.substring(0,2);
                        var minutes = dueTimeString.substring(2,4);
                        var dueTimeString = hour + ":" + minutes;
                    }

                    var subject = selectedAssignment["class"];
                    var progress = selectedAssignment["progress"];
                    // console.log(dueTime,subject,progress)

                    var assignment = document.createElement("p");
                    var dispString = assignmentName[a] + " " +  dueTimeString; //adds invisible character between name and time for button stuff in addAssignment
                    assignment.innerText = dispString;
                    assignment.classList.add(subject);

                    if(progress == 100){
                        assignment.classList.add("assignmentDone")
                    }
                    else{
                    assignment.classList.add("assignment");
                    };

                    dayDoc.appendChild(assignment);
                    // console.log("finished")

                    var deleteButton = document.createElement("button");
                    deleteButton.innerText = "x";
                    deleteButton.classList.add("deleteButton");
                    deleteButton.setAttribute('type','button');
                    // console.log(selectedAssignment)
                    // console.log(dayDoc)
                    var assignmentLocation = dayDoc.querySelector(".assignment")
                    // console.log(assignmentLocation)
                    if (assignmentLocation == null){
                        var assignmentLocation = dayDoc.querySelector(".assignmentDone");
                        // console.log("null result")
                    }
                    // console.log(assignmentLocation)
                    assignmentLocation.appendChild(deleteButton)

                    var completeButton = document.createElement("button");
                    completeButton.innerText = "✓";
                    completeButton.classList.add("completeButton");
                    completeButton.setAttribute('type','button');
                    // console.log(selectedAssignment)
                    // var assignmentLocation = dayDoc.querySelector(".assignment")
                    assignmentLocation.appendChild(completeButton)

                    };
            }
            catch{} //it'll just continue when there's no assignments for that day
            // console.log("continue")
            if(firstTimeCompleteButton == 1){
                var addButton = document.createElement("button")
                addButton.innerText = "+";
                addButton.classList.add("addButton")
                addButton.setAttribute('type', "button")
                newDayDoc.parentElement.appendChild(addButton)
            }
        }
    }

    addButtonFun();
    addExtraButtons();
}

function addButtonFun(){
    var addButtonList = document.querySelectorAll(".addButton")
    // console.log(addButtonList)
    for(i of addButtonList){
        i.addEventListener('mouseover', function(){
            this.classList.add("addButtonHover")
        })

        i.addEventListener('mouseleave', function(){
            this.classList.remove("addButtonHover")
        })

        i.addEventListener('click', function() {
            addButtonClicked(this)
        });
    }

    var topAddButton = document.getElementById("addButtonTop")
    topAddButton.addEventListener('click',function() {
        addButtonClicked("topButton");
    })

}

function addExtraButtons(){
    var assignmentList = document.querySelectorAll(".deleteButton");
    for(i of assignmentList){
        i.addEventListener('mouseover', function(){
            this.classList.add("deleteButtonHover")
        })

        i.addEventListener('mouseleave', function(){
            this.classList.remove("deleteButtonHover")
        })

        i.addEventListener('click', function() {
            deleteButtonClicked(this)
        });
    }

    var assignmentListComplete = document.querySelectorAll(".completeButton");
    // console.log(assignmentListComplete)
    for(i of assignmentListComplete){
        i.addEventListener('mouseover', function(){
            this.classList.add("completeButtonHover")
        })

        i.addEventListener('mouseleave', function(){
            this.classList.remove("completeButtonHover")
        })

        i.addEventListener('click', function() {
            completeButtonClicked(this)
        });
    }

}

function clearPrevAssignments(nodeList){
    try{
    for(i in nodeList){
        nodeList[i].remove()
    }
}
catch{"First load"}
}

function popupListener(){
    var form = document.getElementById("iframe").contentWindow.document;
    var subButton = form.firstChild.nextSibling.firstChild.nextElementSibling.firstChild.nextSibling.firstChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
    // console.log(subButton)
    subButton.addEventListener('click', function(){
        document.getElementById("iframeContainer").classList.add("hidden");
        mainCalendar()
    })
}
