import { Component, OnInit } from '@angular/core';
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
      public userService: UsersProvider,
    ) {
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
