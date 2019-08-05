import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { DefaultLayoutComponent } from './components/layouts/default-layout/default-layout.component';
import { HeaderComponent } from './components/organisms/header/header.component';
import { FooterComponent } from './components/organisms/footer/footer.component';
import { IconComponent } from './components/atoms/icon/icon.component';
import { GridComponent } from './components/helper/grid/grid.component';
import { ColumnComponent } from './components/helper/grid/column.component';
import { RowComponent } from './components/helper/grid/row.component';
import { HomeComponent } from './views/home/home.component';

@NgModule({
	declarations: [
		AppComponent,
		DefaultLayoutComponent,
		HeaderComponent,
		FooterComponent,
		IconComponent,
		GridComponent,
		RowComponent,
		ColumnComponent,
		HomeComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		StoreModule.forRoot(reducers, {
			metaReducers,
			runtimeChecks: {
				strictStateImmutability: true,
				strictActionImmutability: true
			}
		}),
		StoreRouterConnectingModule.forRoot(),
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
		EffectsModule.forRoot([AppEffects]),
		GraphQLModule,
		HttpClientModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
