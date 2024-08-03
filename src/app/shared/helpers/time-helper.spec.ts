import { TimeHelper } from "./time-helper";
import dayjs from "dayjs";

describe('TimeHelper', () => {
  it('should return today\'s date in Tw format', () => {
    const today = TimeHelper.today;
    const expected = TimeHelper.formatDateTw(new Date());
    expect(today).toBe(expected);
  });

  it('should format a date to Tw format', () => {
    const date = '2024-08-01';
    const formatted = TimeHelper.formatDateTw(date);
    expect(formatted).toBe(dayjs(date).locale('zh-tw').format('YYYY-MM-DD'));
  });

  it('should format a date to En format', () => {
    const date = '2024-08-01';
    const formatted = TimeHelper.formatDateEn(date);
    expect(formatted).toBe(dayjs(date).locale('en').format('YYYY-MM-DD'));
  });

  it('should return specific date added by amount', () => {
    const date = '2024-08-01';
    const amount = 5;
    const unit = 'days';
    const formattedDate = TimeHelper.formatSpecDate(date, amount, unit);
    const expectedDate = dayjs(date).add(amount, unit).toISOString();
    expect(formattedDate).toBe(expectedDate);
  });

  it('should return boundary date for a given unit', () => {
    const date = '2024-08-01';
    const amount = 1;
    const unit = 'month';
    const startBoundary = TimeHelper.formatBoundaryDate(date, amount, unit, true);
    const endBoundary = TimeHelper.formatBoundaryDate(date, amount, unit, false);
    const expectedStart = dayjs(date).add(amount, unit).startOf(unit).toISOString();
    const expectedEnd = dayjs(date).add(amount, unit).endOf(unit).toISOString();
    expect(startBoundary).toBe(expectedStart);
    expect(endBoundary).toBe(expectedEnd);
  });

  it('should calculate the offset between two dates', () => {
    const start = '2024-08-01';
    const end = '2024-08-10';
    const unit = 'days';
    const offset = TimeHelper.getOffset(start, end, unit);
    const expectedOffset = dayjs(end).diff(dayjs(start), unit) + 1; // Adding 1 to include start day
    expect(offset).toBe(expectedOffset);
  });

  it('should check if two dates are the same', () => {
    const date1 = '2024-08-01';
    const date2 = '2024-08-01';
    const unit = 'date';
    const result = TimeHelper.isSame(date1, date2, unit);
    expect(result).toBe(true);
  });

  it('should check if two dates are not the same', () => {
    const date1 = '2024-08-01';
    const date2 = '2024-08-02';
    const unit = 'date';
    const result = TimeHelper.isSame(date1, date2, unit);
    expect(result).toBe(false);
  });
});
