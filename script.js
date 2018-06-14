"use strict";
//Global variables
var todoUL = document.getElementById("todo");
var everyLI = todoUL.getElementsByTagName("li");
var todoInput = document.getElementById("new-todo"); 
var toggleAll = document.getElementById("toggle-all");
var footer = document.querySelector(".footer");
var clearBtn = document.querySelector(".clear-completed");

getTodos();
//call function which shows number of active items
showNumberOfActive();
//call function which hides the current list item when clicking on destroy button
removeListItems();


//count and display number of active items in the footer
function showNumberOfActive() {
	var numberOfCompleted = document.querySelectorAll('.completed').length;
	var numberOfActive = everyLI.length - numberOfCompleted;
	var numberOfActiveText = document.getElementById("active");
	numberOfActiveText.innerHTML = numberOfActive;
	if (numberOfActive == 1) {
		document.getElementById("item-text").innerHTML = "item";
	}
	else {
		document.getElementById("item-text").innerHTML = "items";
	}
}

// Create a new list item
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
		saveTodos();
    	if (everyLI.length == 0) {
    		toggleAll.style.display = "none";
    		footer.style.display = "none";
    	}
    	showNumberOfActive();
	}

	//attach event to automatically generated toggle buttons
	inputToggle.onclick = function() {
		var parentLi = this.parentElement;
    	parentLi.classList.toggle("completed");
    	showNumberOfActive();
    	displayClearBtn();
    	if (tabActive.classList.contains("selected")) {
    		this.parentElement.style.display = "none";
    	}
	}

	if (inputValue === '') {
    	return;
  	} else {
		todoUL.appendChild(li);
		saveTodos();
		makeEditable();
		
    	if (tabCompleted.classList.contains("selected")) {
    		li.style.display = "none";
    	}
    	toggleAll.style.display = "block";
    	footer.style.display = "block";
  	}
  	document.getElementById("new-todo").value = "";
  	todoInput.focus();

  	showNumberOfActive();
}

//Add new item on enter key
todoInput.addEventListener("keydown", function(e) {
	if (e.keyCode === 13) {  //"Enter"
		newElement(e);
	}
});

// Remove list items when clicking on destroy button
function removeListItems() {
	var destroy = document.getElementsByClassName("destroy");
	for (var i = 0; i < destroy.length; i++) { 
		destroy[i].onclick = function() {
			var destroyedLI = this.parentElement;
			destroyedLI.parentNode.removeChild(destroyedLI); 
			saveTodos();
			removeHelpers(); 
			showNumberOfActive();
			displayClearBtn();
		}
	}
}

function removeHelpers() {
	if (everyLI.length == 0) {
		toggleAll.style.display = "none";
		footer.style.display = "none";
	}
}

//add class "completed" to the checked list item
var toggleBtn = document.getElementsByClassName("toggle");
for (var i = 0; i < toggleBtn.length; i++) { 
  	toggleBtn[i].onclick = function() {
		var parentLi = this.parentElement;
		parentLi.classList.toggle("completed");
		showNumberOfActive();
		displayClearBtn();
		if (tabActive.classList.contains("selected")) {
			this.parentElement.style.display = "none";
		}
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
		clearBtn.style.display = "none";
	}
	else {
		checkAll();
		clearBtn.style.display = "block";
	}
	showNumberOfActive();
}


//footer tabs
var tabs = document.getElementsByClassName("tablink");
var itemsCompleted = document.getElementsByClassName("completed");
var tabAll = document.getElementById("tab-all");
var tabActive = document.getElementById("tab-active");
var tabCompleted = document.getElementById("tab-completed");

function unselectOtherTabs () {
	for (var i = 0; i < tabs.length; i++) {
		tabs[i].classList.remove("selected");
	}
}

tabAll.onclick = function () {
	unselectOtherTabs();
	this.classList.add("selected");
	for (var i = 0; i < everyLI.length; i++) {
		everyLI[i].style.display = "block";
	}
}

