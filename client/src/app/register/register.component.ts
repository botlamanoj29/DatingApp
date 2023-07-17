import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {}

  constructor(private accountservice: AccountService, private toastrService: ToastrService) { }

  ngOnInit(): void {
  }

  register() {
    this.accountservice.register(this.model).subscribe({
      next: () => {
        this.cancel();
      },
      error: error => {
        this.toastrService.error(error),
          console.log(error)
      }

    }

    )
  }
  cancel() {
    this.cancelRegister.emit(false);
  }

}
