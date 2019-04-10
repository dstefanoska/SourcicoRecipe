import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';


import { RecipeModel } from 'src/app/models/RecipeModel';
import { RecipesService } from 'src/app/services/recipes.service'

import {
  SuiModalService,
  TemplateModalConfig,
  ModalTemplate,
  ModalSize
} from 'ng2-semantic-ui';

import * as $ from 'jquery';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  recipies: RecipeModel[] = new Array<RecipeModel>();
  tempRecipies: RecipeModel[] = new Array<RecipeModel>();

  @ViewChild(DatatableComponent)
  table: DatatableComponent;

  @ViewChild("areYouSure") areYouSureModal: ModalTemplate<null, string, string>;

  constructor(
    private recipeService: RecipesService,
    public modalService: SuiModalService,
    private router: Router
  ) {
    this.getRecepies();
  }

  getRecepies() {
    this.recipeService.getRecepies().subscribe(res => {
      this.recipies = res;
      this.tempRecipies = res;
    });
  }

  ngOnInit() {
    $('.app-loading').css('display', 'none');
  }

  open(recipe: RecipeModel) {
    this.router.navigate(['/recipe/' + recipe.id]);
  }

  getItems(event: any) {
    const val = event.target.value.toString().toLowerCase();;
    this.recipies = Object.assign(this.tempRecipies);

    // if the value is an empty string don't filter the items
    if (val && val.trim() != "") {
       this.recipies = this.tempRecipies.filter(item => {
        return item.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });

      this.table.offset = 0;
    }
  }

  public openAreYouSure(
    recipe: RecipeModel,
    size = ModalSize.Tiny
  ) {
    const config = new TemplateModalConfig<any, string, string>(
      this.areYouSureModal
    );

    config.context = {
    };

    config.size = size;
    config.isClosable = true;

    this.modalService
      .open(config)
      .onApprove(result => {
        this.recipeService.removeRecepi(recipe.id);
        this.getRecepies();
      })
      .onDeny(result => {});
  }
}
