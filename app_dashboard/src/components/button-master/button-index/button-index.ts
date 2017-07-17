import { Component } from '@angular/core';
import { ButtonItemComponent } from './button-item/button-item';
import { ResourceProvider } from "../../../providers/resource/resource.provider";
import { ButtonsProvider } from "../../../providers/buttons/buttons";

@Component({
  selector: 'button-index',
  templateUrl: 'button-index.html'
})
export class ButtonIndexComponent {

  

  constructor(
    public resourceService: ResourceProvider,
    public buttonService: ButtonsProvider
  ) {
  }

}
