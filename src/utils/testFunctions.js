import { screen } from "@testing-library/react";

function textContentFilter(text) {
  return (content, element) => {
    const hasText = (element) => element.textContent === text;
    const elementHasText = hasText(element);
    const childrenDontHaveText = Array.from(element?.children || []).every(
      (child) => !hasText(child)
    );
    return elementHasText && childrenDontHaveText;
  };
}

export function getByTextContent(text) {
  return screen.getByText(textContentFilter(text));
}

export function queryByTextContent(text) {
  return screen.queryByText(textContentFilter(text));
}