tabActive.onclick = function () {
	unselectOtherTabs(); //repeating piece of code
	this.classList.add("selected");
	for (var i = 0; i < everyLI.length; i++) {
		if (everyLI[i].classList.contains("completed")){
			everyLI[i].style.display = "none";
		}
		else {
			everyLI[i].style.display = "block";
		}	
	}
}

tabCompleted.onclick = function () {
	unselectOtherTabs(); //repeating piece of code
	this.classList.add("selected");
	for (var i = 0; i < everyLI.length; i++) {
		if (everyLI[i].classList.contains("completed")){
			everyLI[i].style.display = "block";
		}	
		else {
			everyLI[i].style.display = "none";
		}
	}
}

//clear completed button
clearBtn.onclick = function () {
    while (itemsCompleted.length > 0) { 
        itemsCompleted[0].parentNode.removeChild(itemsCompleted[0]); //method using arrays
    }
	displayClearBtn();
	removeHelpers();
	saveTodos();
}

function displayClearBtn() {
	if (itemsCompleted.length == 0) {
		clearBtn.style.display = "none";
	}
	else {
		clearBtn.style.display = "block";
	}
}

//edit item on double click
var labels = todoUL.getElementsByTagName("label");

function makeEditable() {
	for (var i = 0; i < labels.length; i++) { 
		labels[i].ondblclick = function() {
			var currentLabel = this; 
			var editedInputText = currentLabel.innerText;
			var inputEditable = document.createElement("input");
			inputEditable.className = "editable";
			inputEditable.value = editedInputText;
			currentLabel.parentElement.appendChild(inputEditable);
			inputEditable.focus();
			currentLabel.parentElement.querySelector(".toggle").style.display = "none";
			
			function onBlurFunction() {
				var editedText = inputEditable.value;
				currentLabel.innerText = editedText;
				inputEditable.style.display = "none";
				inputEditable.parentElement.querySelector(".toggle").style.display = "block";
			}
			
			inputEditable.onblur = onBlurFunction;

			inputEditable.addEventListener("keydown", function (e) {
				if (e.keyCode === 13) {  //"Enter"
					onBlurFunction();
				}
			});
		}
	}
}

makeEditable();

todoInput.addEventListener("keydown", function (e) {
	if (e.keyCode === 13) {  //"Enter"
    	newElement(e);
	}
});

//save the label data in local storage
function saveTodos() {
	var labels = document.getElementsByTagName("label");
	var todos = [];

	for (var i = 0; i < labels.length; i++) {
		todos.push(labels[i].innerText);
	}

	var str = JSON.stringify(todos);
	localStorage.setItem("todos", str);
}

//get the label data from local storage
function getTodos() {
	var str = localStorage.getItem("todos");
	var todos = JSON.parse(str);
	if(!todos) {
		todos = [];
	}
	todos.forEach(function(elem) {
		console.log(elem);
		var newLI = document.createElement("li");
		var inputToggle = document.createElement("input");
		inputToggle.className = "toggle";
		var typeAttribute = document.createAttribute("type");
		typeAttribute.value = "checkbox";
		inputToggle.setAttributeNode(typeAttribute);
		var inputLabel = document.createElement("label");
		var destroyBtn = document.createElement("button");
		destroyBtn.className = "destroy";
		
		inputLabel.innerHTML = elem;
		newLI.appendChild(inputToggle);
		newLI.appendChild(inputLabel);
		newLI.appendChild(destroyBtn);
		todoUL.appendChild(newLI); 

		destroyBtn.onclick = function() {
			var destroyedLI = this.parentElement;
			destroyedLI.parentNode.removeChild(destroyedLI); 
			saveTodos();
			if (everyLI.length == 0) {
				toggleAll.style.display = "none";
				footer.style.display = "none";
			}
			showNumberOfActive();
		}
    });
}








