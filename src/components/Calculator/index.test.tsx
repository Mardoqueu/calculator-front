import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Calculator } from "./index";
import { Button, TextField } from "@mui/material";
import { evaluate } from "mathjs";

// Specific typing for tests
interface TestCalculatorProps {
  onInputChange?: () => void;
  apiRequest?: (expression: string) => Promise<{ result: number }>;
}

// Mock para onInputChange
const mockOnInputChange = vi.fn();

// Mock para onClick 
const mockOnClick = vi.fn();

// Mock para onChange 
const mockOnChange = vi.fn();

// Mock para a request da API usando mathjs
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