import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroJobAddComponent } from './hero-job-add.component';

describe('HeroJobAddComponent', () => {
  let component: HeroJobAddComponent;
  let fixture: ComponentFixture<HeroJobAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroJobAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroJobAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
