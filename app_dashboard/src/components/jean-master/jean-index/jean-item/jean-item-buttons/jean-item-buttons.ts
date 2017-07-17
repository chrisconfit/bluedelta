import { Component, Input } from '@angular/core';
import { JeansProvider } from "../../../../../providers/jeans/jeans";

@Component({
  selector: 'jean-item-buttons',
  templateUrl: 'jean-item-buttons.html'
})
export class JeanItemButtonsComponent {
  @Input() jean;

  constructor(
    public jeansService: JeansProvider
  ) {
  }

}
