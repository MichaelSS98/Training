import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupProjectComponent } from './popup-project.component';

describe('PopupProjectComponent', () => {
  let component: PopupProjectComponent;
  let fixture: ComponentFixture<PopupProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
