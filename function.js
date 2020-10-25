myobj =
{
    "problem": " this is the answer ",
    "choicearray": [],
    "choices":
    {
    },
    "moreinfo": "",
    "whocanhelp": [],
    "decision": "this is the decision taken by user",
    "assessdecisison": " for decision assesment"
}

var InputConfig = [
    { "multiple": false, "question": " What is Problem ?" },
    { "multiple": true, "question": "What are the choices?" },
    { "multiple": true, "linkedto": 1, "question": "What are the consequences ?" },
    { "multiple": true, "linkedto": 1, "question": "What are the values?" },
    { "multiple": false, "linkedto": 1, "question": " What are your feelings ?" },
    { "multiple": false, "question": "Anything More you want to share ?" },
    { "multiple": false, "question": "Who Can Help ?" },
    { "multiple": false, "question": "What is your Decision ?" },
    { "multiple": false, "question": "Assess Decision." }
];
// -------------------------------------------------------------------------------------------

function enable_next_button(flag) {
    var next_id_number = flag + 1;
    var next_button_string = next_id_number.toString();
    var next_button_id = 'b'.concat(next_button_string);
    document.getElementById(next_button_id).disabled = false;
}
// -------------------------------------------------------------------------------------------
var activeView = "tree";
function toggleDataEntryView() {
    var tree = document.getElementById("previewviewarea");
    var input_box = document.getElementById("userdataentrybox");

    if (activeView == "tree") {
        tree.style.display = "none";
        input_box.style.display = "block";
        activeView = "inputbox";
    }
    else {
        tree.style.display = "block";
        input_box.style.display = "none";
        activeView = "tree";
    }
}
linkindex = 0;
function printchoice() {
    if (linkindex <= (temp_choice.length - 1)) {
        document.getElementById("iContext").innerHTML = temp_choice[linkindex];
        linkindex += 1;
        console.log(linkindex);
    }
}
// -------------------------------------------------------------------------------------------
function collectresponse(btn) {
    var button_id = btn.id;
    flag = parseInt(button_id.charAt(1));
    var qno = parseInt(button_id.charAt(1)) - 1;
    var question = InputConfig[qno].question;
    if (InputConfig[flag - 1].linkedto == 1) {
        if (InputConfig[flag - 1].multiple == false) {
            document.getElementById("InputNewBtn").disabled = true;
            document.getElementById("InputRemoveBtn").disabled = true;
        }
        linkindex = 0;
        document.getElementById("InputNewBtn").disabled=true;
        document.getElementById("InputNextBtn").disabled = false;
        document.getElementById("InputPreviousBtn").disabled = true;
        document.getElementById("s4").disabled = true;
        printchoice();

    }
    else if (InputConfig[flag - 1].multiple == true) {
        document.getElementById("iContext").innerHTML = "";

        document.getElementById("InputNewBtn").disabled = false;
    }

    else if (InputConfig[flag - 1].multiple == false) {
        document.getElementById("iContext").innerHTML = "";
        document.getElementById("InputNewBtn").disabled = true;
        document.getElementById("InputRemoveBtn").disabled = true;
        document.getElementById("InputNextBtn").disabled = true;
        document.getElementById("InputPreviousBtn").disabled = true;
    }

    // Set fields of data entry window
    var x = document.getElementById("iQuestion").innerHTML = question;

    // Toggle the view
    toggleDataEntryView();
}

