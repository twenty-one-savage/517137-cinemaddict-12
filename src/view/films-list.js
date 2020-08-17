import AbstractView from "./absrtact.js";

export default class FilmsListView extends AbstractView {

  getTemplate() {
    return `<section class="films-list">
            <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
          </section>`;
  }
}
