import { Component, Input } from '@angular/core';
import { ResourceProvider } from "../../../../../providers/resource/resource.provider";
import { ButtonsProvider } from "../../../../../providers/buttons/buttons";


@Component({
  selector: 'edit-button-form',
  templateUrl: 'edit-button-form.html'
})
export class EditButtonFormComponent {
  @Input() button;
  

  constructor(
    public resourceService: ResourceProvider,
    public buttonService: ButtonsProvider
  ) {
  }

}
