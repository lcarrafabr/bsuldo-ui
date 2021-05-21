import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
      <div *ngIf="temErro()" class="p-message p-message-error">
          {{ text }}
      </div>
  `,
  styleUrls: ['./message.component.css']
})
export class MessageComponent {

  @Input() error: string;
  @Input() control: FormControl;
  @Input() text: string;

  temErro() : Boolean {

    return this.control.hasError(this.error) && this.control.dirty;
  }

}
