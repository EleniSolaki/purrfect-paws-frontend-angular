import { Injectable } from '@angular/core';
import { Alert } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  alerts: Alert[] = [];

  newAlert(alert: Alert) {
    this.alerts.push(alert);
    if (alert.autoDismiss) {
      setTimeout(() => {
        this.alertDismiss(this.alerts.indexOf(alert));
      }, 5000); 
    }
  }
  alertDismiss(index: number) {
    this.alerts.splice(index, 1)
  }
}
