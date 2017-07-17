import { Component, Input } from '@angular/core';
import { FabricsProvider } from "../../../../../providers/fabrics/fabrics";


@Component({
  selector: 'fabric-item-buttons',
  templateUrl: 'fabric-item-buttons.html'
})
export class FabricItemButtonsComponent {
  @Input() fabric;

  constructor(
    public fabricService: FabricsProvider
  ) {
  }

}
