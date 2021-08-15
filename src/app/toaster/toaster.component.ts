import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

import { ToasterType, Toaster } from './toaster.model';
import { ToasterService } from './toaster.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css'],
})
export class ToasterComponent implements OnInit, OnDestroy {
  toaster: Toaster | null = null;
  toasterSubscription!: Subscription;

  constructor(private toasterService: ToasterService, private router: Router) {}

  ngOnInit(): void {
    this.toasterSubscription = this.toasterService
      .onToaster()
      .subscribe((toaster) => {
        console.log(toaster);

        if (!toaster.message) {
          return;
        }

        this.toaster = toaster;

        if (toaster.autoClose) {
          setTimeout(() => {
            this.removeToaster();
          }, 3000);
        }
      });
  }

  removeToaster(): void {
    this.toaster = null;
  }

  setCssClass(toaster: Toaster): string {
    if (!toaster) return '';

    const classes = ['notification'];

    const toasterTypeClass = {
      [ToasterType.Success]: 'success',
      [ToasterType.Error]: 'error',
    };

    classes.push(toasterTypeClass[toaster.type]);

    return classes.join(' ');
  }

  ngOnDestroy(): void {
    this.toasterSubscription.unsubscribe();
  }
}
