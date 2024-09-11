import { Routes } from '@angular/router';
import { TicketsComponent } from './tickets/tickets.component';
import { ChatComponent } from './chat/chat.component';
import { UMComponent } from './um/um.component';
import { TicketInfoComponent } from './ticket-info/ticket-info.component';
import { NewTicketComponent } from './new-ticket/new-ticket.component';

export const routes: Routes = [ 
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },  // Directly set the default path to the component
    { path: 'dashboard', component: UMComponent },
    { path: 'tickets', component: TicketsComponent },
    { path: 'chat', component: ChatComponent },
    { path: 'um', component: UMComponent },
    {path:'tickets/create',component:NewTicketComponent},
    {path:'tickets/:id',component:TicketInfoComponent},
   
    // { path: '**', redirectTo: '/dashboard' } // Redirect to default path for any unknown routes
    ];
