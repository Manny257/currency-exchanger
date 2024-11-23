import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversionsListComponent } from './conversions-list.component';

describe('ConversionsListComponent', () => {
  let component: ConversionsListComponent;
  let fixture: ComponentFixture<ConversionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversionsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConversionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
