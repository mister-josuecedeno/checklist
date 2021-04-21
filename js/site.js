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
  // This for TESTING PURPOSE (Comment out later)
  // modelData = seedData;

  // Change source to LocalStorage
  // Use seed data if local storage is empty
  let local = getLocalStorage();

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
  console.log('Add Event');

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
  task['createdDate'] = setDateTime(new Date());

  // Retrieve Due Date from Form
  task['dueDate'] = setDateTime(document.getElementById('newDueDate').value);

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

// Date to midnight
function setDateTime(dateInput) {
  let date = dateInput;
  let mthAdjust = 1;

  if (typeof dateInput === 'string') {
    let [year, month, day] = dateInput.split('-');
    mthAdjust = 0;
    date = new Date(year, month, day);
  }

  const day = date.getDate(); // Returns the date
  const month = date.getMonth() + mthAdjust; // Returns the month (adjusted based on type - string or object)
  const year = date.getFullYear(); // Returns the year
  return `${month}/${day}/${year}`;
}

function toggleComplete(e) {
  if (e.checked) {
    console.log('checked');
  } else {
    console.log('not checked');
  }
}

function deleteTask(e) {
  console.log('Delete me!');
}

function editTask(e) {
  console.log('Edit me!');
}

function getUUID() {
  // https://github.com/uuidjs/uuid
  return uuidv4();
}

//     Filter Functions
function showIncompletes() {}
function showAll() {}
function showDueToday() {}

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
}

// Format Date
function formatDate(strDate) {
  const date = new Date(strDate);
  const day = date.getDate(); // Returns the date
  const month = date.getMonth(); // Returns the month
  const year = date.getFullYear(); // Returns the year
  return `${month}/${day}/${year}`;
}
