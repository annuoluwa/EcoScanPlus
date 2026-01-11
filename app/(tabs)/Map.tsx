import React, { useState } from 'react';
import { Dimensions, Platform, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../components/ThemeContext';
import { Colors } from '../../constants/theme';

let MapView, Marker;
if (Platform.OS !== 'web') {
	const Maps = require('react-native-maps');
	MapView = Maps.default;
	Marker = Maps.Marker;
}

// Mock user and recycling center locations
const userLocation = { latitude: 40.7128, longitude: -74.006 };
const recyclingCenters = [
	{ id: '1', name: 'Green City Recycling', latitude: 40.7138, longitude: -74.002 },
	{ id: '2', name: 'EcoDrop Center', latitude: 40.7108, longitude: -74.008 },
];

export default function MapScreen() {
	const [region] = useState({
		latitude: userLocation.latitude,
		longitude: userLocation.longitude,
		latitudeDelta: 0.01,
		longitudeDelta: 0.01,
	});
	const { theme } = useTheme();
	if (Platform.OS === 'web') {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>Map is not available on web.</Text>
			</View>
		);
	}
	return (
		<View style={[styles.container, { backgroundColor: Colors[theme].background }]}> 
			<View style={[styles.headerCard, { backgroundColor: Colors[theme].tint }]}> 
				<Text style={[styles.title, { color: Colors[theme].background }]}> 
					Nearby Recycling Centers
				</Text>
			</View>
			<View style={styles.mapCard}> 
				<MapView
					style={styles.map}
					initialRegion={region}
					showsUserLocation={true}
					showsMyLocationButton={true}
				>
					{recyclingCenters.map(center => (
						<Marker
							key={center.id}
							coordinate={{ latitude: center.latitude, longitude: center.longitude }}
							title={center.name}
							description={center.name}
							pinColor="#43a047"
						/>
					))}
				</MapView>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#e6f9f0',
		paddingTop: Platform.OS === 'android' ? 32 : 0,
		alignItems: 'center',
		paddingHorizontal: 8,
	},
	headerCard: {
		width: '96%',
		backgroundColor: '#43a047',
		borderRadius: 18,
		paddingVertical: 18,
		paddingHorizontal: 18,
		marginTop: 12,
		marginBottom: 8,
		shadowColor: '#000',
		shadowOpacity: 0.10,
		shadowRadius: 8,
		elevation: 4,
		alignItems: 'center',
	},
	title: {
		fontSize: 22,
		fontWeight: 'bold',
		color: '#fff',
		textAlign: 'center',
		letterSpacing: 1,
	},
	mapCard: {
		width: '96%',
		backgroundColor: '#fff',
		borderRadius: 18,
		padding: 6,
		marginBottom: 12,
		shadowColor: '#000',
		shadowOpacity: 0.10,
		shadowRadius: 8,
		elevation: 4,
		alignItems: 'center',
	},
	map: {
		width: '100%',
		height: Dimensions.get('window').height / 2.2,
		borderRadius: 14,
	},
});
