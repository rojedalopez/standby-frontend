import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.sass']
})
export class LoadingComponent implements OnInit {

  isVisible: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

}
