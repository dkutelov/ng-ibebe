import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Toaster, ToasterType } from './toaster.model';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  private subject = new Subject<Toaster>();

  constructor() {}

  onToaster(): Observable<Toaster> {
    return this.subject.asObservable();
  }

  toaster(toaster: Toaster) {
    this.subject.next(toaster);
  }

  success(message: string, autoClose: boolean = true): void {
    this.toaster({ message, type: ToasterType.Success, autoClose });
  }

  error(message: string, autoClose: boolean = true): void {
    this.toaster({ message, type: ToasterType.Error, autoClose });
  }
}
