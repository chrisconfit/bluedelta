import { Component } from '@angular/core';
import { ResourceProvider } from "../../../providers/resource/resource.provider";

@Component({
  selector: 'create-button-form',
  templateUrl: 'create-button-form.html'
})
export class CreateButtonFormComponent {


  constructor(
    public resourceService: ResourceProvider
  ) {
    
  }

}
