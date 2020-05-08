// Global Veriable 
const input = document.querySelector('.input');
const btn = document.querySelector('.btn');
const filter = document.querySelector('.filter');
const todoList = document.querySelector('.todoList');
const text = document.querySelector('.text')



// AddEventListener 
document.addEventListener('DOMContentLoaded',getLocalStorge)
btn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filter.addEventListener('click',todoFilter)



// Function 

function addTodo (e) {
    e.preventDefault();
    let type;
    if(input.value == ''){
        type =  setTimeout(()=>{
          text.innerText = 'You should Type something'
        })
    }else {
        clearInterval(type)
        text.innerText = ''
        let todoDiv = document.createElement('div');
        todoDiv.classList.add('tododiv');
    
        let todoItem = document.createElement('li');
        todoItem.classList.add('todoItem');
        todoItem.innerText = input.value
        todoDiv.appendChild(todoItem)
    
        // SaveLocalStorg
        saveLocalStorg(input.value)
    
        todoCheck = document.createElement('button');
        todoCheck.classList.add('todoCheck');
        todoCheck.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
        todoDiv.appendChild(todoCheck);
    
        todoTrash = document.createElement('button');
        todoTrash.classList.add('todoTrush');
        todoTrash.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
        todoDiv.appendChild(todoTrash);
    
    
        todoList.appendChild(todoDiv);
    }
    input.value= ''

}

//function detete - Check
function deleteCheck(e){
 const item = e.target;
 if(item.classList[0] === 'todoTrush'){
    const itemDelete = item.parentElement
    itemDelete.classList.add('fall');
    deteteLocalStorge(itemDelete)
    itemDelete.addEventListener('transitionend',()=>{
        itemDelete.remove()
    })
 }

 if(item.classList[0] === 'todoCheck'){
    const itemCheck = item.parentElement
    itemCheck.classList.toggle('completed');
 }

}

// Filter Select 

function todoFilter (e){
    let items = todoList.childNodes;
    let [head, ...tail] = items;
    
    tail.forEach(item => {
        switch(e.target.value){
            case 'all' :
                item.style.display = 'flex';
            break;
            
            case 'completed' :
                if(item.classList == 'tododiv completed'){
                    item.style.display = 'flex';
                }else{
                    item.style.display = 'none';
                }
            break;
            
            case 'uncompleted' :
                if(item.classList == 'tododiv'){
                    item.style.display = 'flex';
                }else{
                    item.style.display = 'none';
                }
            break;
        }
        
    });

}

// Function LocalStorage
function saveLocalStorg (todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos =[];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos))
}


function getLocalStorge (todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos =[];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(item =>{
        let todoDiv = document.createElement('div');
        todoDiv.classList.add('tododiv');
    
        let todoItem = document.createElement('li');
        todoItem.classList.add('todoItem');
        todoItem.innerText = item
        todoDiv.appendChild(todoItem)

    
        todoCheck = document.createElement('button');
        todoCheck.classList.add('todoCheck');
        todoCheck.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
        todoDiv.appendChild(todoCheck);
    
        todoTrash = document.createElement('button');
        todoTrash.classList.add('todoTrush');
        todoTrash.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
        todoDiv.appendChild(todoTrash);
    
    
        todoList.appendChild(todoDiv);
    })

}

function deteteLocalStorge (todo) {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos =[];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    let todosIndex = todos.indexOf(todo.children[0].innerText)
    todos.splice(todos.indexOf(todos[todosIndex]),1)
    localStorage.setItem('todos', JSON.stringify(todos))
}

