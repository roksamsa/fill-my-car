import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateVehicleDialogComponent } from '../../dialogs/create-vehicle-dialog/create-vehicle-dialog.component';

@Component({
  selector: 'app-vehicles-page',
  templateUrl: './vehicles-page.component.html',
  styleUrls: ['./vehicles-page.component.scss']
})

export class VehiclesPageComponent {

  dialogResult = '';
  tileTitle = 'Moja vozila';
  tileHeadlineAddButtonTooltipText = 'Dodaj novo vozilo';

  constructor(private popupVehicle: MatDialog) { }

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
