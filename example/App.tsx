import TorchImagePlayground from "torch-image-playground";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string>("");

  const supported =
    Platform.OS === "ios" ? TorchImagePlayground.isSupported() : false;

  const onLaunch = useCallback(async () => {
    if (!supported || busy) return;
    setBusy(true);
    setStatus("Opening Image Playground…");
    try {
      const path = await TorchImagePlayground.launchAsync({
        concepts: { text: ["minimal", "abstract", "gradient"] },
      });
      setStatus(
        path != null
          ? `Saved image path:\n${path}`
          : "Cancelled or no image returned."
      );
    } catch (e) {
      setStatus(
        `Error: ${e instanceof Error ? e.message : String(e)}`
      );
    } finally {
      setBusy(false);
    }
  }, [supported, busy]);

  if (Platform.OS !== "ios") {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.warn}>
          This example runs on iOS only (Image Playground).
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>torch-image-playground</Text>
        <Text style={styles.status}>
          {supported
            ? "Image Playground is supported on this device."
            : "Image Playground is not available (needs iOS 18.2+ and supported hardware)."}
        </Text>
        <View style={styles.row}>
          <Button
            title={busy ? "Working…" : "Launch Image Playground"}
            onPress={onLaunch}
            disabled={!supported || busy}
          />
        </View>
        {busy ? (
          <ActivityIndicator style={styles.spinner} size="large" />
        ) : null}
        {status ? <Text style={styles.result}>{status}</Text> : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },
  scroll: {
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 12,
  },
  status: {
    fontSize: 15,
    color: "#333",
    marginBottom: 20,
  },
  warn: {
    padding: 24,
    fontSize: 16,
  },
  row: {
    gap: 12,
  },
  spinner: {
    marginTop: 16,
  },
  result: {
    marginTop: 20,
    fontSize: 14,
    color: "#111",
  },
});
