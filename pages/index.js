import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
//const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");

//instantiating todocounter, then select the countet text element(selecting with query selector right above)
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const name = inputValues.name;
    const dateInput = inputValues.date;
    // Create a date object and adjust for timezone
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    const id = uuidv4();
    const values = { name, date, id };
    const todo = generateTodo(values);
    todosList.append(todo);
    todoCounter.updateTotal(true);
    closeModal(addTodoPopupEl);
    newTodoValidator.resetValidation();
  },
});

addTodoPopup.setEventListeners();

function handleCheck(completed) {
  //
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
  todoCounter.updateTotal(false);
}

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();

  return todoElement;
};

const section = new Section({
  items: initialTodos, //passing intial todos
  renderer: (item) => {
    //generationg todo item
    const todoElement = generateTodo(item);
    //adding to todo list
    //todosList.append(todo);
    section.addItem(todoElement);
  },
  containerSelector: ".todos__list",
});

//call section instances render items method
section.renderItems();

//openModal Function
// const openModal = (modal) => {
//   modal.classList.add("popup_visible");
// };

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

//listener on the open modal button, the handler is calling the open modal function and passing it an argument
addTodoButton.addEventListener("click", () => {
  //this is how to call the method of a class instance
  addTodoPopup.open();
});

// addTodoCloseBtn.addEventListener("click", () => {
//   addTodoPopup.close();
// });

// addTodoForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   const name = evt.target.name.value;
//   const dateInput = evt.target.date.value;

//   // Create a date object and adjust for timezone
//   const date = new Date(dateInput);
//   date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

//   const id = uuidv4();
//   const values = { name, date, id };
//   const todo = generateTodo(values);
//   todosList.append(todo);
//   closeModal(addTodoPopupEl);

//   newTodoValidator.resetValidation();
// });

// initialTodos.forEach((item) => {
//   const todo = generateTodo(item);
//   todosList.append(todo);
// });

//creating an instance of the form validator
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
//calling its enableValidation() method
newTodoValidator.enableValidation();
