import { css } from 'lit';

/* Small devices (768px or lesser) */

export default css`
    @media only screen and (max-width: 768px) {
        :host {
            width: 100%;
            display: grid;
            grid-template-areas:
            "header"
            "main"
            "aside";
            grid-template-columns: auto;
        }

        .header {
            grid-area: header;
            height: 8vh;
            padding: 0;
        }

        .aside {
            grid-area: aside;
            height: 8vh;
            padding: 0;
        }

        .main {
            background-color:rgb(255, 255, 255);
            grid-area: main;
            height: 84vh;
            margin-right: 0;
            border: none;
            border-radius: 0;
            padding: 0;
        }

        .footer {
            display: none;
        }

        /* Bottom sheet */
        .small-bottomSheet {
            display: block;
            position: absolute;
            background-color: white;
            border-radius: 10px 10px 0 0;
            box-shadow: 0 0 8px 4px #ccc;
            bottom: 0;
            height: 90%;
            margin-right: 4%;
            margin-left: 4%;
            width: 92%;
            z-index: 1000;
        }
        
        .hidden {
            display: none;
        }
    }
`;