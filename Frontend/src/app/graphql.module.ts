import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import { HttpClientModule } from '@angular/common/http';
import {ApolloClientOptions, InMemoryCache, ApolloLink} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import {setContext} from '@apollo/client/link/context'

const uri = 'http://localhost:5000/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {

  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8'
    }
  }));

  const auth = setContext((operatio, context) => {
    const token = localStorage.getItem("token");

    if (token === null || token === "")
      return {};
    else
      return {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
  });

  return {
    link: ApolloLink.from([basic, auth, httpLink.create({uri})]),
    cache: new InMemoryCache({
      typePolicies: {
        Employee: {
          merge: true
        }
      }
    }),
  };
}

@NgModule({
  exports: [
    HttpClientModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