function SubmitInput() {
    var ans1 = document.getElementById("iResponse").value;
    var ans = ans1.trim();
    if (ans.length == 0 || ans.charAt(0) == " ") {
        alert("you have not entered anything.");
    }
    else {

        enable_next_button(flag);
        // Toggle the view
        toggleDataEntryView();
        if (flag == 1) {
            myobj.problem = ans;
            document.getElementById("p1").innerHTML = myobj.problem;
        }
        else if (flag == 2) {
            var ans1 = document.getElementById("iResponse").value;
            var ans = ans1.trim();
            temp_choice[choice_counter]= ans;
            myobj.choicearray = temp_choice;
            console.log(choice_counter);
            for (var j = 1; j <= myobj.choicearray.length; j++) {
                myobj.choices[j] =
                {
                    "choice": "",
                    "consequences": "",
                    "values": "",
                    "feeling": ""
                };
            }
            document.getElementById("generate").disabled = false;
        }
        else if (flag == 3) {
            var ans1 = document.getElementById("iResponse").value;
            var ans = ans1.trim();
            temp_consequences= ans.split("\n");
            console.log(temp_consequences);
            myobj.choices[linkindex].choice = myobj.choicearray[linkindex - 1]
            myobj.choices[linkindex].consequences = temp_consequences;
        }
        else if (flag == 4) {
            var ans1 = document.getElementById("iResponse").value;
            var ans = ans1.trim();
            temp_value= ans.split("\n");
            console.log(temp_value);
            myobj.choices[linkindex].values = temp_value;
        }
        else if (flag == 5) {
            var ans1 = document.getElementById("iResponse").value;
            var ans = ans1.trim();
            temp_feeling= ans.split("\n");
            console.log(temp_feeling);
            myobj.choices[linkindex].feeling = temp_feeling;
            InputConfig[flag - 1].linkedto == 0;
        }
        else if (flag == 6) {
            myobj.moreinfo = ans;
            document.getElementById("p6").innerHTML = myobj.moreinfo;
        }
        else if (flag == 7) {
            myobj.whocanhelp = ans;
            document.getElementById("p7").innerHTML = myobj.whocanhelp;
        }
        else if (flag == 8) {
            myobj.decision = ans;
            document.getElementById("p8").innerHTML = myobj.decision;
        }
        else if (flag == 9) {
            myobj.assessdecisison = ans;
            document.getElementById("p9").innerHTML = myobj.assessdecisison;
        }

        document.getElementById("iResponse").value = '';
    }
}
var feel_counter=0;
var value_counter=0;
var cons_counter=0;
var choice_counter = 0;
var temp_choice = [];
var temp_value = [];
var temp_consequences = [];
var temp_feeling = '';

function AddNew() {
    var ans1 = document.getElementById("iResponse").value;
    var ans = ans1.trim();
    if (flag == 2 && ans.length != 0) {

        if (choice_counter == temp_choice.length || choice_counter == temp_choice.length - 1) {
            temp_choice[choice_counter] = ans;
            document.getElementById("iResponse").value = '';
            choice_counter += 1;
        }
        if (temp_choice.length > 0) {
            document.getElementById("InputPreviousBtn").disabled = false;
        }
    }
    else if (flag == 3 && ans.length != 0) {
        console.log(ans);
        var sp= ans.split("\n");
        console.log(sp);
        temp_consequences.push(ans)
        document.getElementById("iResponse").value = ''
    }
    else if (flag == 4 && ans.length != 0) {
        temp_value.push(ans)
        document.getElementById("iResponse").value = ''
    }
}


function ShowPrevious() {
    var ans1 = document.getElementById("iResponse").value;
    var ans = ans1.trim();
    if (flag == 2) {
        if (ans.length != 0) {
            temp_choice[choice_counter] = document.getElementById("iResponse").value;
            if (choice_counter >= 1) {
                document.getElementById("iResponse").value = temp_choice[choice_counter - 1]
                choice_counter -= 1;
                document.getElementById("InputNextBtn").disabled = false;
                console.log(choice_counter)
            }
        }
        // else{
        //     if (choice_counter >= 0 && choice_counter < temp_choice.length - 1) {
        //         document.getElementById("iResponse").value = temp_choice[choice_counter - 1]
        //         choice_counter -= 1;
        //         document.getElementById("InputNextBtn").disabled = false;
        //         console.log(choice_counter)
        //     }
        // }
        else{
            alert("you haven't entered anything")
        } 
    }

}
// -------------------------------------------------------------------------------------------
function ShowNext() {
    var ans1 = document.getElementById("iResponse").value;
    var ans = ans1.trim();
    if (flag == 2) {
        if (ans.length != 0) {
            temp_choice[choice_counter] = document.getElementById("iResponse").value;
            if (choice_counter >= 0 && choice_counter < temp_choice.length - 1) {
                document.getElementById("iResponse").value = temp_choice[choice_counter + 1]
                choice_counter += 1;
                document.getElementById("InputNextBtn").disabled = false;
                console.log(choice_counter);
            }
        }
        // else{
        //     if (choice_counter >= 0 && choice_counter < temp_choice.length - 1) {
        //         document.getElementById("iResponse").value = temp_choice[choice_counter + 1]
        //         choice_counter += 1;
        //         document.getElementById("InputNextBtn").disabled = false;
        //         console.log(choice_counter)
        //     }
        // }
        else{
            alert("you haven't entered anything")
        } 
    }
    if (flag==3){
        if(ans.length !=0){
            if(cons_counter<myobj.choicearray.length-1){
                temp_consequences= ans.split("\n");
                console.log(temp_consequences);
                myobj.choices[linkindex].choice = myobj.choicearray[linkindex - 1]
                myobj.choices[linkindex].consequences = temp_consequences;
                temp_consequences = [];
                document.getElementById("iResponse").value = "";
                printchoice()
                cons_counter+=1;
            }
            if(cons_counter==myobj.choicearray.length-1){
                document.getElementById("InputNextBtn").disabled=true;
                document.getElementById("s4").disabled=false;
            }
            // if(cons_counter>0){
            //     document.getElementById("InputPreviousBtn").disabled=false;
            // }
        }

    }
    if (flag==4){
        if(ans.length !=0){
            if(value_counter<myobj.choicearray.length-1){
                temp_value= ans.split("\n");
                console.log(temp_value);
                myobj.choices[linkindex].values = temp_value;
                temp_value = [];
                document.getElementById("iResponse").value = "";
                printchoice();
                value_counter+=1;
            }
            if(value_counter==myobj.choicearray.length-1)
            {
                document.getElementById("InputNextBtn").disabled=true;
                document.getElementById("s4").disabled=false;
            }
        }
    }

    if (flag==5){
        if(ans.length !=0){
            if(feel_counter<myobj.choicearray.length-1){
                temp_feeling= ans.split("\n");
                console.log(temp_feeling);
                myobj.choices[linkindex].feeling = temp_feeling;
                temp_feeling = [];
                document.getElementById("iResponse").value = "";
                printchoice();
                feel_counter+=1;
            }
            if(feel_counter==myobj.choicearray.length-1)
            {
                document.getElementById("InputNextBtn").disabled=true;
                document.getElementById("s4").disabled=false;
            }
        }
    }
}

