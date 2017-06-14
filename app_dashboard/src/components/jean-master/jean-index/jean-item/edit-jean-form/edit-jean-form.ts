import { Component, Input } from '@angular/core';


@Component({
  selector: 'edit-jean-form',
  templateUrl: 'edit-jean-form.html'
})
export class EditJeanFormComponent {
  @Input() jean;

  constructor() {
  }

}
