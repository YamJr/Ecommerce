  import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
  import { setContext } from '@apollo/client/link/context';

  
  const httpLink = new HttpLink({
    uri: '/api/graphql',
    fetch: (uri, options) => {
      // console.log("option is ", options);
      if (options && options.method === 'POST' && options.body) {
        const body = JSON.parse(options.body as string);
        const isQuery = body.query.trim().startsWith('query');

        if (isQuery) {
          const queryParams = new URLSearchParams({
            query: body.query,
            variables: body.variables ? JSON.stringify(body.variables) : '',
          });

          return fetch(`${uri}?${queryParams.toString()}`, {
            method: 'GET',
            headers: options.headers,
          });
        }
      }

      return fetch(uri, options);
    },
  });


  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('customerToken');

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "", 
      },
    };
  });


  const client = new ApolloClient({
    link: authLink.concat(httpLink), 
    credentials: 'include',
    cache: new InMemoryCache(),
  });

  export default client;


//   import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';

// // Use default HttpLink without custom fetch logic
// const httpLink = new HttpLink({
//   uri: '/api/graphql',
// });

// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem('customerToken');

//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

// // Configure cache with type policies if needed
// const cache = new InMemoryCache({
//   typePolicies: {
//     Cart: {
//       fields: {
//         items: {
//           merge(existing, incoming) {
//             return incoming; // Override default merge to use incoming data directly
//           },
//         },
//       },
//     },
//   },
// });

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   credentials: 'include',
//   cache,
// });

// export default client;
