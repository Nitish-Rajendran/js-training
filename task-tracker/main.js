const manager = new TaskManager();
let currentFilter = 'all';

const taskForm = document.getElementById('task-form');
const taskNameInput = document.getElementById('task-name');
const taskPriorityInput = document.getElementById('task-priority');
const taskDueDateInput = document.getElementById('task-due-date');

const taskList = document.getElementById('task-list');
const taskTableBody = document.getElementById('task-table-body');
const prioritySummaryBody = document.getElementById('priority-summary-body');
const taskCounter = document.getElementById('task-counter');

const filterAllBtn = document.getElementById('filter-all');
const filterPendingBtn = document.getElementById('filter-pending');
const filterDoneBtn = document.getElementById('filter-done');
const sortSelect = document.getElementById('sort-tasks');
const clearAllBtn = document.getElementById('clear-all');

function isOverdue(dateStr) {
  if (!dateStr) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dateStr);
  const dueDate = new Date(due.getTime() + due.getTimezoneOffset() * 60000);
  dueDate.setHours(0, 0, 0, 0);
  return dueDate.getTime() <= today.getTime();
}

function render() {
  const allTasks = manager.getAll();
  const sorted = manager.sortBy(sortSelect.value);
  const filtered = sorted.filter(t => {
    if (currentFilter === 'done') return t.done;
    if (currentFilter === 'pending') return !t.done;
    return true;
  });

  taskCounter.textContent = `Showing ${filtered.length} of ${allTasks.length} tasks`;

  taskList.innerHTML = filtered.map(t => {
    const overdue = isOverdue(t.dueDate) && !t.done;
    return `
      <li class="task-item ${t.done ? 'done' : ''} ${overdue ? 'overdue' : ''}">
        <span>
          <strong>${t.name}</strong> - Priority: ${t.priority} - Due: 
          <span class="${overdue ? 'overdue-text' : ''}">${t.dueDate}</span>
        </span>
        <button data-id="${t.id}" class="toggle-btn">${t.done ? 'Undo' : 'Done'}</button>
      </li>
    `;
  }).join('');

  taskTableBody.innerHTML = filtered.map(t => {
    const overdue = isOverdue(t.dueDate) && !t.done;
    return `
      <tr class="${t.done ? 'done' : ''} ${overdue ? 'overdue' : ''}">
        <td>${t.name}</td>
        <td>${t.priority}</td>
        <td><span class="${overdue ? 'overdue-text' : ''}">${t.dueDate}</span></td>
        <td>${t.done ? 'Done' : 'Pending'}</td>
      </tr>
    `;
  }).join('');

  const grouped = groupBy(allTasks, 'priority');
  prioritySummaryBody.innerHTML = ['High', 'Medium', 'Low'].map(p => {
    const count = (grouped[p] || []).length;
    return `
      <tr>
        <td>${p}</td>
        <td>${count}</td>
      </tr>
    `;
  }).join('');
}

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = taskNameInput.value.trim();
  const priority = taskPriorityInput.value;
  const dueDate = taskDueDateInput.value;

  if (name && priority && dueDate) {
    manager.add({ name, priority, dueDate });
    taskNameInput.value = '';
    taskDueDateInput.value = '';
    render();
  }
});

taskList.addEventListener('click', (e) => {
  if (e.target.classList.contains('toggle-btn')) {
    const id = parseInt(e.target.getAttribute('data-id'), 10);
    manager.toggle(id);
    render();
  }
});

clearAllBtn.addEventListener('click', () => {
  manager.clearAll();
  render();
});

filterAllBtn.addEventListener('click', () => {
  currentFilter = 'all';
  render();
});

filterPendingBtn.addEventListener('click', () => {
  currentFilter = 'pending';
  render();
});

filterDoneBtn.addEventListener('click', () => {
  currentFilter = 'done';
  render();
});

sortSelect.addEventListener('change', render);

render();
