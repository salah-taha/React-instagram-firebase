import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db, auth, storage } from "./firebase";
import { Button, Modal, Input, makeStyles } from "@material-ui/core";

function getModalStyle() {
  return {
    top: "50%",
    left: "50%",
    transform: `translate(-${50}%, -${50}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    outline: 0,
    backgroundColor: theme.palette.background.paper,
    border: "none",
    borderRadius: "20px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();
  const [openSignIn, setOpenSignIn] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, [user]);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(snapshot.docs);
    });
  }, []);

  const signUp = async (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({ displayName: username });
      })
      .then((authUser) => {
        return setOpen(false);
      })
      .catch((err) => alert(err.message));
  };
  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        return setOpenSignIn(false);
      })
      .catch((err) => alert(err.message));
  };

  const logOut = (event) => {
    auth.signOut();
  };

  const uploadPhoto = () => {};
  return (
    <div className="app">
      <Modal
        className="authenticationModal__modal"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="Instagram"
              />
            </center>
            <Input
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></Input>
            <Input
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
            <Button
              disabled={!password || !email || !username}
              variant="contained"
              color="primary"
              type="button"
              onClick={signUp}
            >
              Sign Up
            </Button>
          </form>
        </div>
      </Modal>
      <Modal
        className="authenticationModal__modal"
        open={openSignIn}
        onClose={() => {
          setOpenSignIn(false);
        }}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="Instagram"
              />
            </center>
            <Input
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
            <Button
              disabled={!password || !email}
              variant="contained"
              color="primary"
              type="button"
              onClick={signIn}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Modal>
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="Instagram"
        />
        {user ? (
          <Button
            variant="contained"
            color="primary"
            type="button"
            onClick={logOut}
          >
            Logout
          </Button>
        ) : (
          <div className="app__loginContainer">
            <Button
              variant="contained"
              color="primary"
              type="button"
              onClick={handleOpen}
            >
              Sign Up
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="button"
              onClick={() => {
                setOpenSignIn(true);
              }}
            >
              Sign In
            </Button>
          </div>
        )}
      </div>

      {posts.map((post) => (
        <Post post={post.data()} key={post.id} />
      ))}
    </div>
  );
}

export default App;
