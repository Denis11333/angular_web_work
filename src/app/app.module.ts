import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {RegistrationPageComponent} from "./pages/registration-page/registration-page.component";
import {NavigationComponent} from "./components/navigation/navigation.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {InformationPageComponent} from './pages/information-page/information-page.component';
import {MyUnitsComponent} from './pages/my-units/my-units.component';
import {NgOptimizedImage} from "@angular/common";
import {UnitComponent} from './components/unit/unit.component';
import {ModalCreateUnitComponent} from './components/modals/modal-create-unit/modal-create-unit.component';
import {ModalEditUnitComponent} from './components/modals/modal-edit-unit/modal-edit-unit.component';
import {FilterUnitsPipe} from './pipes/filter-units.pipe';
import {
    ModalCreateServiceManComponent
} from './components/modals/modal-create-service-man/modal-create-service-man.component';
import {ShortedTextPipe} from './pipes/shorted-text.pipe';
import {UnauthorizedHandlerService} from "./services/errors/unauthorized-handler.service";
import {ShareUnitsComponent} from './pages/share-units/share-units.component';
import {UsersForShareComponent} from "./components/users-for-share/users-for-share.component";
import {UserForShareComponent} from './components/user-for-share/user-for-share.component';
import {FilterUsersPipe} from './pipes/filter-users.pipe';
import {AboutServiceManComponent} from "./pages/about-service-man/about-service-man.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
    declarations: [
        AppComponent,
        LoginPageComponent,
        RegistrationPageComponent,
        NavigationComponent,
        InformationPageComponent,
        MyUnitsComponent,
        UnitComponent,
        ModalCreateUnitComponent,
        ModalEditUnitComponent,
        FilterUnitsPipe,
        ModalCreateServiceManComponent,
        ShortedTextPipe,
        ShareUnitsComponent,
        UsersForShareComponent,
        UserForShareComponent,
        FilterUsersPipe,
        AboutServiceManComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        NgOptimizedImage,
        BrowserAnimationsModule,
    ],
    providers: [
        {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
        JwtHelperService,
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        {provide: ErrorHandler, useClass: UnauthorizedHandlerService}
    ],
    bootstrap: [AppComponent],

})
export class AppModule {
}
