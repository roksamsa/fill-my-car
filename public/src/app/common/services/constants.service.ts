import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  public readonly isProduction = false;

  public baseAppDomain = '';
  public readonly baseAppPort = '4000';
  public readonly baseAppDomainName = 'http://localhost';
  public readonly baseAppDomainNameWeb = 'https://api.napolnimojavto.si/';

  public readonly baseAppDomainLocal = this.baseAppDomainName + ':' + this.baseAppPort + '/';
  public readonly baseAppDomainWeb = this.baseAppDomainNameWeb;

  public readonly messageProduction = 'Application is running in PRODUCTION mode.';
  public readonly messageDevelopment = 'Application is running in DEVELOPMENT mode.';

  public readonly currentDate = new Date();
  public readonly dateFormat = 'EEEE, dd. MMMM yyyy, HH:mm';
  public readonly dateFormatWithoutTime = 'EEEE, dd. MMMM yyyy';
  public readonly dateFormatWithoutTimeReadyForDate = 'yyyy, MM, dd';

  constructor() {
    if (this.isProduction) {
      this.baseAppDomain = this.baseAppDomainWeb;
    } else {
      this.baseAppDomain = this.baseAppDomainLocal;
    }
  }

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

  public generateLetterForUserAvatar(string: string): void {
    string.charAt(0);
  }
}
