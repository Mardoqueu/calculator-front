import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

/**
 * ErrorPage component provides a user interface that displays an error message
 * and a button to navigate the user back to the home page.
 *
 * @return {JSX.Element} A container with a message and a button for navigation.
 */
export function ErrorPage() {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Typography variant="h3">Please come home</Typography>

        <Button variant="contained" onClick={() => navigate("/home")}>Home</Button>
      </Container>
    </>
  );
}
