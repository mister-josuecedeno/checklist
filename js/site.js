var seedData = [
  {
    complete: false,
    id: 'test1',
    task: 'Test task',
    createdDate: new Date(),
    dueDate: new Date(),
  },
  {
    complete: true,
    id: 'test2',
    task: 'Test task 2',
    createdDate: new Date(),
    dueDate: new Date(),
  },
  {
    complete: false,
    id: 'test3',
    task: 'Test task 3',
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
  console.log('Delete me!');

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

// Next version
function editTask(e) {
  console.log('Edit me!');
  let taskID = getId(e);
  console.log(taskID);
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
  console.log('Show Due Today');
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

// Add padding to year (leading zero)
function formatFormDate(strDate) {
  let [year, month, day] = getDateParts(strDate);
  let strMonth = `0${month}`.slice(-2);
  let strDay = `0${day}`.slice(-2);
  return `${year}-${strMonth}-${strDay}`;
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
