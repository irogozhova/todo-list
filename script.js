"use strict";

//double-click to edit a todo!!

//Global variables
var todoUL = document.getElementById("todo");
var everyLI = todoUL.getElementsByTagName("li");
var todoInput = document.getElementById("new-todo"); 
var toggleAll = document.getElementById("toggle-all");
var footer = document.querySelector(".footer");
var clearBtn = document.querySelector(".clear-completed");


//call function which shows number of active items
showNumberOfActive();
//call function which hides the current list item when clicking on destroy button
hideListItems();


//count and display number of active items in the footer
function showNumberOfActive() {
	var numberOfCompleted = document.querySelectorAll('.completed').length;
	var numberOfActive = everyLI.length - numberOfCompleted;
	//console.log(numberOfActive);
	document.getElementById("active").innerHTML = numberOfActive;
}


// Create a new list item when clicking on the "Add" button
function newElement() {
	//create a bunch of elements inside li
	var li = document.createElement("li");
	var inputToggle = document.createElement("input");
	inputToggle.className = "toggle";
	var typeAttribute = document.createAttribute("type");
	typeAttribute.value = "checkbox";
	inputToggle.setAttributeNode(typeAttribute);
	var inputLabel = document.createElement("label");
	var destroyBtn = document.createElement("button");
	destroyBtn.className = "destroy";    

	var inputValue = todoInput.value;
	var inputValueText = document.createTextNode(inputValue);
	inputLabel.appendChild(inputValueText);

	li.appendChild(inputToggle);
	li.appendChild(inputLabel);
	li.appendChild(destroyBtn);

	//attach event to automatically generated remove buttons - simplify!!! (add function instead of this)
	destroyBtn.onclick = function() {
		var destroyedLI = this.parentElement;
	    destroyedLI.parentNode.removeChild(destroyedLI); 
    	if (everyLI.length == 0) {
    		toggleAll.style.display = "none";
    		footer.style.display = "none";
    	}
	}
	// destroyBtn.onclick = function() { why just calling a function here doesn't work??
	// 	hideListItems();
	// }

	//attach event to automatically generated toggle buttons
	inputToggle.onclick = function() {
		var parentLi = this.parentElement;
    	parentLi.classList.toggle("completed");
	}

	if (inputValue === '') {
    	return;
  	} else {
    	todoUL.appendChild(li);
    	toggleAll.style.display = "block";
    	footer.style.display = "block";
  	}
  	document.getElementById("new-todo").value = "";
  	todoInput.focus();

  	showNumberOfActive();
}

//Add new item on enter key
todoInput.addEventListener("keydown", function (e) {
	if (e.keyCode === 13) {  //"Enter"
    	newElement(e);
	}
});

// Hide the current list item when clicking on destroy button
function hideListItems() {
	var destroy = document.getElementsByClassName("destroy");
	var i;
	for (i = 0; i < destroy.length; i++) { //simplify
	  	destroy[i].onclick = function() {
	    var destroyedLI = this.parentElement;
	    destroyedLI.parentNode.removeChild(destroyedLI); 
	    //remove all helper elements when there are no list items left
	    if (everyLI.length == 0) {
	    	toggleAll.style.display = "none";
	    	footer.style.display = "none";
	    }
	  }

	}
	showNumberOfActive();	
}

//add class "completed" to the checked list item
var toggleBtn = document.getElementsByClassName("toggle");
var i;
for (i = 0; i < toggleBtn.length; i++) { //simplify
  	toggleBtn[i].onclick = function() {
    var parentLi = this.parentElement;
    parentLi.classList.toggle("completed");
    clearBtn.style.display = "block";
  }
}

//complete all list items on toggle-all click
function allAreChecked() {
	var allChecked = true;
	
	for (var i = 0; i < everyLI.length; i++) {
		if (!everyLI[i].classList.contains("completed")) {
			allChecked = false;
		}	
	}
	return allChecked;
}

function uncheckAll() {
	for (var i = 0; i < everyLI.length; i++) {
		everyLI[i].classList.remove("completed");	
	}
}

function checkAll() {
	for (var i = 0; i < everyLI.length; i++) {
		if (!everyLI[i].classList.contains("completed")) {
			everyLI[i].classList.add("completed");
		}
	}
}

toggleAll.onclick = function() {
	if (allAreChecked()) {
		uncheckAll();
	}
	else {
		checkAll();
	}
}





