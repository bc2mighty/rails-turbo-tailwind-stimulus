import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="todo"
export default class extends Controller {
  connect() {
  }

  submit(event) {
    event.preventDefault();
    document.querySelector(".btn-submit-todo").style.pointerEvents = "none";
    const itemInput = document.querySelector("#item"), itemInputVal = itemInput?.value;
    fetch("/todo_list", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "item": itemInputVal,
        })
    })
    .then(async function(response) {
        document.querySelector(".btn-submit-todo").style.pointerEvents = "none";
        const responseObj = await response.json()
        if(!response.ok) throw new Error(responseObj.message);
        return responseObj;
    })
    .then(response => {
        document.querySelector(".text-red-400").innerText = ""
        const message = response?.message || response?.data?.message || response.toString()
        document.querySelector(".text-green-400").innerText = message
        setTimeout(() => {
            window.location.href = "/"
        }, 2000)
    })
    .catch(error => {
        document.querySelector(".btn-submit-todo").style.pointerEvents = "all";
        document.querySelector(".text-green-400").innerText = ""
        const errorMessage = error?.message || error?.data?.message || error.toString()
        document.querySelector(".text-red-400").innerText = errorMessage
    })
  }

  update(event) {
      event.preventDefault()
      document.querySelector(".edit-todo-item").style.pointerEvents = "none";
      const id = event.target.getAttribute("data-item-id")
      const item = event.target.getAttribute("data-item")
      const newItem = prompt("Update To Do Item", item)
      fetch(`/todo_list/${id}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              "item": newItem,
          })
      })
          .then(async function(response) {
              const responseObj = await response.json();
              if(!response.ok) throw new Error(responseObj.message);
              return responseObj;
          })
          .then(response => {
              const message = response?.message || response?.data?.message || response.toString();
              alert(message);
              setTimeout(() => {
                  window.location.href = "/"
              }, 2000);
          })
          .catch(error => {
              document.querySelector(".edit-todo-item").style.pointerEvents = "all";
              const errorMessage = error?.message || error?.data?.message || error.toString();
              alert(errorMessage);
          })
  }
}
