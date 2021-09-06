import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

// Componente de mensagens de erros

@Component({
  selector: 'app-messages',
  template: `
    <div *ngIf="temError()" class="p-message p-message-error">
    {{ text }}
    </div>
  `,
  styles: [`
  .p-message-error {
      padding: 3px;
      margin: 0;
      margin-top: 4px;
    }
  `]
})
export class MessagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() text: string;
  @Input() control: FormControl;
  @Input() error: string;

  temError(): boolean {
    return this.control.hasError(this.error) && this.control.dirty;
  }

}
