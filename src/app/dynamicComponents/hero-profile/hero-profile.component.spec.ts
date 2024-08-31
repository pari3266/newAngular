import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroProfileComponent } from './hero-profile.component';

describe('HeroProfileComponent', () => {
  let component: HeroProfileComponent;
  let fixture: ComponentFixture<HeroProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
