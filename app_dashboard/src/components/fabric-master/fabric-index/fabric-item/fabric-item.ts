import { Component, Input } from '@angular/core';
import { FabricsProvider } from "../../../../providers/fabrics/fabrics";


@Component({
  selector: 'fabric-item',
  templateUrl: 'fabric-item.html'
})
export class FabricItemComponent {
  @Input() fabric;
  

  constructor(
    public fabricService: FabricsProvider
  ) {
  }

}
