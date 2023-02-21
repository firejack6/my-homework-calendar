var fs = require('fs');
var monthsJSON = fs.readFileSync('months.json', 'utf-8');

var month2num = {"Jan":1, "Feb":2, "Mar":3};
var num2month = {1:"Jan", 2:"Feb", 3:"Mar"};
var slideIndexLength = Object.keys(month2num).length;
var currentMonth = "Feb";
var numMonth = month2num[currentMonth];
var currentYear = 2023;



function mainCalendar(){
    //onload stuff
    indexDays(); 
    monthsJSON();
    // console.log(currentMonth);

    function monthsJSON(){
        var rawJSON = JSON.parse(monthsJSON);
        console.log(rawJSON);
    }

    function indexDays() { //creates box templates

        forms = document.getElementsByClassName("month");
        // console.log(forms);
        for (let l = 1; l <= slideIndexLength; l++){
            var formNumber = num2month[l]; //sets form to look at
            // console.log(formNumber)
            var currentMonthLocation = document.getElementById(formNumber) //gets location of the form
            // console.log(currentMonthLocation);

            //creates weeks
            for (let i = 0; i <= 4; i++) {
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
                // boxDivDate.innerText = k; //testing

                


                boxLocation.appendChild(boxDivTemp);    //adds to doc
                boxLocation.appendChild(boxDivDate);    //adds to doc
            }
        }
    }
    document.getElementById(currentMonth).classList.replace("hidden","shown"); //displays current month
    document.getElementById("monthText").innerHTML = currentMonth; //displays name of month
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