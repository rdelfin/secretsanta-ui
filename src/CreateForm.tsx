import React from "react";
import { WithStyles, withStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import DeleteIcon from "@material-ui/icons/Delete";

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

interface Participant {
  name: string;
  email: string;
  notes: string;
}

interface Props extends WithStyles<typeof styles> {}
interface State {
  participants: Array<Participant>;
}

class CreateForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      participants: [],
    };
  }

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
    participants[idx].email = value;
    this.setState({
      participants,
    });
  };

  addParticipant = () => {
    const participants = [...this.state.participants];
    participants.push({ name: "", email: "", notes: "" });
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
            <TextField id="standard-basic" label="Admin Name" />
          </Grid>
          <Grid item xs={6}>
            <TextField id="standard-basic" label="Admin Email" type="email" />
          </Grid>
        </Grid>

        <Grid container className={classes.row}>
          <Grid item xs={12}>
            <TextField
              id="gift-date"
              label="Gift Date"
              type="date"
              defaultValue="2020-12-25"
              className={classes.datePicker}
            />
          </Grid>
        </Grid>

        <Grid container className={classes.row}>
          <Grid item xs={12}>
            <TextField id="value" label="Value" type="number" />
            <TextField
              id="currency"
              label="Currency"
              select
              className={classes.currencyPicker}
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
                  value={participant.notes}
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
      </form>
    );
  }
}

export default withStyles(styles, { withTheme: true })(CreateForm);
