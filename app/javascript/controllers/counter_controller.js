import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="counter"
export default class extends Controller {
  static targets = [ "source" ]

  connect() {
    console.log(`Hello Stimulus!`, this.element);
  }

  copy(event) {
    event.preventDefault()
    console.log('clicked');
    navigator.clipboard.writeText(this.sourceTarget.value)
  }
}
