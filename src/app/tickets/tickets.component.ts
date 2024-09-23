// src/app/tickets/tickets.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TicketService } from '../ticket.service';
import { TicketData } from '../ticket.service';


@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule,RouterModule,],
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  tickets: TicketData[] = [];

  constructor(private router: Router, private ticketService: TicketService) { }

  ngOnInit(): void {
    this.loadTickets();
  }

  async loadTickets(): Promise<void> {
    this.tickets = await this.ticketService.getTickets();
  }
  goToTicketInfo(id: string): void {
    if (id) {
      this.router.navigate([`/tickets/${id}`]);
    }
  }
  createTicket() {
    this.router.navigate(['tickets/create']);
  }
}



