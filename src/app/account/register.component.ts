import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { LangValidator } from '@app/lang-keyb/lang.validators';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            firstName: ['', LangValidator.required('firstName')],
            lastName: ['', LangValidator.required('lastName')],
            username: ['', LangValidator.required('username')],
            password: ['', [LangValidator.required('password'),
                            LangValidator.minLength('password',6)]],
            email: ['', [LangValidator.required('email'),
                         LangValidator.email('email')  ]],
            phone: ['', LangValidator.required('phone')],
            address: ['', LangValidator.required('address')]

        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }
   c(ctrlName:string) { return this.f[ctrlName] as FormControl; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.register(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Registration successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../login'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}