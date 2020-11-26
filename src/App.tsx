import React from "react";
import "./App.css";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import { WithStyles, withStyles, Theme } from "@material-ui/core/styles";
import Page from "./Page";
import CreateForm, { GameData, Participant } from "./CreateForm";

interface CreateRequest {
  secret_santa: GameData;
}

interface CreateResponse {
  game_id: number;
}

interface BeginRequest {
  game_id: number;
}

interface BeginResponse {
  ok: boolean;
}

async function callCreate(req_data: CreateRequest): Promise<CreateResponse> {
  const response = await fetch("/api/create", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(req_data),
  });
  return response.json();
}

async function callBegin(req_data: BeginRequest): Promise<BeginResponse> {
  const response = await fetch("/api/begin", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(req_data),
  });
  return response.json();
}

const styles = (theme: Theme) => ({
  spinner: {
    margin: "auto",
    width: "50%",
    padding: "10px",
  },
});

interface Props extends WithStyles<typeof styles> {}

interface State {
  loading: boolean;
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  submitForm = (game_data: GameData) => {
    this.setState({ loading: true });
    callCreate({ secret_santa: game_data })
      .then((response) => {
        return callBegin({ game_id: response.game_id });
      })
      .then((response) => {
        this.setState({ loading: false });
      });
  };

  render() {
    return (
      <Page>
        <Container maxWidth="sm">
          <Typography variant="h2">Create a Secret Santa</Typography>
          <CreateForm
            onSubmit={(data) => {
              console.log(JSON.stringify(data));
              this.submitForm(data);
            }}
            disable={this.state.loading}
          />
          <br />
          {this.state.loading ? (
            <CircularProgress className="spinner" />
          ) : (
            <br />
          )}
        </Container>
      </Page>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
