import { Component } from '@angular/core';
import { JeansProvider } from "../../../providers/jeans/jeans";

@Component({
  selector: 'create-jean-form',
  templateUrl: 'create-jean-form.html'
})
export class CreateJeanFormComponent {

  constructor(
    public jeanService: JeansProvider
  ) {
  }

}
