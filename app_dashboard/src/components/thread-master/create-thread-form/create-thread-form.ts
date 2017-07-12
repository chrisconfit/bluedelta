import { Component } from '@angular/core';

import { ThreadsProvider } from "../../../providers/threads/threads";


@Component({
  selector: 'create-thread-form',
  templateUrl: 'create-thread-form.html'
})
export class CreateThreadFormComponent {


  constructor(
    public threadService: ThreadsProvider
  ) {
  }

}
