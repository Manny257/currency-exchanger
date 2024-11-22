import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}
  fromCurrency: string = '';
  toCurrency: string = '';

  ngOnInit() {
    this.fromCurrency =
      this.activatedRoute.snapshot.queryParams['fromCurrency'];
    this.toCurrency = this.activatedRoute.snapshot.queryParams['toCurrency'];
  }
}
