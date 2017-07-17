import { Component } from '@angular/core';

import { FabricsProvider } from "../../../providers/fabrics/fabrics";


@Component({
  selector: 'create-fabric-form',
  templateUrl: 'create-fabric-form.html'
})
export class CreateFabricFormComponent {


  constructor(
    public fabricService: FabricsProvider
  ) {
  }

}
