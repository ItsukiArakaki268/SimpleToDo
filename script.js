// グローバル変数
// タスクリスト
const tasks = [];

// 追加ボタン
const addButton =  document.getElementById('addButton');
const todoInput = document.getElementById('todoInput');
const dueDateInput = document.getElementById('dueDateInput');

// 追加ボタンが押された時の処理
addButton.addEventListener('click', () => {
    addTask();
    renderTasks();
    todoInput.value = '';
    dueDateInput.value = '';
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
            saveTasksToLocalStorage();
            renderTasks();
        })

        // タスクテキストを表示
        const span = document.createElement('span');
        span.textContent = task.text;
        
        // 期限を表示
        const dateSpan = document.createElement('span');
        dateSpan.className = 'due-date';
        if (task.dueDate) {
            const today = new Date();
            const dueDate = new Date(task.dueDate);
            dateSpan.textContent = `期限: ${task.dueDate}`;

            // 期限切れや期限が近い場合の警告表示
            if (dueDate < today) {
                dateSpan.style.color = 'red'; // 期限切れ
            } else if (dueDate - today <= 3 * 24 * 60 * 60 * 1000) {
                dateSpan.style.color = 'orange'; // 期限3日以内
            }
        }

        // タスクが完了した時の処理
        if (task.done) {
            span.style.textDecoration = 'line-through';
            span.style.color = '#999';
            dateSpan.style.textDecoration = 'line-through';
            dateSpan.style.color = '#999';
        }
        
        // 削除ボタンを表示
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '削除';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => deleteTask(index));

        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(span);
        taskDiv.appendChild(dateSpan); 
        taskDiv.appendChild(deleteBtn);
        list.appendChild(taskDiv);
    });
}

// タスクを追加する関数
function addTask(){
    const taskText = todoInput.value.trim();
    const dueDate = dueDateInput.value;
    if (taskText === '') return;

    const newTask = {
        text: taskText,
        done: false,
        dueDate: dueDate,
    };
    tasks.push(newTask);
    saveTasksToLocalStorage();
}

// タスクを削除する関数
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasksToLocalStorage();
    renderTasks();
}

// タスクをローカルストレージに保存する関数
function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// タスクをローカルストレージから読み込む関数
function loadTasksFromLocalStorage() {
    const stored = localStorage.getItem('tasks');
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) {
                parsed.forEach(task => {
                    if (typeof task.text === 'string' && typeof task.done === 'boolean') {
                        tasks.push(task);
                    }
                });
            }
        } catch (e) {
            console.error('ローカルストレージの読み込みに失敗: ', e);
        }
    }
}

// ページ読み込み時にローカルストレージから読み込み・表示
window.addEventListener('DOMContentLoaded', () => {
    loadTasksFromLocalStorage();
    renderTasks();
});