import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '@app/pages/auth/auth.service';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAdmin = null;
  isLogged = false;

  @Output() toggleSidenav = new EventEmitter<void>();

  private subscription: Subscription = new Subscription;
  private destroy$ = new Subject<any>();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    this.authService.isLogged
    .pipe( takeUntil(this.destroy$))
    .subscribe((res) => (this.isLogged =  res))

    this.authService.isAdmin.pipe(
      takeUntil(this.destroy$)).subscribe(res => (this.isAdmin = res));
  }

  ngOnDestroy(){
    
    this.destroy$.next({});
    this.destroy$.complete();
  }

  onToggleSidenav():void{
    this.toggleSidenav.emit();
  }

  onLogout(){
    this.authService.logout();
  }

}
