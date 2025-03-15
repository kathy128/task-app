import {Component} from '@angular/core';
import {TaskForm} from '../../interfaces/task.interface';
import {CommonModule} from '@angular/common';
import {CardComponent} from '../../shared/components/atoms/card/card.component';
import {AddTaskComponent} from '../../shared/components/organism/add-task/add-task.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-main-task',
  imports: [CommonModule, CardComponent],
  standalone: true,
  templateUrl: './main-task.component.html',
  styleUrl: './main-task.component.scss'
})
export class MainTaskComponent {
  btnslist: { title: string, status: boolean }[] = [
    {title: 'Todas', status: true},
    {title: 'Pendientes', status: false},
    {title: 'Completadas', status: false},
  ]
  allTasks: TaskForm[] = [];
  tasks: TaskForm[] = [
    {id: 0, title: 'Task #', description: 'una tarea', completed: false},
    {id: 0, title: 'Task #', description: 'una tarea', completed: true},
    {id: 0, title: 'Task #', description: 'una tarea', completed: true},
  ];
  remainTask: number = 0;
  constructor(private dialog: MatDialog) {
    this.allTasks = this.tasks;
  }

  get completionPercentage(): number {
    const completedTasks = this.allTasks.filter(task => task.completed).length;
    this.remainTask = this.allTasks.filter(task => !task.completed).length;
    return this.allTasks.length > 0 ? Math.round((completedTasks / this.allTasks.length) * 100) : 0;
  }

  openModal(task?: TaskForm) {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '400px',
      data: task??{},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tasks.push(result);
      }
    });
  }

  toggleComplete(task: TaskForm) {
    task.completed = !task.completed;
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  filterTask(btn: string) {
    this.btnslist.forEach(b => b.status = false);
    this.tasks = this.allTasks
    switch (btn) {
      case 'Completadas':
        this.btnslist[2].status = true;
        this.tasks = this.tasks.filter(task => task.completed);
        break;
      case 'Pendientes':
        this.btnslist[1].status = true;
        this.tasks = this.tasks.filter(task => !task.completed);
        break;
      default:
        this.btnslist[0].status = true;
    }
  }
}
