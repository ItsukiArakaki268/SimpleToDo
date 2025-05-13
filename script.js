// グローバル変数
// タスクリスト
const tasks = [];

// 追加ボタン
const addButton =  document.getElementById('addButton');
const todoInput = document.getElementById('todoInput');

// 追加ボタンが押された時の処理
addButton.addEventListener('click', () => {
    addTask();
    renderTasks();
    todoInput.value = '';
})

// タスクリストを表示する関数
function renderTasks() {
    const list = document.getElementById('taskList');
    list.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task-item';

        // チェックボックスを表示
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.done;
        checkbox.addEventListener('change', () => {
            task.done = checkbox.checked;
            renderTasks();
        })

        // タスクテキストを表示
        const span = document.createElement('span');
        span.textContent = task.text;
        if (task.done) {
            span.style.textDecoration = 'line-through';
            span.style.color = '#999';
        }
        
        // 削除ボタンを表示
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '削除';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => deleteTask(index));

        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(span);
        taskDiv.appendChild(deleteBtn);
        list.appendChild(taskDiv);
    });
}

// タスクを追加する関数
function addTask(){
    const taskText = todoInput.value.trim();
    if (taskText === '') return;

    const newTask = {
        text: taskText,
        done: false,
    };
    tasks.push(newTask);
}

// タスクを削除する関数
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}