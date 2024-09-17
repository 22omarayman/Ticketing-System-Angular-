// src/app/tickets/tickets.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TicketService } from '../ticket.service';
import { TicketData } from '../ticket.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule,RouterModule,HttpClientModule],
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  tickets: TicketData[] = [];

  constructor(private router: Router, private ticketService: TicketService) { }

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.ticketService.getTickets().subscribe(
      data => this.tickets = data,
      error => console.error(error)
    );
  }
  goToTicketInfo(ticketId: number) {
    this.router.navigate(['/tickets', ticketId]);
  }
  createTicket() {
    this.router.navigate(['tickets/create']);
  }
}



