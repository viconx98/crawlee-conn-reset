import { HttpCrawler } from 'crawlee';
import { router } from './routes.js';

const startUrls = ['https://jsonplaceholder.typicode.com/todos'];

const crawler = new HttpCrawler({
    requestHandler: router,
    keepAlive: true,
    maxRequestsPerMinute: 1,
    maxConcurrency: 1,
    requestHandlerTimeoutSecs: 86400,
    sessionPoolOptions: {
        sessionOptions: {
            maxUsageCount: 1,
        }
    },
    errorHandler: async function ({ log }, error) {
        log.error(`errorHandler ${error.message}`)
    },
    failedRequestHandler: async function ({ log }, error) {
        log.error(`failedRequestHandler ${error.message}`)
    }
});

await crawler.addRequests([{
    uniqueKey: Date.now().toString(),
    url: "https://jsonplaceholder.typicode.com/todos",
    label: "/todos"
}])

await crawler.run();
