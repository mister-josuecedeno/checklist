var seedData = [
  {
    complete: false,
    id: 'id1',
    task: 'Sample Overdue Task',
    createdDate: new Date(),
    dueDate: setDateOffsetDays(-5),
  },
  {
    complete: true,
    id: 'id2',
    task: 'Sample Task',
    createdDate: new Date(),
    dueDate: setDateOffsetDays(2),
  },
  {
    complete: false,
    id: 'id3',
    task: 'Task Due Today',
    createdDate: new Date(),
    dueDate: new Date(),
  },
];

// MODEL Functions

// Placeholder for data sources
var modelData = [];

buildList();

function buildList() {
  // Change source to LocalStorage
  // Use seed data if local storage is empty (for testing only)
  let local = getLocalStorage();

  // This for TESTING PURPOSE (Comment out later)
  if (local.length === 0) {
    setLocalStorage(seedData);
    local = getLocalStorage();
  }

  modelData = local;

  displayData(modelData);
}

function getLocalStorage() {
  return JSON.parse(localStorage.getItem('taskArray')) || [];
}

function setLocalStorage(array) {
  localStorage.setItem('taskArray', JSON.stringify(array));
}

// CONTROL Functions

//     CRUD Functions
function addTask() {
  // Get array from local storage
  const tasks = getLocalStorage();

  // Task Object
  const task = {};

  // Set complete to false
  task['complete'] = false;

  //     Get UUID
  task['id'] = getUUID();

  // Retrieve task from modal form
  task['task'] = document.getElementById('newTask').value;

  //     Generate Today's Date - https://stackoverflow.com/questions/3894048/what-is-the-best-way-to-initialize-a-javascript-date-to-midnight
  task['createdDate'] = formatDate(new Date());

  // Retrieve Due Date from Form
  task['dueDate'] = formatDate(document.getElementById('newDueDate').value);

  // Push to array
  tasks.push(task);

  // Set array in local storage
  setLocalStorage(tasks);

  // Set modelData to new data
  modelData = getLocalStorage();

  // Reset form
  document.getElementById('newTaskForm').reset();

  // Display Data
  displayData(modelData);
}

function toggleComplete(e) {
  let isComplete;

  if (e.checked) {
    isComplete = true;
  } else {
    isComplete = false;
  }

  // Get Tasks
  let tasks = getLocalStorage();

  // Task Id
  let taskId = getId(e);

  // Find where id matches Task ID
  let task = tasks.find((t) => t.id === taskId);

  // Update object element
  task.complete = isComplete;

  // Set Array
  setLocalStorage(tasks);
  displayData(getLocalStorage());
}

function getId(e) {
  return e.parentElement.parentElement.children[1].innerText;
}

function deleteTask(e) {
  // Get Tasks
  let tasks = getLocalStorage();

  // Task Id
  let taskId = getId(e);

  // Find where id matches Task ID
  let tasksfiltered = tasks.filter((t) => t.id !== taskId);

  // Set Array
  setLocalStorage(tasksfiltered);
  displayData(getLocalStorage());
}

function editTask() {
  // Get array from local storage
  const tasks = getLocalStorage();

  const taskID = document.getElementById('editID').value;

  // Task Object
  const task = tasks.find((t) => t.id === taskID);

  task['complete'] = document.getElementById('editComplete').value === 'true';
  task['id'] = document.getElementById('editID').value;
  task['task'] = document.getElementById('editTask').value;
  task['createdDate'] = document.getElementById('editCreatedDate').value;
  task['dueDate'] = document.getElementById('editDueDate').value;

  setLocalStorage(tasks);
  modelData = getLocalStorage();
  document.getElementById('editTaskForm').reset();
  displayData(modelData);
}

function getTask(e) {
  let taskID = getId(e);
  let tasks = getLocalStorage();

  let task = tasks.find((t) => t.id === taskID);

  document.getElementById('editComplete').value = task.complete;
  document.getElementById('editID').value = task.id;
  document.getElementById('editTask').value = task.task;
  document.getElementById('editCreatedDate').value = task.createdDate;
  document.getElementById('editDueDate').value = formatFormDate(task.dueDate);
}

