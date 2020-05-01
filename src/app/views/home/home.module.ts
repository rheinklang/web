import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// tslint:disable-next-line:max-line-length
import { StageSliderComponent } from '../../components/organisms/stage-slider/stage-slider.component';
// tslint:disable-next-line:max-line-length
import { StageSlideItemComponent } from '../../components/molecules/stage-slide-item/stage-slide-item.component';
import { SharedModule } from '../../shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	declarations: [StageSliderComponent, StageSlideItemComponent, HomeComponent],
	imports: [CommonModule, SharedModule, HomeRoutingModule],
})
export class HomeModule {}
