import { Component, Input } from '@angular/core';
import { JeansProvider } from "../../../../providers/jeans/jeans";

@Component({
  selector: 'jean-item',
  templateUrl: 'jean-item.html'
})
export class JeanItemComponent {
  @Input() jean;

  constructor(
    public jeanService: JeansProvider
  ) {    
  }

}
