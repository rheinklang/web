import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { SharedModule } from '../../shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [SettingsComponent],
	imports: [CommonModule, ReactiveFormsModule, SharedModule, SettingsRoutingModule, MatSlideToggleModule],
})
export class SettingsModule {}
