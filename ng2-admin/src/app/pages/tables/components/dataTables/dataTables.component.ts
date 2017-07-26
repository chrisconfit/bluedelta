import { Component, OnInit } from '@angular/core';
import { DataTablesService } from './dataTables.service';
import {UsersProvider} from "../../../../../providers/users/users";

@Component({
  selector: 'data-tables',
  templateUrl: './dataTables.html',
  styleUrls: ['./dataTables.scss']
})
export class DataTables {

    data;
    filterQuery = "";
    rowsOnPage = 10;
    sortBy = "email";
    sortOrder = "asc";

    constructor(
      private service: DataTablesService,
      public userService: UsersProvider,
    ) {
    /*this.service.getData().then((data) => {
      this.data = data;
    });*/
    this.userService.loadItemsWithAuth().then((data) => {
      this.data = data;
    });
  }

    toInt(num: string) {
        return +num;
    }

    sortByWordLength = (a: any) => {
        return a.city.length;
    }

}
