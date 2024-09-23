import { Injectable } from '@angular/core';
import axios from 'axios';

export interface TicketData {
  _id?: string;
  name: string;
  subject?: string;
  priority: string;
  dat: string;
  email: string;
  tel: string;
  problem?: string;
  image?: string;
  comments?: CommentData[];
}

export interface CommentData {
  _id?: string; // MongoDB will generate an _id for comments
  name: string;
  posted: string;
  text: string;
  ticketId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'http://localhost:4000'; // Adjust to your Nest.js API URL

  constructor() {}

  // Fetch all tickets
  async getTickets(): Promise<TicketData[]> {
    try {
      const response = await axios.get(`${this.apiUrl}/tickets`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tickets:', error);
      return [];
    }
  }

  // Fetch a specific ticket by ID (including comments)
  async getTicket(id: string): Promise<TicketData> {
    try {
      const response = await axios.get(`${this.apiUrl}/tickets/${id}`);
      console.log('API Response:', response.data); // Debug to check API response
      return response.data;
    } catch (error) {
      console.error('Error fetching ticket:', error);
      return {
        name: '',
        subject: '',
        priority: '',
        dat: '',
        email: '',
        tel: '',
        problem: '',
        image: ''
      };
    }
  }

  // Fetch comments for a specific ticket
  async getComments(ticketId: string): Promise<CommentData[]> {
    try {
      const response = await axios.get(`${this.apiUrl}/tickets/${ticketId}/comments`);
      return response.data; // Make sure the API returns the comments in the expected format
    } catch (error) {
      console.error('Error fetching comments:', error);
      return []; // Return an empty array on error
    }
  }

  // Add a new comment
  async addComment(ticketId: string, comment: CommentData): Promise<CommentData> {
    try {
      const response = await axios.post(`${this.apiUrl}/tickets/${ticketId}/comments`, comment);
      return response.data;
    } catch (error) {
      console.error('Error adding comment:', error);
      return { name: '', text: '', posted: '' }; // Return a default comment structure
    }
  }

  // Add a new ticket
  async addTickets(ticket: TicketData): Promise<TicketData> {
    try {
      const response = await axios.post(`${this.apiUrl}/tickets`, ticket);
      return response.data;
    } catch (error) {
      console.error('Error adding ticket:', error);
      return {
        name: '',
        image: '',
        email: '',
        tel: '',
        priority: '',
        dat: '',
      };
    }
  }
}
