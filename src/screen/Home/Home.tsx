import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Animated,
  Pressable,
} from 'react-native';
import {NavigationProp, RouteProp} from '@react-navigation/native';

import Text from 'component/base/Text';

import mockData from './homeMockData';

import SectionHeader from './component/SectionHeader';
import PlaceCard from './component/PlaceCard';
import CityCard from './component/CityCard';

type HomeProps = {
  route: RouteProp<{params: {location: string}}>;
  navigation: NavigationProp<any, any>;
};

const Home: React.FC<HomeProps> = ({route, navigation}) => {
  const location = route?.params?.location;

  const animation = React.useRef(new Animated.Value(0));

  let filteredPlaces = mockData.sections.placeCtas.places;
  if (location) {
    filteredPlaces = mockData.sections.placeCtas.places.filter(place =>
      place.location.toLowerCase().includes(location.toLowerCase()),
    );
  }

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: animation.current}}}],
    {useNativeDriver: true},
  );

  const animatedSearchBar = (
    <Animated.View
      style={[
        styles.bottomSpacing,
        {zIndex: 1, transform: [{translateY: animation.current}]},
      ]}>
      <Pressable
        style={styles.searchContainer}
        onPress={() => navigation.navigate('Search')}>
        <Text variant="bodyLarge" color="#858585">
          Try 'Boston'
        </Text>
      </Pressable>
    </Animated.View>
  );

  return (
    <SafeAreaView>
      <Animated.ScrollView style={styles.container} onScroll={handleScroll}>
        <>
          {animatedSearchBar}
          <SectionHeader
            title={
              location
                ? `${filteredPlaces.length} Places in ${location}`
                : mockData.sections.placeCtas.title
            }
            description={mockData.sections.placeCtas.description}
            style={styles.bottomSpacing}
          />

          {filteredPlaces.map(place => (
            <PlaceCard
              key={place.id}
              image={place.image}
              label={place.imageLabel}
              address={place.title}
              location={place.location}
              style={styles.bottomSpacing}
            />
          ))}
          <Text variant="heading" style={styles.footerHeading}>
            {mockData.sections.cityCtas.title}
          </Text>
          <ScrollView horizontal style={styles.carousel}>
            {mockData.sections.cityCtas.places.map(city => (
              <CityCard
                key={city.id}
                image={city.image}
                name={city.title}
                style={styles.rightSpacing}
              />
            ))}
          </ScrollView>
        </>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  bottomSpacing: {
    marginBottom: 16,
  },
  rightSpacing: {
    marginRight: 24,
  },
  searchContainer: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.19)',
    borderRadius: 100,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  footerHeading: {
    marginBottom: 12,
  },
  carousel: {
    paddingBottom: 16,
  },
});
