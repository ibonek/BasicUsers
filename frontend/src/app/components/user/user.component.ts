import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() userID!: any;
  @Input() iconSize!: string;
  @Input() iconOnly!: boolean;
  @Input() centered!: boolean;
  userData: any = null;
  initials: string = "";

  ngOnInit(): void {
    // TODO Get data from user service
    /*
    this.initials = this.userData.split(' ')
    .map(function(item: string) {
      return item[0];
    }).join('').substr(0, 3).toUpperCase();
    */
   this.initials="TO";
  }
}
