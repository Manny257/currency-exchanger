import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExchangeComponent } from '../exchange/exchange.component';
import { ConversionsListComponent } from '../conversions-list/conversions-list.component';
import { currency } from '../../models/currencies.model';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ExchangeComponent, ConversionsListComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private dataService: DataService) {}
  @ViewChild('exchangeComponent') exchangeComponent: ExchangeComponent | null =
    null;
  fromCurrency!: currency;
  toCurrency!: currency;
  fromCurrencySubscribtion!: Subscription;
  toCurrencySubscribtion!: Subscription;

  ngOnInit() {
    this.fromCurrencySubscribtion = this.dataService.fromCurrency.subscribe(
      (currency) => {
        if (currency) this.fromCurrency = currency;
      }
    );
    this.toCurrencySubscribtion = this.dataService.toCurrency.subscribe(
      (currency) => {
        if (currency) this.toCurrency = currency;
      }
    );
  }
  ngAfterViewInit() {
    this.exchangeComponent?.form.controls.fromCurrency.disable();
  }

  ngOnDestroy() {
    this.fromCurrencySubscribtion.unsubscribe();
    this.toCurrencySubscribtion.unsubscribe();
  }
}
