# ⚽ NKE Testnevelés Pont Kalkulátor

Egy modern, felhasználóbarát React alkalmazás a Nemzeti Közszolgálati Egyetem testnevelés oktatásához. Az alkalmazás automatikusan kiszámítja a diákok pont szerzéseit a teljesített értékek alapján.

## 🎯 Funkciók

- **Nem kiválasztása**: Nő vagy Férfi gyakorlatok közül lehet választani
- **Gyakorlat típusa**: 5 különböző sportpraktika (3200m futás, 400m futás, AKP, KGR, Hosszúugrás)
- **Automatikus pont kalkuláció**: Az adott teljesítéshez automatikusan kiszámítja a pontot
- **Mértékegység kezelés**: Minden gyakorlatnak saját mértékegysége van (perc:mp, másodperc, darab, kg, méter)
- **Közelítő érték**: Ha nem pontos érték van, automatikusan a legközelebbi érték pontszámát használja

## 🚀 Telepítés és futtatás

```bash
# Klónozás
git clone https://github.com/molnaredom/nke-testneveles-pontszamolo.git
cd nke-testneveles-pontszamolo

# Függőségek telepítése
npm install

# Fejlesztő szerver indítása
npm run dev

# Termelésre fordítás
npm run build

# GitHub Pages-re deploy (ha beállítottad)
npm run deploy
```

## 🛠 Technológia

- **React 19** - Frontend framework
- **Vite** - Build tool és fejlesztő szerver
- **Tailwind CSS** - Modern CSS framework
- **TypeScript** - Típus biztonság
- **GitHub Pages** - Ingyenes hosting

## 📱 Használat

1. Válaszd ki a nem-et (Nő/Férfi)
2. Válaszd ki a gyakorlat típusát a legördülő menüből
3. Írd be a teljesített értéket a megfelelő mértékegységben
4. Kattints a "Pontszám kiszámítása" gombra
5. Az alkalmazás megjeleníti az elért pontot

## 📊 Adatok forrása

Az adatok a Nemzeti Közszolgálati Egyetem testnevelés órák szabályzatán alapulnak.

## 🌐 GitHub Pages

Az alkalmazás elérhető a GitHub Pages-en:

- URL: `https://molnaredom.github.io/nke-testneveles-pontszamolo/`

## 📝 Licence

MIT

## 👨‍💻 Szerző

Készítette: GitHub Copilot

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
