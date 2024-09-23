import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketService, TicketData, CommentData } from '../ticket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ticket-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ticket-info.component.html',
  styleUrls: ['./ticket-info.component.scss']
})
export class TicketInfoComponent implements OnInit {
  ticket: TicketData | undefined;
  comments: CommentData[] = [];
  newComment: CommentData = { name: '', posted: '', text: '' };
  replyText: string = '';

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    const ticketId = this.route.snapshot.paramMap.get('id')!;
    if (ticketId) {
      this.loadTicket(ticketId);
      this.loadComments(ticketId); // Load comments for the ticket
    } else {
      console.error('Invalid ticket ID');
    }
  }
  
  async loadTicket(id: string): Promise<void> {
    try {
      const response = await this.ticketService.getTicket(id);
      console.log('API Response:', response); // Log the raw response from the API
      this.ticket = response; // Assign the API response to the ticket variable
      console.log('Ticket Data:', this.ticket); // Verify the ticket is being assigned correctly
    } catch (error) {
      console.error('Error fetching ticket:', error);
    }
  }
  
  async loadComments(ticketId: string): Promise<void> {
    try {
      const comments = await this.ticketService.getComments(ticketId); // Call your service to get comments
      this.comments = comments; // Assign the fetched comments to the comments variable
      console.log('Loaded Comments:', this.comments); // Verify comments are loaded correctly
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }
  
  
  

  async addComment(): Promise<void> {
    if (this.ticket && this.replyText.trim()) {
      const newComment: CommentData = {
        name: "Anonymous", // Modify this as needed
        posted: new Date().toLocaleDateString(),
        text: this.replyText,
        ticketId: this.ticket._id // Include ticketId here
      };
  
      try {
        const addedComment = await this.ticketService.addComment(this.ticket._id!, newComment);
        this.comments.push(addedComment); // Add the new comment to the comments array
        this.replyText = ''; // Clear the reply text area
        console.log('Comment added:', addedComment);
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    } else {
      console.log('No ticket available or empty reply text');
    }
  }
  
  
  
  

  

  handleReplyClick(): void {
    console.log('Ticket:', this.ticket); // Check if the ticket is available
    console.log('Reply Text:', this.replyText); // Check if the replyText is not empty
  
    if (this.replyText.trim() && this.ticket) {
      this.addComment();
    } else {
      console.log('No ticket available or empty reply text');
    }
  }
  
  
}
