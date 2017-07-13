import { Component } from '@angular/core';
import { JeansProvider } from "../../../providers/jeans/jeans";


@Component({
  selector: 'jean-index',
  templateUrl: 'jean-index.html'
})
export class JeanIndexComponent {

  constructor(
    public jeanService: JeansProvider
  ) {
  }

}
