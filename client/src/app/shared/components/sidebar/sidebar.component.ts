import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/pages/auth/auth.service';
import { UtilsService } from '@app/shared/Services/utils.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private authService:AuthService, private utilsSvc:UtilsService) { }

  ngOnInit(): void {
  }

  onExit():void{
    this.authService.logout();
    this.utilsSvc.openSidebar(false);
  }

}
