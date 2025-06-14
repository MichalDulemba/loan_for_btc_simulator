# Testy dla BTC Engine

## Uruchamianie testów

```bash
# Uruchom testy w trybie watch
npm test

# Uruchom testy jednorazowo
npm run test:run

# Uruchom testy z interfejsem graficznym
npm run test:ui
```

## Struktura testów

### `calculations.test.js`
Testy dla funkcji obliczeniowych:
- `calculatePurchasingPower` - sprawdza obliczenia siły nabywczej
- Test case: 100,000 PLN z 5% inflacją przez 5 lat = 78,352.62 PLN
- Obsługuje przypadki brzegowe (zero inflacji, zero lat, wartości ujemne)

### `useBTCStrategy.test.js`
Testy dla hooka useBTCStrategy:
- Sprawdza obliczenia siły nabywczej w kontekście całej aplikacji
- Weryfikuje poprawność obliczeń dla różnych scenariuszy czasowych
- Testuje obsługę inflacji 0% i różnych stóp inflacji

## Przykład obliczenia siły nabywczej

Dla wartości 100,000 PLN z 5% inflacją przez 5 lat:

```
Wzór: Realna wartość = Wartość nominalna / (1 + inflacja)^lata
Obliczenie: 100,000 / (1 + 0.05)^5 = 100,000 / 1.2762815625 = 78,352.62 PLN
```

To oznacza, że 100,000 PLN za 5 lat będzie miało siłę nabywczą równą 78,352.62 PLN w dzisiejszych pieniądzach. 