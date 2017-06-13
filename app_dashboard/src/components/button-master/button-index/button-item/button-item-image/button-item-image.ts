import { Component, Input } from '@angular/core';
import { ResourceProvider } from "../../../../../providers/resource/resource.provider";

@Component({
  selector: 'button-item-image',
  templateUrl: 'button-item-image.html'
})
export class ButtonItemImageComponent {
  @Input() button;
  
  constructor(
    public resourceService: ResourceProvider
  ) {
    
  }

}
