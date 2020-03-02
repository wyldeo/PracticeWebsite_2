import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../user.service'
import { User } from '../user'

@Component({
    selector: 'app-input-form',
    templateUrl: './input-form-component.html',
    providers: [UserService],
    styleUrls: ['./input-form.component.css']
})
export class InputFormComponent {
    user: User = new User();
    form: FormGroup;
    title: string = null;
    invalid: boolean = false;
    updated: boolean = false;

    // Form properties
    get firstName() { return this.form.get('firstName'); }
    get lastName() { return this.form.get('lastName'); }
    get email() { return this.form.get('email'); }
    get mobileNumber() { return this.form.get('mobileNumber'); }
    get dateOfBirth() { return this.form.get('dateOfBirth'); }

    get allValid() {
        return this.firstName.valid &&
            this.lastName.valid &&
            this.email.valid &&
            this.mobileNumber.valid &&
            this.dateOfBirth.valid
    }

    constructor(private userService: UserService, private formBuilder: FormBuilder, private route: ActivatedRoute) { }

    ngOnInit()
    {
        var _user: User = new User();

        this.setUpFormGroup(_user)

        // Are we updating someone?
        this.route.params.subscribe(params => {

            if (params.id) {
                this.title = 'Update user'

                this.userService
                    .getUser(params.id)
                    .subscribe(
                        result => {
                            _user = result;

                            this.setUpFormGroup(_user)

                            // Format to a nice date
                            this.form.controls['dateOfBirth'].setValue(new Date(_user.dateOfBirth).toISOString().substring(0, 10))
                        },
                        error => {
                            console.error(error)
                        });
            } else {
                this.title = 'Add user'
            }
        })
    }

    setUpFormGroup(user)
    {
        
        // Init form controls
        this.form = this.formBuilder.group({
            id: [user.id],
            firstName: [user.firstName, Validators.required],
            lastName: [user.lastName, Validators.required],
            email: [user.email, Validators.required],
            mobileNumber: [user.mobileNumber, Validators.required],
            dateOfBirth: [null, Validators.required],
        });
    }

    onSubmit()
    {

        // Check validity
        if (this.allValid) {

            this.user = this.form.value
            this.user.dateOfBirth = new Date(this.form.controls['dateOfBirth'].value)
            this.user.modified = new Date(Date.now())
            
            this.userService
                .updateUser(this.user.id, this.user)
                .subscribe(() => { this.updated = true }, error => { console.error(error) })
        }
    }

    diagnostic()
    {
        return JSON.stringify(this.user);
    }
}
