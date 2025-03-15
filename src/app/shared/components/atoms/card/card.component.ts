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
  @Input() task: TaskForm =  {id: 0, title: 'Task #', description: 'una tarea', completed: true}
  @Output() complete = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();

  toggleComplete() {
    this.complete.emit();
  }

  deleteTask() {
    this.remove.emit();
  }

  editInfo() {
    this.edit.emit();
  }
}
