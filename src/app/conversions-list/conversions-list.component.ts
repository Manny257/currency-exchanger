import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { currency, latestRateResponse } from '../../models/currencies.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-conversions-list',
  standalone: true,
  imports: [],
  templateUrl: './conversions-list.component.html',
  styleUrl: './conversions-list.component.scss',
})
export class ConversionsListComponent implements OnInit, OnDestroy {
  fromCurrency!: currency | null;
  toCurrency!: currency | null;
  @Input() amountsList: number[] = [];
  @Input() currenciesList: string[] = [];
  latestRate: { [key: string]: number } = {
    USD: 2,
    EUR: 3,
    AUD: 1.5,
    CAD: 2.5,
  };
  fromCurrencySubscribtion!: Subscription;
  toCurrencySubscribtion!: Subscription;

  constructor(private dataService: DataService) {}
  ngOnInit() {
    this.getLatestRate();
    this.fromCurrencySubscribtion = this.dataService.fromCurrency.subscribe(
      (currency) => {
        this.fromCurrency = currency;
      }
    );
    this.toCurrencySubscribtion = this.dataService.toCurrency.subscribe(
      (currency) => {
        this.toCurrency = currency;
      }
    );
  }

  getLatestRate() {
    let symbols = '';
    if (this.currenciesList.length > 0) {
      symbols = this.currenciesList.toString();
    } else {
      symbols = this.toCurrency?.symbol ? this.toCurrency?.symbol : '';
    }
    // this.dataService
    //   .getLatestRate(this.fromCurrency, symbols)
    //   .then((rates) => {
    //     this.latestRate = rates;
    //   });
  }

  ngOnDestroy() {
    this.fromCurrencySubscribtion.unsubscribe();
    this.toCurrencySubscribtion.unsubscribe();
  }
}
