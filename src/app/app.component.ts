import { Component } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  doc,
} from '@angular/fire/firestore';
import { setDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  todos$: Observable<any>;
  todos: Array<any>;
  todoInputfield = '';

  constructor(private firestore: Firestore) {
    const coll = collection(firestore, 'todos');
    this.todos$ = collectionData(coll);
    this.todos$.subscribe((newTodos) => {
      console.log('new todos:', newTodos);
      this.todos = newTodos;
    });
  }
  addTodo() {
    const coll = collection(this.firestore, 'todos');
    setDoc(doc(coll), { name: this.todoInputfield });
  }
}
