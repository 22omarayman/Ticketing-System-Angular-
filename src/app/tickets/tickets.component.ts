import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from '../ticket.service';
import { TicketData } from '../ticket.service';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss',
})
export class TicketsComponent implements OnInit {
  constructor(private router: Router, private ticketService: TicketService) {}

  tickets: TicketData[] = [];
  ngOnInit(): void {
    this.tickets = this.ticketService.getTickets();
  }

  goToTicketInfo(ticketId: number) {
    this.router.navigate(['/tickets', ticketId]);
  }
  createTicket() {
    this.router.navigate(['tickets/create']);
  }
}
