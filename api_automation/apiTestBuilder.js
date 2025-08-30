// API Test Builder using Builder Pattern for Playwright
const { test, expect, request } = require('@playwright/test');
const Ajv = require('ajv');

class ApiTestBuilder {
  constructor() {
    this._method = 'GET';
    this._url = '';
    this._headers = {};
    this._body = undefined;
    this._expectStatus = 200;
    this._expectBody = undefined;
    this._schema = undefined;
  }

  method(method) {
    this._method = method;
    return this;
  }

  url(url) {
    this._url = url;
    return this;
  }

  headers(headers) {
    this._headers = headers;
    return this;
  }

  body(body) {
    this._body = body;
    return this;
  }

  expectStatus(status) {
    this._expectStatus = status;
    return this;
  }

  expectBody(expectBody) {
    this._expectBody = expectBody;
    return this;
  }

  schema(schema) {
    this._schema = schema;
    return this;
  }

  async execute() {
    const apiRequest = await request.newContext();
    const response = await apiRequest.fetch(this._url, {
      method: this._method,
      headers: this._headers,
      data: this._body,
    });
    expect(response.status()).toBe(this._expectStatus);
    let body;
    if (this._expectBody !== undefined || this._schema !== undefined) {
      body = await response.json();
    }
    if (this._expectBody !== undefined) {
      expect(body).toEqual(this._expectBody);
    }
    if (this._schema !== undefined) {
      const ajv = new Ajv();
      const validate = ajv.compile(this._schema);
      const valid = validate(body);
      if (!valid) {
        throw new Error('Schema validation failed: ' + JSON.stringify(validate.errors));
      }
    }
    await apiRequest.dispose();
  }
}

module.exports = { ApiTestBuilder };
