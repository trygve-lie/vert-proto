// Rewrite URLs in script and link elements
class LinkRewriter {
	constructor(attributeName, requestUrl) {
		this.attributeName = attributeName;
		this.host = new URL(requestUrl).host;
	}

	element(element) {
		const attribute = element.getAttribute(this.attributeName);
		if (attribute) {
			try {
				const attributeUrl = new URL(attribute);
				attributeUrl.host = this.host;
				element.setAttribute(
					this.attributeName,
					attributeUrl.href,
				);
			} catch(e) {
				// supress
			}
		}
	}
}

// Rewrite component element. We fetch component from remote source
class ComponentRewriter {
	async element(element) {
		// NB: Safeguard that URL are only legal internal URLs	
		const src = element.getAttribute('data-podium-src');
		const url = new URL(src);

		const response = await fetch(url, {
			headers: {
				'x-podium-proxy': 'true'
			}
		});
		const body = await response.text();
		console.log('XXX', body);
		element.replace(body, { html: true });		
	}
}

export default {
	async fetch(request, env, ctx) {
		// Figure out where to proxy the request
		const upstream = new URL(request.url);
		
		if (upstream.pathname === '/' || upstream.pathname.startsWith('/horizontal/') || upstream.pathname.startsWith('/static/')) {
			upstream.host = 'localhost:3010';
		
		} else if (upstream.pathname.startsWith('/cdn/')) {
			upstream.host = 'localhost:3000';
		
		} else if (upstream.pathname.startsWith('/a/')) {
			upstream.host = 'localhost:3011';
		
		} else if (upstream.pathname.startsWith('/b/')) {
			upstream.host = 'localhost:3012';

		} else if (upstream.pathname.startsWith('/c/')) {
			upstream.host = 'localhost:3013';

		} else {
			return new Response(`<html><body><h1>404 - Error page provided by proxy</h1></body></html>`, {
				statusText: 'Not found',
				status: 404,
				headers: {
					"Content-Type": "text/html" 
				}
			});			
		}
		
		// Request the upstream service
		const response = await fetch(upstream);
		const contentType = response.headers.get("Content-Type");
		

		// If upstream service reply is not 200, serve error page
		if (response.status !== 200) {
			return new Response(`<html><body><h1>${response.status} - Error page provided by proxy</h1></body></html>`, {
				statusText: response.statusText,
				status: response.status,
				headers: {
					"Content-Type": "text/html" 
				}
			});
		}

		// If upstream service reply with HTML, scan the HTML		
		if (contentType.startsWith("text/html")) {

			// Look for and rewrite HTML elements marked as header and footer
			const rewriter = new HTMLRewriter()
			.on('script', new LinkRewriter('src', request.url))
			.on('link', new LinkRewriter('href', request.url))
			.on(`[data-podium-component="true"]`, new ComponentRewriter());

			// Return transformed HTML document
		  	return rewriter.transform(response);
		}
		  
		// Not HTML so we just stream it through
		return response;
	},
};
