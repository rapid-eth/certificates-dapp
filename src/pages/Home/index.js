import React, { Component } from "react";
import { Link } from "@reach/router";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    display: "flex",
    border: "1px solid blue",
    maxWidth: "100%",
    minHeight: "300px"
  },
  title: {
    fontSize: 60
  },
  pos: {
    marginBottom: 12
  },
  body: {
    display: "flex",
    justifyContent: "center",
    border: "1px solid green",
    maxWidth: "100%"
  }
});

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.body}>
      <Card className={classes.card} variant="outlined">
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
            component="h2"
          ></Typography>
          <Typography variant="h5" component="h2">
            Hello and welcome
          </Typography>
          <Typography variant="body2" component="p">
            This is the certificates Dapp, it does x, y and z. Its a pretty cool
            // dapp, I'll explain how it works eventually but for now this
            filler // text will have to suffice.
            <br />
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
//     return (
//       <div>
//         <h1>Home Page</h1>
//         <h2>Hello and welcome</h2>
//         <p>
//           This is the certificates Dapp, it does x, y and z. Its a pretty cool
//           dapp, I'll explain how it works eventually but for now this filler
//           text will have to suffice.
//         </p>
//       </div>
//     );
//   }
// }

// export default Home;
