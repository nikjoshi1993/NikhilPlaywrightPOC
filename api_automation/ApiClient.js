const { request } = require('@playwright/test');

class ApiClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async sendRequest(method, endpoint, requestBody = null) {
        const reqContext = await request.newContext({ ignoreHTTPSErrors: true });
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (['POST', 'PUT', 'PATCH'].includes(method.toUpperCase()) && requestBody) {
            options.data = requestBody;
        }

        const response = await reqContext.fetch(`${this.baseURL}${endpoint}`, options);
        await reqContext.dispose();
        return response;
    }
}

module.exports = ApiClient;