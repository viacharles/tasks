import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import { By } from '@angular/platform-browser';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent, FormsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('input 的值與 model 連動', () => {
    const newValue = 'Test Value';
    const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;

    input.value = newValue;
    input.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();

    expect(component.model).toBe(newValue);
  });

  it('input value 的值會被 trim', () => {
    const newValue = '   Test Value   ';
    const trimmedValue = 'Test Value';
    const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    input.value = newValue;
    const event = new Event('input', { bubbles: true });
    input.dispatchEvent(event);
    component.input(event);
    fixture.detectChanges();
    expect(input.value).toBe(trimmedValue);
  });

  it('should display error message when isError is true', () => {
    component.isError = true;
    component.errorMessage = 'This is an error message';
    fixture.detectChanges();

    const errorMessageElement = fixture.debugElement.query(By.css('.error-message'));
    expect(errorMessageElement).toBeTruthy();
    expect(errorMessageElement.nativeElement.textContent).toContain('This is an error message');
  });

  it('should not display error message when isError is false', () => {
    component.isError = false;
    component.errorMessage = 'This is an error message';
    fixture.detectChanges();

    const errorMessageElement = fixture.debugElement.query(By.css('.error-message'));
    expect(errorMessageElement).toBeFalsy();
  });
});
