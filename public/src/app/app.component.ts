import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { UserMenuService } from '../app/components/user-menu/user-menu.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Napolni moj avto';
  previousUrl: string;
  darkModeActivated: boolean;
  @ViewChild('appWrapper') appWrapper: ElementRef;

  constructor(
    private adapter: DateAdapter<any>,
    private userMenuDarkThemeData: UserMenuService,
    private renderer: Renderer2,
    private router: Router) {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          if (this.previousUrl) {
            this.renderer.removeClass(this.appWrapper.nativeElement, this.previousUrl);
          }
          const currentUrlSlug = event.url.slice(1);
          if (currentUrlSlug) {
            this.renderer.addClass(this.appWrapper.nativeElement, currentUrlSlug);
          }
          this.previousUrl = currentUrlSlug;
        }
      });
  }

  ngOnInit() {
    this.adapter.setLocale('sl');
    this.userMenuDarkThemeData.currentUserMenuThemeModeState.subscribe(clickActiveState => this.darkModeActivated = clickActiveState);
  }
}
