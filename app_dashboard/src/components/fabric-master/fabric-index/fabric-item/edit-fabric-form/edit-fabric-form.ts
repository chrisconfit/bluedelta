import { Component, Input } from '@angular/core';
import { FabricsProvider } from "../../../../../providers/fabrics/fabrics";


@Component({
  selector: 'edit-fabric-form',
  templateUrl: 'edit-fabric-form.html'
})
export class EditFabricFormComponent {
  @Input() fabric;

  constructor(
    public fabricService: FabricsProvider
  ) {
  }

}
