import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {InfoData} from '../../../../interfaces/task.interface';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-info-modal',
  imports: [CommonModule],
  templateUrl: './info-modal.component.html',
  styleUrl: './info-modal.component.scss'
})
export class InfoModalComponent {
  constructor(
    public dialogRef: MatDialogRef<InfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InfoData
  ) {}

  closeDialog() {
    this.dialogRef.close(null);
  }
}
