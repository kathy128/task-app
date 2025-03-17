import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TaskForm} from '../../../../interfaces/task.interface';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() task: TaskForm = {title: '', description: '', complete: 1};
  @Output() complete = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();

  toggleComplete() {
    this.complete.emit();
    this.task.complete = this.task.complete === 0? 1: 0;
  }

  deleteTask() {
    this.remove.emit();
  }

  editInfo() {
    this.edit.emit();
  }
}
