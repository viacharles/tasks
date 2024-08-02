import { IOption } from "@shared/ultilities/interfaces/common.interface";

export class Obj {

  public static getOptionFromEnum<T>(enumObj: T): IOption[] {
    return Object.values(enumObj as {}).map(value => ({
      code: value as string,
      name: value as string
    }))
  }
}
