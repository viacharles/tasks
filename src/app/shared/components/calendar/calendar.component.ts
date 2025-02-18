import { DatePipe, NgIf, NgFor, SlicePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UnSubOnDestroy } from '@shared/abstracts/unSubOnDestroy.abstract';
import { TimeHelper } from '@shared/helpers/time-helper';
import { IRangeDate } from '@shared/ultilities/interfaces/common.interface';
import { BehaviorSubject, takeUntil } from 'rxjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
dayjs.extend(customParseFormat);
dayjs.extend(utc);


@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [NgIf, NgFor, SlicePipe, DatePipe],
  providers: [DatePipe],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent extends UnSubOnDestroy implements OnInit {
  /** 是否為範圍選取 */
  @Input() isRange = false;
  /** 是否只限本月 */
  @Input() thisMonthLimit = false;
  /** 選取的日期 */
  @Output() select = new EventEmitter<string | IRangeDate>();

  constructor(private datePipe: DatePipe) {
    super();
  }

  /** 月內7天分一組的日期數字 */
  public datesInMonth: string[][] = [];
  public yearMonths: string[][] = [];
  /** 日曆目前的月份 */
  public current = new Date().toISOString();
  /** 日曆目前的月份訂閱主題 */
  public currentSubject = new BehaviorSubject<string>(this.current);
  /** 日曆目前的月份訂閱 */
  public current$ = this.currentSubject.asObservable();
  /** hover到的日期 */
  public hoverDate = '';
  public selectedDate = '';
  public selectedMonth = '';
  /** 選取的範圍日期 */
  public selectRange = {
    start: '',
    end: '',
  };
  /** 日期模式 */
  public isDateType = true;
  private readonly format = 'yyyy/MM/dd';

  get title(): string {
    const current = this.current.split('/');
    return `${current[0]}年${current[1]}月`;
  }

  ngOnInit(): void {
    this.current$.pipe(takeUntil(this.onDestroy$)).subscribe(date => {
      this.current = date;
      this.datesInMonth = this.chunkByNumber(this.getDatesInMonth(this.current), 7);
      this.yearMonths = this.chunkByNumber(this.getMonths(), 3)
    });
    this.switch(0, 0);
  }

  public isInThisMonth(date: string): boolean {
    return new Date(date).getMonth() === new Date(this.current).getMonth();
  }

  public hover(date: string) {
    this.hoverDate = date;
  }

  public isBetween(date: string): boolean {
    const start = TimeHelper.formatMoment(this.selectRange.start);
    const hover = TimeHelper.formatMoment(this.hoverDate);
    return TimeHelper.formatMoment(date).isBetween(start, hover);
  }

  public isBeforeStart(date: string): boolean {
    return TimeHelper.formatMoment(this.selectRange.start).isAfter(TimeHelper.formatMoment(date))
  }

  public onSelectDate(date: string) {
    this.selectedDate = date;
    if (this.isRange) {
      if (!this.selectRange.start) {
        this.selectRange.start = this.selectedDate;
      } else if (this.selectRange.start === this.selectedDate) {
        this.selectRange.start = '';
      } else {
        this.selectRange.end = this.selectedDate;
        this.select.emit(this.selectRange);
      };
    } else {
      this.select.emit(this.selectedDate);
    };
  }

  public onSelectMonth(event: Event, month: string) {
    event.stopPropagation();
    this.isDateType = !this.isDateType;
    this.switch(0, (+month) - (new Date(this.current).getMonth() + 1));
  }

  public toYearType(event: Event): void {
    event.stopPropagation();
    this.isDateType = false;
  }

  /**
   * @description 切換排班日曆時間
   * @param yearDiff 年份切換量
   * @param monthDiff 月份切換量
   */
  public switch(yearDiff: number, monthDiff: number) {
    const currentDate = dayjs(this.current).format('YYYY/MM');
    const Date = dayjs(currentDate, 'YYYY/MM')
      .add(yearDiff, 'year')
      .add(monthDiff, 'month')
      .format('YYYY/MM');
    this.currentSubject.next(Date);
  }

  /** 數個分成一個陣列 */
  private chunkByNumber(array: any[], base: number): any[] {
    const Result = [];
    for (let i = 0; i < array.length; i = i + base) {
      Result.push(array.slice(i, i + base));
    };
    return Result;
  }

  /** 得到月內的所有日期 ex. 2023-02-27T00:00:00.000Z */
  private getDatesInMonth(date: string): string[] {
    dayjs.locale('zh-tw', { weekStart: 1 });
    const startOfMonth = dayjs(date, 'YYYY/MM', true).startOf('month');
    const endOfMonth = dayjs(date, 'YYYY/MM', true).endOf('month');
    const startOfWeek = startOfMonth.startOf('week');
    const endOfWeek = endOfMonth.endOf('week');
    const dates: string[] = [];
    let currentDate = startOfWeek;
    while (currentDate.isBefore(endOfWeek) || currentDate.isSame(endOfWeek)) {
      dates.push(currentDate.format('YYYY-MM-DD'));
      currentDate = currentDate.add(1, 'day');
    };

    return dates;
  }

  private getMonths(): string[] {
    return Array.from(Array(12).keys()).map(num => `${num + 1}`);
  }
}
