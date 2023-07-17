import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editform') editform: NgForm | undefined;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editform?.dirty) {
      $event.returnValue = true;
    }
  }
  member: Member | undefined;
  user: User | null = null;

  constructor(private accountService: AccountService, private memberService: MembersService, private toastr: ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => this.user = user, error: error => console.log(error)
      //  next: user =>  console.log(this.user)
    })
  }

  ngOnInit(): void {
    this.loadMember()

  }

  loadMember() {
    // console.log(this.user)
    if (!this.user) return;
    // console.log('Before service Member call')
    // this.memberService.getMember(this.user.username).subscribe({
    //   next: member => this.member = member
    // })
    this.memberService.getMember('kay').subscribe({
      next: member => this.member = member
    })
    // console.log('After service Member call' + this.member)
  }

  updateMember() {
    this.memberService.updateMember(this.editform?.value).subscribe({
      next: _ => {
        this.toastr.success('Profile updated successfully');
        this.editform?.reset(this.member);
      }
    })

  }

}
