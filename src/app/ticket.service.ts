import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'http://localhost:3000'; // Adjust to your Nest.js API URL

  constructor(private http: HttpClient) { }

  // Fetch all tickets
  getTickets(): Observable<TicketData[]> {
    return this.http.get<TicketData[]>(`${this.apiUrl}/tickets`);
  }

  // Fetch a specific ticket by ID
  getTicket(id: number): Observable<TicketData> {
    return this.http.get<TicketData>(`${this.apiUrl}/tickets/${id}`);
  }

  // Fetch comments for a specific ticket
  getComments(ticketId: number): Observable<CommentData[]> {
    return this.http.get<CommentData[]>(`${this.apiUrl}/tickets/${ticketId}/comments`);
  }

  addTickets(ticket: TicketData): Observable<TicketData> {
    return this.http.post<TicketData>(`${this.apiUrl}/tickets`, ticket);
  }

  // Add a new comment
  addComment(ticketId: number, comment: CommentData): Observable<CommentData> {
    return this.http.post<CommentData>(`${this.apiUrl}/tickets/${ticketId}/comments`, comment);
  }
}