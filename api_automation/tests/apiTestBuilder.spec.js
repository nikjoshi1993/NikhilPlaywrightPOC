// API Test Suite using ApiTestBuilder and Playwright standards
const { test, expect, describe } = require('@playwright/test');
const { ApiTestBuilder } = require('../apiTestBuilder');

// Boilerplate: Sample schemas
const postSchema = {
  type: 'object',
  properties: {
    userId: { type: 'number' },
    id: { type: 'number' },
    title: { type: 'string' },
    body: { type: 'string' }
  },
  required: ['userId', 'id', 'title', 'body']
};

const commentSchema = {
  type: 'object',
  properties: {
    postId: { type: 'number' },
    id: { type: 'number' },
    name: { type: 'string' },
    email: { type: 'string' },
    body: { type: 'string' }
  },
  required: ['postId', 'id', 'name', 'email', 'body']
};

describe('JSONPlaceholder API', () => {
  test('GET /posts/1 returns expected post', async () => {
    await new ApiTestBuilder()
      .method('GET')
      .url('https://jsonplaceholder.typicode.com/posts/1')
      .expectStatus(200)
      .expectBody({
        userId: 1,
        id: 1,
        title: expect.any(String),
        body: expect.any(String)
      })
      .schema(postSchema)
      .run();
  });

  test('GET /comments/1 validates comment schema', async () => {
    await new ApiTestBuilder()
      .method('GET')
      .url('https://jsonplaceholder.typicode.com/comments/1')
      .expectStatus(200)
      .schema(commentSchema)
      .run();
  });

  test('POST /posts creates a new post', async () => {
    const newPost = {
      title: 'foo',
      body: 'bar',
      userId: 1
    };
    const responseSchema = {
      type: 'object',
      properties: {
        id: { type: 'number' },
        title: { type: 'string' },
        body: { type: 'string' },
        userId: { type: 'number' }
      },
      required: ['id', 'title', 'body', 'userId']
    };
    await new ApiTestBuilder()
      .method('POST')
      .url('https://jsonplaceholder.typicode.com/posts')
      .headers({ 'Content-type': 'application/json; charset=UTF-8' })
      .body(JSON.stringify(newPost))
      .expectStatus(201)
      .schema(responseSchema)
      .run();
  });

  test('Negative: GET /posts/0 returns 404', async () => {
    await new ApiTestBuilder()
      .method('GET')
      .url('https://jsonplaceholder.typicode.com/posts/0')
      .expectStatus(404)
      .run();
  });
});
