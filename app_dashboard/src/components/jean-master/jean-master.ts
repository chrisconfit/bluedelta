import { Component } from '@angular/core';
import { JeansProvider } from "../../providers/jeans/jeans";

@Component({
  selector: 'jean-master',
  templateUrl: 'jean-master.html'
})
export class JeanMasterComponent {

  constructor(
    public jeanService: JeansProvider
  ) {
  }

}
