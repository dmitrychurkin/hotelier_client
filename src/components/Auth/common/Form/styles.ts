import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => {
  console.log("theme.palette.secondary.main => ", theme.palette.secondary.main);
  return {
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    link: {
      textAlign: "right"
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
  };
});
