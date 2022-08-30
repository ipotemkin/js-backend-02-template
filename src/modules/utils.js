function makeResponse({response, responseBody = '', responseType = 'text/pain', responseStatus = 200}) {
    const responseStatuses = {
        200: 'Ok',
        400: 'Bad request',
        500: 'Server error'
    };
    
    response.statusCode = responseStatus;
    response.statusMessage = responseStatuses[responseStatus];
    response.setHeader('Content-Type', responseType);
    response.write(responseBody);
    response.end();
}

module.exports = makeResponse;
