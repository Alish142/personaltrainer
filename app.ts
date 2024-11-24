interface Client {
  clientID: string;
  name: string;
  dob: string;
  gender: string;
  fitnessProgram: string;
  contactInfo: string;
  joinedDate: string;
  endingDate: string;
  specialHealthNotes: string;
  isVIP: boolean;
}

let clients: Client[] = [
  {
    clientID: '1',
    name: 'Ram Bahadur',
    dob: '1990-05-15',
    gender: 'Male',
    fitnessProgram: 'muscle gain',
    contactInfo: 'john.doe@email.com',
    joinedDate: '2023-01-01',
    endingDate: '2023-12-31',
    specialHealthNotes: 'No allergies',
    isVIP: true,
  },
  {
    clientID: '2',
    name: 'KP BAA',
    dob: '1985-08-22',
    gender: 'Female',
    fitnessProgram: 'fat loss',
    contactInfo: 'jane.smith@email.com',
    joinedDate: '2023-02-15',
    endingDate: '2023-11-30',
    specialHealthNotes: 'Mild asthma',
    isVIP: false,
  },
  {
    clientID: '3',
    name: 'William Jordan',
    dob: '1978-11-30',
    gender: 'Male',
    fitnessProgram: 'overall fitness',
    contactInfo: 'bob.johnson@email.com',
    joinedDate: '2023-03-01',
    endingDate: '2024-02-29',
    specialHealthNotes: 'Previous knee injury',
    isVIP: true,
  },
];

// Add or Update Client
function addOrUpdateClient(event: Event): void {
  event.preventDefault();

  let clientID = (document.getElementById("clientID") as HTMLInputElement).value.trim();
  let name = (document.getElementById("name") as HTMLInputElement).value.trim();
  let dob = (document.getElementById("dob") as HTMLInputElement).value;
  let gender = (document.getElementById("gender") as HTMLSelectElement).value;
  let fitnessProgram = (document.getElementById("fitnessProgram") as HTMLSelectElement).value;
  let contactInfo = (document.getElementById("contactInfo") as HTMLInputElement).value.trim();
  let joinedDate = (document.getElementById("joinedDate") as HTMLInputElement).value;
  let endingDate = (document.getElementById("endingDate") as HTMLInputElement).value;
  let specialHealthNotes = (document.getElementById("specialHealthNotes") as HTMLTextAreaElement).value.trim();
  let isVIP = (document.getElementById("isVIP") as HTMLInputElement).checked;

  // Input validation
  if (!clientID || !name || !dob || !gender || !fitnessProgram || !contactInfo || !joinedDate || !endingDate) {
    alert("All fields except 'Special Health Notes' are required!");
    return;
  }

  let existingClientIndex = clients.findIndex(client => client.clientID === clientID);

  if (existingClientIndex === -1) {
    // Add new client
    clients.push({
      clientID,
      name,
      dob,
      gender,
      fitnessProgram,
      contactInfo,
      joinedDate,
      endingDate,
      specialHealthNotes,
      isVIP,
    });
    alert("Client added successfully!");
  } else {
    // Update existing client
    clients[existingClientIndex] = {
      clientID,
      name,
      dob,
      gender,
      fitnessProgram,
      contactInfo,
      joinedDate,
      endingDate,
      specialHealthNotes,
      isVIP,
    };
    alert("Client updated successfully!");
  }

  resetForm();
  displayClients();
}

// Display all clients dynamically
function displayClients(): void {
  let clientList = document.getElementById("clientList")!;
  clientList.innerHTML = "";

  if (clients.length === 0) {
    clientList.innerHTML = "<p>No clients found. Add a new client to get started.</p>";
    return;
  }

  clients.forEach(client => {
    let clientCard = document.createElement("div");
    clientCard.classList.add("client-card");

    clientCard.innerHTML = `
      <h3>${client.name} (${client.clientID})</h3>
      <p><strong>Fitness Program:</strong> ${client.fitnessProgram}</p>
      <p><strong>VIP:</strong> ${client.isVIP ? "Yes" : "No"}</p>
      <p><strong>Contact:</strong> ${client.contactInfo}</p>
      <p><strong>Date of Birth:</strong> ${client.dob}</p>
      <p><strong>Joined Date:</strong> ${client.joinedDate}</p>
      <p><strong>Ending Date:</strong> ${client.endingDate}</p>
      <p><strong>Health Notes:</strong> ${client.specialHealthNotes}</p>
      <button class="updateBtn" data-clientid="${client.clientID}">Update</button>
      <button class="deleteBtn" data-clientid="${client.clientID}">Delete</button>
    `;
    clientList.appendChild(clientCard);
  });

  addDeleteUpdateEventListeners();
}

