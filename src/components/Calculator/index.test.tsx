import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Calculator } from "./index";
import { Button, TextField } from "@mui/material";
import { evaluate } from "mathjs";

// Specific typing for tests
/**
 * Represents properties for a test calculator component.
 *
 * @interface TestCalculatorProps
 *
 * @property {Function} [onInputChange] - Optional function called when the input changes.
 * It has no parameters and returns no value.
 *
 * @property {Function} [apiRequest] - Optional function to make an API request with the given expression.
 * It accepts a single parameter of type string, representing the expression to evaluate.
 * It returns a promise that resolves to an object containing a numeric result.
 */
interface TestCalculatorProps {
  onInputChange?: () => void;
  apiRequest?: (expression: string) => Promise<{ result: number }>;
}

// Mock para onInputChange
/**
 * A mock function created using `vi.fn()` that serves as a stub for input change event handlers.
 * This mock function can be used in tests to verify if input change events properly trigger
 * the corresponding event handler. It can be configured to simulate various behaviors such as
 * capturing calls, returning specific values, or throwing errors depending on the test requirements.
 */
const mockOnInputChange = vi.fn();

// Mock para onClick 
/**
 * A Jest mock function that simulates an onClick event handler.
 *
 * This mock function is useful in testing components or functions that require
 * an onClick handler without needing an actual implementation. It allows you to
 * inspect how many times it was called, with what arguments, and other details
 * related to its invocation during the test.
 *
 * Common use cases include verifying if a component calls its click handler
 * correctly or ensuring that the correct parameters are passed to event
 * handlers.
 */
const mockOnClick = vi.fn();

// Mock para onChange 
/**
 * A mock function used to simulate the behavior of an `onChange` event handler.
 * This is typically used in testing environments to verify that changes trigger the expected calls.
 *
 * This variable is created using `vi.fn()`, a utility from a testing library, which creates a mock function.
 * The mock function can be configured to return specific values, track call history, and validate call arguments.
 *
 * It is useful for testing components or functions that depend on `onChange` events.
 */
const mockOnChange = vi.fn();

// Mock para a request da API usando mathjs
/**
 * A mock function simulating an API request, designed to evaluate a given
 * expression and return a promise that resolves with an object containing
 * the evaluation result.
 *
 * This variable uses a mock function generator to create a function that
 * takes an expression as an argument, processes it through an `evaluate`
 * function, and returns a promise. The promise resolves to an object
 * structured with a `result` property, which holds the outcome of the
 * `evaluate` function.
 *
 * The function is intended to be used in testing scenarios where the behavior
 * of an API request needs to be simulated without making actual network requests.
 *
 * @type {Function}
 * @param {any} expression - The input expression to be evaluated by the mock function.
 * @returns {Promise<Object>} A promise resolving to an object containing the result of the evaluation.
 * @throws {Error} If the evaluation fails, an error may be propagated through a rejected promise.
 */
const mockApiRequest = vi.fn(expression => {
  const result = evaluate(expression);
  return Promise.resolve({ result });
});

describe("Calculator Component", () => {
  it("should display initial value 0", () => {
    render(<Calculator onInputChange={mockOnInputChange} apiRequest={mockApiRequest} {...{} as TestCalculatorProps} />);
    const display = screen.getByRole("textbox");
    expect(display).toHaveValue("0");
  });

  it("should update the display when numbers are clicked", () => {
    render(<Calculator onInputChange={mockOnInputChange} apiRequest={mockApiRequest} {...{} as TestCalculatorProps} />);
    const button1 = screen.getByText("1");
    const button2 = screen.getByText("2");
    fireEvent.click(button1);
    fireEvent.click(button2);
    const display = screen.getByRole("textbox");
    expect(display).toHaveValue("12");
  });

  it("should clear the display when CE button is clicked", () => {
    render(<Calculator onInputChange={mockOnInputChange} apiRequest={mockApiRequest} {...{} as TestCalculatorProps} />);
    const button1 = screen.getByText("1");
    const buttonCE = screen.getByText("CE");
    fireEvent.click(button1);
    fireEvent.click(buttonCE);
    const display = screen.getByRole("textbox");
    expect(display).toHaveValue("0");
  });
});

describe("Button Component", () => {
  it("should render the button with provided text", () => {
    render(<Button onClick={mockOnClick}>Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it("should call onClick when the button is clicked", () => {
    render(<Button onClick={mockOnClick}>Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("should be disabled when disabled prop is true", () => {
    render(<Button onClick={mockOnClick} disabled>Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeDisabled();
  });
});

describe("TextField Component", () => {
  it("should render the text field with provided label", () => {
    render(<TextField label="Name" value="" onChange={mockOnChange} />);
    const textField = screen.getByLabelText(/name/i);
    expect(textField).toBeInTheDocument();
  });

  it("should display the correct initial value", () => {
    render(<TextField label="Name" value="John Doe" onChange={mockOnChange} />);
    const textField = screen.getByLabelText(/name/i);
    expect(textField).toHaveValue("John Doe");
  });

  it("should call onChange when the text is changed", () => {
    render(<TextField label="Name" value="" onChange={mockOnChange} />);
    const textField = screen.getByLabelText(/name/i);
    fireEvent.change(textField, { target: { value: 'Jane Doe' } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it("should display the correct placeholder", () => {
    render(<TextField label="Name" value="" onChange={mockOnChange} placeholder="Enter your name" />);
    const textField = screen.getByPlaceholderText(/enter your name/i);
    expect(textField).toBeInTheDocument();
  });
});