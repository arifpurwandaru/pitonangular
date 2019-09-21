import {Component, OnInit, Inject} from "@angular/core";
import { Router }            from '@angular/router';


@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent {
     constructor(
        private router: Router
     ) {}

    home(){
        this.router.navigate(['/home']);
    }
}