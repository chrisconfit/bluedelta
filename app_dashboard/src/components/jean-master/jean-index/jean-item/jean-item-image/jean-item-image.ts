import { Component, Input } from '@angular/core';
import { JeansProvider } from "../../../../../providers/jeans/jeans";

@Component({
  selector: 'jean-item-image',
  templateUrl: 'jean-item-image.html'
})
export class JeanItemImageComponent {
  @Input() jean;

  constructor(
    public jeanService: JeansProvider
  ) {
  }

}
