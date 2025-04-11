import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionTypeListPageComponent } from './section-type-list-page.component';

describe('SectionTypeListPageComponent', () => {
  let component: SectionTypeListPageComponent;
  let fixture: ComponentFixture<SectionTypeListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionTypeListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionTypeListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
