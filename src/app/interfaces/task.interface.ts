export interface TaskForm {
  id?: number;
  title: string;
  description: string,
  complete: number;
}

export type BodyForm = Omit<TaskForm, 'id'>

export interface InfoData {
  message: string,
  type: 'success' | 'error'
}
