import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss']
})
export class ToggleButtonComponent {
  @Input() text?: string;
  @Input() icon?: string;
  @Input() status?: boolean = true;
  @Output() onClick = new EventEmitter<any>();

  toggle(): void {
    this.status = !this.status;
    this.onClick.emit({ value: this.status});
  }
}
