import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Components
import { AppComponent } from './app.component';
import { ListSecretarysComponent } from './components/list-secretary/list-secretary.component';
import { AgregarEditarSecretaryComponent } from './components/agregar-editar-secretary/agregar-editar-secretary.component';
import { ListMedicsComponent } from './components/list-medics/list-medics.component';
import { AddEditMedicComponent } from './components/add-edit-medic/add-edit-medic.component';
import { ListSpecialtyComponent } from './components/list-specialty/list-specialty.component';
import { AgregarEditarSpecialtyComponent } from './components/agregar-editar-specialty/agregar-editar-specialty.component';

// Modulos
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    ListSecretarysComponent,
    AgregarEditarSecretaryComponent,
    ListSpecialtyComponent,
    AgregarEditarSpecialtyComponent,
    ListMedicsComponent,
    AddEditMedicComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
