import React from "react";
import "./App.css";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Page from "./Page";
import CreateForm from "./CreateForm";

function App() {
  return (
    <Page>
      <Container maxWidth="sm">
        <Typography variant="h2">Create a Secret Santa</Typography>
        <CreateForm
          onSubmit={(data) => {
            console.log(JSON.stringify(data));
          }}
        />
      </Container>
    </Page>
  );
}

export default App;
