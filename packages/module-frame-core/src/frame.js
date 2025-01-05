import '@lit-labs/ssr-client/lit-element-hydrate-support.js';
import { LitElement, html, svg } from 'lit';

import messaging from 'horizontal-messaging/placeholder';
import header from 'horizontal-header/placeholder';

import styleNavigation from './styles-menu.js';
import styleDefault from './styles-frame-default.js';
import styleMedium from './styles-frame-medium.js';
import styleSmall from './styles-frame-small.js';

import './frame-controller.js';

export default class ApplicationFrame extends LitElement {
    static styles = [
        styleDefault,
        styleMedium,
        styleSmall,
        styleNavigation,
    ];
  
    constructor() {
        super();
    }

    connectedCallback() {  
        super.connectedCallback();
        
        this.addEventListener("view", (e) => {
            console.log('Frame - on event', e.detail);
            const selector = `#${e.detail.target}`;
            const target = this.renderRoot.querySelector(selector);
            if (target) {
                target.classList.toggle('hidden');          
            }
        });
    }

    _iconHome() {
        const icon = svg`<path d="M23.121,9.069,15.536,1.483a5.008,5.008,0,0,0-7.072,0L.879,9.069A2.978,2.978,0,0,0,0,11.19v9.817a3,3,0,0,0,3,3H21a3,3,0,0,0,3-3V11.19A2.978,2.978,0,0,0,23.121,9.069ZM15,22.007H9V18.073a3,3,0,0,1,6,0Zm7-1a1,1,0,0,1-1,1H17V18.073a5,5,0,0,0-10,0v3.934H3a1,1,0,0,1-1-1V11.19a1.008,1.008,0,0,1,.293-.707L9.878,2.9a3.008,3.008,0,0,1,4.244,0l7.585,7.586A1.008,1.008,0,0,1,22,11.19Z"/>`;
        return html`<svg viewBox="0 0 24 24" width="38" height="38" xmlns="http://www.w3.org/2000/svg">
            ${icon}
        </svg>`;
    }

    _iconNav() {
        const icon = svg`<path d="M7,6H23a1,1,0,0,0,0-2H7A1,1,0,0,0,7,6Z"/><path d="M23,11H7a1,1,0,0,0,0,2H23a1,1,0,0,0,0-2Z"/><path d="M23,18H7a1,1,0,0,0,0,2H23a1,1,0,0,0,0-2Z"/><circle cx="2" cy="5" r="2"/><circle cx="2" cy="12" r="2"/><circle cx="2" cy="19" r="2"/>`;
        return html`<svg viewBox="0 0 24 24" width="38" height="38" xmlns="http://www.w3.org/2000/svg">
            ${icon}
        </svg>`;
    }

    _iconSearch() {
        const icon = svg`<path d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z"/>`;
        return html`<svg viewBox="0 0 24 24" width="38" height="38" xmlns="http://www.w3.org/2000/svg">
            ${icon}
        </svg>`;
    }

    _iconMail() {
        const icon = svg`<path d="M19,1H5A5.006,5.006,0,0,0,0,6V18a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V6A5.006,5.006,0,0,0,19,1ZM5,3H19a3,3,0,0,1,2.78,1.887l-7.658,7.659a3.007,3.007,0,0,1-4.244,0L2.22,4.887A3,3,0,0,1,5,3ZM19,21H5a3,3,0,0,1-3-3V7.5L8.464,13.96a5.007,5.007,0,0,0,7.072,0L22,7.5V18A3,3,0,0,1,19,21Z"/>`;
        return html`<svg viewBox="0 0 24 24" width="38" height="38" xmlns="http://www.w3.org/2000/svg">
            ${icon}
        </svg>`;
    }

    render() {
        return html`
            <header id="header" class="header">
                <div class="container horizontal">
                    <slot name="header">${header}</slot>
                </div>
            </header>
            <aside id="aside" class="aside">
                <menu id="menu" class="menu">
                    <app-view type="icon" target="navigation">${this._iconHome()}</app-view>
                    <app-view type="icon" target="navigation">${this._iconNav()}</app-view>
                    <app-view type="icon" target="search">${this._iconSearch()}</app-view>
                    <app-view type="icon" target="messaging">${this._iconMail()}</app-view>
                </menu>
                <div id="navigation" class="small-bottomSheet medium-sideSheet hidden">
                    <div class="container horizontal">
                        <h3>Navigation:</h3>
                        <ul>
                            <li><a href='/a/'>Vertical A</a></li>
                            <li><a href='/b/'>Vertical B</a></li>
                            <li><a href='/c/'>Vertical C</a></li>
                            <li><a href='/'>Home</a></li>
                        </ul>
                        <app-view target="navigation">Close</app-view>
                    </div>
                </div>
                <div id="search" class="search small-bottomSheet medium-sideSheet hidden">
                    <div class="container vertical">
                        <slot name="search"></slot>
                    </div>
                </div>
                <div id="messaging" class="messaging small-bottomSheet medium-sideSheet hidden">
                    <div class="container horizontal">
                        <slot name="messaging">
                            ${messaging}
                            <app-view target="messaging">Close</app-view>
                        </slot>
                    </div>
                </div>
            </aside>
            <main id="main" class="main">
                <div class="container vertical">
                    <slot name="main"></slot>
                </div>
            </main>
            <footer id="footer" class="footer">
                Copyright something
            </footer>
        `;
    }
}

if (!customElements.get('app-frame')) {
  customElements.define('app-frame', ApplicationFrame);
}