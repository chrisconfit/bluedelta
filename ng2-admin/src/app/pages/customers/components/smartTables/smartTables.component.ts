import { Component, Input, OnInit } from '@angular/core';

import { SmartTablesService } from './smartTables.service';
import { LocalDataSource } from 'ng2-smart-table';
import { UsersProvider } from "providers/users/users";


@Component({
  selector: 'smart-tables',
  templateUrl: './smartTables.html',
})
export class SmartTables {
  query: string = '';

  settings = {
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true,
    },
    columns: {
      name: {
        title: 'Name',
        type: 'string',
      },
      email: {
        title: 'Email',
        type: 'string',
      },
      phoneNumber: {
        title: 'Phone',
        type: 'string',
      },
    },
  };

  tableData: LocalDataSource = new LocalDataSource();

  source;

  loadUsers() {
    this.source = [
      ...this.userService.list,
    ];
  }

  constructor(
    public userService: UsersProvider,
  ) {
    console.log('Service LIST: ', this.userService.loadItemsWithAuth());
    // this.loadUsers();
    // this.tableData.load(this.userService.loadItemsWithAuth());
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  ngOnInit() {

  }
}

