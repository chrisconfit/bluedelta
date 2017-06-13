import { Component, Input } from '@angular/core';
import { ResourceProvider } from "../../../../../providers/resource/resource.provider";


@Component({
  selector: 'button-item-buttons',
  templateUrl: 'button-item-buttons.html'
})
export class ButtonItemButtonsComponent {
  @Input() button;
  

  constructor(
    public resourceService: ResourceProvider
  ) {
  }

}
