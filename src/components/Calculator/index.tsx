import { useState } from "react";
import { Box, Button, InputBase, Typography } from "@mui/material";
import { calculateOperation } from "../../services/api";
import { toast } from "react-toastify";
import { CalculatorProps } from "../../interfaces/CalculatorProps";

/**
 * Calculator component that simulates a basic calculator interface.
 *
 * @param {CalculatorProps} props - The properties to configure the Calculator.
 * @param {Function} props.onInputChange - Callback function invoked with the result of the operation.
 *
 * @returns {React.Element} A styled calculator UI component with digit and operator buttons, along with input display.
 *
 * State:
 * - `input`: A string representing the current input displayed on the calculator, initially set to "0".
 *
 * Functions:
 * - `handleClick`: Updates the `input` state based on user button clicks, concatenates digits and operators.
 * - `handleEqual`: Calculates the result of the current `input` string, communicates with a server-side operation function.
 * - `handleClear`: Resets the `input` state to "0", used to clear the current input.
 *
 * UI Details:
 * - Includes a labeled display area showing the current `input`.
 * - Number and operation buttons are provided for user interactions.
 * - User input is formatted for read-only display, preventing manual edits.
 * - Styled using Material-UI components, ensuring a visually appealing layout.
 */
export const Calculator = ({ onInputChange }: CalculatorProps) => {
  const [input, setInput] = useState<string>("0");

  const handleClick = (value: string) => {
    setInput((prevInput) => (prevInput === "0" ? value : prevInput + value));
  };

  const handleEqual = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        return toast.error("Log in again to get user id, user id not found");
      }

      let processedInput = input;
      processedInput = processedInput.replace(/√(\d+)/g, "sqrt($1)");
      const response = await calculateOperation(Number(userId), processedInput);

      setInput(response);
      onInputChange(response);

      return;
    } catch {
      setInput("0");
    }
  };

  const handleClear = () => {
    try {
      setInput("0");
    } catch {
      setInput("Error");
    }
  };

  return (
    <Box
      sx={{
        minWidth: 280,
        minHeight: 200,
        maxHeight: 400,
        maxWidth: 300,
        bgcolor: "#f0f0f0",
        border: "2px solid #cccccc",
        borderRadius: 2,
        paddingTop: "10px", 
        paddingBottom: "20px", 
        paddingLeft: "20px", 
        paddingRight: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h6" align="center" fontWeight={600} gutterBottom>
        Calculator
      </Typography>
      <InputBase
        sx={{
          bgcolor: "#FFFFFF",
          border: "1px solid #cccccc",
          borderRadius: 2,
          padding: 1,
          height: 54,
          color: "#333",
          pointerEvents: "none",
          userSelect: "none",
          fontWeight: 600,
          fontSize: 24,
          textAlign: "right",
          mb: 2,
          maxWidth: 280,
        }}
        value={input}
        inputProps={{
          style: {
            textAlign: "center",
          },
        }}
        fullWidth
      />
      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={1}>
        {["9", "8", "7", "6", "5", "4", "3", "2", "1"].map((num) => (
          <Button
            key={num}
            variant="contained"
            color="primary"
            onClick={() => handleClick(num)}
            sx={{ width: "100%", maxHeight: 60 }}
          >
            {num}
          </Button>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleClick("0")}
          sx={{ width: "100%", maxheight: 60 }}
        >
          0
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClear}
          sx={{ width: "100%", maxheight: 60 }}
        >
          CE
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleEqual}
          sx={{ width: "100%", maxHeight: 60 }}
        >
          =
        </Button>
      </Box>
      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={1} mt={2}>
        {["+", "-", "*", "/", "√", "."].map((operator) => (
          <Button
            key={operator}
            variant="contained"
            color="secondary"
            onClick={() => handleClick(operator)}
            sx={{ width: "100%", maxheight: 60 }}
          >
            {operator}
          </Button>
        ))}
      </Box>
    </Box>
  );
};
