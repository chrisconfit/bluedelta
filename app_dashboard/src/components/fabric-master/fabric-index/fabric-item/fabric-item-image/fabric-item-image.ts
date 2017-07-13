import { Component, Input } from '@angular/core';
import { FabricsProvider } from "../../../../../providers/fabrics/fabrics";

@Component({
  selector: 'fabric-item-image',
  templateUrl: 'fabric-item-image.html'
})
export class FabricItemImageComponent {
  @Input() fabric;

  constructor(
    public fabricService: FabricsProvider
  ) {
  }

}
