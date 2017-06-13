import { Component, Input } from '@angular/core';
import { ResourceProvider } from "../../../../../providers/resource/resource.provider";


@Component({
  selector: 'edit-button-form',
  templateUrl: 'edit-button-form.html'
})
export class EditButtonFormComponent {
  @Input() button;
  

  constructor(
    public resourceService: ResourceProvider
  ) {
  }

}
