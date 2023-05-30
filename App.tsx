import { StatusBar } from 'expo-status-bar';
import { ChangeEventHandler, MouseEventHandler, useCallback, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const {
    isDarkMode,
    onDarkModeChange,
    onRedirectClick,
    styles,
  } = useApp();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Здравей Петьо!!!</Text>
      <Text style={styles.text}>Enable dark mode:</Text>
      <input style={styles.checkbox} type='checkbox' checked={isDarkMode} onChange={onDarkModeChange} />
      <button style={styles.button} onClick={onRedirectClick}>Go to Hell!</button>
      <StatusBar style="auto" />
    </View>
  );
}

function useApp() {
  const [isDarkMode, setIsDarkMode] = useState(Boolean(sessionStorage.getItem("isDarkMode")));
  const styles = useStyles(isDarkMode);

  const onDarkModeChange = useCallback<ChangeEventHandler<HTMLInputElement>>((event) => {
    const { checked } = event.currentTarget;
    sessionStorage.setItem("isDarkMode", checked.toString());
    setIsDarkMode(Boolean(checked));
  }, []);

  const onRedirectClick = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    location.href = "https://google.com";
  }, []);

  return {
    isDarkMode,
    onDarkModeChange,
    onRedirectClick,
    styles,
  }
}

function useStyles(isDarkMode: boolean) {
  return useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? "black" : "white",
      alignItems: 'center',
      justifyContent: 'center',
    },

    text: {
      fontWeight: "800",
      color: isDarkMode ? "white" : "black",
      fontSize: 32
    },

    checkbox: {
      width: 20,
      height: 20,
    },

    button: {
      backgroundColor: "red",
      fontSize: 24
    }
  }), [isDarkMode]);
}
