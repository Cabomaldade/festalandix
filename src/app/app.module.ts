import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormularioComponent } from './formulario/formulario.component';
import { ListaconvidadosComponent} from './listaconvidados/listaconvidados.component';
import { FormulariopremontadoComponent } from './formulariopremontado/formulariopremontado.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ColaboradorServiceService } from './servicos/colaborador-service.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    FormulariopremontadoComponent,
    ListaconvidadosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
   ],
  providers: [ColaboradorServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
