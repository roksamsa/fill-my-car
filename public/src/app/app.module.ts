import { BrowserModule, Title } from '@angular/platform-browser';
import {
  NgModule,
  LOCALE_ID } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VehicleService } from './core/vehicle/vehicle.service';
import { VehicleSeatsService } from '../app/components/vehicle-seats/vehicle-seats.service';
import { NumberPickerService } from '../app/components/number-picker/number-picker.service';
import { HeaderService } from '../app/components/header/header.service';
import { LoginService } from '../app/components/login/login.service';
import { VehicleTileService } from '../app/components/vehicle-tile/vehicle-tile.service';
import { UserMenuService } from '../app/components/user-menu/user-menu.service';
import { WebpageMenuService } from '../app/webpage/components/webpage-menu/webpage-menu.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { WebpageHeaderComponent } from './webpage/components/webpage-header/webpage-header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { CreateVehicleDialogComponent } from './dialogs/create-vehicle-dialog/create-vehicle-dialog.component';
import { EditVehicleDialogComponent } from './dialogs/edit-vehicle-dialog/edit-vehicle-dialog.component';
import { CreateTripDialogComponent } from './dialogs/create-trip-dialog/create-trip-dialog.component';
import { EditTripDialogComponent } from './dialogs/edit-trip-dialog/edit-trip-dialog.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ContentComponent } from './style/content/content.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { UserComponent } from './components/user/user.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FirebaseAuthService } from './core/auth/auth.service';
import { UserService } from './core/user/user.service';
import { environment } from '../environments/environment';
import { VehiclesPageComponent } from './pages/vehicles-page/vehicles-page.component';
import { TripsPageComponent } from './pages/trips-page/trips-page.component';
import { TripPageComponent } from './pages/trip-page/trip-page.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { AuthGuard } from './core/auth/auth.guard';
import { SecureInnerPagesGuard } from './core/auth/secure-inner-pages.guard';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { TileTitleTopComponent } from './components/tile-title-top/tile-title-top.component';
import { VehicleTileComponent } from './components/vehicle-tile/vehicle-tile.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { ClickOutsideDirective } from './core/other/click-outside.directive';
import { CopyClipboardModule } from './core/other/copy-clipboard.module';
import { AppLongPressDirective } from './core/other/long-press.directive';
import { TripsListComponent } from './components/trips-list/trips-list.component';
import { EmptyDataComponent } from './components/empty-data/empty-data.component';
import { HereMapsComponent } from './components/here-maps/here-maps.component';
import { PreloadingSpinnerComponent } from './components/preloading-spinner/preloading-spinner.component';
import { NumberPickerComponent } from './components/number-picker/number-picker.component';
import { InfoBoxComponent } from './components/info-box/info-box.component';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { registerLocaleData, DatePipe } from '@angular/common';
import { VehicleSeatsComponent } from './components/vehicle-seats/vehicle-seats.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { WithoutHeaderFooterLayoutComponent } from './layouts/without-header-footer-layout/without-header-footer-layout.component';
import { LoginRegisterContentComponent } from './components/login-register-content/login-register-content.component';
import { HomeComponent } from './webpage/home/home.component';
import { KontaktComponent } from './webpage/kontakt/kontakt.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { LogoComponent } from './style/logo/logo.component';
import { WebpageMenuComponent } from './webpage/components/webpage-menu/webpage-menu.component';
import { TileTitleLeftComponent } from './components/tile-title-left/tile-title-left.component';
import { TileComponent } from './style/tile/tile.component';
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider } from 'angularx-social-login';
import { ConstantsService } from '../../src/app/common/services/constants.service';
import { AngularFireModule } from '@angular/fire';
import localeSl from '@angular/common/locales/sl';
import {
  AngularFirestoreModule,
  FirestoreSettingsToken } from '@angular/fire/firestore';
import {
  DateAdapter,
  MAT_LABEL_GLOBAL_OPTIONS,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatOptionModule,
  MatNativeDateModule,
  NativeDateModule } from '@angular/material/core';
