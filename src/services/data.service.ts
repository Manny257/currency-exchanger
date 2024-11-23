import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  convertResponse,
  currenciesResponse,
  currency,
  latestRateResponse,
} from '../models/currencies.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  readonly API_KEY = 'a77357b425c1dcad9399870709b31192';
  currenciesEndPoint = `http://data.fixer.io/api/symbols?access_key=${this.API_KEY}`;
  convertEndPoint = `http://data.fixer.io/api/convert?access_key=${this.API_KEY}`;
  latestRateEndPoint = `https://data.fixer.io/api/latest?access_key=${this.API_KEY}`;
  getCurrencies() {
    return new Promise((resolve, reject) => {
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

  getLatestRate(base: string, symbol: string) {
    return new Promise<number>((resolve, reject) => {
      const params = new HttpParams().set('base', base).set('symbols', symbol);
      this.http
        .get<latestRateResponse>(this.latestRateEndPoint, { params })
        .subscribe((response) => {
          if (response.success) {
            resolve(response.rates[symbol]);
          } else reject('data not found');
        });
    });
  }
}
