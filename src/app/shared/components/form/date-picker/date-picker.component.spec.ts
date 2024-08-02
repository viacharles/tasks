import { DatePipe } from '@angular/common';
import { ElementRef, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarComponent } from '@shared/components/calendar/calendar.component';
import { WindowService } from '@shared/services/window.service';
import { IRangeDate } from '@shared/ultilities/interfaces/common.interface';

import { DatePickerComponent } from './date-picker.component';

describe('DatePickerComponent', () => {
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;
  let renderer2: Renderer2;
  let datePipe: DatePipe;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatePickerComponent, CalendarComponent, BrowserAnimationsModule],
      providers: [DatePipe, WindowService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;
    renderer2 = fixture.componentRef.injector.get(Renderer2);
    datePipe = TestBed.inject(DatePipe);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the correct placeholder for single date', () => {
    component.isRange = false;
    component.ngOnInit();
    expect(component.placeholder).toBe('YYYY/MM/DD');
  });

  it('should initialize with the correct placeholder for date range', () => {
    component.isRange = true;
    component.ngOnInit();
    expect(component.placeholder).toBe('YYYY/MM/DD ~ YYYY/MM/DD');
  });

  it('should show the calendar when clicked', () => {
    spyOn(component.calendarShow, 'emit');
    component.showCalendar();
    expect(component.show).toBeTrue();
    expect(component.calendarShow.emit).toHaveBeenCalledWith(true);
  });

  it('should not show the calendar when disabled', () => {
    spyOn(component.calendarShow, 'emit');
    component.isDisabled = true;
    component.showCalendar();
    expect(component.show).toBeFalse();
    expect(component.calendarShow.emit).not.toHaveBeenCalled();
  });

  it('should clear the value and emit cancel event', () => {
    spyOn(component.cancel, 'emit');
    const event = new MouseEvent('click');
    component.clear(event);
    expect(component.cancel.emit).toHaveBeenCalled();
    expect(component.model).toBe('');
  });

  it('should select a date and emit selectDate event', () => {
    spyOn(component.selectDate, 'emit');
    component.isRange = true;
    const select: { start: string; end: string } = {
      start: '2024-08-01T00:00:00.000Z',
      end: '2024-08-05T00:00:00.000Z'
    };
    component.select(select);
    expect(component.show).toBeFalse();
    const startDate = datePipe.transform(select.start, 'yyyy/MM/dd') || '';
    const endDate = datePipe.transform(select.end, 'yyyy/MM/dd') || '';
    const expectedDate = `${startDate} ~ ${endDate}`;
    expect(component.model).toBe(expectedDate);
    expect(component.selectDate.emit).toHaveBeenCalledWith(expectedDate);
  });

  it('should select a date range and emit selectDate event', () => {
    spyOn(component.selectDate, 'emit');
    component.isRange = true;
    const select: IRangeDate = {
      start: '2024-08-01T00:00:00.000Z',
      end: '2024-08-05T00:00:00.000Z'
    };
    component.select(select);
    expect(component.show).toBeFalse();
    const expectedDate = datePipe.transform(select.start, 'yyyy/MM/dd') + ' ~ ' + datePipe.transform(select.end, 'yyyy/MM/dd');
    expect(component.model).toBe(expectedDate);
    expect(component.selectDate.emit).toHaveBeenCalledWith(expectedDate);
  });

  it('should set calendar position correctly', () => {
    const tInputElement = fixture.debugElement.query(By.css('.input')).nativeElement;
    spyOnProperty(tInputElement, 'clientHeight').and.returnValue(50);

    component.show = true;
    fixture.detectChanges();

    component.showCalendar();
    fixture.detectChanges();

    const tCalendarContainer = fixture.debugElement.query(By.css('.calendar-container')).nativeElement;
    expect(tCalendarContainer.style.top).toBe('57px');
  });

  it('should set calendar position to the right correctly', () => {
    component.position = 'right';
    const calendarElement = {
      nativeElement: {
        clientHeight: 100,
        clientWidth: 200,
        style: {}
      }
    } as ElementRef<HTMLElement>;

    component.tInput = new ElementRef(document.createElement('div'));
    component.tInput.nativeElement.style.height = '50px';
    component['setCalendarPosition'](calendarElement.nativeElement);

    expect(calendarElement.nativeElement.style.right).toBe('-210px');
    expect(calendarElement.nativeElement.style.left).toBe('unset');
  });

  it('should set calendar position to the left correctly', () => {
    component.position = 'left';
    const calendarElement = {
      nativeElement: {
        clientHeight: 100,
        clientWidth: 200,
        style: {}
      }
    } as ElementRef<HTMLElement>;

    component.tInput = new ElementRef(document.createElement('div'));
    component.tInput.nativeElement.style.height = '50px';
    component['setCalendarPosition'](calendarElement.nativeElement);

    expect(calendarElement.nativeElement.style.left).toBe('-210px');
    expect(calendarElement.nativeElement.style.right).toBe('unset');
  });
});
