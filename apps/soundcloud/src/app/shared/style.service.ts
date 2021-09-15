import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StyleService {
  constructor(@Optional() @Inject(DOCUMENT) private document: Document) {}

  private _findOrCreateLinkElement(key: string) {
    return this._getLinkElement(key) || this._createLinkElement(key);
  }

  private _getLinkElement(key: string) {
    return this.document.head.querySelector(`link[rel="stylesheet"].${this._getClassNameForKey(key)}`);
  }

  private _createLinkElement(key: string) {
    const linkEl = this.document.createElement('link');
    linkEl.setAttribute('rel', 'stylesheet');
    linkEl.classList.add(this._getClassNameForKey(key));
    this.document.head.appendChild(linkEl);
    return linkEl;
  }

  private _getClassNameForKey(key: string) {
    return `style-manager-${key}`;
  }

  private _getStyleElement(key: string) {
    return this.document.head.querySelector(`style#${this._getClassNameForKey(key)}`);
  }

  private _createStyleElement(key: string) {
    const styleEle = this.document.createElement('style');
    styleEle.id = this._getClassNameForKey(key);
    this.document.head.appendChild(styleEle);
    return styleEle;
  }

  private findOrCreateStyleElement(key: string) {
    return this._getStyleElement(key) || this._createStyleElement(key);
  }

  setLink(key: string, href: string) {
    this._findOrCreateLinkElement(key).setAttribute('href', href);
  }

  unsetLink(key: string) {
    const ele = this._getLinkElement(key);
    if (ele) {
      this.document.head.removeChild(ele);
    }
  }

  setStyle(key: string, css: string) {
    this.findOrCreateStyleElement(key).innerHTML = css;
  }

  unsetStyle(key: string) {
    const ele = this._getStyleElement(key);
    if (ele) {
      this.document.head.removeChild(ele);
    }
  }
}
