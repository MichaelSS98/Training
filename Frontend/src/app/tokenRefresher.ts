import { Apollo, gql } from "apollo-angular"

const REFRESH_TOKEN = gql`
mutation RefreshTokenMutation($token: String!) {
    refreshToken(token: $token)
    {
      accessToken
      refreshToken
    }
  }
`;

export class TokenRefresher {

    constructor(private apollo: Apollo) {}

    refreshToken(): any {

        
        const refreshToken = localStorage.getItem("refreshToken");

        return this.apollo.mutate({
            mutation: REFRESH_TOKEN,
            variables: {
                token: refreshToken
            }
        });
    };
}