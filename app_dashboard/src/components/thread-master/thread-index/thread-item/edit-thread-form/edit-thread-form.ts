import { Component, Input } from '@angular/core';
import { ThreadsProvider } from "../../../../../providers/threads/threads";


@Component({
  selector: 'edit-thread-form',
  templateUrl: 'edit-thread-form.html'
})
export class EditThreadFormComponent {
  @Input() thread;

  constructor(
    public threadService: ThreadsProvider
  ) {
  }

}
