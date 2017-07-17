import { Component } from '@angular/core';
import { FabricsProvider } from "../../../providers/fabrics/fabrics";


@Component({
  selector: 'fabric-index',
  templateUrl: 'fabric-index.html'
})
export class FabricIndexComponent {

  constructor(
    public fabricService: FabricsProvider
  ) {
    
  }

}
