import { Component } from '@angular/core';

import { UserService } from '../user.service';
import { User } from '../user';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    providers: [UserService],
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
    users: User[];

    constructor(private userService: UserService)
    {
        this.fetchData();
    }

    fetchData()
    {
        this.userService
            .getAllUsers()
            .subscribe(result => { this.users = result }, error => { console.error(error) });
    }

    onDelete(id: number) {
        this.userService
            .deleteUser(id)
            .subscribe(() => { this.fetchData() }, error => { console.error(error) });
    }
}
