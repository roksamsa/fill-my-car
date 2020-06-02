import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-trips-page',
  templateUrl: './trips-page.component.html',
  styleUrls: ['./trips-page.component.scss']
})
export class TripsPageComponent implements OnInit {

  tileTitle = 'Moja potovanja';

  constructor(private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle(this.tileTitle);
  }
}
