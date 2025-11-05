let db;
const dbName = "DemoDB";
const storeName = "Users";

// Open database
const request = indexedDB.open(dbName, 1);

request.onupgradeneeded = (event) => {
  db = event.target.result;
  db.createObjectStore(storeName, { keyPath: "id" });
};

request.onsuccess = (event) => {
  db = event.target.result;
  log("Database ready!");
};

request.onerror = (event) => {
  log("Error: " + event.target.errorCode);
};

// Utility function for logs
function log(msg) {
  document.getElementById("output").textContent += msg + "\n";
}

// Helper: get input values
function getInput() {
  return {
    id: Number(document.getElementById("userId").value),
    name: document.getElementById("userName").value
  };
}

// Create
function addData() {
  const { id, name } = getInput();
  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);
  store.add({ id, name });
  log(`Added: ${id} - ${name}`);
}

// Read
function readData() {
  const { id } = getInput();
  const tx = db.transaction(storeName, "readonly");
  const store = tx.objectStore(storeName);
  const req = store.get(id);
  req.onsuccess = () => {
    if (req.result) log("Read: " + JSON.stringify(req.result));
    else log("No record found.");
  };
}

// Update
function updateData() {
  const { id, name } = getInput();
  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);
  store.put({ id, name });
  log(`Updated: ${id} - ${name}`);
}

// Delete
function deleteData() {
  const { id } = getInput();
  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);
  store.delete(id);
  log(`Deleted ID: ${id}`);
}
