import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  title="payment";
  constructor(private titleService:Title,private router:Router) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);

  }
}
