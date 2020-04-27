import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  public readonly isProduction = true;

  public baseAppDomain = '';
  public readonly baseAppPort = '4000';
  public readonly baseAppPortSSL = '4433';
  public readonly baseAppDomainName = 'localhost';
  public readonly baseAppDomainNameWeb = 'napolnimojavto.si';
  public readonly baseAppDomainProtocol = 'http://';
  public readonly baseAppDomainProtocolSSL = 'https://';

  public readonly baseAppDomainLocal =
    this.baseAppDomainProtocol + this.baseAppDomainName + ':' + this.baseAppPort + '/api/';

  public readonly baseAppDomainWeb =
    this.baseAppDomainProtocolSSL + this.baseAppDomainNameWeb + ':' + this.baseAppPortSSL + '/api/';

  public readonly messageProduction = 'Application is running in PRODUCTION mode.';
  public readonly messageDevelopment = 'Application is running in DEVELOPMENT mode.';

  public readonly currentDate = new Date();
  public readonly dateFormat = 'EEEE, dd. MMMM yyyy, HH:mm';
  public readonly dateFormatWithoutTime = 'EEEE, dd. MMMM yyyy';
  public readonly dateFormatWithoutTimeReadyForDate = 'yyyy, MM, dd';

  constructor() {
    console.log('*****************************************');
    if (this.isProduction) {
      console.log(this.messageProduction);
      this.baseAppDomain = this.baseAppDomainWeb;
    } else {
      console.log(this.messageDevelopment);
      this.baseAppDomain = this.baseAppDomainLocal;
    }
    console.log('API URL used: ' + this.baseAppDomain);
    console.log('*****************************************');
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
