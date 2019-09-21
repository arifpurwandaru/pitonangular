/* beautify preserve:start */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {KantinCrud} from '../pages/kantin/kantin.component';
/* beautify preserve:end */

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: KantinCrud
    }
    
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { useHash: true }),
    ],
    providers: [
    ],
    declarations: [
        // start_declarations
        // end_declarations
    ],
    exports: [RouterModule]
})
export class AppRouteModule {
}
