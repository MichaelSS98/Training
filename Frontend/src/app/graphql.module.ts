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

  //if there is a token, it will be added to the headers field of the request
  const auth = setContext((operatio, context) => {
    const token = localStorage.getItem("accessToken");

    if (token === null)
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
