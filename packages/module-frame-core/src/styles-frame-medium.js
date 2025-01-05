import { css } from 'lit';

/* Medium devices (between 1024px and 768px) */

export default css`
    @media only screen and (max-width: 1024px) and (min-width: 768px) {
        :host {
            width: 100%;
            display: grid;
            grid-template-areas:
            "header header"
            "aside main"
            "footer footer";
            grid-template-columns: 60px 10fr;
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

        .menu {
            display: block;
        }

        /* Bottom sheet */
        .medium-sideSheet {
            position: absolute;
            background-color: white;
            top: 0;
            left: 0;
            bottom: 0;
            width: 60%;
            box-shadow: 10px 0px 10px #ccc;  
            /* box-shadow: 0 0 8px 4px #ccc; */
        }
        
        .hidden {
            display: none;
        }
    }
`;