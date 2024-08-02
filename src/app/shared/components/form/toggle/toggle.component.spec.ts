
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToggleComponent } from './toggle.component';
import { By } from '@angular/platform-browser';

describe('ToggleComponent', () => {
  let component: ToggleComponent<any>;
  let fixture: ComponentFixture<ToggleComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('測試 @input()', () => {
    component.disabled = true;
    component.checked = true;
    component.id = 'test-id';
    component.value = 'test-value';
    fixture.detectChanges();

    const inputElement: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputElement.disabled).toBe(true);
    expect(inputElement.checked).toBe(true);
    expect(inputElement.id).toBe('test-id');
    expect(inputElement.value).toBe('test-value');
  });

  it('執行 toCheck() 有值時 ，emit check event 並且更新值', () => {
    const mockEvent = { target: { checked: true } } as any;
    component.value = 'test-value';
    spyOn(component.check, 'emit');
    spyOn(component as any, 'notifyValueChange').and.callThrough();

    component.toCheck(mockEvent);

    expect(component.check.emit).toHaveBeenCalledWith(mockEvent);
    expect((component as any).notifyValueChange).toHaveBeenCalledWith('test-value');
  });

  it('執行 toCheck() 無值時 ，emit check event 並且更新值', () => {
    const mockEvent = { target: { checked: true } } as any;
    component.value = undefined;
    spyOn(component.check, 'emit');
    spyOn(component as any, 'notifyValueChange').and.callThrough();

    component.toCheck(mockEvent);

    expect(component.check.emit).toHaveBeenCalledWith(mockEvent);
    expect((component as any).notifyValueChange).toHaveBeenCalledWith(true);
  });

  it('check 沒有被點擊就執行 toCheck() 時 ，emit check event 並且更新值為 null', () => {
    const mockEvent = { target: { checked: false } } as any;
    component.value = 'test-value';
    spyOn(component.check, 'emit');
    spyOn(component as any, 'notifyValueChange').and.callThrough();

    component.toCheck(mockEvent);

    expect(component.check.emit).toHaveBeenCalledWith(mockEvent);
    expect((component as any).notifyValueChange).toHaveBeenCalledWith(null);
  });
});
