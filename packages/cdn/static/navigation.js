// Keep track of the last fully completed NavigationEntry as `lastSuccessfulEntry`
// We’re gonna need this because we can’t entirely rely on currentEntry
// when intercepting. See next comment for more info.
navigation.lastSuccessfulEntry = navigation?.currentEntry;

// Update the lastSuccessfulEntry value only *after* a navigation has
// fully completed. This to cater for race conditions on slow connections.
//
// Consider this scenario:
// You are on index.html and click a link to detail.html, but then
// immediately click the home icon to go to index.html again.
//
// According to the Navigation API you went from index to detail and then
// from detail back to index.
//
// UX wise you didn’t though: the visitor never saw the detail page,
// so they perceive it as going form index to index.
//
// Same should happen to the View Transition: transition between index and
// index, not between detail and index.
navigation.addEventListener('navigatesuccess', e => {
	navigation.lastSuccessfulEntry = e.currentTarget.currentEntry;
});

navigation.addEventListener("navigate", (e) => {
	// Don’t intercept when we shouldn’t
	if (shouldNotIntercept(e)) {
		return;
	}

	e.intercept({
		// Since we don’t scroll the rootscroller, scroll restoration will never work.
		// Because of that we can safely disable scroll restoration alltogether
		scroll: 'manual',

		handler: async () => {
			// Get document the user wants to navigate too
			const response = await fetch(e.destination.url, {
				signal: e.signal, // @ref https://developer.chrome.com/docs/web-platform/navigation-api/#abort_signals
			});
			const html = await response.text();
			const parser = new DOMParser();
			const doc = parser.parseFromString(html, "text/html");

			const $title = doc.querySelector("head title");

			const $search = doc.querySelector('[slot="search"]');
			const $main = doc.querySelector('[slot="main"]');
			/*
			const $search = doc.querySelector("#slot-search");
			const $main = doc.querySelector("#slot-main");
			*/

			document.title = $title.innerText;
			const search = document.querySelector('[slot="search"]');
			const main = document.querySelector('[slot="main"]');
			/*
			const search = document.querySelector("#slot-search");
			const main = document.querySelector("#slot-main");
			*/

			// search.replaceWith($search);
			search.setHTMLUnsafe($search.getHTML());
			// main.replaceWith($main);
			main.setHTMLUnsafe($main.getHTML());

			// Load and execute document script
			const $script = doc.querySelector("#script");
			const { init } = await import($script.src);
			await init();
		}
	});
});

// Helper function to determine if a navigation should be intercepted or not
// @src https://developer.chrome.com/docs/web-platform/navigation-api/#deciding_how_to_handle_a_navigation
const shouldNotIntercept = (navigationEvent) => {
	return (
		!navigationEvent.canIntercept ||
		// If this is just a hashChange,
		// just let the browser handle scrolling to the content.
		navigationEvent.hashChange ||
		// If this is a download,
		// let the browser perform the download.
		navigationEvent.downloadRequest ||
		// If this is a form submission,
		// let that go to the server.
		navigationEvent.formData
	);
};

navigation.addEventListener("navigate", (e) => {

	// .formData event only contain data on form action POST, DEL, but not GET!
	if (!e.canIntercept || !e.formData) {
		return;
	}

	e.intercept({
		// Since we don’t scroll the rootscroller, scroll restoration will never work.
		// Because of that we can safely disable scroll restoration alltogether
		scroll: 'manual',

		handler: async () => {
			console.log('Interepting FORM post');

			const response = await fetch(e.destination.url, {
				method: 'POST',
				signal: e.signal, // @ref https://developer.chrome.com/docs/web-platform/navigation-api/#abort_signals
			});

			const html = await response.text();
			console.log(html);
		}
	});
});