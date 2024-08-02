import { EFormMode } from "@shared/ultilities/enums/common.enum";
import { EInputType, EState } from "../tasks.enum";
import { ICard, IFilter } from "../tasks.interface";

export class Cards {
  list: ICard[] = [
    {
      id: `${Date.now()}`,
      mode: EFormMode.VIEW,
      show: true,
      state: EState.UnCompleted,
      createTime: '2024-07-29 13:20:10',
      title: '第一張卡的標題',
      content: '第一張卡的內容'
    }
  ];
  constructor() { }

  public add() {
    this.list.unshift({
      id: `${Date.now()}`,
      mode: EFormMode.EDIT,
      show: true,
      state: EState.UnCompleted,
      createTime: new Date().toISOString(),
      title: '',
      content: ''
    })
  }

  public delete(index: number) {
    if (index >= 0 && index < this.list.length) {

      this.list.splice(index, 1);
    };
  }

  public filter(filter: IFilter): void {
    const { state, input, inputType, startTime, endTime } = filter;
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    this.list = this.list.map(card => {
      const matchesState = state === EState.All || state === card.state;
      const matchesTitle = input === '' || card.title.includes(input);
      const matchesContent = input === '' || card.content.includes(input);
      const createDate = new Date(card.createTime);
      const matchesDateRange = (startTime === '' && endTime === '')
        || (createDate >= startDate && createDate <= endDate);
      const matchesInput = inputType === EInputType.All
        ? (matchesTitle || matchesContent)
        : inputType === EInputType.Title
          ? matchesTitle
          : matchesContent;

      return {
        ...card,
        show: matchesState && matchesInput && matchesDateRange
      };
    });
  }

}
