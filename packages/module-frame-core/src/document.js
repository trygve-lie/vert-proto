import { html } from '@lit-labs/ssr';

export default (page, header) => {
  return html`<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, viewport-fit=cover">
        <link rel="icon" type="image/svg+xml" href="/favicon.svg">
        <script type="module" src="http://localhost:3000/cdn/frame.js"></script>
        <link rel="stylesheet" href="http://localhost:3000/cdn/styles.css">
        <script type="module" src="http://localhost:3000/cdn/debug.js"></script>
        <script type="module" src="http://localhost:3000/cdn/navigation.js"></script>
        <script type="module" src="http://localhost:3000/cdn/global.js"></script>
        <title>${header?.title}</title>
        <style>
          html,
          body {
              font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
              "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
              background-color: #e8e8e8;
          }

          /* Reset */
          * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
          }

          ul {
              list-style: none;
          }

          legend {
              padding: 0;
              display: table;
          }

          fieldset {
              border: 0;
              padding: 0.01em 0 0 0;
              margin: 0;
              min-width: 0;
          }

          .orange {
            background-color: orange;
          }

          .green {
            background-color: green;
          }


          :root {
            view-transition-name: none;  
            --animation-duration: 500ms;
          }

          @keyframes main-slide-in {
            from {
              translate: 100vw 0;
            }
          }
          @keyframes main-slide-out {
            to {
              translate: -100vw 0;
            }
          }

          @media only screen and (max-width: 768px) {
            @view-transition {
              navigation: auto;
              types: backnavigation, forwardnavigation;
            }

            [slot="main"] {
                view-transition-name: main;
            }

            ::view-transition-old(main) {
                animation-name: main-slide-out;
                animation-duration: var(--animation-duration);
            }

            ::view-transition-new(main) {
                animation-name: main-slide-in;
                animation-duration: var(--animation-duration);
            }
          }
        </style>
      </head>
      <body>
        ${page}
      </body>
    </html> `;
};