import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  public readonly baseAppPort: string = '4000';
  public readonly baseAppDomainLocal: string = 'http://localhost:' + this.baseAppPort;
  public readonly baseAppDomainWeb: string = 'https://napolnimojavto.si:' + this.baseAppPort;

  public readonly currentDate = new Date();
  public readonly dateFormat = 'EEEE, dd. MMMM yyyy, HH:mm';
  public readonly dateFormatWithoutTime = 'EEEE, dd. MMMM yyyy';

  constructor() { }

  public numberZeroPadding(num: number): string {
    return ('0' + num).slice(-2);
  }
}