// -------------------------------------------------------------------------------------------

// function ShowNext() {
//     var ans1 = document.getElementById("iResponse").value;
//     var ans = ans1.trim();

//     if (flag == 3) {
//         if (linkindex == (temp_choice.length - 1)) {
//             document.getElementById("InputNextBtn").disabled = true;
//             document.getElementById("s4").disabled = false;
//         }
//         temp_consequences.push(ans)
//         myobj.choices[linkindex].choice = myobj.choicearray[linkindex - 1]
//         myobj.choices[linkindex].consequences = temp_consequences;
//         temp_consequences = [];
//         document.getElementById("iResponse").value = "";
//         printchoice()
//     }
//     else if (flag == 4) {
//         if (linkindex == (temp_choice.length - 1)) {
//             document.getElementById("InputNextBtn").disabled = true;
//             document.getElementById("s4").disabled = false;
//         }
//         temp_value.push(ans)
//         myobj.choices[linkindex].values = temp_value;
//         temp_value = [];
//         document.getElementById("iResponse").value = "";
//         printchoice()
//     }
//     else if (flag == 5) {
//         if (linkindex == (temp_choice.length - 1)) {
//             document.getElementById("InputNextBtn").disabled = true;
//             document.getElementById("s4").disabled = false;
//         }
//         temp_feeling = document.getElementById("iResponse").value;
//         myobj.choices[linkindex].feeling = temp_feeling;
//         document.getElementById("iResponse").value = "";
//         printchoice()
//     }
// }

function dropchoices() {

    var values = myobj.choicearray;

    var select = document.createElement("select");
    select.name = "pets";
    select.id = "change_chart";
    for (const val of values) {
        var option = document.createElement("option");
        option.value = val;
        option.text = val.charAt(0) + val.slice(1);
        select.appendChild(option);
    }
    var label = document.createElement("label");

    label.htmlFor = "pets";

    document.getElementById("z").appendChild(label).appendChild(select);
    document.getElementById('generate').disabled = true;

}
var show = 0
function selectchoice() {
    var x = document.getElementById("change_chart");
    // console.log(x.options)
    document.getElementById("p2").innerHTML = x.value;
    for (var i = 0; i < myobj.choicearray.length; i++) {
        if (myobj.choicearray[i] == x.value) {
            show = i + 1;
            break;
        }
    }
    document.getElementById("p3").innerHTML = myobj.choices[show].consequences;
    document.getElementById("p4").innerHTML = myobj.choices[show].values;
    document.getElementById("p5").innerHTML = myobj.choices[show].feeling;
}