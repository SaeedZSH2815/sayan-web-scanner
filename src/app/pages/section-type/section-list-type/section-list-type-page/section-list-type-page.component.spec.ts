import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionListTypePageComponent } from './section-list-type-page.component';

describe('SectionListTypePageComponent', () => {
  let component: SectionListTypePageComponent;
  let fixture: ComponentFixture<SectionListTypePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionListTypePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionListTypePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
