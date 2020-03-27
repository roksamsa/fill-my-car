import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateVehicleDialogComponent } from '../../dialogs/create-vehicle-dialog/create-vehicle-dialog.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-vehicles-page',
  templateUrl: './vehicles-page.component.html',
  styleUrls: ['./vehicles-page.component.scss']
})

export class VehiclesPageComponent implements OnInit {

  dialogResult = '';
  tileTitle = 'Moja vozila';
  tileHeadlineAddButtonTooltipText = 'Dodaj novo vozilo';

  constructor(private popupVehicle: MatDialog,
              private titleService: Title) {}

    ngOnInit() {
      this.titleService.setTitle(this.tileTitle);
    }

  // Add dialog popup
  openAddDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.width = '600px';
    dialogConfig.position = {
      top: '100px'
    };

    const dialogRef = this.popupVehicle.open(CreateVehicleDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.dialogResult = result;
    });
  }
}