function getTaskCount(taskArray) {
  return taskArray.length || 0;
}

function getUUID() {
  // https://github.com/uuidjs/uuid
  return uuidv4();
}

// Filter Function
function toggleCompletes(isComplete) {
  let tasks = getLocalStorage();
  let filtered = tasks;

  if (typeof isComplete === 'boolean') {
    filtered = tasks.filter((t) => t.complete === isComplete);
  }

  // Update modelData
  modelData = filtered;

  // Display Data (modelData)
  displayData(modelData);
}

function showDueToday() {
  let tasks = getLocalStorage();
  let filtered = tasks;
  let today = new Date();

  filtered = tasks.filter(
    (t) => formatDate(new Date(t.dueDate)) === formatDate(today)
  );

  // Update modelData
  modelData = filtered;

  // Display Data (modelData)
  displayData(modelData);
}

function showOverdue() {
  let tasks = getLocalStorage();
  let filtered = tasks;
  // let today = new Date();
  let today = setDateOffsetDays(-1);

  filtered = tasks.filter((t) => new Date(t.dueDate) < today);

  // Update modelData
  modelData = filtered;

  // Display Data (modelData)
  displayData(modelData);
}

// DISPLAY (View) Functions

// Display checklist data
function displayData(checklistArray) {
  const myTemplate = document.getElementById('Data-Template');
  const resultsBody = document.getElementById('resultsBody');

  // clear table first
  resultsBody.innerHTML = '';

  // Number format reference https://www.w3schools.com/jsref/jsref_tolocalestring_number.asp
  for (let i = 0; i < checklistArray.length; i++) {
    const dataRow = document.importNode(myTemplate.content, true);

    // Checkbox
    let isChecked = checklistArray[i].complete;
    let chkValue = isChecked ? 'checked' : '';
    let checkbox = `<input onClick="toggleComplete(this)" type="checkbox" name="chkComplete" id="chkComplete" ${chkValue}/>`;

    dataRow.getElementById('complete').innerHTML = checkbox;

    dataRow.getElementById('id').textContent = checklistArray[i].id;
    dataRow.getElementById('task').textContent = checklistArray[i].task;
    dataRow.getElementById('createdDate').textContent = formatDate(
      checklistArray[i].createdDate
    );
    dataRow.getElementById('dueDate').textContent = formatDate(
      checklistArray[i].dueDate
    );
    // dataRow.getElementById('controls').textContent = checklistArray[i].controls;

    resultsBody.appendChild(dataRow);
  }

  // Add Page Count
  document.getElementById('taskCount').innerHTML = getTaskCount(checklistArray);
}

// DATE TIME FUNCTIONS
// Date to midnight
function setDateTime(dateInput) {
  let [year, month, day] = getDateParts(dateInput);
  return `${month}/${day}/${year}`;
}

// Format Date
function formatDate(strDate) {
  let [year, month, day] = getDateParts(strDate);
  return `${month}/${day}/${year}`;
}

function formatFormDate(strDate) {
  let [year, month, day] = getDateParts(strDate);
  let strMonth = `0${month}`.slice(-2);
  let strDay = `0${day}`.slice(-2);
  return `${year}-${strMonth}-${strDay}`;
}

function setDateOffsetDays(days) {
  let dt = new Date();
  dt.setDate(dt.getDate() + days);
  return dt;
}

function getDateParts(strDate) {
  // How many types of date?

  let date = new Date(strDate);
  let mthAdjust = 1;

  if (strDate.length === 10) {
    let [year, month, day] = strDate.split('-');
    mthAdjust = 0;
    date = new Date(year, month, day);
  }

  const day = date.getDate(); // Returns the date
  const month = date.getMonth() + mthAdjust; // Returns the month (adjusted based on type - string or object)
  const year = date.getFullYear(); // Returns the year

  return [year, month, day];
}
