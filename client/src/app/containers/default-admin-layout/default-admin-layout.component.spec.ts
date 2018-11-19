import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultAdminLayoutComponent } from './default-admin-layout.component';

describe('DefaultAdminLayoutComponent', () => {
  let component: DefaultAdminLayoutComponent;
  let fixture: ComponentFixture<DefaultAdminLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultAdminLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultAdminLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
