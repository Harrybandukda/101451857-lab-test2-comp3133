import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface DialogData {
  imageUrl: string;
}

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss'],
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule]
})
export class ImageViewerComponent {
  constructor(
    public dialogRef: MatDialogRef<ImageViewerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}