import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'lib-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent  {
  @Input() type: 'primary' | 'success' | 'warning' | 'danger' | 'info' = 'info';
  @Input() heading: string | undefined;
  @Input() text = 'This is the alert text'
  @Input() spinner: boolean | undefined;
  @Input() autoDismiss = false; 
  @Output() dismiss = new EventEmitter();

  onDismiss(){
    this.dismiss.emit();
  }

}