// event listeners for delete and update actions
function addDeleteUpdateEventListeners(): void {
  let deleteButtons = document.querySelectorAll(".deleteBtn");
  let updateButtons = document.querySelectorAll(".updateBtn");

  deleteButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      let clientID = (e.target as HTMLElement).getAttribute("data-clientid")!;
      deleteClient(clientID);
    });
  });

  updateButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      let clientID = (e.target as HTMLElement).getAttribute("data-clientid")!;
      populateForm(clientID);
    });
  });
}

// Delete Client
function deleteClient(clientID: string): void {
  let confirmation = confirm(`Are you sure you want to delete client with ID ${clientID}?`);
  if (confirmation) {
    clients = clients.filter(client => client.clientID !== clientID);
    alert("Client deleted successfully!");
    displayClients();
  }
}

// Populate form for updating
function populateForm(clientID: string): void {
  let client = clients.find(c => c.clientID === clientID);
  if (client) {
    (document.getElementById("clientID") as HTMLInputElement).value = client.clientID;
    (document.getElementById("name") as HTMLInputElement).value = client.name;
    (document.getElementById("dob") as HTMLInputElement).value = client.dob;
    (document.getElementById("gender") as HTMLSelectElement).value = client.gender;
    (document.getElementById("fitnessProgram") as HTMLSelectElement).value = client.fitnessProgram;
    (document.getElementById("contactInfo") as HTMLInputElement).value = client.contactInfo;
    (document.getElementById("joinedDate") as HTMLInputElement).value = client.joinedDate;
    (document.getElementById("endingDate") as HTMLInputElement).value = client.endingDate;
    (document.getElementById("specialHealthNotes") as HTMLTextAreaElement).value = client.specialHealthNotes;
    (document.getElementById("isVIP") as HTMLInputElement).checked = client.isVIP;
  }
}

// Reset the form
function resetForm(): void {
  (document.getElementById("clientDetailsForm") as HTMLFormElement).reset();
}

// Search client by ID
function searchClientById(): void {
  let searchInput = document.getElementById("searchClientId") as HTMLInputElement;
  let clientId = searchInput.value.trim();
  
  if (!clientId) {
    alert("Please enter a client ID to search.");
    return;
  }

  let foundClient = clients.find(client => client.clientID === clientId);
  
  if (foundClient) {
    let searchResult = document.getElementById("searchResult")!;
    searchResult.innerHTML = ""; // Clear the list
    
    let clientCard = document.createElement("div");
    clientCard.classList.add("client-card");
    clientCard.innerHTML = `
      <h3>${foundClient.name} (${foundClient.clientID})</h3>
      <p><strong>Fitness Program:</strong> ${foundClient.fitnessProgram}</p>
      <p><strong>VIP:</strong> ${foundClient.isVIP ? "Yes" : "No"}</p>
      <p><strong>Contact:</strong> ${foundClient.contactInfo}</p>
      <p><strong>Date of Birth:</strong> ${foundClient.dob}</p>
      <p><strong>Joined Date:</strong> ${foundClient.joinedDate}</p>
      <p><strong>Ending Date:</strong> ${foundClient.endingDate}</p>
      <p><strong>Health Notes:</strong> ${foundClient.specialHealthNotes}</p>
      <button class="updateBtn" data-clientid="${foundClient.clientID}">Update</button>
      <button class="deleteBtn" data-clientid="${foundClient.clientID}">Delete</button>
    `;
    searchResult.appendChild(clientCard);
    addDeleteUpdateEventListeners();
  } else {
    alert("Client not found.");
  }
}

// Show VIP clients
function showVipClients(): void {
  let vipClients = clients.filter(client => client.isVIP);
  
  if (vipClients.length === 0) {
    alert("No VIP clients found.");
    return;
  }

  let vipClientList = document.getElementById("vipClientList")!;
  vipClientList.innerHTML = ""; // Clear the list
  
  vipClients.forEach(client => {
    let clientCard = document.createElement("div");
    clientCard.classList.add("client-card");
    clientCard.innerHTML = `
      <h3>${client.name} (${client.clientID})</h3>
      <p><strong>Fitness Program:</strong> ${client.fitnessProgram}</p>
      <p><strong>VIP:</strong> Yes</p>
      <p><strong>Contact:</strong> ${client.contactInfo}</p>
      <p><strong>Date of Birth:</strong> ${client.dob}</p>
      <p><strong>Joined Date:</strong> ${client.joinedDate}</p>
      <p><strong>Ending Date:</strong> ${client.endingDate}</p>
      <p><strong>Health Notes:</strong> ${client.specialHealthNotes}</p>
      <button class="updateBtn" data-clientid="${client.clientID}">Update</button>
      <button class="deleteBtn" data-clientid="${client.clientID}">Delete</button>
    `;
    vipClientList.appendChild(clientCard);
  });
  addDeleteUpdateEventListeners();
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("clientDetailsForm")?.addEventListener("submit", addOrUpdateClient);
  document.getElementById("searchForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    searchClientById();
  });
  document.getElementById("showVIPClientsBtn")?.addEventListener("click", showVipClients);
  displayClients();
});

