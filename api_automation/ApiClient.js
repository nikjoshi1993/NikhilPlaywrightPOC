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
                'accept': 'application/json'
            }
        };

        if (body) {
            const isMultiPart = typeof body === 'object' && Object.values(body).some(
                value => typeof value === 'object' && typeof value.pipe === 'function');
            if (isMultiPart) {
                options.multipart = body;
            } else {
                options.headers['Content-Type'] = 'application/json';
                options.data = JSON.stringify(body);
            }

        }

        if (['POST', 'PUT', 'PATCH'].includes(method.toUpperCase()) && requestBody) {
            options.data = requestBody;
        }
        console.info(`Sending ${method} request to ${this.baseURL}${endpoint}`);
        const response = await reqContext.fetch(`${this.baseURL}${endpoint}`, options);
        
        if(response.status() >= 400) {
            console.error(`Request failed with status ${response.status()}`);
        }
        try {
            const contentType = response.headers()['content-type'];
            let responseBody;
            if (contentType && contentType.includes('application/json')) {
                const responseBody = await response.json();
                return { status: response.status(), body: responseBody };
            } else {
                const responseBody = await response.text();
                return { status: response.status(), body: responseBody };
            }
            return response;
        }
        catch (error) {
            console.error('Error parsing response:', error);
            throw response;
        }
    }
}

module.exports = ApiClient;