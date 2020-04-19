import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IzjavaOZasebnostiComponent } from './izjava-o-zasebnosti.component';

describe('IzjavaOZasebnostiComponent', () => {
  let component: IzjavaOZasebnostiComponent;
  let fixture: ComponentFixture<IzjavaOZasebnostiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IzjavaOZasebnostiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IzjavaOZasebnostiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
