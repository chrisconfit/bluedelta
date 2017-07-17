import { Component } from '@angular/core';
import { ResourceProvider } from "../../providers/resource/resource.provider";
import { ButtonsProvider } from "../../providers/buttons/buttons";

@Component({
  selector: 'button-master',
  templateUrl: 'button-master.html'
})
export class ButtonMasterComponent {

  constructor(
    public resourceService: ResourceProvider,
    public buttonService: ButtonsProvider
  ) {
  }

}

