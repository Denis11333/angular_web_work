import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegistrationPageComponent} from "./pages/registration-page/registration-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {InformationPageComponent} from "./pages/information-page/information-page.component";
import {MyUnitsComponent} from "./pages/my-units/my-units.component";
import {AuthGuard} from "./guards/auth.guard";
import {ShareUnitsComponent} from "./pages/share-units/share-units.component";

const routes: Routes = [
  {path: '', component: InformationPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'registration', component: RegistrationPageComponent},
  {path: 'my-units', component: MyUnitsComponent, canActivate: [AuthGuard]},
  {path: 'share-units', component: ShareUnitsComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
