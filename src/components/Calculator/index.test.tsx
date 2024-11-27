import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Calculator } from "./index";
import { evaluate } from "mathjs";

// Tipagem específica para os testes
interface TestCalculatorProps {
  onInputChange?: () => void;
  apiRequest?: (expression: string) => Promise<{ result: number }>;
}

// Mock para onInputChange
const mockOnInputChange = vi.fn();

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