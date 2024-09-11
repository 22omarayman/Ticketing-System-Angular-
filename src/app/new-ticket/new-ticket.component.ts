import { Component } from '@angular/core';
import { TicketData } from '../ticket.service';
import { TicketService } from '../ticket.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.scss'
})
export class NewTicketComponent {
  ticketData: TicketData = {
    name: '',
    image: '',
    email: '',
    tel: '',
    priority: '',
    dat: new Date().toLocaleDateString(), // Automatically add current date
  };

  constructor(private router: Router, private ticketService: TicketService) {}

  addNewTicket() {
    // Call addTickets method from the service
    this.ticketService.addTickets(this.ticketData);
    this.ticketData = {
      name: '',
      image: '',
      email: '',
      tel: '',
      priority: '',
      dat: new Date().toLocaleDateString(),
    };
    this.router.navigate(["/tickets"])
  }
}
