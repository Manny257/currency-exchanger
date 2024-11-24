import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExchangeComponent } from '../exchange/exchange.component';
import { Router } from '@angular/router';
import { ConversionsListComponent } from '../conversions-list/conversions-list.component';
import { DataService } from '../../services/data.service';
import { currency } from '../../models/currencies.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ExchangeComponent, ConversionsListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private dataService: DataService) {}
  fromCurrency!: currency | null;
  toCurrency!: currency | null;
  fromCurrencySubscription!: Subscription;
  toCurrencySubscription!: Subscription;
  fixedAmountsList: number[] = [1, 25, 50, 100];

  ngOnInit() {
    this.fromCurrencySubscription = this.dataService.fromCurrency.subscribe(
      (currency) => {
        this.fromCurrency = currency;
      }
    );

    this.toCurrencySubscription = this.dataService.toCurrency.subscribe(
      (currency) => {
        this.toCurrency = currency;
      }
    );
  }

  openDetailsPage() {
    this.router.navigate(['/details']);
  }

  ngOnDestroy() {
    this.fromCurrencySubscription.unsubscribe();
    this.toCurrencySubscription.unsubscribe();
  }
}
