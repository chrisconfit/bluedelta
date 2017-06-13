import { Component, Input } from '@angular/core';
import { ResourceProvider } from "../../../../providers/resource/resource.provider";

@Component({
  selector: 'button-item',
  templateUrl: 'button-item.html'
})
export class ButtonItemComponent {
  @Input() button;

  constructor(
    public resourceService: ResourceProvider
    ) {
  }

}
