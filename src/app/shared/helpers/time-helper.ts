// import moment from 'moment'

// export class TimeHelper {

//   public static get today(): string {
//     return TimeHelper.formatDateTw(new Date());
//   }

//   public static formatMoment(date: string | Date): moment.Moment {
//     return moment(new Date(date), ['YYYY-MM-DD', 'YYYY/MM/DD', 'YYYYMMDD']);
//   }

//   /**
//    * @description 轉換日期格式(Tw)
//    */
//   public static formatDateTw(
//     date: string | Date,
//     format = 'YYYY-MM-DD'
//   ): string {
//     moment.locale('zh-tw');
//     return moment(new Date(date), ['YYYY-MM-DD', 'YYYY/MM/DD', 'YYYYMMDD']).format(
//       format
//     );
//   }

//   /**
//    * @description 轉換日期格式(En)
//    */
//   public static formatDateEn(
//     date: string | Date,
//     format = 'YYYY-MM-DD'
//   ): string {
//     moment.locale('en');
//     return moment(new Date(date), ['YYYY-MM-DD', 'YYYY/MM/DD', 'YYYYMMDD']).format(
//       format
//     );
//   }

//   /**
//    * @description 取得特定日期
//    * @param date 日期
//    * @param amount 增加的單位量
//    * @param unit 單位
//    */
//   public static formatSpecDate(
//     date: moment.MomentInput,
//     amount: moment.DurationInputArg1 = 0,
//     unit: moment.DurationInputArg2 = 'day'
//   ): string {
//     return moment(date, ['YYYY-MM-DD', 'YYYY/MM/DD', 'YYYYMMDD']).add(amount, unit).toISOString();
//   }

//   /**
//    * @description 取得特定邊界日期
//    * @param date 日期
//    * @param amount 增加的單位量
//    * @param unit 單位
//    */
//   public static formatBoundaryDate(
//     date: moment.MomentInput,
//     amount: moment.DurationInputArg1,
//     unit: moment.DurationInputArg2,
//     start = true
//   ): string {
//     const Target = moment(date, ['YYYY-MM-DD', 'YYYY/MM/DD', 'YYYYMMDD']).add(amount, unit);
//     return (start ? Target.startOf(unit) : Target.endOf(unit)).toISOString();
//   }

//   /**
//    * @description 取得兩日期間距
//    * @param start 開始日期
//    * @param end 結束日期
//    * @param unit 計算單位
//    * @returns
//    */
//   public static getOffset(
//     start: moment.MomentInput,
//     end: moment.MomentInput,
//     unit: moment.DurationInputArg2
//   ): number {
//     const Offset = Math.abs(moment(start, ['YYYY-MM-DD', 'YYYY/MM/DD', 'YYYYMMDD']).diff(moment(end, ['YYYY-MM-DD', 'YYYY/MM/DD', 'YYYYMMDD']), unit));
//     return !Offset ? Offset : Offset + 1;
//   }

//   public static isSame(
//     date1: string,
//     date2: moment.MomentInput,
//     unit: moment.unitOfTime.StartOf | undefined = 'date'
//   ): boolean {
//     return moment(new Date(date1), ['YYYY-MM-DD', 'YYYY/MM/DD', 'YYYYMMDD']).isSame(date2, unit);
//   }
// }

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import utc from 'dayjs/plugin/utc';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(customParseFormat);
dayjs.extend(localeData);
dayjs.extend(utc);
dayjs.extend(isBetween);

export class TimeHelper {

  public static get today(): string {
    return TimeHelper.formatDateTw(new Date());
  }

  public static formatMoment(date: string | Date): dayjs.Dayjs {
    return dayjs(date, ['YYYY-MM-DD', 'YYYY/MM/DD', 'YYYYMMDD'], true);
  }

  /**
   * @description 轉換日期格式(Tw)
   */
  public static formatDateTw(
    date: string | Date,
    format = 'YYYY-MM-DD'
  ): string {
    return dayjs(date, ['YYYY-MM-DD', 'YYYY/MM/DD', 'YYYYMMDD'], true).locale('zh-tw').format(format);
  }

  /**
   * @description 轉換日期格式(En)
   */
  public static formatDateEn(
    date: string | Date,
    format = 'YYYY-MM-DD'
  ): string {
    return dayjs(date, ['YYYY-MM-DD', 'YYYY/MM/DD', 'YYYYMMDD'], true).locale('en').format(format);
  }

  /**
   * @description 取得特定日期
   * @param date 日期
   * @param amount 增加的單位量
   * @param unit 單位
   */
  public static formatSpecDate(
    date: dayjs.ConfigType,
    amount: number = 0,
    unit: dayjs.ManipulateType = 'day'
  ): string {
    return dayjs(date, ['YYYY-MM-DD', 'YYYY/MM/DD', 'YYYYMMDD'], true).add(amount, unit).toISOString();
  }

  /**
   * @description 取得特定邊界日期
   * @param date 日期
   * @param amount 增加的單位量
   * @param unit 單位
   */
  public static formatBoundaryDate(
    date: dayjs.ConfigType,
    amount: number,
    unit: dayjs.ManipulateType,
    start = true
  ): string {
    const target = dayjs(date, ['YYYY-MM-DD', 'YYYY/MM/DD', 'YYYYMMDD'], true).add(amount, unit);
    return (start ? target.startOf(unit) : target.endOf(unit)).toISOString();
  }

  /**
   * @description 取得兩日期間距
   * @param start 開始日期
   * @param end 結束日期
   * @param unit 計算單位
   * @returns
   */
  public static getOffset(
    start: dayjs.ConfigType,
    end: dayjs.ConfigType,
    unit: dayjs.QUnitType | dayjs.OpUnitType
  ): number {
    const offset = Math.abs(dayjs(start, ['YYYY-MM-DD', 'YYYY/MM/DD', 'YYYYMMDD'], true).diff(dayjs(end, ['YYYY-MM-DD', 'YYYY/MMDD', 'YYYYMMDD'], true), unit));
    return !offset ? offset : offset + 1;
  }

  public static isSame(
    date1: string,
    date2: dayjs.ConfigType,
    unit: dayjs.OpUnitType = 'date'
  ): boolean {
    return dayjs(date1, ['YYYY-MM-DD', 'YYYY/MM/DD', 'YYYYMMDD'], true).isSame(dayjs(date2, ['YYYY-MM-DD', 'YYYY/MM/DD', 'YYYYMMDD'], true), unit);
  }
}
