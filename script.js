const add_button = document.getElementById("add_button");
const task_list = document.getElementById("task_list");
const input_task = document.getElementById("task_input");
add_button.addEventListener("click", function(){
    const text = input_task.value.trim();
    const priority = document.querySelector("select");
    const priorityValue = priority.value;
    if (text==""){
        alert("Please enter a task");
        return;
    }
    if (priorityValue === "") {
        alert("Please select a priority");
        return; 
    }
    const taskItem = document.createElement("li");
    taskItem.classList.add(priorityValue);
    taskItem.innerHTML = `
        <input type="checkbox" class="task-checkbox">
        <span>${text}</span>
        <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
        <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
    `;

    task_list.appendChild(taskItem);
    input_task.value = ""; 
});


task_list.addEventListener("click", function(event){

    if (event.target.classList.contains("task-checkbox")) {
        const checkbox = event.target;
        const li = checkbox.closest("li");
        const span = li.querySelector("span");
        span.classList.toggle("completed", checkbox.checked);
    }

    const target = event.target.closest("button");
    if(!target) return;
    if (target.classList.contains("delete-btn")){
        if(!target.parentElement.querySelector("span").classList.contains("completed")){
            if(!confirm("You haven't completed this task yet. Are you sure you want to delete it?")){
                return;
            }
        }
        target.parentElement.remove();
    }

    if(target.classList.contains("edit-btn")){
        const taskText = target.parentElement.querySelector("span");
        const newText = prompt("Edit your task:", taskText.textContent);
        if(newText !== null && newText.trim() !== ""){
            taskText.textContent = newText.trim();
        }
    }

});

