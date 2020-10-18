import React, { useState } from "react";
import { View, Text } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import MapView, { MapEvent, Marker } from "react-native-maps";

import mapMarkerImg from "../../images/map-marker.png";

import styles from "../../styles/pages/CreateOrphanage/SelectMapPosition";

function SelectMapPosition() {
  const navigation = useNavigation();

  const [position, setṔosition] = useState({ latitude: 0, longitude: 0 });

  function handleNextStep() {
    navigation.navigate("OrphanageData", { position });
  }

  function handleSelectMapPosition(event: MapEvent) {
    setṔosition(event.nativeEvent.coordinate);
  }

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: -22.3742642,
          longitude: -48.3802176,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        style={styles.mapStyle}
        onPress={handleSelectMapPosition}
      >
        {position.latitude !== 0 && (
          <Marker
            icon={mapMarkerImg}
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude,
            }}
          />
        )}
      </MapView>

      {position.latitude !== 0 && (
        <RectButton style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      )}
    </View>
  );
}

export default SelectMapPosition;
