import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { RecipeModel, Ingredient } from 'src/app/models/RecipeModel';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from 'src/app/services/recipes.service';
import { ToastrService } from 'ngx-toastr';

import {
  SuiModalService,
  TemplateModalConfig,
  ModalTemplate,
  ModalSize
} from 'ng2-semantic-ui';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  recipe: RecipeModel = new RecipeModel();

  prepTimeHours: number;
  prepTimeMinutes: number;

  @ViewChild('card') Card: ElementRef;
  cardHeight: number;

  @ViewChild("deleteRecipeElement") deleteRecipeModal: ModalTemplate<null, string, string>;
  @ViewChild("deleteIngredientElement") deleteIngredientModal: ModalTemplate<null, string, string>;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipesService,
    public modalService: SuiModalService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private notificationsService: ToastrService
  ) { }

  ngOnInit() {
    this.recipe.id = this.route.snapshot.params.recipe_id;
    if (this.recipe.id != 0) {
      this.getRecipe();
    } else {
      this.addIngredient();
    }
  }

  ngAfterViewChecked() {
    this.cardHeight = this.Card.nativeElement.offsetHeight;
    this.cd.detectChanges();
  }

  getRecipe() {
    this.recipeService.getRecipe(this.recipe.id).subscribe(res => {
      this.recipe = res;
      this.prepTimeHours = Math.floor(this.recipe.prepTime / 60);
      this.prepTimeMinutes = this.recipe.prepTime % 60;
    });
  }

  addIngredient() {
    if (!this.recipe.ingredients) {
      this.recipe.ingredients = new Array<Ingredient>();
    }
    this.recipe.ingredients.push(new Ingredient());
  }

  save() {
    this.recipe.prepTime = this.prepTimeHours * 60 + this.prepTimeMinutes;
    this.recipeService.addOrUpdateRecepies(this.recipe);
    this.goBack();
  }

  goBack() {
    this.router.navigate([this.activatedRoute.snapshot.url[0].path]);
  }

  public deleteIngredient(
    ingredient: Ingredient,
    size = ModalSize.Tiny
  ) {
    const config = new TemplateModalConfig<any, string, string>(
      this.deleteIngredientModal
    );

    config.context = {
    };

    config.size = size;
    config.isClosable = true;

    this.modalService
      .open(config)
      .onApprove(result => {
        let index = this.recipe.ingredients.findIndex(x => x.name == ingredient.name);
        this.recipe.ingredients.splice(index, 1);
        this.notificationsService.success("Success", "Ingredient successfully removed");
      })
      .onDeny(result => {});
  }

  public deleteRecipe(
    size = ModalSize.Tiny
  ) {
    const config = new TemplateModalConfig<any, string, string>(
      this.deleteRecipeModal
    );

    config.context = {
    };

    config.size = size;
    config.isClosable = true;

    this.modalService
      .open(config)
      .onApprove(result => {
        this.recipeService.removeRecepi(this.recipe.id).subscribe(res => {
          if (res) {
           this.goBack();
          }
        });
      })
      .onDeny(result => {});
  }
}


