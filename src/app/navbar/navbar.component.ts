import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  currentRoute: string = '';
  pageTitle: string = 'Dashboard'; // Default title, can be updated based on route

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.currentRoute = this.router.url;
        this.updatePageTitle();
      });
  }

  updatePageTitle(): void {
    // Update this based on your routes
    switch (this.currentRoute) {
      case '':
        this.pageTitle = 'Dashboard';
        break;
      case '/tickets':
        this.pageTitle = 'Tickets';
        break;
      case '/chat':
        this.pageTitle = 'Chat';
        break;
      case '/um':
        this.pageTitle = 'UM';
        break;
   
      default:
        if(this.currentRoute.includes("create")){
          this.pageTitle= 'Create Ticket'
        }else if(this.currentRoute.includes("tickets/")){
          this.pageTitle= 'Ticket Info';
        }
        else{
        this.pageTitle = 'Dashboard'; // Set a default title
    }
  }
  }
}
