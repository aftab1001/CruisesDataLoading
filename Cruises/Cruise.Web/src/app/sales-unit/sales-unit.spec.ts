import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SalesUnit } from './sales-unit.component';



describe('FirstComponent', () => {
  let component: SalesUnit;
  let fixture: ComponentFixture<SalesUnit>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesUnit ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesUnit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
