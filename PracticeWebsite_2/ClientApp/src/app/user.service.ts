import { HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './user';

@Injectable()
export class UserService {
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'PASSWORD'
        })
    };

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

    addUser(user: User)
    {
        return this.http
            .post<User>(this.baseUrl + 'user', user, this.httpOptions)
    }

    updateUser(id:number, user: User)
    {

        if (!id) return this.addUser(user);

        return this.http
            .put<User>(this.baseUrl + 'user/' + id, user, this.httpOptions)
    }

    deleteUser(id: number)
    {
        return this.http
            .delete<User>(this.baseUrl + 'user/' + id, this.httpOptions)
    }

    getUser(id: number)
    {
        return this.http
            .get<User>(this.baseUrl + 'user/' + id, this.httpOptions);
    }

    getAllUsers()
    {
        return this.http
            .get<User[]>(this.baseUrl + 'user/all', this.httpOptions);
    }
}
