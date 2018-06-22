//TODO!!
//when adding items checked checkboxes disappear - remember the checked state
//save edited on double click items to storage
//store and retrieve checkbox state in localstorage

var todoInput = document.getElementById("new-todo");
var todoUL = document.getElementById("todo");
var todoList = [];
var listItems = todoUL.getElementsByTagName("li");
var itemsCompleted = document.getElementsByClassName("completed");
var toggleAll = document.getElementById("toggle-all");
var footer = document.querySelector(".footer");
var tabs = document.getElementsByClassName("tablink");
var tabAll = document.getElementById("tab-all");
var tabActive = document.getElementById("tab-active");
var tabCompleted = document.getElementById("tab-completed");
var clearBtn = document.querySelector(".clear-completed");

if (localStorage.getItem('todo') != undefined) {
    todoList = JSON.parse(localStorage.getItem('todo'));
	out();
}

showHelpers();
handleCheckboxCheck();
updateNumberOfActive();
initRemoveButtons();
makeEditable();

//adds new todo on enter
todoInput.addEventListener("keydown", function(e) {
	if (e.keyCode === 13) {  
        addNewLi();
        todoInput.value = "";
		todoInput.focus();
		updateNumberOfActive();
		showHelpers();
	}
});

//creates new li markup
function out() {
    var out = '';
    for (var key in todoList) {
        out += '<li><input type="checkbox" class="toggle"><label>' + todoList[key].todo + '</label><button class="destroy"></li>';
    }
    todoUL.innerHTML = out;
    handleCheckboxCheck();
	initRemoveButtons();
}

//takes value of todo input, adds it to array and saves in localstorage
function addNewLi() {
    var todoText = todoInput.value;
    
    if (todoText == '') { //do nothing if the field is empty
        return;
    }

    var temp = {};
    temp.todo = todoText;
    temp.check = false;
    var i = todoList.length;
    todoList[i] = temp;
    out();
	saveToStorage();
}

function saveToStorage() {
	localStorage.setItem('todo', JSON.stringify(todoList));
}

// Remove list items when clicking on destroy button
function initRemoveButtons() {
	var destroy = document.getElementsByClassName("destroy");
	for (var i = 0; i < destroy.length; i++) { 
		destroy[i].onclick = function() {
			var destroyedLI = this.parentElement;
			var destroyedLiIndex = Array.from(destroyedLI.parentNode.children).indexOf(destroyedLI);
			todoList.splice(destroyedLiIndex, 1);
			saveToStorage();
			destroyedLI.parentNode.removeChild(destroyedLI); 

			updateNumberOfActive();
			showHelpers();
		}
	}
}

//add class "completed" to the checked list item
function handleCheckboxCheck() {
    var toggleBtn = document.getElementsByClassName("toggle");
    for (var i = 0; i < toggleBtn.length; i++) { 
          toggleBtn[i].onclick = function() {
            var parentLi = this.parentElement;
            parentLi.classList.toggle("completed");
            displayClearBtn();
            updateNumberOfActive();
          }
    }
}

//count and display number of active items in the footer
function updateNumberOfActive() {
	var numberOfCompleted = document.querySelectorAll('.completed').length;
	var numberOfActive = listItems.length - numberOfCompleted;
	var numberOfActiveText = document.getElementById("active");
	numberOfActiveText.innerHTML = numberOfActive;
	if (numberOfActive == 1) {
		document.getElementById("item-text").innerHTML = "item";
	}
	else {
		document.getElementById("item-text").innerHTML = "items";
	}
}

//events of "toggle-all" button
function allAreChecked() {
	var allChecked = true;
	
	for (var i = 0; i < listItems.length; i++) {
		if (!listItems[i].classList.contains("completed")) {
			allChecked = false;
		}	
	}
	return allChecked;
}

function uncheckAll() {
	for (var i = 0; i < listItems.length; i++) {
		listItems[i].classList.remove("completed");	
	}
}

function checkAll() {
	for (var i = 0; i < listItems.length; i++) {
		if (!listItems[i].classList.contains("completed")) {
			listItems[i].classList.add("completed");
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
	updateNumberOfActive();
}

/*footer tabs*/
function unselectOtherTabs(tab) {
	for (var i = 0; i < tabs.length; i++) {
		tabs[i].classList.remove("selected");
	}
	tab.classList.add("selected");
}

tabAll.onclick = function() {
	unselectOtherTabs(tabAll);
	for (var i = 0; i < listItems.length; i++) {
		listItems[i].style.display = "block";
	}
}

tabActive.onclick = function() {
	unselectOtherTabs(tabActive); 
	for (var i = 0; i < listItems.length; i++) {
		if (listItems[i].classList.contains("completed")){
			listItems[i].style.display = "none";
		}	
		else {
			listItems[i].style.display = "block";
		}
	}
}

tabCompleted.onclick = function() {
	unselectOtherTabs(tabCompleted); 
	for (var i = 0; i < listItems.length; i++) {
		if (!listItems[i].classList.contains("completed")){
			listItems[i].style.display = "none";
		}	
		else {
			listItems[i].style.display = "block";
		}
	}
}

function displayClearBtn() {
	if (itemsCompleted.length == 0) {
		clearBtn.style.display = "none";
	}
	else {
		clearBtn.style.display = "block";
	}
}

//clear completed button
clearBtn.onclick = function() {
	for (var i = 0; i < itemsCompleted.length; i++) {
		while (itemsCompleted.length > 0) {
			var destroyedLiIndex = Array.from(itemsCompleted[i].parentNode.children).indexOf(itemsCompleted[i]);
			todoList.splice(destroyedLiIndex, 1);
			saveToStorage();
			itemsCompleted[i].parentNode.removeChild(itemsCompleted[i]); 
		}
	}
	displayClearBtn();
	showHelpers();
}

//edit item on double click
function makeEditable() {
	var labels = todoUL.getElementsByTagName("label");
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
				saveToStorage();
			}
			
			inputEditable.onblur = onBlurFunction;

			inputEditable.addEventListener("keydown", function (e) {
				if (e.keyCode === 13) {  //"Enter"
					onBlurFunction();
					saveToStorage();
				}
			});
		}
	}
}

todoInput.addEventListener("keydown", function (e) {
	if (e.keyCode === 13) {  //"Enter"
    	addNewElement(todoInput.value);
	}
});

//hides toggle all button and footer when no items are left
function showHelpers() {
	if (listItems.length == 0) {
		toggleAll.style.display = "none";
		footer.style.display = "none";
	}
	else {
		toggleAll.style.display = "block";
		footer.style.display = "block";
	}
}

