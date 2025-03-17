import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {BodyForm, TaskForm} from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  constructor(private http: HttpClient) {}

  async getAllTasks(): Promise<TaskForm[]> {
    try {
      return await firstValueFrom(this.http.get<TaskForm[]>('http://taskapi.somee.com/api/Task'));
    }catch (error) {
      console.error('Error al crear la tarea', error);
      throw error;
    }
  }

  async createTask(body: BodyForm): Promise<TaskForm[]> {
    try {
      return await firstValueFrom(this.http.post<TaskForm[]>('http://taskapi.somee.com/api/Task', body));
    } catch (error) {
      console.error('Error al crear la tarea', error);
      throw error;
    }
  }

  async editTask(id: Number, body: BodyForm): Promise<TaskForm[]> {
    try {
      return await firstValueFrom(this.http.put<TaskForm[]>(`http://taskapi.somee.com/api/Task/${id}`,body))
    }catch (e) {
      console.error('Error al editar la tarea', e);
      throw e;
    }
  }

  async deleteTask(id: Number) {
    try {
      return await firstValueFrom(this.http.delete<TaskForm[]>(`http://taskapi.somee.com/api/Task/${id}`))
    }catch (e) {
      console.error('Error al eliminar la tarea', e);
      throw e;
    }
  }
}
