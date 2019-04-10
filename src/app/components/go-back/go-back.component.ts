import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'go-back',
  templateUrl: './go-back.component.html',
  styleUrls: ['./go-back.component.css']
})
export class GoBackComponent {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  previousPage() {
    this.router.navigate([this.activatedRoute.snapshot.url[0].path]);
  }
}
