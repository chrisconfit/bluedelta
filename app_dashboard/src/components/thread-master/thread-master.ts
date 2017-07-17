import { Component } from '@angular/core';
import { ThreadsProvider } from "../../providers/threads/threads";


@Component({
  selector: 'thread-master',
  templateUrl: 'thread-master.html'
})
export class ThreadMasterComponent {


  constructor(
    public threadService: ThreadsProvider
  ) {    
  }

}
