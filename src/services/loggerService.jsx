import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

function init() {
	Sentry.init({
		dsn: "https://a60e801d97584caa9d140c76c5661ad5@o1015082.ingest.sentry.io/5980392",
		integrations: [new Integrations.BrowserTracing()],

		// Set tracesSampleRate to 1.0 to capture 100%
		// of transactions for performance monitoring.
		// We recommend adjusting this value in production
		tracesSampleRate: 1.0,
	});
}

function log(error) {
	Sentry.captureException(error);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	init,
	log,
};
