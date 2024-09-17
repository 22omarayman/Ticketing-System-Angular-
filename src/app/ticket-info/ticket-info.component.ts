// src/app/ticket-info/ticket-info.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketService,TicketData,CommentData } from '../ticket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ticket-info',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './ticket-info.component.html',
  styleUrls: ['./ticket-info.component.scss']
})
export class TicketInfoComponent implements OnInit {
  ticket: TicketData | undefined;
  comments: CommentData[] = [];
  newComment: CommentData = { name: '', posted: new Date().toLocaleDateString(), text: '' };
  replyText: string = ''; // Add this property

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    const ticketId = +this.route.snapshot.paramMap.get('id')!;
    this.loadTicket(ticketId);
    this.loadComments(ticketId);
  }

  loadTicket(id: number): void {
    this.ticketService.getTicket(id).subscribe(
      data => this.ticket = data,
      error => console.error(error)
    );
  }

  loadComments(ticketId: number): void {
    this.ticketService.getComments(ticketId).subscribe(
      data => this.comments = data,
      error => console.error(error)
    );
  }

  addComment(): void {
    if (this.ticket) {
      this.newComment.text = this.replyText; // Set the comment text
      this.ticketService.addComment(this.ticket.id!, this.newComment).subscribe(
        data => {
          this.comments.push(data);
          this.replyText = ''; // Clear the reply text after adding the comment
          this.newComment = { name: '', posted: new Date().toLocaleDateString(), text: '' };
        },
        error => console.error(error)
      );
    }
  }

  handleReplyClick(): void {
    this.addComment();
  }
}
