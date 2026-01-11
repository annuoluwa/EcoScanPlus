
# EcoScan+ 

EcoScan+ is a smart city sustainability and civic engagement app built with [Expo](https://expo.dev) and React Native. This project leverages modern Expo workflows, EAS Update, and a clean, accessible UI for rapid prototyping and deployment.

##  Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the app locally**
   ```bash
   npx expo start
   ```
   - Open in Expo Go, Android emulator, or iOS simulator.

3. **Publish updates (EAS Update)**
   ```bash
   npx eas update
   ```

##  Project Structure

- `app/` — All screens and navigation (file-based routing)
- `components/` — Reusable UI components (including ThemeContext)
- `assets/` — Images, icons, and static files
- `app.json` — Expo configuration

##  Features

- Global day/night theme toggle (Dashboard)
- Camera integration (expo-camera)
- Interactive map (react-native-maps)
- Rewards and civic engagement flows
- Modern, accessible UI with vector icons

##  Development

- Edit screens in the `app/` directory.
- Use the ThemeContext for consistent theming.
- Hot reload enabled for rapid iteration.

##  Reset Project

To start fresh:
```bash
npm run reset-project
```
Moves starter code to `app-example/` and creates a blank `app/` directory.

##  Resources

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router Guide](https://docs.expo.dev/router/introduction/)
- [EAS Update](https://docs.expo.dev/eas-update/introduction/)

## app.json
eas.json
tsconfig.json
eslint.config.js Community

- [Expo Discord](https://chat.expo.dev)
- [Expo GitHub](https://github.com/expo/expo)
