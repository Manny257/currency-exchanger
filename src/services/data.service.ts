import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  convertResponse,
  currenciesResponse,
  currency,
  latestRateResponse,
} from '../models/currencies.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  private readonly API_KEY = 'a77357b425c1dcad9399870709b31192';

  currenciesEndPoint = `http://data.fixer.io/api/symbols?access_key=${this.API_KEY}`;
  convertEndPoint = `http://data.fixer.io/api/convert?access_key=${this.API_KEY}`;
  latestRateEndPoint = `https://data.fixer.io/api/latest?access_key=${this.API_KEY}`;

  fromCurrency = new BehaviorSubject<currency | null>(null);
  toCurrency = new BehaviorSubject<currency | null>(null);
  getCurrencies() {
    return new Promise<currency[]>((resolve, reject) => {
      this.http
        .get<currenciesResponse>(this.currenciesEndPoint)
        .subscribe((response) => {
          if (response.success) {
            const currenciesList: currency[] = [];
            Object.entries(response.symbols).forEach((entry) => {
              let currencyObj: currency = {
                symbol: entry[0],
                fullName: entry[1],
              };
              currenciesList.push(currencyObj);
            });
            resolve(currenciesList);
          } else reject('data not found');
        });
    });
  }

  convertCurrencies(fromCurrency: string, toCurreny: string, amount: number) {
    return new Promise<number>((resolve, reject) => {
      const params = new HttpParams()
        .set('from', fromCurrency)
        .set('to', toCurreny)
        .set('amount', amount);
      console.log('endPoint: ', this.convertEndPoint);
      this.http
        .get<convertResponse>(this.convertEndPoint, { params })
        .subscribe((response) => {
          if (response.success) {
            resolve(response.result);
          } else reject('data not found');
        });
    });
  }

  getLatestRate(base: string, symbols: string) {
    return new Promise<{ [key: string]: number }>((resolve, reject) => {
      const params = new HttpParams().set('base', base).set('symbols', symbols);
      this.http
        .get<latestRateResponse>(this.latestRateEndPoint, { params })
        .subscribe((response) => {
          if (response.success) {
            resolve(response.rates);
          } else reject('data not found');
        });
    });
  }
}
