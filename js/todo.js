/*
	addTask
	editTask
	deleteTask
	saveTask

	taskCount
	totalListsCount
	completedListCount
	completedTaskCount

	DisplayTask

 */


var todoListApp = (function ($) {

	var obj = [{ "title" : "satish", "task" : { "task": ["1 one","2 two", "3 three"], "completed": [0,1,0] }, "taskCount": 2, "completed": false, "date" : "" } ];

	var taskCount = 0;
	var arrTask = [];
	var arrTaskCompleted = [];
    
    function Add(id) {
    	var id1 = id || ".subTask";

		$(id1).append('<div id="'+ taskCount +'" class="form-group"><input type="text" class="task form-control" placeholder="Task" name=""><span class="subTaskRemove">X </span><label class="subTaskError"></label></div>');
	    taskCount += 1;
    }

    function removeTask() {
       
       $(".subTask").unbind().on("click", function (e) {


			if(e.target.className === "subTaskRemove") {
				console.log(e.target.parentNode.id);
	            
				$("#"+e.target.parentNode.id).remove();
	            taskCount -= 1;
			}			

		});

    }removeTask();


    function saveTask() {

    	var title = $("#title").val();
    	var titleError = $(".titleError");
    	var task = $(".task");

    	if((todoTitileValidation(title, titleError) & todoTaskValidation(task)) === 1) {
            var newData = {"title": title, "task": {"task": arrTask, "completed": arrTaskCompleted }, "taskCount": taskCount, "completed": false, "date" : ""};
    		
    		obj.push(newData);
    		
    		display("#new", true, [newData]);
    		
    	}

    }


    function todoTitileValidation(title, titleError) {
    	var status = false;

    	if(title.length <= 0) {
			titleError.html("Title is empty ");
		}else if(title.length >= 40 ) {
			titleError.html("Title is too long ");
		}else {
			titleError.html("");
			status = true;
		}

		return status;
    }

    function todoTaskValidation(task) {

    	var status = false;
    		arrTask = [];
    		arrTaskCompleted = [];

    	for(var i = 0; i < task.length; i++) {

			var taskLabelElm = task.eq(i).next().next();
			var taskVal = task.eq(i).val(); 
			
			if(taskVal.length <= 0 ) {
 				 				
 				taskLabelElm.html("Task is empty");

			}else if(taskVal.length >= 40 ) {

				taskLabelElm.html("Task is too long ");
			
			}else {

				arrTask.push(taskVal);
				arrTaskCompleted.push(0);
				taskLabelElm.html("");
				status = true;
			    
			}			

		}

		if(task.length === 0) {
  			status = true;
		}

    	return status;
    }


    function display(elm, append, ob) {


        var htmlElm = "";
        var newObj = ob || obj;
        var counter = obj.length-1 || 0;

    	for( var i = 0; i < newObj.length; i++) {

    		var title   = newObj[i].title;
       		var taskStr = newObj[i].task.task;
       		var taskCom = newObj[i].task.completed;

       		htmlElm += '<div><div><input type="checkbox" name="title" class="checkTitle" data-id="'+counter+'" /><span >'+title+'</span></div>	<ul>';
            htmlElm += taskStr.map(mapp, taskCom).join("");
       		htmlElm += "</ul></div>";
            
    	}

    	 if(append === true) {

    	 	$(elm).append(htmlElm);

    	 }else {
    	 	$(elm).html(htmlElm);
    	 }

    }

    function mapp(index, taskCom) {
		var input = "<input type='checkbox' class='' ";

		if(taskCom === 1) {
			input += "checked='true'"; 
		}

		return '<li>'+ input +'>'+ index +' </li>';
    }

    function deleteMainTask() {

    	var checkTitle = $(".checkTitle:checked");

    	for(var i = 0; i < checkTitle.length; i++) {

			var id = checkTitle.eq(i).attr("data-id");
				obj.splice(id, 1);
				display("#new"); 			

		}
    }
    

	return {
		add: Add,
		removeTask: removeTask,
		saveTask: saveTask,
		display: display,
		deleteMainTask: deleteMainTask
	};

})(jQuery);



todoListApp.add();

jQuery(document).ready(function($) {

	$(".AddMore").unbind().click(function(e) {
		todoListApp.add();
		
	});

	$(".saveTask").unbind().click(function(e) {
		todoListApp.saveTask();
		
	});


    //$("#new").html(todoListApp.display());
    todoListApp.display("#new");
    

    $("#delete").click(function () {
    	todoListApp.deleteMainTask();
    });



});




