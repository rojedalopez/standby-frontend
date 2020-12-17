import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'label-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.sass']
})
export class ErrorComponent implements OnChanges {

  @Input() control: FormControl;
  @Input() name: String;
  @Input() length?: any;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
  }


}
