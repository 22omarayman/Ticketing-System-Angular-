import { Injectable } from '@angular/core';

export interface TicketData {
  id?: number;
  name: string;
  image: string;
  email: string;
  tel: string;
  priority: string;
  dat: string;
  problem?: string,
  subject?: string
}
export interface CommentData{
  id?: number;
  name:string;
  posted:string;
  text:string;
}

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  tickets = [
    {
      id: 1,
      name: 'Omar Ayman',
      image: 'img.jpeg',
      email: 'omarayman2004@gmail.com',
      tel: '01015705004',
      priority: 'High',
      dat: '9/9/24',
    },
    {
      id: 2,
      name: 'Omar Ayman',
      image: 'images.jpeg',
      email: 'omarayman2004@gmail.com',
      tel: '01015705004',
      priority: 'Medium',
      dat: '9/9/24',
    },
    {
      id: 3,
      name: 'Omar Ayman',
      image: 'images (1).jpeg',
      email: 'omarayman2004@gmail.com',
      tel: '01015705004',
      priority: 'Medium',
      dat: '9/9/24',
    },
    {
      id: 4,
      name: 'Omar Ayman',
      image: 'download (4).jpeg',
      email: 'omarayman2004@gmail.com',
      tel: '01015705004',
      priority: 'Low',
      dat: '9/9/24',
    },
    {
      id: 5,
      name: 'Omar Ayman',
      image: 'download (5).jpeg',
      email: 'omarayman2004@gmail.com',
      tel: '01015705004',
      priority: 'High',
      dat: '9/9/24',
    },
  ];
  ticketComments: { [key: number]: CommentData[] } = {
    1: [
      {
        id: 1,
        name: 'John Doe',
        posted: 'Posted on April 17, 2023',
        text: 'This is a sample comment for ticket 1.',
      },
    ],
    // Add other ticket comments similarly
  };

  constructor() {}

  getTickets() {
    return this.tickets;
  }

  addTickets(data: TicketData) {
    const newTicket = {
      id: this.tickets.length + 1,
      ...data,
    };
    this.tickets.push(newTicket);
    this.ticketComments[newTicket.id] = []; // Initialize comments for new ticket
  }

  viewTicket(ticketId: number) {
    return this.tickets.find(ticket => ticket.id === ticketId);
  }

  getComments(ticketId: number): CommentData[] {
    return this.ticketComments[ticketId] || [];
  }

  addComment(ticketId: number, comment: CommentData) {
    if (!this.ticketComments[ticketId]) {
      this.ticketComments[ticketId] = [];
    }
    const newComment = {
      id: this.ticketComments[ticketId].length + 1,
      name: 'Omar Ayman',
      posted: 'Posted on ' + new Date().toLocaleDateString(),
      text: comment.text,
    };
    this.ticketComments[ticketId].push(newComment);
  }
}
