import { Component } from '@angular/core';
import { ExchangeComponent } from '../exchange/exchange.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ExchangeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private router: Router) {}
  fromCurrency: string = '';
  toCurrency: string = '';
  changeFromCurrency(value: string) {
    this.fromCurrency = value;
  }
  changeToCurrency(value: string) {
    this.toCurrency = value;
  }

  openDetailsPage() {
    this.router.navigate(['/details'], {
      queryParams: {
        fromCurrency: this.fromCurrency,
        toCurrency: this.toCurrency,
      },
    });
  }
}
