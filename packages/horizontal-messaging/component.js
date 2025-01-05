import { LitElement, html, css } from 'lit';

export default class MessagingButton extends LitElement {
    static styles = [
        css`
            .horizontal {
                padding: 10px;
                margin: 10px;
            }

            .horizontal {
                border: solid 1px #008d3f;
            }
        `,
    ]
    
    constructor() {
        super();
    }

    render() {
        return html`
            <div class="horizontal">
                <button id="button">New Message</button>
            </div>
        `;
    }
}

if (!customElements.get('messaging-button')) {
  customElements.define('messaging-button', MessagingButton);
}