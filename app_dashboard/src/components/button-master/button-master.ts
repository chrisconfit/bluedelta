import { Component } from '@angular/core';
import { ResourceProvider } from "../../providers/resource/resource.provider";

@Component({
  selector: 'button-master',
  templateUrl: 'button-master.html'
})
export class ButtonMasterComponent {

  constructor(
    public resourceService: ResourceProvider
  ) {
  }

}
