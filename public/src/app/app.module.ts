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
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatDividerModule,
  MatSnackBarModule } from '@angular/material';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VehicleService } from './core/vehicle.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ContentComponent } from './components/content/content.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { UserComponent } from './components/user/user.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService } from './core/auth.service';
import { UserService } from './core/user.service';
import { environment } from '../environments/environment';
import { VehiclesPageComponent } from './pages/vehicles-page/vehicles-page.component';
import { TripsPageComponent } from './pages/trips-page/trips-page.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthGuard } from '../app/core/auth.guard';
import { SecureInnerPagesGuard } from '../app/core/secure-inner-pages.guard';
import { NavigationMainComponent } from './components/navigation-main/navigation-main.component';
import { TileComponent } from './components/tile/tile.component';
import { VehicleTileComponent } from './components/vehicle-tile/vehicle-tile.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';

const routes: Routes = [
  { path: 'create', component: CreatePageComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: EditPageComponent, canActivate: [AuthGuard] },
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
    CreatePageComponent,
    EditPageComponent,
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
    UserMenuComponent
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
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  providers: [VehicleService, AuthService, UserService, AuthGuard],
  bootstrap: [AppComponent]
})

export class AppModule { }
