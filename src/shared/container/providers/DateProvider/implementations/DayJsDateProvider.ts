import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

export class DayJsDateProvider implements IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number {
    const endDateToUtc = this.convertToUtc(end_date);
    const startDateToUtc = this.convertToUtc(start_date);
    return dayjs(endDateToUtc).diff(startDateToUtc, "hours");
  }

  private convertToUtc(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  dateNow(): Date {
    return dayjs().toDate();
  }
}
