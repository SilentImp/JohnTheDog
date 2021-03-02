# How to install
```
npm ci
```

# How run
```
npm run build
npm start
```

# How to run with Docker
```
npm run docker:build
npm run docker:run
```

# How to publish to Docker Hub

You will need credentials for my Docker Hub, 
or you will have to reconfigure the image name to publish it.

```
docker login
npm run docker:publish
```

# Deployment

Run:

```
git clone git@github.com:SilentImp/adyen.git
cd adyen
docker-compose -f docker-compose.yml up --build -d
```

This command will start Nginx as a reverse proxy to the next.js node server.
Also, Watchtower will be started and will update an image on each
push to docker hub.

I have configured my VPS, so the project was available on 
https://adyen.frontender.info/.

# To test
```
npm run lint
npm test
```

# Decisions

## Fallbacks

Core app functionality would still work in a browser with JavaScript disabled.

## File structure

Because I do not know project domain, user journeys planned etc. 
I decided to keep it simple. I have added the folders with self-descriptive names:

- components
- contexts
- configs
- utils

From there we can move toward DDD or atomic design, for example.

## Scalability

Dockerization enables us to scale seamlessly.

# Possible improvements

- We can add cypress tests for e2e. But they are costly, so everything we can we should cover with jest.
- Storybook can be added.
- Performance testing/monitoring could be added.
- Typescript can be used for higher type-safety.
- We can add localyzation
- We can diverse API's by adding additional sources, Visa API for example.
- Improve a bit naming consistency
