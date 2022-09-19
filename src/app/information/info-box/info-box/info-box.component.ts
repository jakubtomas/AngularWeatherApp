import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.css']
})
export class InfoBoxComponent implements OnInit {

  @Input('src') src: string | undefined;
  @Input('property') property: string | undefined;
  @Input('nameProperty') nameProperty: string | undefined;

  @Input('maxTemp') maxTemp: number | undefined;
  @Input('minTemp') minTemp: number | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
