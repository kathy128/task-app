import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TaskForm} from '../../../../interfaces/task.interface';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {InfoModalComponent} from '../info-modal/info-modal.component';

@Component({
  selector: 'app-add-task',
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent implements OnInit{
  taskForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    status: new FormControl(1),
  });
  edit: boolean = false;
  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskForm
  ) {}
  ngOnInit(): void {
    if(Object.keys(this.data).length !== 0) this.fillData();
  }
  close() {
    this.dialogRef.close(null);
  }

  save() {
    this.taskForm.markAsDirty();
    this.taskForm.markAsTouched();
    if(!this.taskForm.invalid && this.taskForm.dirty){
      this.dialogRef.close({
        id: this.data.id??undefined,
        title: this.taskForm.get('title')?.value,
        description: this.taskForm.get('description')?.value??'',
        complete: this.taskForm.get('status')?.value
      });
    }else{
      this.dialog.open(InfoModalComponent,{
        width: '400px',
        data: {message: 'Faltan llenar los campos requeridos', type:'error'}
      })
    }
  }

  selectStatus(status: number) {
      this.taskForm.get('status')?.setValue(status);
  }

  private fillData() {
    this.edit = true;
    this.taskForm.get('title')?.setValue(this.data.title);
    this.taskForm.get('description')?.setValue(this.data.description);
    this.taskForm.get('status')?.setValue(this.data.complete?1:0);
  }
}
