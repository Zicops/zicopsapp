import { ApolloClient, createHttpLink, InMemoryCache, gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://demo.zicops.com/um/api/v1/query'
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('keyToken');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

export const userClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export const USER_LOGIN = gql`
  mutation {
    login {
      user {
        id
        firstName
        lastName
        Status
        Role
        IsVerified 
        IsActive 
        Gender 
        CreatedBy 
        UpdatedBy 
        CreatedAt 
        UpdatedAt 
        Email 
        Phone 
        PhotoUrl 
      }
      access_token
    }
  }
`;

// account created for super User(at backend manual) -> login with that account /login ->
// 1). firebase call for email and password then return uid and tokenId. from this token we will call our UserMutation.
// IT WILL return tokenZ(custom Token from backend) and user detail. save in browser storage
// validate tokenZ with backend on app initialization. ( after sometime tokenZ will be expired from backend)

//2). for first time user login. after receiving tokenZ check IsVerified

//3). 
