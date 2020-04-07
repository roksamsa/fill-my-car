import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareMyTripDialogComponent } from './share-my-trip-dialog.component';

describe('ShareMyTripDialogComponent', () => {
  let component: ShareMyTripDialogComponent;
  let fixture: ComponentFixture<ShareMyTripDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareMyTripDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareMyTripDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
