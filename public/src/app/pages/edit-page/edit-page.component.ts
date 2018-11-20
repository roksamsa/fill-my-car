import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../core/vehicle.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
  }

}
