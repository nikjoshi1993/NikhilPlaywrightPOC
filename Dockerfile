# Dockerfile for Playwright CI/CD
FROM mcr.microsoft.com/playwright:v1.44.0-jammy
WORKDIR /app
COPY . .
RUN npm ci
RUN npx playwright install --with-deps
CMD ["npx", "playwright", "test"]
