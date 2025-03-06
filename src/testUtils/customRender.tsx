import { render } from "@testing-library/react";
import { ThemeProvider } from "@zendeskgarden/react-theming";

// Custom render function that wraps all components with a ThemeProvider
export const customRender = (ui: React.ReactElement) =>
  render(<ThemeProvider>{ui}</ThemeProvider>);
