import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/autservice.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
  authServiceSpy.login.and.returnValue(of());

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        MatProgressSpinnerModule,
      ],
      declarations: [LoginComponent],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the email input', () => {
    const input: HTMLInputElement =
      fixture.nativeElement.querySelector('input');

    const formData = {
      email: 'Sincere@april.biz',
    };

    component.loginForm.setValue(formData);

    expect(component.loginForm.controls.email.value).toBe('Sincere@april.biz');
  });

  it('should set form invalid with entering invalid email', () => {
    const input: HTMLInputElement =
      fixture.nativeElement.querySelector('input');

    const formData = {
      email: 'Sincere@april',
    };

    component.loginForm.setValue(formData);

    expect(component.loginForm.invalid).toEqual(true);
  });

  it('should allow user to log in', () => {
    const input: HTMLInputElement =
      fixture.nativeElement.querySelector('input');

    const formData = {
      email: 'Sincere@april.biz',
    };

    component.loginForm.setValue(formData);
    expect(component.loginForm.valid).toEqual(true);

    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalledWith(formData.email);
  });
});
