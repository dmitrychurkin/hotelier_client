import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import "./App.css";

const USER_BY_ID = gql`
  query UserByID($id: ID!) {
    userById(id: $id) {
      id
      email
    }
  }
`;

const App: React.FC = () => {
  const query = useQuery(USER_BY_ID, {
    context: {
      testContext: true
    },
    variables: { id: "ck4332g32ly0x0922q6y11ask" }
  });
  console.log("query => ", query);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
