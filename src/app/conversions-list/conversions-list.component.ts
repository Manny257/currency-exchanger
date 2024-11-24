import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { currency } from '../../models/currencies.model';
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
  @Input() amountsList = [1, 25, 50, 100];
  @Input() currenciesList = ['USD', 'EUR', 'AUD', 'CAD'];
  latestRate = 2;
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
    // this.dataService
    //   .getLatestRate(this.fromCurrency, this.toCurrency)
    //   .then((rate) => {
    //     this.latestRate = rate;
    //   });
  }

  ngOnDestroy() {
    this.fromCurrencySubscribtion.unsubscribe();
    this.toCurrencySubscribtion.unsubscribe();
  }
}
