import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TaskForm} from '../../../../interfaces/task.interface';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

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
    status: new FormControl(''),
  });
  edit: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskForm
  ) {
    this.taskForm.get('status')?.setValue('complete');
  }
  ngOnInit(): void {
    if(this.data) this.fillData();
  }
  close() {
    this.dialogRef.close(null);
  }

  save() {
    this.taskForm.markAsDirty();
    this.taskForm.markAsTouched();
    console.log('alo', this.taskForm.dirty)
    console.log('is: ', this.taskForm.get('title')?.invalid)
    console.log('is: ', this.taskForm.get('title')?.dirty)
    if(!this.taskForm.invalid && this.taskForm.dirty){
      this.dialogRef.close({
        id: Date.now(),
        title: this.taskForm.get('title')?.value,
        description: this.taskForm.get('description')?.value??'',
        completed: this.taskForm.get('status')?.value === 'complete'
      });
    }
  }

  selectStatus(status: string) {
      this.taskForm.get('status')?.setValue(status);
  }

  private fillData() {
    this.edit = true;
    this.taskForm.get('title')?.setValue(this.data.title);
    this.taskForm.get('description')?.setValue(this.data.description);
    this.taskForm.get('status')?.setValue(this.data.completed?'complete':'pending');
  }
}
