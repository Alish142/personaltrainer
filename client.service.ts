import { Injectable } from '@angular/core';
import { Client } from '../client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private clients: Client[] = [];

  getClients(): Client[] {
    return this.clients;
  }

  addOrUpdateClient(client: Client): void {
    const index = this.clients.findIndex(c => c.clientID === client.clientID);
    if (index === -1) {
      this.clients.push(client);
    } else {
      this.clients[index] = client;
    }
  }

  deleteClient(clientID: string): void {
    this.clients = this.clients.filter(client => client.clientID !== clientID);
  }

  getClientById(clientID: string): Client | undefined {
    return this.clients.find(client => client.clientID === clientID);
  }
}
