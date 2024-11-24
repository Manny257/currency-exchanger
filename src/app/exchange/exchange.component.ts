import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DataService } from '../../services/data.service';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { currency } from '../../models/currencies.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-exchange',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './exchange.component.html',
  styleUrl: './exchange.component.scss',
})
export class ExchangeComponent implements OnInit, OnDestroy {
  @Input() defaultFromCurrency: currency = {
    symbol: 'USD',
    fullName: 'US Dollar',
  };
  @Input() defaultToCurrency: currency = { symbol: 'EUR', fullName: 'Euro' };
  currenciesList: currency[] = [];
  fromCurrencySubscription!: Subscription;
  toCurrencySubscription!: Subscription;
  form = new FormGroup({
    fromCurrency: new FormControl('', [Validators.required]),
    fromAmount: new FormControl<number>(1, [
      Validators.required,
      Validators.min(0),
    ]),
    toCurrency: new FormControl('', [Validators.required]),
    toAmount: new FormControl<number | null>({ value: null, disabled: true }, [
      Validators.required,
      Validators.min(0),
    ]),
  });
  response = {
    success: true,
    symbols: {
      AED: 'United Arab Emirates Dirham',
      AFN: 'Afghan Afghani',
      ALL: 'Albanian Lek',
      AMD: 'Armenian Dram',
      ANG: 'Netherlands Antillean Guilder',
      AOA: 'Angolan Kwanza',
      ARS: 'Argentine Peso',
      AUD: 'Australian Dollar',
      AWG: 'Aruban Florin',
      AZN: 'Azerbaijani Manat',
      BAM: 'Bosnia-Herzegovina Convertible Mark',
      BBD: 'Barbadian Dollar',
      BDT: 'Bangladeshi Taka',
      BGN: 'Bulgarian Lev',
      BHD: 'Bahraini Dinar',
      BIF: 'Burundian Franc',
      BMD: 'Bermudan Dollar',
      BND: 'Brunei Dollar',
      BOB: 'Bolivian Boliviano',
      BRL: 'Brazilian Real',
      BSD: 'Bahamian Dollar',
      BTC: 'Bitcoin',
      BTN: 'Bhutanese Ngultrum',
      BWP: 'Botswanan Pula',
      BYN: 'New Belarusian Ruble',
      BYR: 'Belarusian Ruble',
      BZD: 'Belize Dollar',
      CAD: 'Canadian Dollar',
      CDF: 'Congolese Franc',
      CHF: 'Swiss Franc',
      CLF: 'Chilean Unit of Account (UF)',
      CLP: 'Chilean Peso',
      CNY: 'Chinese Yuan',
      CNH: 'Chinese Yuan Offshore',
      COP: 'Colombian Peso',
      CRC: 'Costa Rican Colón',
      CUC: 'Cuban Convertible Peso',
      CUP: 'Cuban Peso',
      CVE: 'Cape Verdean Escudo',
      CZK: 'Czech Republic Koruna',
      DJF: 'Djiboutian Franc',
      DKK: 'Danish Krone',
      DOP: 'Dominican Peso',
      DZD: 'Algerian Dinar',
      EGP: 'Egyptian Pound',
      ERN: 'Eritrean Nakfa',
      ETB: 'Ethiopian Birr',
      EUR: 'Euro',
      FJD: 'Fijian Dollar',
      FKP: 'Falkland Islands Pound',
      GBP: 'British Pound Sterling',
      GEL: 'Georgian Lari',
      GGP: 'Guernsey Pound',
      GHS: 'Ghanaian Cedi',
      GIP: 'Gibraltar Pound',
      GMD: 'Gambian Dalasi',
      GNF: 'Guinean Franc',
      GTQ: 'Guatemalan Quetzal',
      GYD: 'Guyanaese Dollar',
      HKD: 'Hong Kong Dollar',
      HNL: 'Honduran Lempira',
      HRK: 'Croatian Kuna',
      HTG: 'Haitian Gourde',
      HUF: 'Hungarian Forint',
      IDR: 'Indonesian Rupiah',
      ILS: 'Israeli New Sheqel',
      IMP: 'Manx pound',
      INR: 'Indian Rupee',
      IQD: 'Iraqi Dinar',
      IRR: 'Iranian Rial',
      ISK: 'Icelandic Króna',
      JEP: 'Jersey Pound',
      JMD: 'Jamaican Dollar',
      JOD: 'Jordanian Dinar',
      JPY: 'Japanese Yen',
      KES: 'Kenyan Shilling',
      KGS: 'Kyrgystani Som',
      KHR: 'Cambodian Riel',
      KMF: 'Comorian Franc',
      KPW: 'North Korean Won',
      KRW: 'South Korean Won',
      KWD: 'Kuwaiti Dinar',
      KYD: 'Cayman Islands Dollar',
      KZT: 'Kazakhstani Tenge',
      LAK: 'Laotian Kip',
      LBP: 'Lebanese Pound',
      LKR: 'Sri Lankan Rupee',
      LRD: 'Liberian Dollar',
      LSL: 'Lesotho Loti',
      LTL: 'Lithuanian Litas',
      LVL: 'Latvian Lats',
      LYD: 'Libyan Dinar',
      MAD: 'Moroccan Dirham',
      MDL: 'Moldovan Leu',
      MGA: 'Malagasy Ariary',
      MKD: 'Macedonian Denar',
      MMK: 'Myanma Kyat',
      MNT: 'Mongolian Tugrik',
      MOP: 'Macanese Pataca',
      MRU: 'Mauritanian Ouguiya',
      MUR: 'Mauritian Rupee',
      MVR: 'Maldivian Rufiyaa',
      MWK: 'Malawian Kwacha',
      MXN: 'Mexican Peso',
      MYR: 'Malaysian Ringgit',
      MZN: 'Mozambican Metical',
      NAD: 'Namibian Dollar',
      NGN: 'Nigerian Naira',
      NIO: 'Nicaraguan Córdoba',
      NOK: 'Norwegian Krone',
      NPR: 'Nepalese Rupee',
      NZD: 'New Zealand Dollar',
      OMR: 'Omani Rial',
      PAB: 'Panamanian Balboa',
      PEN: 'Peruvian Nuevo Sol',
      PGK: 'Papua New Guinean Kina',
      PHP: 'Philippine Peso',
      PKR: 'Pakistani Rupee',
      PLN: 'Polish Zloty',
      PYG: 'Paraguayan Guarani',
      QAR: 'Qatari Rial',
      RON: 'Romanian Leu',
      RSD: 'Serbian Dinar',
      RUB: 'Russian Ruble',
      RWF: 'Rwandan Franc',
      SAR: 'Saudi Riyal',
      SBD: 'Solomon Islands Dollar',
      SCR: 'Seychellois Rupee',
      SDG: 'South Sudanese Pound',
      SEK: 'Swedish Krona',
      SGD: 'Singapore Dollar',
      SHP: 'Saint Helena Pound',
      SLE: 'Sierra Leonean Leone',
      SLL: 'Sierra Leonean Leone',
      SOS: 'Somali Shilling',
      SRD: 'Surinamese Dollar',
      STD: 'São Tomé and Príncipe Dobra',
      SVC: 'Salvadoran Colón',
      SYP: 'Syrian Pound',
      SZL: 'Swazi Lilangeni',
      THB: 'Thai Baht',
      TJS: 'Tajikistani Somoni',
      TMT: 'Turkmenistani Manat',
      TND: 'Tunisian Dinar',
      TOP: 'Tongan Paʻanga',
      TRY: 'Turkish Lira',
      TTD: 'Trinidad and Tobago Dollar',
      TWD: 'New Taiwan Dollar',
      TZS: 'Tanzanian Shilling',
      UAH: 'Ukrainian Hryvnia',
      UGX: 'Ugandan Shilling',
      USD: 'United States Dollar',
      UYU: 'Uruguayan Peso',
      UZS: 'Uzbekistan Som',
      VEF: 'Venezuelan Bolívar Fuerte',
      VES: 'Sovereign Bolivar',
      VND: 'Vietnamese Dong',
      VUV: 'Vanuatu Vatu',
      WST: 'Samoan Tala',
      XAF: 'CFA Franc BEAC',
      XAG: 'Silver (troy ounce)',
      XAU: 'Gold (troy ounce)',
      XCD: 'East Caribbean Dollar',
      XDR: 'Special Drawing Rights',
      XOF: 'CFA Franc BCEAO',
      XPF: 'CFP Franc',
      YER: 'Yemeni Rial',
      ZAR: 'South African Rand',
      ZMK: 'Zambian Kwacha (pre-2013)',
      ZMW: 'Zambian Kwacha',
      ZWL: 'Zimbabwean Dollar',
    },
  };

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getCurrencies().then((currenciesList) => {
      this.currenciesList = [...currenciesList];
    });
    this.subscribeToCurrencyChanges();
    this.setDefaultValues();
    this.convertCurrency();
  }

  subscribeToCurrencyChanges() {
    this.fromCurrencySubscription =
      this.form.controls.fromCurrency.valueChanges.subscribe((value) => {
        let selectedCurrency = this.currenciesList.find(
          (currency) => currency.symbol == value
        );
        if (selectedCurrency) {
          this.dataService.fromCurrency.next(selectedCurrency);
        }
      });
    this.toCurrencySubscription =
      this.form.controls.toCurrency.valueChanges.subscribe((value) => {
        let selectedCurrency = this.currenciesList.find(
          (currency) => currency.symbol == value
        );
        if (selectedCurrency) {
          this.dataService.toCurrency.next(selectedCurrency);
        }
      });
  }

  setDefaultValues() {
    this.form.controls.fromCurrency.setValue(this.defaultFromCurrency.symbol);
    this.form.controls.toCurrency.setValue(this.defaultToCurrency.symbol);
  }

  swapValues() {
    const toCurreny = this.form.controls.toCurrency.value;
    const fromCurreny = this.form.controls.fromCurrency.value;
    this.form.controls.fromCurrency.setValue(toCurreny);
    this.form.controls.toCurrency.setValue(fromCurreny);
    this.convertCurrency();
  }

  convertCurrency() {
    const fromCurreny = this.form.controls.fromCurrency.value;
    const toCurreny = this.form.controls.toCurrency.value;
    const fromAmount = this.form.controls.fromAmount.value;
    const toAmountControl = this.form.controls.toAmount;
    if (fromCurreny && toCurreny && fromAmount) {
      //uncomment to get data from API
      // this.dataService
      //   .convertCurrencies(fromCurreny, toCurreny, fromAmount)
      //   .then((convertedValue) => {
      toAmountControl.setValue(1.08 * fromAmount); // });
    }
  }

  handleFromCurrencyChange(value: currency) {
    this.dataService.fromCurrency.next(value);
  }

  handleToCurrencyChange(value: currency) {
    this.dataService.toCurrency.next(value);
  }

  ngOnDestroy() {
    this.fromCurrencySubscription.unsubscribe();
    this.toCurrencySubscription.unsubscribe();
  }
}
