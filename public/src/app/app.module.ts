import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatTooltipModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatDialogModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatDividerModule,
  MatCheckboxModule,
  MatSnackBarModule } from '@angular/material';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VehicleService } from './core/vehicle/vehicle.service';
import { HeaderService } from '../app/components/header/header.service';
import { VehicleTileService } from '../app/components/vehicle-tile/vehicle-tile.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { CreateVehicleDialogComponent } from './dialogs/create-vehicle-dialog/create-vehicle-dialog.component';
import { EditVehicleDialogComponent } from './dialogs/edit-vehicle-dialog/edit-vehicle-dialog.component';
import { CreateTripDialogComponent } from './dialogs/create-trip-dialog/create-trip-dialog.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ContentComponent } from './components/content/content.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { UserComponent } from './components/user/user.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FirestoreSettingsToken} from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService } from './core/auth/auth.service';
import { UserService } from './core/user/user.service';
import { environment } from '../environments/environment';
import { VehiclesPageComponent } from './pages/vehicles-page/vehicles-page.component';
import { TripsPageComponent } from './pages/trips-page/trips-page.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthGuard } from './core/auth/auth.guard';
import { SecureInnerPagesGuard } from './core/auth/secure-inner-pages.guard';
import { NavigationMainComponent } from './components/navigation-main/navigation-main.component';
import { TileComponent } from './components/tile/tile.component';
import { VehicleTileComponent } from './components/vehicle-tile/vehicle-tile.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { ClickOutsideDirective } from './click-outside.directive';
import { TripsListComponent } from './components/trips-list/trips-list.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { EmptyDataComponent } from './components/empty-data/empty-data.component';
import { MapBoxComponent } from './components/map-box/map-box.component';

const routes: Routes = [
  { path: 'edit/:id', component: EditVehicleDialogComponent, canActivate: [AuthGuard] },
  { path: 'nadzorna-plosca', component: DashboardPageComponent, canActivate: [AuthGuard] },
  { path: 'registracija', component: RegisterComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'prijava', component: LoginPageComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'moja-vozila', component: VehiclesPageComponent, canActivate: [AuthGuard] },
  { path: 'moja-potovanja', component: TripsPageComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserPageComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'nadzorna-plosca', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardPageComponent,
    CreateVehicleDialogComponent,
    CreateTripDialogComponent,
    EditVehicleDialogComponent,
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    TripsPageComponent,
    UserComponent,
    VehiclesPageComponent,
    UserPageComponent,
    ContentComponent,
    TripsPageComponent,
    VehicleListComponent,
    LoginPageComponent,
    NavigationMainComponent,
    TileComponent,
    VehicleTileComponent,
    UserMenuComponent,
    ClickOutsideDirective,
    TripsListComponent,
    EmptyDataComponent,
    MapBoxComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatDialogModule,
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1Ijoicm9rc2Ftc2EiLCJhIjoiY2p2OG5nOW9pMGdqYjQwcGYwZHVqdTRtcCJ9.IMNFrJwAlUTvKNhl_luspw',
      geocoderAccessToken: 'pk.eyJ1Ijoicm9rc2Ftc2EiLCJhIjoiY2p2OG5nOW9pMGdqYjQwcGYwZHVqdTRtcCJ9.IMNFrJwAlUTvKNhl_luspw'
    })
  ],
  providers: [
    VehicleService,
    AuthService,
    UserService,
    HeaderService,
    VehicleTileService,
    MatDatepickerModule,
    AuthGuard,
    {provide: FirestoreSettingsToken, useValue: {}}
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CreateVehicleDialogComponent,
    CreateTripDialogComponent
  ],
})

export class AppModule { }
