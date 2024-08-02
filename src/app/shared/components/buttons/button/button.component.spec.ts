import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ClickAnimDirective } from '@shared/directives/click-anim.directive';
import { ButtonComponent } from './button.component';

@Component({
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <app-button [bgColor]="bgColor" [height]="height" [disabled]="disabled" [icon]="icon">
      Button Text
    </app-button>
  `
})
class TestHostComponent {
  bgColor = 'primary';
  height = '2.25rem';
  disabled = false;
  icon = 'test-icon';
}

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgIf, ClickAnimDirective, TestHostComponent, ButtonComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the icon if provided', () => {
    component.icon = 'test-icon';
    component.disabled = false;
    fixture.detectChanges();

    const iconElement = fixture.debugElement.query(By.css('em'));
    expect(iconElement).toBeTruthy();
    expect(iconElement.nativeElement.classList).toContain('icon-test-icon');
    expect(iconElement.nativeElement.classList).toContain('f-white');
  });

  it('should not display the icon if not provided', () => {
    component.icon = '';
    fixture.detectChanges();

    const iconElement = fixture.debugElement.query(By.css('em'));
    expect(iconElement).toBeFalsy();
  });

  it('should apply the correct background color class', () => {
    component.bgColor = 'primary';
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.classList).toContain('bg-primary');
  });

  it('should apply the correct height', () => {
    component.height = '3rem';
    fixture.detectChanges();

    const divElement = fixture.debugElement.query(By.css('div'));
    expect(divElement.nativeElement.style.height).toBe('3rem');
  });

  it('should disable the button when disabled input is true', () => {
    component.disabled = true;
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.disabled).toBe(true);
  });

  it('should enable the button when disabled input is false', () => {
    component.disabled = false;
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.disabled).toBe(false);
  });

  it('test ng-content', () => {
    testHostFixture.detectChanges();
    const buttonElement = testHostFixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonElement.textContent).toContain('Button Text');
  });
});
