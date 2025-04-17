


let toDoList = []

let inputText = document.getElementById("input-text");
let listContainer = document.getElementsByClassName("li-list")[0]; // First list 
let mainListContainer = document.getElementById("ul-list-container");
let itemCount = document.getElementById("item-count");

let count = 0;

 function updateItemCount() {
    itemCount.textContent = listContainer.children.length;
} 

function deleteToDo(id) {////in this case dlete item-id by function (id) and filter is define all todolists
    // console.log("dlete called witth id", id);
    toDoList = toDoList.filter(item => item.id !== id);//removes an item from the toDoList array by its id.
    // console.log("loged is todolist",toDoList);
    
    
    renderToDoList(toDoList);
} 


function checkToDo(id) {///////in this function item-id check by function (id) and show index in array form
    // console.log("toDo checked with id:" ,id);  
    let itemIndex = toDoList.findIndex(item => item.id === id);
    // console.log("itemIndex", itemIndex)
    toDoList[itemIndex].checked = !toDoList[itemIndex].checked;

    renderToDoList(toDoList)

}

function renderToDoList(list) {
    // console.log("check");////check for randerlist how many time run randerlist
    listContainer.innerHTML = "";
    list.forEach((item, index) => {
        //console.log("item >>>>", item, index);////help of loop check item true/false and index check
        
        let li = document.createElement("li");
        li.textContent = item.name;
        li.setAttribute("data-id", item.id);
        // console.log("data-id done" ,li);
        
        

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";  
        checkbox.classList = "checkbox";
        checkbox.checked = item.checked;
        checkbox.onclick = () => checkToDo(item.id)
        if (item.checked === true) {
            li.style.textDecoration = "line-through";
        }


        let img = document.createElement("img");
        img.src = "images/icon-cross.svg"
        img.classList.add("cross");
        img.setAttribute("data-id", item.id);
        img.onclick = () => deleteToDo(item.id)


        listContainer.appendChild(li);
        li.prepend(checkbox);
        li.appendChild(img);
    });
    let countToDoList = list.filter( (item) => item.checked === false )

       itemCount.innerHTML = `items left ${countToDoList.length}`
}

inputText.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        if (inputText.value.trim() === "") {
            alert("Type something");
        } else {
            // add li 
            toDoList.push({
                name: inputText.value,
                id: toDoList.length + 1,
                checked: false,
            });
            renderToDoList(toDoList);
        }
    }
});


