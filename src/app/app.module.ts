import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { DefaultLayoutComponent } from './components/layouts/default-layout/default-layout.component';
import { HeaderComponent } from './components/organisms/header/header.component';
import { FooterComponent } from './components/organisms/footer/footer.component';
import { IconComponent } from './components/atoms/icon/icon.component';
import { HomeComponent } from './views/home/home.component';
import { SeoManagerComponent } from './components/helper/seo-manager/seo-manager.component';
import { LinkComponent } from './components/atoms/link/link.component';
import { LinkListComponent } from './components/molecules/link-list/link-list.component';
import { LogoComponent } from './components/atoms/logo/logo.component';

@NgModule({
	declarations: [
		AppComponent,
		DefaultLayoutComponent,
		HeaderComponent,
		FooterComponent,
		IconComponent,
		HomeComponent,
		SeoManagerComponent,
		LinkComponent,
		LinkListComponent,
		LogoComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		GraphQLModule,
		HttpClientModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
