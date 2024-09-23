import { Component } from '@angular/core';
import { TicketData, TicketService } from '../ticket.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.scss'] // Fixing 'styleUrl' to 'styleUrls'
})
export class NewTicketComponent {
  ticketData: TicketData = {
    name: '',
    image: '',
    email: '',
    tel: '',
    priority: '',
    dat: new Date().toISOString(), // Automatically add current date
  };

  constructor(private router: Router, private ticketService: TicketService) {}

  async addNewTicket() {
    const newTicket = await this.ticketService.addTickets(this.ticketData);
    if (newTicket) {
      this.router.navigate(["/tickets"]); // Navigate only if creation is successful
    } else {
      console.error('Failed to create ticket:', this.ticketData);
    }
  }
  
}
