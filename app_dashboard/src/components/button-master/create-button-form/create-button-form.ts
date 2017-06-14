import { Component } from '@angular/core';
import { ResourceProvider } from "../../../providers/resource/resource.provider";
import { ButtonsProvider } from "../../../providers/buttons/buttons";

@Component({
  selector: 'create-button-form',
  templateUrl: 'create-button-form.html'
})
export class CreateButtonFormComponent {


  constructor(
    public resourceService: ResourceProvider,
    public buttonService: ButtonsProvider
  ) {
    
  }

}
