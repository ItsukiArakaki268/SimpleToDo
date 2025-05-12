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
    
    tasks.forEach((taskText, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task-item';

        // タスクテキストを表示
        const span = document.createElement('span');
        span.textContent = taskText;
        
        // 削除ボタンを表示
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '削除';
        deleteBtn.className = 'delete-btn';
       
        deleteBtn.addEventListener('click', () => deleteTask(index));

        taskDiv.appendChild(span);
        taskDiv.appendChild(deleteBtn);
        list.appendChild(taskDiv);
    });
}

// タスクを追加する関数
function addTask(){
    const taskText = todoInput.value.trim();
    console.log('入力されたタスク:', taskText);
    tasks.push(taskText);
    console.log('タスクリスト:', tasks);
}

// タスクを削除する関数
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}