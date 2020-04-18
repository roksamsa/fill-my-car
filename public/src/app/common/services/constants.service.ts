import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  public readonly baseAppPort: string = '4000';
  public readonly baseAppDomainLocal: string = 'http://localhost:' + this.baseAppPort + '/api/';
  public readonly baseAppDomainWeb: string = 'https://napolnimojavto.si:' + this.baseAppPort;

  public readonly currentDate = new Date();
  public readonly dateFormat = 'EEEE, dd. MMMM yyyy, HH:mm';
  public readonly dateFormatWithoutTime = 'EEEE, dd. MMMM yyyy';
  public readonly dateFormatWithoutTimeReadyForDate = 'yyyy, MM, dd';

  constructor() { }

  public numberZeroPadding(num: number): string {
    return ('0' + num).slice(-2);
  }

  public dateFilter = (date: Date): boolean => {
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    return yesterday < date;
  }

  public roundNumber(value: number, precision: number, type: string): number {
    const multiplier = Math.pow(10, precision || 0);
    if (type === 'up') {
      return Math.round(value * multiplier) / multiplier;
    } else if (type === 'down') {
      return Math.floor(value * multiplier) / multiplier;
    } else {
      return Math.round(value * multiplier) / multiplier;
    }
}
}
