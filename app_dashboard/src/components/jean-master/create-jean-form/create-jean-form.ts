import { Component } from '@angular/core';
import { JeansProvider } from "../../../providers/jeans/jeans";
import { FabricsProvider } from "../../../providers/fabrics/fabrics";
import { ButtonsProvider } from "../../../providers/buttons/buttons";
import { ThreadsProvider } from "../../../providers/threads/threads";
import { OrdersProvider } from "../../../providers/orders/orders";


@Component({
  selector: 'create-jean-form',
  templateUrl: 'create-jean-form.html'
})
export class CreateJeanFormComponent {

  constructor(
    public jeanService: JeansProvider,
    public fabricService: FabricsProvider,
    public buttonService: ButtonsProvider,
    public threadService: ThreadsProvider,
    public orderService: OrdersProvider
  ) {
  }

}
