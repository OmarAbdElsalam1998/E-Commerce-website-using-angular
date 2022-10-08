import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title="Sign IN";
  constructor(private titleService:Title) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }

}
