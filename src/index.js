const http = require('http');
const showUsers = require('./modules/users');
const makeResponse = require('./modules/utils');

const host = 'http://127.0.0.1';

const server = http.createServer((request, response) => {

    // Написать обработчик запроса:
    // DONE - Ответом на запрос `?hello=<name>` должна быть **строка** "Hello, <name>.", код ответа 200
    // DONE - Если параметр `hello` указан, но не передано `<name>`, то ответ **строка** "Enter a name", код ответа 400
    // DONE - Ответом на запрос `?users` должен быть **JSON** с содержимым файла `data/users.json`, код ответа 200
    // DONE - Если никакие параметры не переданы, то ответ **строка** "Hello, World!", код ответа 200
    // DONE - Если переданы какие-либо другие параметры, то пустой ответ, код ответа 500

    const url = new URL(request.url, host);

    console.log(url);

    if (url.search.startsWith('?hello')) {
        const name = url.searchParams.get('hello');
        if (name) {
            makeResponse({
                response,
                responseBody: `Hello, ${name}.`
            });
            return;
        }

        makeResponse({
            response,
            responseBody: 'Enter a name',
            responseStatus: 400
        });
        return;
    }
    
    if (url.search.startsWith('?users')) {
        makeResponse({
            response,
            responseBody: showUsers(),
            responseType: 'application/json'
        });
        return;
    }

    if (url.search === '') {
        makeResponse({
            response,
            responseBody: 'Hello, World!',
        });
        return;
    }

    makeResponse({
        response,
        responseStatus: 500
    })

});

const port = process.env.PORT | 3000;

server.listen(port, () => {
    console.log(`server has started on ${host}:${port}`);
})