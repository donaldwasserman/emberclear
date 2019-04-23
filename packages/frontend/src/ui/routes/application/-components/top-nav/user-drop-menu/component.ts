import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import uuid from 'uuid';
import { later } from '@ember/runloop';

import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';

import StoreService from 'ember-data/store';
import IdentityService from 'emberclear/services/identity/service';
import { keepInViewPort } from 'emberclear/src/utils/dom/utils';
import RouterService from '@ember/routing/router-service';

export default class UserDropMenu extends Component {
  @service identity!: IdentityService;
  @service store!: StoreService;
  @service router!: RouterService;

  @tracked showDropdown = false;
  @tracked dropDownId = uuid();

  @reads('identity.name') name?: string;

  get dropDown(): HTMLElement {
    return document.querySelector(`[id="${this.dropDownId}"]`) as HTMLElement;
  }

  closeMenu() {
    this.showDropdown = false;
  }

  openMenu() {
    this.showDropdown = true;

    later(this, () => keepInViewPort(this.dropDown));
  }

  toggleMenu() {
    this.showDropdown ? this.closeMenu() : this.openMenu();
  }
}
