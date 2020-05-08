const input = document.querySelector('.input');
const btn = document.querySelector('.btn');
const lists = document.querySelector('.lists');
const warning = document.querySelector('.warning');
const filter = document.querySelector('.filter')


document.addEventListener('DOMContentLoaded', getLocal);
btn.addEventListener('click', addTodo);
lists.addEventListener('click', deleteCheck);
filter.addEventListener('click', filterTodo);



function addTodo(e) {
    e.preventDefault();
    let warningInterval;
    if (input.value == '') {
        warning.innerText = 'You should Type something';
    } else {
        warning.innerText = null;
        let div = document.createElement('div');
        div.classList.add('todo');

        let list = document.createElement('li');
        list.classList.add('list');
        list.innerText = input.value;
        
        
        div.appendChild(list);

        let btnCheck = document.createElement('button');
        btnCheck.classList.add('btncheck');
        btnCheck.innerHTML = '<i class="fas fa-check"></i>';
        div.appendChild(btnCheck);

        let btnTrush = document.createElement('button');
        btnTrush.classList.add('btntrush');
        btnTrush.innerHTML = '<i class="fas fa-trash-restore"></i>';
        div.appendChild(btnTrush);

        lists.appendChild(div);
        
        
        saveLocalStorage(input.value,0)
    }


    input.value = '';

}


function deleteCheck(e) {
    if (e.target.classList[0] === 'btntrush') {
        let parentElement = e.target.parentElement;
        deleteLocal(parentElement)
        parentElement.classList.add('fall');
        parentElement.addEventListener('transitionend', () => {
            parentElement.remove()
        })
    }
    if (e.target.classList[0] === 'btncheck') {
        let parentElement = e.target.parentElement;
        parentElement.classList.toggle('checked');
     
    }
}


function filterTodo(e) {
    let items = lists.childNodes;
    console.log(items)
    items.forEach(item => {
        switch (e.target.value) {
            case 'all':
                item.style.display = 'flex';
                break;

            case 'complete':
                if(item.classList == 'todo checked'){
                    item.style.display = 'flex';
                }else{
                    item.style.display = 'none';
                }
                break;

            case 'uncomplete':
                if(item.classList == 'todo' && item.classList !== 'checked'){
                    item.style.display = 'flex';
                }else{
                    item.style.display = 'none';
                }
                break;
        } 
    })
}

function saveLocalStorage (todo,check) {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    let obj = {};
    obj.title = todo;
    obj.check = check;

    todos.push(obj);
    localStorage.setItem('todos',JSON.stringify(todos))

}


function getLocal () {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(todo =>{
        let div = document.createElement('div');
        div.classList.add('todo');

        if(todo.check == '1'){
            div.classList.add('checked')
        }

        let list = document.createElement('li');
        list.classList.add('list');
        list.innerText = todo.title;
        
        div.appendChild(list);

        let btnCheck = document.createElement('button');
        btnCheck.classList.add('btncheck');
        btnCheck.innerHTML = '<i class="fas fa-check"></i>';
        div.appendChild(btnCheck);

        let btnTrush = document.createElement('button');
        btnTrush.classList.add('btntrush');
        btnTrush.innerHTML = '<i class="fas fa-trash-restore"></i>';
        div.appendChild(btnTrush);

        lists.appendChild(div);
    })
  

}


function deleteLocal (todo){
    let todos;
    if(localStorage.getItem('todos') ===  null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    for(let i = 0 ; i < todos.length ; i++){
        if(todos[i].title == todo.children[0].innerText){
            todos.splice(todos.indexOf(todos[i]),1)
        }
    }
    localStorage.setItem('todos',JSON.stringify(todos))
}

