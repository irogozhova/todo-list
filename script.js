"use strict";

//Global variables
var todoUL = document.getElementById("todo");
var everyLI = todoUL.getElementsByTagName("li");
var todoInput = document.getElementById("new-todo"); 
var toggleAll = document.getElementById("toggle-all");
var footer = document.querySelector(".footer");
var clearBtn = document.querySelector(".clear-completed");

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

	//attach event to automatically generated remove buttons
	destroyBtn.onclick = function() {
		var div = this.parentElement; //simplify
    	div.style.display = "none";
	}

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
}

//Add new item on enter key
todoInput.addEventListener("keydown", function (e) {
	if (e.keyCode === 13) {  //"Enter"
    	newElement(e);
	}
});

// Hide the current list item when clicking on destroy button
var destroy = document.getElementsByClassName("destroy");
var i;
for (i = 0; i < destroy.length; i++) { //simplify
  	destroy[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
    div.classList.add("destroyed");

	//remove all helper elements when there are no list items left
    var destroyedLI = document.getElementsByClassName("destroyed");
    var countDestroyedLI = destroyedLI.length;
	if (countDestroyedLI == everyLI.length) {
		toggleAll.style.display = "none";
		footer.style.display = "none";
	}
  }
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
toggleAll.onclick = function() {
	var i;
	for (i = 0; i < everyLI.length; i++) {
	    everyLI[i].classList.toggle("completed");
	}
}



