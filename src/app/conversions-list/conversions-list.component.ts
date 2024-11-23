import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-conversions-list',
  standalone: true,
  imports: [],
  templateUrl: './conversions-list.component.html',
  styleUrl: './conversions-list.component.scss',
})
export class ConversionsListComponent implements OnInit {
  @Input() fromCurrency: string = '';
  @Input() toCurrency: string = '';
  amountsList = [1, 25, 50, 100];
  latestRate = 2;

  constructor(private dataService: DataService) {}
  ngOnInit() {
    // this.dataService
    //   .getLatestRate(this.fromCurrency, this.toCurrency)
    //   .then((rate) => {
    //     this.latestRate = rate;
    //   });
  }
}
