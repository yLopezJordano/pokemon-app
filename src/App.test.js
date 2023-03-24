import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

describe('App component', () => {
  test('changes page when nav button is clicked', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            results: [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }],
            next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
            previous: null,
          }),
      })
    );
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>);
    const nextButton = await screen.findByRole('button', { name: /next/i });
    fireEvent.click(nextButton);
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?offset=20&limit=20');
  });
  
  test('fetches pokemon list on load', () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            results: [
              { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
              { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
            ],
            next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
            previous: null,
          }),
      })
    );
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
  });

});

