import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
  DateAdapter,
  MatToolbarModule,
  MAT_LABEL_GLOBAL_OPTIONS,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatRadioModule,
  MatTooltipModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatAutocompleteModule,
  MatNativeDateModule,
  NativeDateModule,
  MatDatepickerModule,
  MatStepperModule,
  MatSlideToggleModule,
  MatDividerModule,
  MatCheckboxModule,
  MatSnackBarModule
} from '@angular/material';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VehicleService } from './core/vehicle/vehicle.service';
import { HeaderService } from '../app/components/header/header.service';
import { VehicleTileService } from '../app/components/vehicle-tile/vehicle-tile.service';
import { UserMenuService } from '../app/components/user-menu/user-menu.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { CreateVehicleDialogComponent } from './dialogs/create-vehicle-dialog/create-vehicle-dialog.component';
import { EditVehicleDialogComponent } from './dialogs/edit-vehicle-dialog/edit-vehicle-dialog.component';
import { CreateTripDialogComponent } from './dialogs/create-trip-dialog/create-trip-dialog.component';
import { EditTripDialogComponent } from './dialogs/edit-trip-dialog/edit-trip-dialog.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ContentComponent } from './components/content/content.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { UserComponent } from './components/user/user.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService } from './core/auth/auth.service';
import { UserService } from './core/user/user.service';
import { environment } from '../environments/environment';
import { VehiclesPageComponent } from './pages/vehicles-page/vehicles-page.component';
import { TripsPageComponent } from './pages/trips-page/trips-page.component';
import { TripPageComponent } from './pages/trip-page/trip-page.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthGuard } from './core/auth/auth.guard';
import { SecureInnerPagesGuard } from './core/auth/secure-inner-pages.guard';
import { NavigationMainComponent } from './components/navigation-main/navigation-main.component';
import { TileComponent } from './components/tile/tile.component';
import { VehicleTileComponent } from './components/vehicle-tile/vehicle-tile.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { ClickOutsideDirective } from './core/other/click-outside.directive';
import { AppLongPressDirective } from './core/other/long-press.directive';
import { TripsListComponent } from './components/trips-list/trips-list.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { EmptyDataComponent } from './components/empty-data/empty-data.component';
import { HereMapsComponent } from './components/here-maps/here-maps.component';
import { PreloadingSpinnerComponent } from './components/preloading-spinner/preloading-spinner.component';
import { NumberPickerComponent } from './components/number-picker/number-picker.component';
import { InfoBoxComponent } from './components/info-box/info-box.component';
import { MomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { registerLocaleData } from '@angular/common';
import localeSl from '@angular/common/locales/sl';
import { VehicleSeatsComponent } from './components/vehicle-seats/vehicle-seats.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { WithoutHeaderFooterLayoutComponent } from './layouts/without-header-footer-layout/without-header-footer-layout.component';
import { LoginRegisterContentComponent } from './components/login-register-content/login-register-content.component';
/*import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";*/

registerLocaleData(localeSl);

const routes: Routes = [
  { path: 'nadzorna-plosca', component: DefaultLayoutComponent, children: [{
    path: '', component: DashboardPageComponent}], canActivate: [AuthGuard] },
  { path: 'registracija', component: WithoutHeaderFooterLayoutComponent, children: [{
    path: '', component: RegisterComponent}], canActivate: [SecureInnerPagesGuard] },
  { path: 'prijava', component: WithoutHeaderFooterLayoutComponent, children: [{
    path: '', component: LoginPageComponent}], canActivate: [SecureInnerPagesGuard]},
  { path: 'moja-vozila', component: DefaultLayoutComponent, children: [{
    path: '', component: VehiclesPageComponent}], canActivate: [AuthGuard] },
  { path: 'moja-potovanja', component: DefaultLayoutComponent, children: [{
    path: '', component: TripsPageComponent}], canActivate: [AuthGuard] },
  { path: 'potovanje/:id', component: DefaultLayoutComponent, children: [{
    path: '', component: TripPageComponent}], pathMatch: 'full' },
  { path: 'uporabnik/:id', component: DefaultLayoutComponent, children: [{
    path: '', component: UserPageComponent}], pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '', redirectTo: 'nadzorna-plosca', pathMatch: 'full' },
  { path: '**', component: LoginPageComponent }
];

const dateFormatParse = 'DD. MMMM YYYY';
const dateFormatDisplay = 'dddd, DD. MMMM YYYY';

export const MY_FORMATS = {
  parse: {
    dateInput: dateFormatParse,
  },
  display: {
    dateInput: dateFormatDisplay,
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: dateFormatDisplay,
    monthYearA11yLabel: 'MM YYYY',
  },
};

/*const socialPluginConfig = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('2203659926599837')
  }
]);*/

/*export function provideSocialPluginConfig() {
  return socialPluginConfig;
}*/

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardPageComponent,
    CreateVehicleDialogComponent,
    EditVehicleDialogComponent,
    CreateTripDialogComponent,
    EditTripDialogComponent,
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    TripsPageComponent,
    UserComponent,
    VehiclesPageComponent,
    UserPageComponent,
    ContentComponent,
    TripPageComponent,
    VehicleListComponent,
    LoginPageComponent,
    NavigationMainComponent,
    TileComponent,
    VehicleTileComponent,
    UserMenuComponent,
    ClickOutsideDirective,
    AppLongPressDirective,
    TripsListComponent,
    EmptyDataComponent,
    HereMapsComponent,
    PreloadingSpinnerComponent,
    NumberPickerComponent,
    InfoBoxComponent,
    VehicleSeatsComponent,
    DefaultLayoutComponent,
    WithoutHeaderFooterLayoutComponent,
    LoginRegisterContentComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(routes),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatStepperModule,
    MatSlideToggleModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    NativeDateModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatDialogModule,
    /*SocialLoginModule,*/
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
    UserMenuService,
    VehicleTileService,
    MatDatepickerModule,
    AuthGuard,
    { provide: FirestoreSettingsToken, useValue: {} },
    { provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: 'never' } },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: LOCALE_ID, useValue: 'sl-SI' },
    /*{ provide: AuthServiceConfig,  useFactory: provideSocialPluginConfig }*/
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CreateVehicleDialogComponent,
    CreateTripDialogComponent,
    EditTripDialogComponent,
    EditVehicleDialogComponent
  ],
})

export class AppModule { }
