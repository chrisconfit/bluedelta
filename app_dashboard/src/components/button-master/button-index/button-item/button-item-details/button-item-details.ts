import { Component, Input } from '@angular/core';
import { ResourceProvider } from "../../../../../providers/resource/resource.provider";
import { ButtonsProvider } from "../../../../../providers/buttons/buttons";

@Component({
  selector: 'button-item-details',
  templateUrl: 'button-item-details.html'
})
export class ButtonItemDetailsComponent {
  @Input() button;


  constructor(
    public resourceService: ResourceProvider,
    public buttonService: ButtonsProvider
  ) {
  }

}
