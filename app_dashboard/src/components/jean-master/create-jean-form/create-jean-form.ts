import { Component } from '@angular/core';
import { JeansProvider } from "../../../providers/jeans/jeans";
import {ButtonsProvider} from "../../../providers/buttons/buttons";
import {FabricsProvider} from "../../../providers/fabrics/fabrics";
import {ThreadsProvider} from "../../../providers/threads/threads";

@Component({
  selector: 'create-jean-form',
  templateUrl: 'create-jean-form.html'
})
export class CreateJeanFormComponent {

  constructor(
    public jeanService: JeansProvider,
    public buttonService: ButtonsProvider,
    public fabricService: FabricsProvider,
    public threadService: ThreadsProvider
  ) {
  }

}
