var seedData = [
  {
    complete: false,
    id: 'test1',
    title: 'Test Title',
    createdDate: new Date(),
    dueDate: new Date(),
  },
];

displayData(seedData);
console.log(getUUID());

// Display checklist data
function displayData(checklistArray) {
  const myTemplate = document.getElementById('Data-Template');
  const resultsBody = document.getElementById('resultsBody');

  // clear table first
  resultsBody.innerHTML = '';

  // Number format reference https://www.w3schools.com/jsref/jsref_tolocalestring_number.asp
  for (let i = 0; i < checklistArray.length; i++) {
    const dataRow = document.importNode(myTemplate.content, true);

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

// Create UUID
function getUUID() {
  return uuidv4();
}
