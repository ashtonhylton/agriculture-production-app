import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CassavaComponent } from './cassava.component';

describe('CassavaComponent', () => {
  let component: CassavaComponent;
  let fixture: ComponentFixture<CassavaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CassavaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CassavaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
