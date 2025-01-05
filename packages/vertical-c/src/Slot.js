// Ref; https://github.com/vercel/next.js/tree/canary/examples/with-portals

import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Slot({ children, name }) {
  const ref = useRef();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {    
    // Get a web component slot in the app frame by the "name" prop
    ref.current = document.querySelector(`[slot="${name}"]`);
    
    // Clean out any SSRed DOM elements inside the web component slot
    while (ref.current.firstChild) {
      ref.current.removeChild(ref.current.firstChild);
    }

    // Set global indicator that we're in the browser
    setIsClient(true);
  }, [name]);

  // If in the browser: create a React Portal with the children elements
  // of this component inside the web component slot. By using a Portal
  // we are able to get shared state (context) in React.
  // If on the server: Just don't render anything. Though; we can SSR
  // in the web component slot for SEO, but we can't hydrate it (I think).
  return isClient ? createPortal(children, ref.current) : null;
}