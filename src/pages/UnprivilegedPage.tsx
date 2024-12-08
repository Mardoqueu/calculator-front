import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

/**
 * Represents a page that informs the user they are not authorized to access the requested service and prompts them to log in.
 *
 * @return {JSX.Element} A JSX component rendering an unprivileged message with a navigation button to the homepage.
 */
export function UnprivilegedPage() {
  const navigate = useNavigate();

  return (
    <>
      <Typography variant="h3">Unprivileged</Typography>

      <Container>
        <Typography variant="h3">Please log in before attempting to access the service</Typography>

        <Button variant="contained" onClick={() => navigate("/")}>Home</Button>
      </Container>
    </>
  );
}
