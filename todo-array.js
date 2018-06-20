//TODO!!
//store and retrieve checkbox state in localstorage

var todoInput = document.getElementById("new-todo");
var todoUL = document.getElementById("todo");
var todoList = [];
var listItems = todoUL.getElementsByTagName("li");
var itemsCompleted = document.getElementsByClassName("completed");
var toggleAll = document.getElementById("toggle-all");
var footer = document.querySelector(".footer");
var clearBtn = document.querySelector(".clear-completed");

if (localStorage.getItem('todo') != undefined) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    out();
}
else {
    hideHelpers();
}

handleCheckboxCheck();
initRemoveButtons();

//adds new todo on enter
todoInput.addEventListener("keydown", function(e) {
	if (e.keyCode === 13) {  
        addNewLi();
        todoInput.value = "";
        todoInput.focus();
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
		}
	}
}

//hides toggle all button and footer when no items are left
function hideHelpers() {
	toggleAll.style.display = "none";
	footer.style.display = "none";
}

//shows toggle all button and footer
function showHelpers() {
	toggleAll.style.display = "block";
	footer.style.display = "block";
}

//add class "completed" to the checked list item
function handleCheckboxCheck() {
    var toggleBtn = document.getElementsByClassName("toggle");
    for (var i = 0; i < toggleBtn.length; i++) { 
          toggleBtn[i].onclick = function() {
            var parentLi = this.parentElement;
            parentLi.classList.toggle("completed");
            displayClearBtn();
            // showNumberOfActive();
            // if (tabActive.classList.contains("selected")) {
            //     this.parentElement.style.display = "none";
            // }
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
	//showNumberOfActive();
}
