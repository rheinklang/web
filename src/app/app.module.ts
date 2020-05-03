import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, LOCALE_ID } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { registerLocaleData } from '@angular/common';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
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
		// core
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		// firebase
		AngularFireDatabaseModule,
		AngularFireAuthModule,
		AngularFireMessagingModule,
		AngularFireModule.initializeApp(environment.firebase),
		// angular pwa
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
		// websql
		IonicStorageModule.forRoot({
			name: 'rk-storage',
			driverOrder: ['indexeddb', 'sqlite', 'websql'],
		}),
		// content
		GraphQLModule,
		ContentLoaderModule,
		// experience
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
