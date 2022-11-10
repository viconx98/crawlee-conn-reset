import { KeyValueStore, createHttpRouter, sleep, RequestOptions } from 'crawlee';

export const router = createHttpRouter();

router.addHandler('/todos', async ({  crawler, json, log  }) => {
    log.info("Fetched Todos")
    // Saving data
    const todosStore = await KeyValueStore.open("todos")
    const randomKey = Date.now().toString()
    
    todosStore.setValue(randomKey, json)
    log.info("Saved Todos")
    
    // 15 minute delay before adding a new request
    log.info("Fake delay till " + new Date(Date.now() + 900000).toString())
    await sleep(900000)
    
    const nextRequest: RequestOptions = {
        uniqueKey: Date.now().toString(),
        url: "https://jsonplaceholder.typicode.com/todos",
        label: "/todos"
    }
    
    await crawler.addRequests([nextRequest])
    log.info("Enqueued new request")
});
