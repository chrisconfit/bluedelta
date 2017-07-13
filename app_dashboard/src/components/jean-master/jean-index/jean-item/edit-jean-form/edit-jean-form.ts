import { Component, Input } from '@angular/core';
import { JeansProvider } from "../../../../../providers/jeans/jeans";


@Component({
  selector: 'edit-jean-form',
  templateUrl: 'edit-jean-form.html'
})
export class EditJeanFormComponent {
  @Input() jean;

  constructor(
    public jeanService: JeansProvider
  ) {
  }

}
