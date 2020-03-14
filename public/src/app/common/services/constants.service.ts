import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  public readonly baseAppPort: string = '4000';
  public readonly baseAppDomainLocal: string = 'https://localhost:' + this.baseAppPort;
  public readonly baseAppDomainWeb: string = 'https://napolnimojavto.si:' + this.baseAppPort;
  public readonly distLocation: string = 'MyApplication/';

  constructor() { }
}
