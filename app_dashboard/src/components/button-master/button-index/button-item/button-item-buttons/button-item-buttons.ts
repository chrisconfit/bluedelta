import { Component, Input } from '@angular/core';
import { ResourceProvider } from "../../../../../providers/resource/resource.provider";
import { ButtonsProvider } from "../../../../../providers/buttons/buttons";


@Component({
  selector: 'button-item-buttons',
  templateUrl: 'button-item-buttons.html'
})
export class ButtonItemButtonsComponent {
  @Input() button;
  

  constructor(
    public resourceService: ResourceProvider,
    public buttonService: ButtonsProvider
  ) {
  }

}
