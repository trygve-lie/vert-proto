// https://www.konnorrogers.com/posts/2024/running-lit-ssr-in-web-awesome

import { diffLines } from "https://cdn.jsdelivr.net/npm/diff@5.2.0/+esm";
import { getDiffableHTML } from "https://cdn.jsdelivr.net/npm/@open-wc/semantic-dom-diff@0.20.1/get-diffable-html.js/+esm";

  function handleLitHydrationError(e) {
    const element = e.target;
    const scratch = document.createElement("div");
    const node = element.cloneNode(true);
    scratch.append(node);
    document.body.append(scratch);
    customElements.upgrade(node);
    node.updateComplete.then(() => {
      const clientHTML = getDiffableHTML(innerHTML);
      const serverHTML = getDiffableHTML(element.shadowRoot?.innerHTML);

      const diffDebugger = document.createElement("div");
      diffDebugger.className = "diff-debugger";

      diffDebugger.innerHTML = `
      <button class="diff-dialog-toggle">
        Show Hydration Mismatch
      </button>
      <wa-dialog class="diff-dialog" with-header light-dismiss>
        <div class="diff-grid">
          <div>
            <div>Server</div>
            <pre class="diff-server"><code></code></pre>
          </div>
          <div>
            <div>Client</div>
            <pre class="diff-client"><code></code></pre>
          </div>
          <div>
            <div>Diff</div>
            <pre class="diff-viewer"><code></code></pre>
          </div>
        </div>
      </wa-dialog>
    `;

      wrap(element, diffDebugger);

      diffDebugger.querySelector(".diff-server > code").textContent = serverHTML;
      diffDebugger.querySelector(".diff-client > code").textContent = clientHTML;
      const diffViewer = diffDebugger.querySelector(".diff-viewer > code");
      diffViewer.innerHTML = "";
      diffViewer.appendChild(
        createDiff({
          serverHTML,
          clientHTML
        })
      );
    });
  }

  function createDiff({ serverHTML, clientHTML }) {
    const diff = diffLines(serverHTML, clientHTML, {
      ignoreWhitespace: false,
      newLineIsToken: true
    });
    const fragment = document.createDocumentFragment();
    for (var i = 0; i < diff.length; i++) {
      if (diff[i].added && diff[i + 1] && diff[i + 1].removed) {
        var swap = diff[i];
        diff[i] = diff[i + 1];
        diff[i + 1] = swap;
      }

      var node;
      if (diff[i].removed) {
        node = document.createElement("del");
        node.appendChild(document.createTextNode(diff[i].value));
      } else if (diff[i].added) {
        node = document.createElement("ins");
        node.appendChild(document.createTextNode(diff[i].value));
      } else {
        node = document.createTextNode(diff[i].value);
      }
      fragment.appendChild(node);
    }

    return fragment;
  }
  
  document.addEventListener("lit-hydration-error", handleLitHydrationError);
