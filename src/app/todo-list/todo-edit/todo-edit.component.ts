import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';

import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import {TodoList, TodoListService} from '../todo-list.service';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: TodoList;

  constructor(private tdService: TodoListService) {  }


  ngOnInit() {
    this.subscription = this.tdService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.tdService.getSingleToDo(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            date: this.editedItem.whendate,
            priority: this.editedItem.priority
          });
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    console.log(value);
    const newToDo = new TodoList(value.name, value.date, value.priority);
    if (this.editMode) {
      this.tdService.updateToDoList(this.editedItemIndex, newToDo);
    } else {
      this.tdService.addToDo(newToDo);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.tdService.deleteToDo(this.editedItemIndex);
    this.onClear();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
