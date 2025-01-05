import { css } from 'lit';

/* Default: Large devices (greater than 1024px) */

export default css`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    ul {
        list-style: none;
    }

    /* Frame structure */ 
    :host {
        width: 100%;
        display: grid;
        grid-template-areas:
        "header header"
        "aside main"
        "footer footer";
        grid-template-columns: 300px 10fr;
    }

    .header {
        grid-area: header;
        height: 8vh;
        padding: 0;
    }

    .aside {
        grid-area: aside;
        height: 90vh;
        padding: 0;
    }

    .main {
        background-color:rgb(255, 255, 255);
        grid-area: main;
        height: 90vh;
        margin-right: 4px;
        border-radius: 10px;
        padding: 0;
    }

    .footer {
        grid-area: footer;
        height: 2vh;
        padding: 0;
    }

    /* Frame markers */
    .container {
        padding: 10px;
        margin: 10px;
    }

    .horizontal {
        border: solid 1px #008d3f;
    }

    .vertical {
        border: solid 1px #8d0000;
    }
`;