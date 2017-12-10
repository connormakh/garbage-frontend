import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableService } from '../../../@core/data/smart-table.service';
import {StorageService} from "../../../@core/services/storage.service";
import {AuthenticationService} from "../../../@core/services/authentication.service";
import {User} from "../../../@core/models/user";

@Component({
  selector: 'ngx-company-drivers',
  templateUrl: './company-drivers.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class CompanyDriversComponent {

  constructor(private storageService: StorageService, private authenticationService: AuthenticationService) {
    this.source.load(this.storageService.read<User>("currentUser").company.drivers)
  }

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      public_id: {
        title: 'ID',
        type: 'string',
        editable: false
      },
      first_name: {
        title: 'First Name',
        type: 'string',
      },
      last_name: {
        title: 'Last Name',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      contact_number: {
        title: 'Contact Number',
        type: 'string',
      }
    },
    mode: 'inline',
    confirmCreate: true
  };

  source: LocalDataSource = new LocalDataSource();

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.authenticationService.deleteDriver(event.data.public_id)
        .subscribe(
          data => {
            event.confirm.resolve();
          },
          error => {
            // this.alertService.error(error);
          });
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    console.log(event)
    this.authenticationService.addDriver(event.newData.first_name + " " + event.newData.last_name, event.newData.email, event.newData.contact_number)
      .subscribe(
        data => {
          this.source.load(this.storageService.read<User>("currentUser").company.drivers)
        },
        error => {
          // this.alertService.error(error);
        });
  }

  onEditConfirm(event): void {
    console.log(event)

    this.authenticationService.editDriver(event.data, event.newData)

  }
}
