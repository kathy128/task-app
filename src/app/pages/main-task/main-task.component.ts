import {Component, OnInit} from '@angular/core';
import {TaskForm} from '../../interfaces/task.interface';
import {CommonModule} from '@angular/common';
import {CardComponent} from '../../shared/components/atoms/card/card.component';
import {AddTaskComponent} from '../../shared/components/organism/add-task/add-task.component';
import {MatDialog} from '@angular/material/dialog';
import {ThemeService} from '../../services/theme.service';
import { TaskService } from '../../services/task.service';
import {LoadingComponent} from '../../shared/components/atoms/loading/loading.component';
import {InfoModalComponent} from '../../shared/components/organism/info-modal/info-modal.component';

@Component({
  selector: 'app-main-task',
  imports: [CommonModule, CardComponent, LoadingComponent],
  standalone: true,
  templateUrl: './main-task.component.html',
  styleUrl: './main-task.component.scss'
})
export class MainTaskComponent implements OnInit {
  btnslist: { title: string, status: boolean }[] = [
    {title: 'Todas', status: true},
    {title: 'Pendientes', status: false},
    {title: 'Completadas', status: false},
  ]
  allTasks: TaskForm[] = [];
  tasks: TaskForm[] = [];
  isLoading = true;
  remainTask: number = 0;
  ERROR_MSG: string = 'Ocurrió un error inesperado';
  constructor(private dialog: MatDialog,
     public themeService: ThemeService,
     public taskService: TaskService,
    ) {
  }

  async ngOnInit() {
    await this.getAllTasks();
  }

  get completionPercentage(): number {
    const completedTasks = this.allTasks.filter(task => task.complete === 1).length;
    this.remainTask = this.allTasks.filter(task => task.complete === 0).length;
    return this.allTasks.length > 0 ? Math.round((completedTasks / this.allTasks.length) * 100) : 0;
  }

  async getAllTasks(){
    try {
      this.tasks = await this.taskService.getAllTasks();
      this.allTasks = this.tasks;
      this.isLoading = false;
    }catch (e) {
      this.openInfoModal(this.ERROR_MSG,'error')
      console.error(e)
    }
  }
  openInfoModal(message: string, type: string = 'success' ){
      this.dialog.open(InfoModalComponent, {
        width: '400px',
        data: {message: message, type: type}
      })
  }

  openCreateModal(edit: boolean = false,task?: TaskForm) {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '400px',
      data: task??{},
    });
    dialogRef.afterClosed().subscribe( async result => {
      if (result) {
        edit ? await this.editTask(result) : await this.createTask(result);
        await this.getAllTasks();
      }
    });
  }

  async createTask(body: TaskForm){
    try {
     await this.taskService.createTask(body);
     this.openInfoModal('Se ha creado la tarea exitosamente');
    }catch (e) {
      this.openInfoModal(this.ERROR_MSG,'error')
      console.error(e)
    }
  }

  async editTask(task: TaskForm){
    try {
      await this.taskService.editTask(task.id!,task)
      this.openInfoModal('Se ha editado la tarea exitosamente')
    }catch (e) {
      this.openInfoModal(this.ERROR_MSG,'error')
      console.error(e)
    }
  }

  async toggleComplete(task: TaskForm) {
    let body = {
      id: task.id,
      title: task.title,
      description: task.description,
      complete: task.complete === 0 ? 1 : 0,
    }
    try {
      await this.taskService.editTask(task.id!, body);
    } catch (e) {
      this.openInfoModal(this.ERROR_MSG,'error')
      console.error('Error a editar el estado ', e)
    }

  }

  async deleteTask(id: number) {
    try {
      await this.taskService.deleteTask(id!);
      await this.getAllTasks();
      this.openInfoModal('Se ha eliminado la tarea exitosamente')
    }catch (e) {
      this.openInfoModal(this.ERROR_MSG,'error')
      console.error('No se pudo eliminar la tarea', e)
    }
  }

  filterTask(btn: string) {
    this.btnslist.forEach(b => b.status = false);
    this.tasks = this.allTasks
    switch (btn) {
      case 'Completadas':
        this.btnslist[2].status = true;
        this.tasks = this.tasks.filter(task => task.complete);
        break;
      case 'Pendientes':
        this.btnslist[1].status = true;
        this.tasks = this.tasks.filter(task => !task.complete);
        break;
      default:
        this.btnslist[0].status = true;
    }
  }
}
