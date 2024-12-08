import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { toast } from "react-toastify";

import { styled } from "@mui/material/styles";

/**
 * Styled component derived from MuiCard, customized to have a flexible and
 * centered layout with specific styling for responsive design and theme adaptability.
 *
 * The Card component is styled to display its content in a column direction
 * and automatically centers itself with a full width on smaller screens.
 * As the screen size increases beyond the 'sm' breakpoint, a maximum width
 * of 450px is applied for better layout management.
 *
 * The component utilizes theme-based spacing for padding and gaps between
 * its children, ensuring a consistent look throughout the UI. It also incorporates
 * a unique box shadow for visual depth and adjusts shadow intensity when in
 * dark mode, leveraging theme-specific styles.
 *
 * Responsiveness and adaptability to theme changes are key features of this Card component.
 */
const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

/**
 * The `SignInContainer` is a styled component based on the `Stack` component, designed to be used as a container for a sign-in or login interface.
 * It provides responsive styling, adapting its padding based on the screen size and adjusting its appearance depending on the theme applied.
 *
 * Key features:
 * - Dynamically calculates height considering a CSS variable `--template-frame-height`.
 * - Ensures the container has a full height and minimum height of 100%.
 * - Provides padding that changes at the "sm" breakpoint and above.
 * - Uses a pseudo-element `::before` to apply a radial background gradient, which can change based on the theme.
 * - Ensures background visuals remain consistent by positioning the pseudo-element absolutely with a z-index that places it behind the main content.
 *
 * This allows for consistency in user interfaces by providing a modern and adaptable styling mechanism.
 */
const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(210, 100%, 97%))",
    }),
  },
}));

/**
 * SignIn component handles the user sign-in process by rendering a form that accepts username and password,
 * validating these inputs, and attempting to authenticate the user upon form submission. If authentication
 * is successful, the user is redirected to the home page, and relevant authentication tokens are stored.
 *
 * @return {JSX.Element} The JSX code for sign-in form with input fields for username and password,
 * error messages, and a submit button that initiates the authentication process.
 */
export function SignIn() {
  const [userNameError, setUserNameError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const navigate = useNavigate();
  const { setUserToken } = useAuth();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userNameError || passwordError) {
      return;
    }
    const data = new FormData(event.currentTarget);

    const user = {
      userName: data.get("userName"),
      password: data.get("password"),
    };

    try {
      const { token, userId } = await login(user);
      
      if (token) {
        localStorage.setItem("userToken", token);
        localStorage.setItem("userId", userId);
        setUserToken(token);
        navigate("home");
        toast.success("Login success!");
        return;
      }

      throw new Error();
    } catch (error) {
      console.log("An error occurred while logging in", error);
      toast.error(`An error occurred during login, please contact support`);
    }
  };

  const validateInputs = () => {
    const username = document.getElementById("userName") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    let isValid = true;

    if (!username.value) {
      setUserNameError(true);
      setEmailErrorMessage("Please enter a valid username.");
      isValid = false;
    } else {
      setUserNameError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl style={{ minWidth: 380 }}>
              <FormLabel htmlFor="userName" style={{ textAlign: "initial" }}>
                Username
              </FormLabel>
              <TextField
                error={userNameError}
                helperText={emailErrorMessage}
                id="userName"
                type="text"
                name="userName"
                placeholder="username"
                autoComplete="username"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={userNameError ? "error" : "primary"}
                sx={{ ariaLabel: "username" }}
              />
            </FormControl>
            <FormControl>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <FormLabel htmlFor="password">Password</FormLabel>
              </Box>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign in
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Don&apos;t have an account?{" "}
              <span>
                <Link to={"/register"}>Sign up</Link>
              </span>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </>
  );
}
