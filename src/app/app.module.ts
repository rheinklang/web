import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, LOCALE_ID } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { IonicStorageModule } from '@ionic/storage';

// set i18n language context
registerLocaleData(localeDe);

import { MatSnackBarModule } from '@angular/material';

import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { RheinklangRoutingModule as AppRoutingModule } from './app-routing.module';
import { GlobalErrorHandler } from './handler/GlobalErrorHandler';
import { LogService } from './services/log.service';
import { environment } from '../environments/environment';
import { RemoteLogService } from './services/remote-log.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared.module';
import { CustomPreloadingStrategy } from './config/preloading';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		IonicStorageModule.forRoot({
			name: 'rk-storage',
			driverOrder: ['indexeddb', 'sqlite', 'websql'],
		}),
		GraphQLModule,
		ContentLoaderModule,
		BrowserAnimationsModule,
		MatSnackBarModule,
		SharedModule,
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	providers: [
		CustomPreloadingStrategy,
		{
			provide: LOCALE_ID,
			useValue: 'de',
		},
		{
			provide: ErrorHandler,
			useClass: GlobalErrorHandler,
		},
		{
			provide: LogService,
			useClass: environment.production ? RemoteLogService : LogService,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
