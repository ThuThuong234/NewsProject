import * as moment from 'moment';

export class Utils {
  public static isEmail(email: string): boolean {
    const regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  public static isPhoneNumber(phone: string): boolean {
    if (phone == null || phone === undefined || phone.length === 0) {
      return false;
    }
    const regex = /^\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/;
    if (!regex.test(phone)) {
      return false;
    }

    if (phone.startsWith('0')) {
      return phone.length >= 10 && phone.length <= 11;
    } else {
      return phone.length >= 11 && phone.length <= 12;
    }
  }

  public static isFullName(fullName: string) {
    const charsCount = fullName.trim().length;
    return charsCount >= 4 && charsCount <= 25;
  }

  public static isBirthday(birthday: Date) {
    return moment(birthday).isBefore(new Date());
  }

  public static isIdentificationNumber(identificationNumber: string) {
    const regex = /^[a-zA-Z0-9]*$/;
    return regex.test(identificationNumber); // && identificationNumber.trim().length > 5;
  }

  public static isIdentificationExpiredDay(identificationExpiredDay: Date) {
    return (new Date()) < identificationExpiredDay;
  }

  public static isDateEmpty(date: Date) {
    if (date) {
      return false;
    }
    return true;
  }

  public static isSameDate(date: Date, compare: Date) {
    if (Utils.isDateEmpty(date) && Utils.isDateEmpty(compare)) {
      return true;
    }

    if (!Utils.isDateEmpty(date) && !Utils.isDateEmpty(compare)) {
      return moment(date).isSame(moment(compare), 'day');
    }

    return false;
  }
}
