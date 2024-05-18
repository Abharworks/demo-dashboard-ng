import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';

@NgModule({
    declarations: [AppComponent],
    imports: [AppRoutingModule, AppLayoutModule],
    bootstrap: [AppComponent]
})
export class AppModule {}
