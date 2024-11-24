import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  sideMenuOpen: boolean = false;
  cartItemsCount: number = 0;

  constructor(private router: Router) {}

  openCloseMenu() {
    this.sideMenuOpen = !this.sideMenuOpen;
  }
  redirectToHome() {
    this.router.navigate(['/home']);
  }
}
