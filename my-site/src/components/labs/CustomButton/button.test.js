// eslint-disable-next-line
import React from 'react'; 
import { render, fireEvent } from '@testing-library/react';
import CustomButton from './CustomButton';
import '@testing-library/jest-dom';

describe('Компонент CustomButton', () => {
  test('отрисовывает кнопку с корректным текстом', () => {
    const buttonText = 'Тест текст';
    const { getByText } = render(<CustomButton>{buttonText}</CustomButton>);
    const buttonElement = getByText(buttonText);
    expect(buttonElement).toBeInTheDocument();
  });

  test('вызывает функцию onClick при клике', () => {
    const onClickMock = jest.fn();
    const buttonText = 'Тест текст';
    const { getByText } = render(<CustomButton onClick={onClickMock}>{buttonText}</CustomButton>);
    const buttonElement = getByText(buttonText);
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});