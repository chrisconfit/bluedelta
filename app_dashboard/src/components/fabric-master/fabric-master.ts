import { Component } from '@angular/core';
import { FabricsProvider } from "../../providers/fabrics/fabrics";


@Component({
  selector: 'fabric-master',
  templateUrl: 'fabric-master.html'
})
export class FabricMasterComponent {


  constructor(
    public fabricService: FabricsProvider
  ) {    
  }

}
