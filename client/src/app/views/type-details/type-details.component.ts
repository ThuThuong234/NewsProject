import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import {NewsService} from "../../services/news.service";
import {TypeService} from "../../services/type.service";
import {NewsPaging} from "../../view-models/news/news-paging";
import {plainToClass} from "class-transformer";

@Component({
  selector: 'app-type-details',
  templateUrl: './type-details.component.html',
  styleUrls: ['./type-details.component.css']
})
export class TypeDetailsComponent implements OnInit {
  newsPaging : NewsPaging = new NewsPaging();

  constructor(private router: Router,
              private route : ActivatedRoute,
              private titleService: Title,
              private toastr: ToastrService,
              private translate: TranslateService,
              private typeService: TypeService,) { }

  ngOnInit() {

    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.getNewsByType(id);
  }

   getNewsByType(id: number) {
    this.typeService.getNewsType(id).subscribe(res => {
        if (res.success && res.data) {
          console.log(res.data);
          this.newsPaging = plainToClass(NewsPaging, res.data);
        } else {
          this.toastr.error(" res is not succeeds" + res.message);
        }
      },
      error => {
        this.toastr.error("error while get news" + this.translate.instant('COMMON.GET.FAILED'));
      });
  }
  getTypes(id :number){

    this.router.navigate(['/types/',id]);
  }
}
