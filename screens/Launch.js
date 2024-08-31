import { View, Image, StyleSheet, ImageBackground, Text, TouchableOpacity, Dimensions } from 'react-native';
import {LexendDeca_700Bold} from '@expo-google-fonts/lexend-deca';
import {DMSans_500Medium} from '@expo-google-fonts/dm-sans';
import { useFonts } from 'expo-font';

const { width, height } = Dimensions.get('window');

const Launch = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    LexendDeca_700Bold,
    DMSans_500Medium
  })
  if (fontsLoaded) {
    return (
      <ImageBackground source={require('../assets/Shape.png')} style={styles.background}>
        <View style={styles.container}>
          <View style={styles.roundedRectangle} />
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/shadow.png')}
              style={styles.shadowImage}
            />
            <Image
              source={require('../assets/OriginalBoy1.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>KOSHISH</Text>
            <Text style={styles.subtitle}>Your child's development partner</Text>
          </View>
          <TouchableOpacity style={styles.proceedButton} onPress={() => navigation.navigate('GetStarted')}>
            <Text style={styles.proceedButtonText}>Proceed</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundedRectangle: {
    position: 'absolute',
    width: width * 0.85, // 90% of screen width
    height: height * 0.31, // 34% of screen height
    backgroundColor: '#DAFFFB',
    opacity: 0.7,
    borderRadius: 70,
    top: height * 0.40, // Adjust based on screen height
    transform: [{ translateY: -(height * 0.15) }], // Adjust based on rectangle height
  },
  imageContainer: {
    width: width,
    position: 'absolute',
    top: height * 0.32, // Adjust based on screen height
    transform: [{ translateY: -(height * 0.2) }], // Adjust based on image height
    alignItems: 'center',
  },
  image: {
    width: width * 0.70, // 70% of screen width
    height: height * 0.52, // 52% of screen height
  },
  shadowImage: {
    width: width * 0.85, // 40% of screen width, adjust as needed
    height: height * 0.3, // 5% of screen height, adjust as needed
    position: 'absolute',
    opacity: 0.6,
    bottom: 10, // Adjust to position below the image
  },
  title: {
    fontSize: width * 0.12, // 12% of screen width
    fontFamily: 'LexendDeca_700Bold',
    color: '#3C351D',
  },
  subtitle: {
    fontSize: width * 0.05, // 5% of screen width
    color: '#3C351D',
    fontFamily: 'Inter_400Regular',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: height * 0.6, // Adjust based on screen height
  },
  proceedButton: {
    marginTop: 60,
    backgroundColor: '#3c351d',
    paddingVertical: 15,
    paddingHorizontal: 120,
    borderRadius: 15,
  },
  proceedButtonText: {
    color: '#fff',
    fontFamily: 'DMSans_500Medium',
    fontSize: width * 0.05, // 5% of screen width
  },
});

export default Launch;