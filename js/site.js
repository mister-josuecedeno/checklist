var seedData = [
  {
    complete: false,
    id: 'test1',
    title: 'Test Title',
    createdDate: new Date(),
    dueDate: new Date(),
  },
  {
    complete: true,
    id: 'test2',
    title: 'Test Title 2',
    createdDate: new Date(),
    dueDate: new Date(),
  },
  {
    complete: false,
    id: 'test3',
    title: 'Test Title 3',
    createdDate: new Date(),
    dueDate: new Date(),
  },
];

// This for TESTING PURPOSE (Comment out later)
displayData(seedData);

// MODEL Functions

// Placeholder for data sources
var modelData = [];

function getLocalStorage() {}

function setLocalStorage(array) {}

// CONTROL Functions

//     CRUD Functions
function addTask() {}

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
    dataRow.getElementById('title').textContent = checklistArray[i].title;
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
function formatDate(date) {
  const day = date.getDate(); // Returns the date
  const month = date.getMonth(); // Returns the month
  const year = date.getFullYear(); // Returns the year
  return `${month}/${day}/${year}`;
}
