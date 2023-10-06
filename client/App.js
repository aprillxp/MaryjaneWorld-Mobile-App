import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import MainTab from "./navigators/MainTab";

const client = new ApolloClient({
  uri: "https://c5a0-125-167-31-70.ngrok-free.app",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <MainTab />
      </NavigationContainer>
    </ApolloProvider>
  );
}
