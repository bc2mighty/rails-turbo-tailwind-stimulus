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
}
