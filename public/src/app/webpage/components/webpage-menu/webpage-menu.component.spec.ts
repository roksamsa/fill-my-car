import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WebpageMenuComponent } from './webpage-menu.component';

describe('WebpageMenuComponent', () => {
  let component: WebpageMenuComponent;
  let fixture: ComponentFixture<WebpageMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebpageMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebpageMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
