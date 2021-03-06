import React from "react";
import { WithStyles, withStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  row: {
    spacing: theme.spacing(1),
    marginTop: 20,
  },
  datePicker: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  currencyPicker: {
    minWidth: 120,
  },
  noteArea: {
    width: "100%",
  },
  participantCard: {
    marginTop: 20,
  },
});

export interface Participant {
  name: string;
  email: string;
  extra_details: string;
}

export interface Currency {
  amount: number;
  currency: string;
}

export interface GameData {
  name: string;
  admin_name: string;
  admin_email: string;
  gift_date: string;
  max_price: Currency;
  msg_notes: string;
  participants: Array<Participant>;
}

interface Props extends WithStyles<typeof styles> {
  onSubmit: (data: GameData) => void;
  disable: boolean;
}

interface State {
  name: string;
  adminName: string;
  adminEmail: string;
  dueDate: string;
  maxAmount: number;
  maxCurrency: string;
  notes: string;
  participants: Array<Participant>;
}

class CreateForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: "",
      adminName: "",
      adminEmail: "",
      dueDate: "2020-12-25",
      maxAmount: 0.0,
      maxCurrency: "MXN",
      notes: "",
      participants: [],
    };
  }

  submitForm = () => {
    const participants = [...this.state.participants];
    const data = {
      name: this.state.name,
      admin_name: this.state.adminName,
      admin_email: this.state.adminEmail,
      gift_date: this.state.dueDate + "T00:00:00Z",
      max_price: {
        amount: this.state.maxAmount,
        currency: this.state.maxCurrency,
      },
      msg_notes: this.state.notes,
      participants,
    };
    this.props.onSubmit(data);
  };

  updateParticipantName = (value: string, idx: number) => {
    const participants = [...this.state.participants];
    participants[idx].name = value;
    this.setState({
      participants,
    });
  };

  updateParticipantEmail = (value: string, idx: number) => {
    const participants = [...this.state.participants];
    participants[idx].email = value;
    this.setState({
      participants,
    });
  };

  updateParticipantNotes = (value: string, idx: number) => {
    const participants = [...this.state.participants];
    participants[idx].extra_details = value;
    this.setState({
      participants,
    });
  };

  addParticipant = () => {
    const participants = [...this.state.participants];
    participants.push({ name: "", email: "", extra_details: "" });
    this.setState({
      participants,
    });
  };

  removeParticipant = (idx: number) => {
    const participants = [...this.state.participants];
    participants.splice(idx, 1);
    this.setState({
      participants,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.root} noValidate autoComplete="off">
        <Grid container className={classes.row}>
          <Grid item xs={6}>
            <TextField
              id="admin-name"
              label="Admin Name"
              value={this.state.adminName}
              onChange={(e) => {
                this.setState({ adminName: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="admin-email"
              label="Admin Email"
              type="email"
              value={this.state.adminEmail}
              onChange={(e) => {
                this.setState({ adminEmail: e.target.value });
              }}
            />
          </Grid>
        </Grid>

        <Grid container className={classes.row}>
          <Grid item xs={6}>
            <TextField
              id="game-name"
              label="Game Name"
              value={this.state.name}
              onChange={(e) => {
                this.setState({ name: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="gift-date"
              label="Gift Date"
              type="date"
              defaultValue="2020-12-25"
              className={classes.datePicker}
              value={this.state.dueDate}
              onChange={(e) => {
                this.setState({ dueDate: e.target.value });
              }}
            />
          </Grid>
        </Grid>

        <Grid container className={classes.row}>
          <Grid item xs={12}>
            <TextField
              id="max-value"
              label="Max Gift Value"
              type="number"
              value={this.state.maxAmount}
              onChange={(e) => {
                console.log("");
                this.setState({ maxAmount: parseInt(e.target.value) });
              }}
            />
            <TextField
              id="max-currency"
              label="Currency"
              select
              className={classes.currencyPicker}
              value={this.state.maxCurrency}
              onChange={(e) => {
                this.setState({ maxCurrency: e.target.value });
              }}
            >
              <MenuItem key={"MXN"} value={"MXN"}>
                MXN (Mexican Peso)
              </MenuItem>
              <MenuItem key={"USD"} value={"USD"}>
                USD (US Dollar)
              </MenuItem>
              <MenuItem key={"GBP"} value={"GBP"}>
                GBP (British Pound)
              </MenuItem>
            </TextField>
          </Grid>
        </Grid>

        <Grid container className={classes.row}>
          <Grid item xs={12}>
            <TextField
              id="game-notes"
              label="Notes for Everyone"
              helperText="These will be sent to everyone. Things like secret santa instructions not covered already go here."
              multiline={true}
              rows={5}
              className={classes.noteArea}
              value={this.state.notes}
              onChange={(e) => {
                this.setState({ notes: e.target.value });
              }}
            />
          </Grid>
        </Grid>
        <br />
        <Divider light />
        <Typography variant="h3">Participants</Typography>
        <Typography variant="body1">
          Note that the admin is not a participant, so their details need to be
          added here too.
        </Typography>
        <Grid container className={classes.row}>
          <Grid item xs={12}>
            <Fab
              onClick={() => {
                this.addParticipant();
              }}
              size="small"
              color="secondary"
              aria-label="add"
            >
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>
        <br />

        {this.state.participants.map((participant, idx) => {
          return (
            <Card className={classes.participantCard}>
              <CardContent>
                <Grid container className={classes.row}>
                  <Grid item xs={6}>
                    <TextField
                      id={"participant-name-" + idx}
                      value={participant.name}
                      onChange={(e) =>
                        this.updateParticipantName(e.target.value, idx)
                      }
                      label="Participant Name"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id={"participant-email-" + idx}
                      value={participant.email}
                      onChange={(e) =>
                        this.updateParticipantEmail(e.target.value, idx)
                      }
                      label="Participant Email"
                      type="email"
                    />
                  </Grid>
                </Grid>
                <TextField
                  id={"participant-notes-" + idx}
                  value={participant.extra_details}
                  onChange={(e) =>
                    this.updateParticipantNotes(e.target.value, idx)
                  }
                  label="Notes about the participant"
                  helperText="These will be sent to the person doing the gifting. Things like an address or delivery instructions would go here."
                  multiline={true}
                  rows={5}
                  className={classes.noteArea}
                />
                <Grid container className={classes.row}>
                  <Grid item xs={12}>
                    <Fab
                      onClick={() => {
                        this.removeParticipant(idx);
                      }}
                      size="small"
                      color="secondary"
                      aria-label="subtract"
                    >
                      <DeleteIcon />
                    </Fab>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          );
        })}
        <br />
        <Button
          variant="contained"
          color="primary"
          id="submit"
          onClick={() => {
            this.submitForm();
          }}
          disabled={this.props.disable}
          endIcon={<SaveIcon />}
        >
          Send
        </Button>
      </form>
    );
  }
}

export default withStyles(styles, { withTheme: true })(CreateForm);
