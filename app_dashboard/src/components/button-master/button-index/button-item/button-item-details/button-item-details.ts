import { Component, Input } from '@angular/core';
import { ResourceProvider } from "../../../../../providers/resource/resource.provider";

@Component({
  selector: 'button-item-details',
  templateUrl: 'button-item-details.html'
})
export class ButtonItemDetailsComponent {
  @Input() button;


  constructor(
    public resourceService: ResourceProvider
  ) {
  }

}