import { ButtonIconComponent } from './style/button-icon/button-icon.component';
import { ShareMyTripDialogComponent } from './dialogs/share-my-trip-dialog/share-my-trip-dialog.component';
import { AllTripsListComponent } from './components/all-trips-list/all-trips-list.component';
import { IzjavaOZasebnostiComponent } from './webpage/izjava-o-zasebnosti/izjava-o-zasebnosti.component';
import { InformacijeOStraniComponent } from './webpage/informacije-o-strani/informacije-o-strani.component';
import { DialogComponent } from './components/dialog/dialog.component';

registerLocaleData(localeSl);

const routes: Routes = [
  { path: 'pregled',
    component: DefaultLayoutComponent,
    children: [{
      path: '',
      component: DashboardPageComponent
    }], canActivate: [AuthGuard]
  },

  { path: 'prijava-registracija',
    component: WithoutHeaderFooterLayoutComponent,
    children: [{
      path: '',
      component: LoginRegisterComponent
    }], canActivate: [SecureInnerPagesGuard]
  },

  { path: 'moja-vozila',
    component: DefaultLayoutComponent,
    children: [{
      path: '',
      component: VehiclesPageComponent
    }], canActivate: [AuthGuard]
  },

  { path: 'moja-potovanja',
    component: DefaultLayoutComponent,
    children: [{
      path: '',
      component: TripsPageComponent
    }], canActivate: [AuthGuard]
  },

  { path: 'potovanje/:id',
    component: DefaultLayoutComponent,
    children: [{
      path: '',
      component: TripPageComponent
    }], pathMatch: 'full'
  },

  { path: 'uporabnik/:id',
    component: DefaultLayoutComponent,
    children: [{
      path: '',
      component: UserPageComponent
    }], pathMatch: 'full', canActivate: [AuthGuard]
  },

  { path: 'dodajanje-novega-vozila',
    component: DefaultLayoutComponent,
    children: [{
      path: '',
      component: CreateVehicleDialogComponent
    }], canActivate: [AuthGuard]
  },

  { path: 'dialog/deli-potovanje',
    outlet: 'dialog',
    component: ShareMyTripDialogComponent
  },

  { path: 'izjava-o-zasebnosti',
    component: WithoutHeaderFooterLayoutComponent,
    children: [{
      path: '',
      component: IzjavaOZasebnostiComponent
    }]
  },

  { path: 'informacije-o-strani',
    component: WithoutHeaderFooterLayoutComponent,
    children: [{
      path: '',
      component: InformacijeOStraniComponent
    }]
  },

  { path: '',
    component: WithoutHeaderFooterLayoutComponent,
    children: [{
      path: '',
      component: HomeComponent
    }]
  },

  { path: '**',
    component: HomeComponent
  }
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

const config = new AuthServiceConfig([{
  id: FacebookLoginProvider.PROVIDER_ID,
  provider: new FacebookLoginProvider('1432059290278424')
}]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WebpageHeaderComponent,
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
    MainMenuComponent,
    TileTitleTopComponent,
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
    LoginRegisterContentComponent,
    HomeComponent,
    KontaktComponent,
    LoginRegisterComponent,
    LogoComponent,
    WebpageMenuComponent,
    TileTitleLeftComponent,
    TileComponent,
    ButtonIconComponent,
    ShareMyTripDialogComponent,
    AllTripsListComponent,
    IzjavaOZasebnostiComponent,
    InformacijeOStraniComponent,
    DialogComponent
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
    CopyClipboardModule,
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
    SocialLoginModule
  ],
  providers: [
    Title,
    DatePipe,
    VehicleService,
    FirebaseAuthService,
    VehicleSeatsService,
    NumberPickerService,
    UserService,
    HeaderService,
    LoginService,
    ConstantsService,
    UserMenuService,
    WebpageMenuService,
    VehicleTileService,
    MatDatepickerModule,
    AuthGuard,
    { provide: FirestoreSettingsToken, useValue: {} },
    { provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: 'never' } },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: LOCALE_ID, useValue: 'sl-SI' },
    { provide: AuthServiceConfig, useFactory: provideConfig }
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
