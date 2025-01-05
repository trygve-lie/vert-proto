import { LitElement, html, css } from 'lit';

export default class ApplicationView extends LitElement {
    static properties = {
        target: { type: String },
        type: { type: String },
    };
    
    static styles = [
        css`
            @media only screen and (min-width: 1024px) {
                :host {
                    display: none;
                }
            }
        `,
    ];
  
    constructor() {
        super();
        this.target = 'default';
        this.type = 'button';
    }

    _fireViewEvent() {
        console.log('Button - fire event:', this.target);
        this.dispatchEvent(new CustomEvent('view', {
            detail: { 
                target: this.target,
            },
            bubbles: true,
            composed: true,
            cancelable: true,
        }));
    }

    render() {
        if (this.type === 'icon') {
            return html`
                <div class="icon" @click=${this._fireViewEvent}><slot></slot></div>
            `;            
        }
        return html`
            <button class="button" @click=${this._fireViewEvent}><slot></slot></button>
        `;
    }
}

if (!customElements.get('application-view')) {
    customElements.define('application-view', ApplicationView);
}