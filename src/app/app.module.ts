import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SuiModule } from 'ng2-semantic-ui';
import { ToastrModule } from "ngx-toastr";

import { AppComponent } from './app.component';

// App layout
import { PageLayoutComponent } from './layouts/page-layout.component';

// Views
import { HomeComponent } from './views/home/home.component';
import { RecipeComponent } from './views/recipe/recipe.component';

// Components
import { FooterModule } from './components/footer/footer.module';
import { NavbarModule } from './components/navbar/navbar.module';
import { GoBackComponent } from './components/go-back/go-back.component';

// Pipes
import { TransformTimePipe } from './pipes/transform-time.pipe';
import { TransformIngrediencePipe } from './pipes/transform-ingredience.pipe';
import { LongTextEllipsisPipe } from './pipes/long-text-ellipsis.pipe';

// Angular material
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatStepperModule,
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    PageLayoutComponent,
    HomeComponent,
    TransformTimePipe,
    TransformIngrediencePipe,
    LongTextEllipsisPipe,
    RecipeComponent,
    GoBackComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: "toast-bottom-right",
      preventDuplicates: true,
      progressBar: true
    }),
    NgxDatatableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    NavbarModule,
    FooterModule,
    SuiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
