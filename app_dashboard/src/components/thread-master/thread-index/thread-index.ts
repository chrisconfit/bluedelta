import { Component } from '@angular/core';
import { ThreadsProvider } from "../../../providers/threads/threads";


@Component({
  selector: 'thread-index',
  templateUrl: 'thread-index.html'
})
export class ThreadIndexComponent {

  constructor(
    public threadService: ThreadsProvider
  ) {
    
  }

}
