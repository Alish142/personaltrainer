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
      isVIP: true
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
      isVIP: false
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
      isVIP: true
    }
];



// Add or Update Client
function addOrUpdateClient(event: Event) {
  event.preventDefault();

  // Get form values
  const clientID = (document.getElementById("clientID") as HTMLInputElement).value;
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const dob = (document.getElementById("dob") as HTMLInputElement).value;
  const gender = (document.getElementById("gender") as HTMLSelectElement).value;
  const fitnessProgram = (document.getElementById("fitnessProgram") as HTMLSelectElement).value;
  const contactInfo = (document.getElementById("contactInfo") as HTMLInputElement).value;
  const joinedDate = (document.getElementById("joinedDate") as HTMLInputElement).value;
  const endingDate = (document.getElementById("endingDate") as HTMLInputElement).value;
  const specialHealthNotes = (document.getElementById("specialHealthNotes") as HTMLTextAreaElement).value;
  const isVIP = (document.getElementById("isVIP") as HTMLInputElement).checked;

  // Check if Client ID already exists
  const existingClientIndex = clients.findIndex(client => client.clientID === clientID);

  if (existingClientIndex === -1) {
      // Add new client if ID is unique
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
  } else {
      // Update existing client if ID exists
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
  }

  resetForm();
  displayClients();
}

// Display all Clients
function displayClients() {
  const clientList = document.getElementById("clientList")!;
  clientList.innerHTML = ""; // Clear current list

  clients.forEach(client => {
    const clientCard = document.createElement("div");
    clientCard.classList.add("client-card");

    clientCard.innerHTML = `
        <h3>${client.name} (${client.clientID})</h3>
        <p>Fitness Program: ${client.fitnessProgram}</p>
        <p>VIP: ${client.isVIP ? "Yes" : "No"}</p>
        <p>Contact: ${client.contactInfo}</p>
        <p>DOB: ${client.dob}</p>
        <p>Joined Date: ${client.joinedDate}</p>
        <p>Ending Date: ${client.endingDate}</p>
        <p>Special Health Notes: ${client.specialHealthNotes}</p>
        <button class="deleteBtn" data-clientid="${client.clientID}">Delete</button>
        <button class="updateBtn" data-clientid="${client.clientID}">Update</button>
    `;

    clientList.appendChild(clientCard);
  });

  // Add event listeners for Delete and Update buttons after rendering the clients
  addDeleteUpdateEventListeners();
}

// Attach event listeners for delete and update actions
function addDeleteUpdateEventListeners() {
  const deleteButtons = document.querySelectorAll('.deleteBtn');
  const updateButtons = document.querySelectorAll('.updateBtn');

  deleteButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const clientID = (e.target as HTMLElement).getAttribute('data-clientid')!;
      deleteClient(clientID);
    });
  });

  updateButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const clientID = (e.target as HTMLElement).getAttribute('data-clientid')!;
      populateForm(clientID); // Populate the form for updating
    });
  });
}

// Delete Client
function deleteClient(clientID: string) {
  const confirmation = confirm(`Are you sure you want to delete client with ID ${clientID}?`);
  if (confirmation) {
      clients = clients.filter(client => client.clientID !== clientID);
      displayClients();  // Re-render the client list after deletion
  }
}

// Populate Form for Update
function populateForm(clientID: string) {
  const client = clients.find(c => c.clientID === clientID);
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

// Reset the Form
function resetForm() {
  (document.getElementById("clientDetailsForm") as HTMLFormElement).reset();
}

// Event Listeners
document.getElementById("clientDetailsForm")?.addEventListener("submit", addOrUpdateClient);

// Call the displayClients initially to show all clients when page loads
displayClients();
