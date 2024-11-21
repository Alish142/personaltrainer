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


let clients: Client[] = [];

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

const client: Client = {
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

  // Check if it's an update or add
  const existingClientIndex = clients.findIndex(c => c.clientID === clientID);
  if (existingClientIndex === -1) {
      // Add new client
      clients.push(client);
  } else {
      // Update existing client
      clients[existingClientIndex] = client;
  }

  // Clear form after submission
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
  const deleteButtons = document.querySelectorAll('.deleteBtn');
  const updateButtons = document.querySelectorAll('.updateBtn');

  // Attach event listeners to delete buttons
  deleteButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const clientID = (e.target as HTMLElement).getAttribute('data-clientid')!;
      deleteClient(clientID);
    });
  });

  // Attach event listeners to update buttons
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
