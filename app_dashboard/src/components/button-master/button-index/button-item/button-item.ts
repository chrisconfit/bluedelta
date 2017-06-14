import { Component, Input } from '@angular/core';
import { ResourceProvider } from "../../../../providers/resource/resource.provider";
import { ButtonsProvider } from "../../../../providers/buttons/buttons";

@Component({
  selector: 'button-item',
  templateUrl: 'button-item.html'
})
export class ButtonItemComponent {
  @Input() button;

  constructor(
    public resourceService: ResourceProvider,
    public buttonService: ButtonsProvider
    ) {
  }

}
