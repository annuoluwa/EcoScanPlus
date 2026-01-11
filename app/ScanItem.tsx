import { FontAwesome5 } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../components/ThemeContext';
import { Colors } from '../constants/theme';

/**
 * Mock scan result
 * (Later replace with real image recognition API / ML model)
 */
type ScanResult = {
  item: string;
  recyclable: boolean;
  instructions: string;
  recyclingCenters: {
    name: string;
    lat: number;
    lng: number;
  }[];
};

const MOCK_SCAN_RESULT: ScanResult = {
  item: 'Coke Bottle',
  recyclable: true,
  instructions: 'Remove PET cover before recycling.',
  recyclingCenters: [
    { name: 'Green City Recycling', lat: 40.7128, lng: -74.006 },
    { name: 'EcoDrop Center', lat: 40.7138, lng: -74.002 },
  ],
};

export default function ScanItemScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  // Camera permission
  const [permission, requestPermission] = useCameraPermissions();

  // UI state
  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);

  /**
   * Simulated scan
   * Replace this with:
   * - takePictureAsync()
   * - send image to API
   * - receive classification result
   */
  const handleScan = () => {
    setScanning(true);

    setTimeout(() => {
      setResult(MOCK_SCAN_RESULT);
      setScanComplete(true);
      setScanning(false);
    }, 2000);
  };

  const openMap = (lat: number, lng: number) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    Linking.openURL(url);
  };

  // Permission loading
  if (!permission) {
    return (
      <View style={[styles.center, { backgroundColor: Colors[theme].background }]}>
        <ActivityIndicator size="large" color={Colors[theme].tint} />
      </View>
    );
  }

  // Permission denied
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.permissionText}>
          Camera access is required to scan items
        </Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Scan result screen
  if (scanComplete && result) {
    return (
      <View style={[styles.center, { backgroundColor: Colors[theme].background }]}> 
        {/* Attractive icon for scan result */}
        <FontAwesome5
          name={result.recyclable ? 'recycle' : 'ban'}
          size={64}
          color={result.recyclable ? '#43a047' : '#d32f2f'}
          style={{ marginBottom: 16 }}
        />
        <Text style={[styles.itemTitle, { color: Colors[theme].text }]}>{result.item}</Text>
        <Text
          style={
            result.recyclable
              ? [styles.recyclable, { color: Colors[theme].tint }]
              : [styles.notRecyclable, { color: '#d32f2f' }]
          }
        >
          {result.recyclable ? 'Recyclable' : 'Not Recyclable'}
        </Text>
        <Text style={[styles.instructions, { color: Colors[theme].icon }]}> 
          {result.instructions}
        </Text>
        {/* Points message after dropoff */}
        {result.recyclable && (
          <Text style={{ color: Colors[theme].tint, fontWeight: 'bold', marginVertical: 8 }}>
            You will get 10 EcoPoints when you drop off this item!
          </Text>
        )}
        <Text style={[styles.centersTitle, { color: Colors[theme].text }]}>Nearby Recycling Centers</Text>
        {result.recyclingCenters.map((center) => (
          <TouchableOpacity
            key={center.name}
            style={styles.centerButton}
            onPress={() => openMap(center.lat, center.lng)}
          >
            <Text style={styles.centerButtonText}>
              {center.name}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setScanComplete(false);
            setResult(null);
          }}
        >
          <Text style={styles.buttonText}>Scan Another Item</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#388e3c' }]}
          onPress={() => router.replace('/(tabs)/Dashboard')}
        >
          <Text style={styles.buttonText}>Back to Dashboard</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Camera scan screen
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera}>
        <View style={styles.cameraOverlay}>
          <TouchableOpacity
            style={styles.scanButton}
            onPress={handleScan}
            disabled={scanning}
          >
            {scanning ? (
              <ActivityIndicator color="#43a047" />
            ) : (
              <Text style={styles.scanText}>Scan</Text>
            )}
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f9f0',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#e6f9f0',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cameraOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 40,
  },
  scanButton: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#fff',
    borderWidth: 6,
    borderColor: '#43a047',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  scanText: {
    color: '#43a047',
    fontWeight: 'bold',
    fontSize: 20,
  },
  itemTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 8,
    textAlign: 'center',
  },
  recyclable: {
    color: '#388e3c',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  notRecyclable: {
    color: '#d32f2f',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  instructions: {
    fontSize: 16,
    color: '#388e3c',
    marginBottom: 16,
    textAlign: 'center',
  },
  centersTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2e7d32',
  },
  centerButton: {
    backgroundColor: '#b2dfdb',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  centerButtonText: {
    color: '#2e7d32',
    fontWeight: 'bold',
    fontSize: 16,
  },
  permissionText: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#43a047',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 32,
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
