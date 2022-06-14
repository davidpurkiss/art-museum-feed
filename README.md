# Tech Test
Hello! Thank you for taking the time to look at my tech test.

## Running
Below are steps required to get the backend and frontend running with either Docker or without.

### Docker
To get started with docker you will need to create a .env file in the root directory with the following.

```text
# Not needed as this will default to "http://localhost:4000/" but this highlights that it can be configured.
NEXT_PUBLIC_BACKEND_BASE_URL=http://localhost:4000/

# Also not needed but can be configured in case of staging environments.
HARVARD_ART_MUSEUM_BASE_URL=https://api.harvardartmuseums.org

HARVARD_ART_MUSEUM_API_KEY=<API KEY>
```

Then you can run the containers with 

```shell
docker-compose up
```

You'll be able to access the web app at http://localhost:3000.

The GraphQL server is available at http://localhost:4000.

### Locally
To run the backend and frontend services locally you can follow these steps.

#### Backend

First create a `.env` file in the backend directory with the following

```text
HARVARD_ART_MUSEUM_API_KEY=<API KEY>
```

Then run the following commands.

```shell
yarn
yarn build
yarn start
```

You can also run the service in development mode by running `yarn dev` instead of `yarn build` and `yarn start`.

#### Frontend

Run the following commands.

```shell
yarn
yarn build
yarn start
```

You can also run the service in development mode by running `yarn dev` instead of `yarn build` and `yarn start`.

## Notes
For this tech test, I decided to take an approach where I would be creating new services for use in production and where I would be extending and scaling it over time and with a team.

I spent a fair amount of time configuring the services and getting things working with TypeScript, on the backend, and MUI on the frontend. In hindsight, I would probably not introduce TypeScript and MUI and focus on adding extra features and testing.

It's been a while since I've set up new services, and I've been curious to see how MUI holds up as a frontend framework for personal projects so, I got some personal value out of the exercise. I usually use Vue + Nuxt + Vuetify for personal projects and wanted to see how React + Next + MUI compared.

There are a lot of things I would still do and it's hard to know exactly what you, as a reviewer, are looking for. Stef mentioned that this should take 2 - 3 hours but in the email I received, it mentions that I should be 100% happy with my submission and take more time if needed. Whether I'm 100% happy with my submission depends on how you look at it. I'm 100% happy with what I've done but there's a lot more I would still do and I've opted to find a balance between this by describing these changes below.

### General
#### Split Repo's
I would have separate repositories for the front-end and backend. Continuous integration and deployment would benefit from this as you would only release the backend when changes are made to the backend, likewise the frontend.

#### Update dockerfiles to be more suited for production
- Use directory permissions.
- Use cross-env.

#### Logging and Monitoring
Without having any infrastructure to run on it's hard to bring in logging and monitoring. Ideally, all logs would be written (via a library such as winston) to a service such as Elastic Search or a GCP/AWS specific service for logging. The logs are stored in this service and easily accessible and queryable. Careful not to log any PII.

Similarly, HTTP metrics can be collected about the services and used to monitor them. You can write alerts based on 5XX HTTP responses or explicit metrics that are written out from the service.

### Backend

#### Formalise error handling for REST API's
- Create function, move to common location and test.
- Check if the API returns details about 4XX requests and include in error messages.

I initially used Axios for better error handling but Apollo doesn't seem to play well with the Axios error types and error messages were not be serialised properly.

#### Explicitly map responses from API to graphQL schema
- This would allow to provide different names and casing for fields. I.e. pascal casing. 
- I would prefer errors and alerts in case of unexpected changes to the API rather than silently returning no data.
  - Having a mapping would provide a hook for this.
  - This doesn't mean that the API would fail necessarily but just that an alert is sent.

#### Split resolvers and typeDefs
There's only a single endpoint now, so it's difficult to split up. I would rather group types, queries and resolvers by the endpoint, e.g. objects or classifications.

An example of this might look as follows,

```text
- src
  - queries
    - objects
      - model
        - types.ts
        - SomeClass.ts
        - SomeInterface.ts
      - typeDefs.ts
      - resolvers.ts
      - index.ts
    - classifications
      - model
      - typeDefs.ts
      - resolvers.ts
      - index.ts
```

All the queries and resolvers could be combined in the root typeDefs and resolvers.

#### Federation
Overkill for this project and unless you add additional microservices but I thought I'd mention it.

#### Add ids to records
This would help on the front-end for keys and testing.

#### Additional integration tests
Add additional integration tests to test graphQL variables and errors.

### Frontend

#### Integration/e2e tests
I would add one or two cypress tests to test the integration between the front-end and the backend. This would require stubbing out the Harvard Art Museum API so that it returns mock data so that the tests aren't flaky.

#### Additional Features

- Dropdown to allow selecting different classification, e.g. Paintings.
- Extend the pagination control to allow for selecting different page sizes, e.g. 20 or 50.
- Add text searching.
- Extend the details view with additional information.
- Navigate to a page when selecting an item in the list. For SEO and sharing.

### Infrastructure
I think this is definitely way out of scope but I'm a fan of Infrastructure as Code and I would keep my AWS cloudformation templates or terraform code in the repo.
