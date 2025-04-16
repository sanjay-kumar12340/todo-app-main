// document.addEventListener("DOMContentLoaded", () => {
//   const inputText = document.getElementById("input-text");
//   const ulList = document.getElementById("ul-list");
//   const itemCount = document.getElementById("item-count");

//   const filterAllBtn = document.getElementById("filter-all");
//   const filterActiveBtn = document.getElementById("filter-active");
//   const filterCompletedBtn = document.getElementById("filter-completed");
//   const clearCompletedBtn = document.getElementById("clear-completed");

//   let todos = [];

//   function renderTodos(filter = "all") {
//     ulList.innerHTML = "";

//     let filteredTodos = todos;
//     if (filter === "active") {
//       filteredTodos = todos.filter(todo => !todo.completed);
//     } else if (filter === "completed") {
//       filteredTodos = todos.filter(todo => todo.completed);
//     }

//     filteredTodos.forEach((todo, index) => {
//       const li = document.createElement("li");
//       li.className = "todo-item";
//       if (todo.completed) li.classList.add("completed");

//       const checkbox = document.createElement("input");
//       checkbox.type = "checkbox";
//       checkbox.checked = todo.completed;
//       checkbox.addEventListener("change", () => {
//         todo.completed = checkbox.checked;
//         updateCount();
//         renderTodos(getActiveFilter());
//       });

//       const span = document.createElement("span");
//       span.textContent = todo.text;

//       const deleteBtn = document.createElement("button");
//       deleteBtn.textContent = "❌";
//       deleteBtn.className = "delete-btn";
//       deleteBtn.addEventListener("click", () => {
//         todos.splice(index, 1);
//         updateCount();
//         renderTodos(getActiveFilter());
//       });

//       li.appendChild(checkbox);
//       li.appendChild(span);
//       li.appendChild(deleteBtn);

//       ulList.appendChild(li);
//     });

//     updateCount();
//   }

//   function updateCount() {
//     const remaining = todos.filter(todo => !todo.completed).length;
//     itemCount.textContent = `${remaining} item${remaining !== 1 ? "s" : ""} left`;
//   }

//   function getActiveFilter() {
//     if (filterActiveBtn.classList.contains("active")) return "active";
//     if (filterCompletedBtn.classList.contains("active")) return "completed";
//     return "all";
//   }

//   function setActiveFilter(button) {
//     document.querySelectorAll(".filters button").forEach(btn => btn.classList.remove("active"));
//     button.classList.add("active");
//     renderTodos(getActiveFilter());
//   }

//   inputText.addEventListener("keyup", (e) => {
//     if (e.key === "Enter" && inputText.value.trim() !== "") {
//       todos.push({ text: inputText.value.trim(), completed: false });
//       inputText.value = "";
//       renderTodos(getActiveFilter());
//     }
//   });

//   filterAllBtn.addEventListener("click", () => setActiveFilter(filterAllBtn));
//   filterActiveBtn.addEventListener("click", () => setActiveFilter(filterActiveBtn));
//   filterCompletedBtn.addEventListener("click", () => setActiveFilter(filterCompletedBtn));

//   clearCompletedBtn.addEventListener("click", () => {
//     todos = todos.filter(todo => !todo.completed);
//     renderTodos(getActiveFilter());
//   });

//   // Initial render
//   renderTodos();
// });



let toDoList = []

let inputText = document.getElementById("input-text");
let listContainer = document.getElementsByClassName("li-list")[0]; // First list 
let mainListContainer = document.getElementById("ul-list-container");
let itemCount = document.getElementById("item-count");

let count = 0;

 function updateItemCount() {
    itemCount.textContent = listContainer.children.length;
} 

function deleteToDo(id) {
    toDoList = toDoList.filter(item => item.id !== id);
    renderToDoList(toDoList);
}
function checkToDo(id) {

     console.log("toDo"); 
    renderToDoList(toDoList);
    // toDoList = toDoList.map(item => item.id !==id{})
    console.log("todo --", toDoList, id)
    let itemIndex = toDoList.findIndex(item => item.id === id);
    console.log("itemIndex", itemIndex)

    toDoList[itemIndex].checked = !toDoList[itemIndex].checked;

    renderToDoList(toDoList)

}

function renderToDoList(list) {
    console.log("check");
    listContainer.innerHTML = "";
    list.forEach((item, index) => {
        // 
        console.log("item >>>>", item, index);
        
        let li = document.createElement("li");
        li.textContent = item.name;
        li.setAttribute("data-id", item.id);
        

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";  // Example text for the span
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


