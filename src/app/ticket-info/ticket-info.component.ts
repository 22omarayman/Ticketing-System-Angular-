import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentData, TicketData, TicketService } from '../ticket.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ticket-info',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './ticket-info.component.html',
  styleUrl: './ticket-info.component.scss',
})
export class TicketInfoComponent implements OnInit {
  ticketId: number | null = null;
  ticket: TicketData | undefined;
  comments: CommentData[] = [];
  replyText: string = ''; // Bind this to textarea


  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.ticketId = +params.get('id')!;
      this.loadTicket();
    });
  }

  loadTicket(): void {
    if (this.ticketId !== null) {
      this.ticket = this.ticketService.viewTicket(this.ticketId);
      this.comments = this.ticketService.getComments(this.ticketId);
    }
  }

  addComment(): void {
    if (this.ticketId !== null) {
      const newComment: CommentData = {
        name: 'User Name', // Replace with actual user name if available
        posted: 'Posted on ' + new Date().toLocaleDateString(),
        text: this.replyText,
      };
      this.ticketService.addComment(this.ticketId, newComment);
      this.loadTicket(); // Refresh the comments list
      this.replyText = ''; // Clear the reply input
    }
  }

  handleReplyClick(): void {
    this.addComment();
  }
}
