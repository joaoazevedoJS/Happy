import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import MapView, { PROVIDER_GOOGLE, Callout, Marker } from "react-native-maps";
import { Feather } from '@expo/vector-icons'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import mapMarker from "../images/map-marker.png";

import api from "../services/api";

import styles from '../styles/pages/OrphanagesMap'

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

function OrphanagesMap() {
  const navigation = useNavigation();
  const [orphanages, setOrphanages] = useState<Array<Orphanage>>([])
  
  useFocusEffect(() => {
    api.get('/orphanages').then(response => {
      setOrphanages(response.data)
    })
  })

  function handleNavigateToDetails(id: number) {
    navigation.navigate('OrphanageDetails', { id })
  }
  
  function handleNavigateToCreateOrphanage() {
    navigation.navigate('SelectMapPosition')
  }
  

  return (
    <View style={styles.container}>
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={{
        latitude: -22.3742642,
        longitude: -48.3802176,
        latitudeDelta: 0.007,
        longitudeDelta: 0.007,
      }}
    >
      {orphanages.map(orphanage => (
        <Marker
        key={orphanage.id}
        icon={mapMarker}
        calloutAnchor={{ x: 2.8, y: 0.9 }}
        coordinate={{ latitude: orphanage.latitude, longitude: orphanage.longitude }}
      >
        <Callout tooltip onPress={() => handleNavigateToDetails(orphanage.id)}>
          <View style={styles.calloutContainer}>
            <Text style={styles.calloutText}>{orphanage.name}</Text>
          </View>
        </Callout>
      </Marker>
      ))}
    </MapView>

    <View style={styles.footer}>
      <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>

      <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}>
        <Feather name="plus" size={20} color="#fff" />
      </RectButton>
    </View>
  </View>
  )
}

export default OrphanagesMap