// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

    var today = dayjs();
    //add current day at the top of the page
    $("#currentDay").html("Current Day: " + today.format('MM/DD/YYYY'));

    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    
    $("[id^='hour']").each(function () {
        //get the hr vlaue of each ID as it loops
        var hr = $(this).attr('id').split("-").pop();        

        //remove all past, present, future classes before assigning new
        $("#hour-" + hr).removeClass("future");
        $("#hour-" + hr).removeClass("present");
        $("#hour-" + hr).removeClass("past");

        //assign new classes
        if (hr < today.hour()) {            
            $("#hour-" + hr).addClass("past");
        }
        else if (hr > today.hour()) {
            $("#hour-" + hr).addClass("future");
        }
        else {
            $("#hour-" + hr).addClass("present");
        }
    });

    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?

    //get existing tasks
    tasks = JSON.parse(localStorage.getItem('Tasks'));

    if (tasks != null) {//errors if there are no tasks.  null check
        //loop over tasks
        for (var i = 0; i < tasks.length; i++) {
            //get values from each task
            var descriptionId = tasks[i].id;
            var description = tasks[i].description;
            //write tasks to each description block
            $("#description-" + descriptionId).val(description);
        }
    }

    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    $("[id^='save']").click(function () {
        var descriptionId = $(this).attr('id').split("-").pop();
        //create task object
        var descriptionArr = {
            id: descriptionId,
            description: $("#description-" + descriptionId).val()
        };

        //write descriptionArr to localstorage
        var existingTasks = JSON.parse(localStorage.getItem("Tasks") || '[]');

        //was there an updated task?  find and update
        $(existingTasks).each(function (idx) {
            if (existingTasks[idx].id == descriptionArr.id) {
                existingTasks[idx] = descriptionArr.description;
                localStorage.setItem("description", JSON.stringify(existingTasks));
            }
        });

        existingTasks.push(descriptionArr);
        localStorage.setItem("Tasks", JSON.stringify(existingTasks));
    });
  
});
