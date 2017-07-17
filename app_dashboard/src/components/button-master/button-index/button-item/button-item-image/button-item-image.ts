import { Component, Input } from '@angular/core';
import { ResourceProvider } from "../../../../../providers/resource/resource.provider";
import { ButtonsProvider } from "../../../../../providers/buttons/buttons";

@Component({
  selector: 'button-item-image',
  templateUrl: 'button-item-image.html'
})
export class ButtonItemImageComponent {
  @Input() button;
  
  constructor(
    public resourceService: ResourceProvider,
    public buttonService: ButtonsProvider
  ) {
    
  }

}
