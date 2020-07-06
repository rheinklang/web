import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared.module';
import { LivestreamEmbeddRoutingModule } from './article-routing.module';
import { ArticleComponent } from './article.component';

@NgModule({
	declarations: [ArticleComponent],
	imports: [CommonModule, SharedModule, LivestreamEmbeddRoutingModule],
})
export class ArticleModule {}
