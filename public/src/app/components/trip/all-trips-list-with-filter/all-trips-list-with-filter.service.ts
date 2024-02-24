import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AllTripsListWithFilterService {

  private searchValue = new BehaviorSubject('');
  currentSearchValue = this.searchValue.asObservable();

  constructor() { }

  changeSearchValue(searchValue: string) {
    this.searchValue.next(searchValue);
  }
}
