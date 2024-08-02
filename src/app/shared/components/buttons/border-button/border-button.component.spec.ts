import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ClickAnimDirective } from '@shared/directives/click-anim.directive';
import { EColorType, ESize } from '@shared/ultilities/enums/common.enum';
import { BorderButtonComponent } from './border-button.component';


@Component({
  standalone: true,
  imports: [BorderButtonComponent],
  template: `
    <app-border-button [icon]="icon" [type]="type" [size]="size">
      Button Text
    </app-border-button>
  `
})
class TestHostComponent {
  icon = '';
  type = EColorType.Default;
  size = ESize.M;
}

describe('BorderButtonComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let component: BorderButtonComponent;
  let borderButtonDebugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorderButtonComponent, TestHostComponent, ClickAnimDirective]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    borderButtonDebugElement = fixture.debugElement.query(By.directive(BorderButtonComponent));
    component = borderButtonDebugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the icon if provided', () => {
    component.icon = 'test-icon';
    fixture.detectChanges();

    const iconElement = fixture.debugElement.query(By.css('em'));
    expect(iconElement).toBeTruthy();
    expect(iconElement.nativeElement.classList).toContain('test-icon');
  });

  it('should not display the icon if not provided', () => {
    let iconElement = borderButtonDebugElement.query(By.css('em'));
    expect(iconElement).toBeFalsy();
    hostComponent.icon = 'icon-add';
    fixture.detectChanges();
    iconElement = borderButtonDebugElement.query(By.css('em'));
    expect(iconElement).toBeTruthy();

    hostComponent.icon = '';
    fixture.detectChanges();
    iconElement = borderButtonDebugElement.query(By.css('em'));
    expect(iconElement).toBeFalsy();
  });

  it('should apply the correct type and size classes', () => {
    component.type = EColorType.Primary;
    component.size = ESize.L;
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.classList).toContain('primary');
    expect(buttonElement.nativeElement.classList).toContain('l');
  });

  it('should project content correctly', () => {
    fixture.detectChanges();
    const buttonTextElement = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(buttonTextElement.textContent).toContain('Button Text');
  });
});
