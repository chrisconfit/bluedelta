import { Component, Input } from '@angular/core';
import { FabricsProvider } from "../../../../../providers/fabrics/fabrics";

@Component({
  selector: 'fabric-item-details',
  templateUrl: 'fabric-item-details.html'
})
export class FabricItemDetailsComponent {
  @Input() fabric;

  constructor(
    public fabricService: FabricsProvider
  ) {
  }

}
