import { Component, Input } from '@angular/core';
import { JeansProvider } from "../../../../../providers/jeans/jeans";

@Component({
  selector: 'jean-item-details',
  templateUrl: 'jean-item-details.html'
})
export class JeanItemDetailsComponent {
  @Input() jean;

  constructor(
    public jeanService: JeansProvider
  ) {
  }

}
