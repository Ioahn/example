# 1. Install dependencies only when needed
FROM node:20.9.0-alpine AS builder

RUN apk add --no-cache libc6-compat git

ARG ENV
ARG SENTRY_AUTH_TOKEN
ARG SENTRY_ORG
ARG SENTRY_PROJECT

ENV SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN
ENV SENTRY_ORG=$SENTRY_ORG
ENV SENTRY_PROJECT=$SENTRY_PROJECT


ENV ENV=$ENV

WORKDIR /app

ENV HUSKY=0

COPY package.json yarn.lock tsconfig.json ./

RUN yarn install --frozen-lockfile && rm -rf /usr/local/share/.cache/yarn

COPY . .

COPY .env.${ENV}.sample .env
RUN npm run build

# 3. Production image, copy all the files and run next
FROM node:20.9.0-alpine AS runner
WORKDIR /app


RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static


USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD HOSTNAME="0.0.0.0" node server.js