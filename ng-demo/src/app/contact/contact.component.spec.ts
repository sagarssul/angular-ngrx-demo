import { StoreModule } from '@ngrx/store';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { SharedModule } from '../shared/shared.module';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, StoreModule.forRoot({})],
      declarations: [ContactComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.contactForm.valid).toBeFalsy();
  });

  it('email field validity', () => {
    const email = component.contactForm.controls['email'];
    email.setValue('sagar@gmail.com');
    expect(email.valid).toBeTruthy();
  });

  it('form valid after fill details', () => {
    component.contactForm.controls['firstName'].setValue('sagar');
    component.contactForm.controls['lastName'].setValue('sul');
    component.contactForm.controls['email'].setValue('sagar@gmail.com');
    component.contactForm.controls['phoneNumber'].setValue('9766600000');
    component.contactForm.controls['status'].setValue('Active');
    expect(component.contactForm.valid).toBeTruthy();
  });

});
