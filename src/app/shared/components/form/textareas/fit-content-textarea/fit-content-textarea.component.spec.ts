import { Renderer2, SimpleChange } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { FitContentTextareaComponent } from './fit-content-textarea.component';

describe('FitContentTextareaComponent', () => {
  let component: FitContentTextareaComponent;
  let fixture: ComponentFixture<FitContentTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, FitContentTextareaComponent],
      providers: [Renderer2],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FitContentTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('畫面能呈現 placeholder and textarea value', () => {
    component.placeholder = 'Enter text here';
    component.model = 'Test content';
    const textarea = fixture.debugElement.query(By.css('textarea')).nativeElement as HTMLTextAreaElement;
    fixture.detectChanges();

    expect(textarea.placeholder).toBe('Enter text here');
    expect(textarea.value).toBe('Test content');
  });

  it('textarea 高度符合輸入內容高度', fakeAsync(() => {
    component.show = true;
    fixture.detectChanges();

    component.ngOnChanges({ show: new SimpleChange(null, component.show, false) });
    fixture.detectChanges();

    const textarea = fixture.debugElement.query(By.css('textarea')).nativeElement as HTMLTextAreaElement;
    textarea.value = 'Initial content';
    textarea.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    component.resize(textarea);
    fixture.detectChanges();

    tick(2000);

    const computedStyle = window.getComputedStyle(textarea);

    expect(component.preReserveHeight).toBe(textarea.scrollHeight);
    expect(parseInt(computedStyle.height, 10)).toBe(96);
  }));

  it('內容被清空時 teaxarea 高度跟著變化', async () => {
    component.model = 'Content to clear';
    component.show = true;
    fixture.detectChanges();
    component.clear = true;
    component.ngOnChanges({ clear: new SimpleChange(null, component.clear, false) });
    fixture.detectChanges();
    await fixture.whenStable();
    const textarea = fixture.debugElement.query(By.css('textarea')).nativeElement as HTMLTextAreaElement;
    expect(textarea.value).toBe('');
    expect(parseInt(window.getComputedStyle(textarea).height, 10)).toBe(96);
  });

  it('顯示錯誤訊息', () => {
    component.errorMessage = 'This is an error message';
    component.isError = true;
    fixture.detectChanges();

    const errorMessageElement = fixture.debugElement.query(By.css('.error-message')).nativeElement as HTMLElement;

    expect(errorMessageElement.textContent).toContain('This is an error message');
  });
});
