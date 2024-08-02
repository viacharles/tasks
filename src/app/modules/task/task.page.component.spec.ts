import { EInputType, EState } from './shared/tasks.enum';
import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BorderButtonComponent } from '@shared/components/buttons/border-button/border-button.component';
import { ButtonComponent } from '@shared/components/buttons/button/button.component';
import { IconButtonComponent } from '@shared/components/buttons/icon-button/icon-button.component';
import { InputComponent } from '@shared/components/form/inputs/input/input.component';
import { SearchInputComponent } from '@shared/components/form/inputs/search-input/search-input.component';
import { FitContentTextareaComponent } from '@shared/components/form/textareas/fit-content-textarea/fit-content-textarea.component';
import { ToggleComponent } from '@shared/components/form/toggle/toggle.component';

import { TaskPageComponent } from './task.page.component';
import { DatePickerComponent } from '@shared/components/form/date-picker/date-picker.component';
import { SelectComponent } from '@shared/components/form/selects/select/select.component';
import { IOption } from '@shared/ultilities/interfaces/common.interface';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TaskPageComponent', () => {
  let component: TaskPageComponent;
  let fixture: ComponentFixture<TaskPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        SearchInputComponent,
        IconButtonComponent,
        ButtonComponent,
        BorderButtonComponent,
        InputComponent,
        DatePickerComponent,
        SelectComponent,
        FitContentTextareaComponent,
        ToggleComponent,
        DatePipe,
        BrowserAnimationsModule
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new card on add()', () => {
    const initialLength = component.cards.list.length;
    component.cards.add();
    fixture.detectChanges();

    expect(component.cards.list.length).toBe(initialLength + 1);
    expect(component.cards.list[initialLength - 1].mode).toBe(component.modeType.EDIT);
  });

  it('should delete a card on delete()', () => {
    component.cards.add();
    const initialLength = component.cards.list.length;
    component.cards.delete(0);
    fixture.detectChanges();
    expect(component.cards.list.length).toBe(initialLength - 1);
  });

  it('完成按鍵切換值能與 state 連動', () => {
    const card = component.cards.list[0];
    const toggleDebugElement = fixture.debugElement.query(By.directive(ToggleComponent));
    const input = toggleDebugElement.query(By.css('input[type="checkbox"]')).nativeElement as HTMLInputElement;
    expect(card.state).toBe(EState.UnCompleted);
    input.click();
    fixture.detectChanges();
    expect(card.state).toBe(EState.Completed);
  });

  it('能透過 input 編輯 card.title', async () => {
    const card = component.cards.list[0];
    const newTitle = 'New Title';
    card.mode = component.modeType.EDIT;
    fixture.detectChanges();

    const inputDebugElement = fixture.debugElement.query(By.css('.card app-input input'));
    const inputElement = inputDebugElement.nativeElement;
    inputElement.value = newTitle;
    inputElement.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    await fixture.whenStable();

    fixture.detectChanges();
    await fixture.whenStable();
    expect(card.title).toBe(newTitle);
  });

  it('切換 [編輯按鈕] 能切換 mode', () => {
    const card = component.cards.list[0];
    const button = fixture.debugElement.query(By.css('app-border-button'));

    button.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(card.mode).toBe(component.modeType.EDIT);

    button.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(card.mode).toBe(component.modeType.VIEW);
  });

  it('should display card creation time in correct format', () => {
    const cardTimeElement = fixture.debugElement.query(By.css('p.f-gray-600')).nativeElement;
    expect(cardTimeElement.textContent).toContain('2024-07-29');
  });

  it('should update filter input on inputSearch()', () => {
    const inputEvent = new Event('input', {
      bubbles: true,
      cancelable: true,
    });
    const inputElement = fixture.debugElement.query(By.css('app-search-input input')).nativeElement;
    inputElement.value = 'new search term';
    inputElement.dispatchEvent(inputEvent);
    component.inputSearch(inputEvent);
    fixture.detectChanges();
    expect(component.filter.input).toBe('new search term');
  });

  it('should update filter inputType on selectInputType()', () => {
    const type = EInputType.Title;
    component.selectInputType(type);
    fixture.detectChanges();
    expect(component.filter.inputType).toBe(type);
  });

  it('should update filter dates on selectDate()', () => {
    const range = '2024/07/01~2024/07/31';
    component.selectDate(range);
    fixture.detectChanges();
    expect(component.filter.startTime).toBe('2024/07/01');
    expect(component.filter.endTime).toBe('2024/07/31');
  });

  it('should reset filter dates on dateCancel()', () => {
    component.dateCancel();
    fixture.detectChanges();
    expect(component.filter.startTime).toBe('');
    expect(component.filter.endTime).toBe('');
  });

  it('should update filter state on selectState()', () => {
    const stateOption: IOption = { code: EState.Completed, name: 'Completed' };
    component.selectState(stateOption);
    fixture.detectChanges();
    expect(component.filter.state).toBe(EState.Completed);
  });

  it('should toggle card state on toggleState()', () => {
    component.cards.add();
    fixture.detectChanges();

    const card = component.cards.list[0];
    const toggleEvent = new Event('change', {
      bubbles: true,
      cancelable: true,
    });
    const inputElement = fixture.debugElement.query(By.css('app-toggle input')).nativeElement;
    inputElement.checked = true;
    inputElement.dispatchEvent(toggleEvent);
    component.toggleState(toggleEvent, 0);
    fixture.detectChanges();
    expect(card.state).toBe(EState.Completed);

    inputElement.checked = false;
    inputElement.dispatchEvent(toggleEvent);
    component.toggleState(toggleEvent, 0);
    fixture.detectChanges();
    expect(card.state).toBe(EState.UnCompleted);
  });
});
