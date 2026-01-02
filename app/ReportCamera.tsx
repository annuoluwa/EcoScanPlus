import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../components/ThemeContext';
import { Colors } from '../constants/theme';

export default function ReportCameraScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  // Camera permissions (new Expo API)
  const [permission, requestPermission] = useCameraPermissions();

  // Camera + UI state
  const cameraRef = useRef<CameraView>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [pointsEarned] = useState(10); // Example: 10 points per report

  // Take picture
  const takePicture = async () => {
    if (!cameraRef.current || !cameraReady) return;

    const photo = await cameraRef.current.takePictureAsync();
    setPhotoUri(photo.uri);
  };

  // Retake photo
  const handleRetake = () => {
    setPhotoUri(null);
    setCaption('');
    setSubmitted(false);
  };

  // Fake submit (replace with API later)
  const handleSubmit = () => {
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 2000);
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
        <Text style={styles.permissionText}>Camera access is required</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Submitted success screen
  if (submitted) {
    return (
      <View style={[styles.center, { backgroundColor: Colors[theme].background }]}> 
        <Text style={[styles.success, { color: Colors[theme].tint }]}> 
          Issue routed to Environmental Cleanliness Department!
        </Text>
        <Text style={[styles.points, { color: Colors[theme].icon }]}>You earned {pointsEarned} EcoPoints for your report!</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace('/(tabs)/Dashboard')}
        >
          <Text style={styles.buttonText}>Back to Dashboard</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!photoUri ? (
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          onCameraReady={() => setCameraReady(true)}
        >
          <View style={styles.cameraOverlay}>
            <TouchableOpacity
              style={styles.snapButton}
              onPress={takePicture}
            />
          </View>
        </CameraView>
      ) : (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photoUri }} style={styles.preview} />

          <TextInput
            style={styles.captionInput}
            placeholder="Add a caption..."
            value={caption}
            onChangeText={setCaption}
          />

          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.retakeButton}
              onPress={handleRetake}
            >
              <Text style={styles.retakeText}>Retake</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
              disabled={submitting}
            >
              {submitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitText}>Submit</Text>
              )}
            </TouchableOpacity>
          </View>

          {submitting && (
            <Text style={styles.routingText}>
              Routing to the necessary governmental body...
            </Text>
          )}
        </View>
      )}
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
    justifyContent: 'center',
    alignItems: 'center',
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
  snapButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#fff',
    borderWidth: 6,
    borderColor: '#43a047',
  },
  previewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  preview: {
    width: '100%',
    height: 320,
    borderRadius: 16,
    marginBottom: 16,
  },
  captionInput: {
    width: '100%',
    maxWidth: 320,
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#b2dfdb',
    fontSize: 16,
  },
  actionRow: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: 320,
    marginBottom: 16,
  },
  retakeButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#43a047',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 12,
    marginRight: 8,
  },
  retakeText: {
    color: '#43a047',
    fontWeight: 'bold',
    fontSize: 16,
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#43a047',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 12,
    marginLeft: 8,
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  routingText: {
    color: '#388e3c',
    marginTop: 8,
    textAlign: 'center',
  },
  success: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e7d32',
    textAlign: 'center',
    marginBottom: 24,
  },
  permissionText: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  points: {
    color: '#388e3c',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#43a047',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 32,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
