import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

const MATERIAL_IMPORTS = [
  MatSlideToggleModule,
  FormsModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatCardModule,
  MatBadgeModule,
  MatToolbarModule,
];

@NgModule({
  declarations: [],
  imports: MATERIAL_IMPORTS,
  exports: MATERIAL_IMPORTS,
})
export class MaterialModule {}
