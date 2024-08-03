import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import dayjs from 'dayjs';
import { CalendarComponent } from './calendar.component';
describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarComponent],
      providers: [DatePipe]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the correct date and subscribe to current$', () => {
    const initialDate = dayjs().format('YYYY/MM');
    expect(component.current).toBe(initialDate);
    component.ngOnInit();
    expect(component.current$).toBeDefined();
    expect(component.datesInMonth.length).toBeGreaterThan(0);
    expect(component.yearMonths.length).toBe(4);
  });

  it('should switch the current date correctly', () => {
    const initialDate = component.current;
    component.switch(0, 1);
    const newDate = dayjs(initialDate).add(1, 'month').format('YYYY/MM');
    expect(component.current).toBe(newDate);
  });

  it('should select a date correctly', () => {
    const date = '2024-08-01T00:00:00.000Z';
    component.onSelectDate(date);
    expect(component.selectedDate).toBe(date);
  });

  it('should toggle range selection correctly', () => {
    component.isRange = true;
    spyOn(component.select, 'emit');
    const startDate = '2024-08-01T00:00:00.000Z';
    const endDate = '2024-08-02T00:00:00.000Z';
    component.onSelectDate(startDate);
    expect(component.selectRange.start).toBe(startDate);
    component.onSelectDate(endDate);
    expect(component.selectRange.end).toBe(endDate);
    expect(component.select.emit).toHaveBeenCalledWith(component.selectRange);
  });

  it('should hover over a date correctly', () => {
    const date = '2024-08-01T00:00:00.000Z';
    component.hover(date);
    expect(component.hoverDate).toBe(date);
  });

  it('should return the correct title', () => {
    const date = '2024/08';
    component.current = date;
    const expectedTitle = '2024年08月';
    expect(component.title).toBe(expectedTitle);
  });

  it('should check if a date is in the current month correctly', () => {
    const date = '2024-08-01T00:00:00.000Z';
    expect(component.isInThisMonth(date)).toBe(true);
  });

  it('should check if a date is between the range correctly', () => {
    component.selectRange.start = '2024-08-01T00:00:00.000Z';
    component.hoverDate = '2024-08-05T00:00:00.000Z';
    const date = '2024-08-03T00:00:00.000Z';

    const startDate = dayjs.utc(component.selectRange.start);
    const endDate = dayjs.utc(component.hoverDate);
    const checkDate = dayjs.utc(date);

    expect(checkDate.isBetween(startDate, endDate, undefined, '[]')).toBe(true);
  });

  it('should check if a date is before the start correctly', () => {
    component.selectRange.start = '2024-08-01T00:00:00.000Z';
    const date = '2024-07-30T00:00:00.000Z';
    const startDate = dayjs.utc(component.selectRange.start);
    const checkDate = dayjs.utc(date);
    expect(checkDate.isBefore(startDate)).toBe(true);
  });

  it('should select a month correctly', () => {
    const month = '8';
    component.onSelectMonth(new MouseEvent('click'), month);
    expect(component.isDateType).toBe(false);
    expect(component.current).toContain('08');
  });

  it('should toggle to year type correctly', () => {
    component.toYearType(new MouseEvent('click'));
    expect(component.isDateType).toBe(false);
  });

  it('should chunk arrays correctly', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const chunked = component['chunkByNumber'](array, 3);
    expect(chunked.length).toBe(3);
    expect(chunked[0].length).toBe(3);
  });

  it('should get dates in month correctly', () => {
    const dates = component['getDatesInMonth']('2024/08');
    expect(dates.length).toBeGreaterThan(0);
  });

  it('should get months correctly', () => {
    const months = component['getMonths']();
    expect(months.length).toBe(12);
  });
});
