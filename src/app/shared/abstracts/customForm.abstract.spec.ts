import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { CustomForm } from "./customForm.abstract";

@Component({
  selector: 'app-test-custom-form',
  template: '<div></div>',
})
class TestCustomFormComponent extends CustomForm<string> {
  public triggerNotifyValueChange(value?: string): void {
    this.notifyValueChange(value);
  };
  public triggerOnTouch(value?: string): void {
    this.onTouch(value);
  }
}

describe('CustomForm', () => {
  let component: TestCustomFormComponent;
  let fixture: ComponentFixture<TestCustomFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestCustomFormComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TestCustomFormComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should write value', () => {
    component.writeValue('test');
    expect(component.model).toBe('test');
  });

  it('should notify value change', () => {
    const onChangeSpy = jasmine.createSpy('onChange');
    component.registerOnChange(onChangeSpy);

    component.triggerNotifyValueChange('newValue');
    expect(onChangeSpy).toHaveBeenCalledWith('newValue');
    expect(component.model).toBe('newValue');
  });

  it('should not change model if undefined value is notified', () => {
    component.model = 'existingValue';
    component.triggerNotifyValueChange(undefined);
    expect(component.model).toBe('existingValue');
  });

  it('onTouch method ', () => {
    const onTouchSpy = jasmine.createSpy('onTouch');
    component.registerOnTouched(onTouchSpy);

    component.triggerOnTouch('test');
    expect(onTouchSpy).toHaveBeenCalledWith('test');
  });

  it('能設置 disabled', () => {
    component.setDisabledState(true);
    expect(component.disabled).toBe(true);

    component.setDisabledState(false);
    expect(component.disabled).toBe(false);
  });


})
