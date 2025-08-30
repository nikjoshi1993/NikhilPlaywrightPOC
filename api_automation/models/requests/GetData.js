const ApiClient = require('../../ApiClient');
const testEnvironment = require('../../testEnvironment');

class GetDataRequest {
    constructor() {
        this.pathParam = {};
        this.queryParam = {};
        this.apiClient = new ApiClient(testEnvironment.baseURL);
    }

    static Builder() {
        return new GetDataRequest();
    }

    withPathParam(param) {
        this.pathParam = param;
        return this;
    }

    withQueryParam(param) {
        this.queryParam = param;
        return this;
    }

    async execute() {
        const endpoint = "/comments";
        console.info(`Endpoint is ${endpoint}`);
        try {
            const response = await this.apiClient.sendRequest(this.method, endpoint, this.body);
            console.info(`Response Status: ${response.status()}`);
            return response;
        }
        catch (error) {
            console.error(`Error during API request: ${error.message}`);
            throw error;
        }
    }

}

module.exports = GetDataRequest;