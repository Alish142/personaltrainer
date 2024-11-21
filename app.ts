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
