import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-fields',
  templateUrl: './custom-fields.component.html',
  styleUrls: ['./custom-fields.component.scss']
})
export class CustomFieldsComponent {
  @Input() customFields!: any;
  @Input() icon: boolean = true;
  @Output() onClick = new EventEmitter<any>();

  fieldClicked(field: any, value: any): void {
    // TODO
    this.onClick.emit({ name: field, value: value});
  }


}
