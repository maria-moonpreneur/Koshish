import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, ActivityIndicator, ImageBackground, Image } from 'react-native';
import { Koulen_400Regular } from '@expo-google-fonts/koulen';
import { useFonts } from 'expo-font';

const { width } = Dimensions.get('window');

const questionsData = {
  ELA: {
    '0-1 Month': [
      { id: 1, question: 'Frequent crying' },
      { id: 2, question: 'Begins random vocalization rather than crying' },
      { id: 3, question: 'Vowel like sounds similar to /b/ & /a/ predominate' },
    ],
    '2 Months': [
      { id: 1, question: 'Has a special cry for hunger' },
      { id: 2, question: 'Sometimes repeats the same syllable while cooing or babbling' },
      { id: 3, question: 'Develops vocal signs of pleasure' },
    ],
    '3 Months': [
      { id: 1, question: 'Occasionally responds to sound stimulation on speech by vocalizing' },
      { id: 2, question: 'When played with, laughs & uses other vocal expressions of pleasure' },
      { id: 3, question: 'Often vocalizes with two or more different syllables' },
    ],
    '4 Months': [
      { id: 1, question: 'Often laughs during play with objects' },
      { id: 2, question: 'Babbles regularly especially when alone' },
      { id: 3, question: 'Often uses sounds like /p/, /b/ and /m/' },
    ],
    '5 Months': [
      { id: 1, question: 'Uses vowel like sounds similar to /00/ and /w/' },
      { id: 2, question: 'Usually stops babbling responds to vocal stimulus but may occasionally continue babbling for a short time' },
    ],
    '6 Months': [
      { id: 1, question: 'Takes the initiative in localizing and babbling directly at others' },
      { id: 2, question: 'Plays at making sounds and noises while alone or with others' },
    ],
    '7 Months': [
      { id: 1, question: 'Uses some words like vocal expressions(naming)' },
      { id: 2, question: 'Begins some two syllables babbling (repeats combination of two or more different sounds)' },
    ],
    '8 Months': [
      { id: 1, question: 'Occasionally vocalizes in sentence like utterances' },
      { id: 2, question: 'Plays speech gestures games like pat-a-cake' },
      { id: 3, question: 'Occasionally sings with some familiar songs with true words' },
    ],
    '9 Months': [
      { id: 1, question: 'Uses some gestural language such as shaking head for NO' },
      { id: 2, question: 'Often mimics the sounds and number of syllables used in vocal stimulation' },
      { id: 3, question: 'More consonants appear than at 6 months stage' },
    ],
    '10 Months': [
      { id: 1, question: 'Speaks word 1st words often mama or name of a pet' },
      { id: 2, question: 'Uses some exclamations like “oh-oh”' },
      { id: 3, question: 'Often uses jargons/short sentence like utterances of 4 or more syllables without true words' },
    ],
    '11 Months': [
      { id: 1, question: 'Usually vocalizes in varied jargon patterns while that down' },
      { id: 2, question: 'Initiates speech gestures games like pat-a-cake' },
      { id: 3, question: 'Occasionally try to imitate new words' },
    ],
    '12 Months': [
      { id: 1, question: 'Uses 3 or more words with some consistency' },
      { id: 2, question: 'Talks to toys and people throughout the day using long verbal patterns' },
      { id: 3, question: 'Frequently responds to songs or rhymes by vocalizing' },
    ],
    '13-14 Months': [
      { id: 1, question: 'Uses 5 or more true words with some consistency' },
      { id: 2, question: 'Attempts to obtain desired objects by voice in conjunction with gestures and pointing' },
      { id: 3, question: 'Some true words now occur in jargon utterances' },
    ],
    '15-16 Months': [
      { id: 1, question: 'Consistently uses 7 or more true words' },
      { id: 2, question: 'More frequent use of consonant s like /t/, /d/, /w/,/n/, /h/' },
      { id: 3, question: 'Most communication with true words with gestures' },
    ],
    '17-18 Months': [
      { id: 1, question: 'Begins using words rather than gestures to express wants and needs' },
      { id: 2, question: 'Begins repeating words over heard in conversation' },
      { id: 3, question: 'Evidences a continual but gradual increase in speaking vocabulary' },
    ],
    '19-20 Months': [
      { id: 1, question: 'Imitates some 2 or 3 words utterances' },
      { id: 2, question: 'Imitates environmental (motor) while playing' },
      { id: 3, question: 'Has a speaking vocabulary of at least 10-20 words' },
    ],
    '21-22 Months': [
      { id: 1, question: 'Begins combining words into simple sentences. Like go, bye- bye' },
      { id: 2, question: 'Speaks more and more new words each week' },
      { id: 3, question: 'Attempts to tell about experiences using combinations of jargons and true words' },
    ],
    '23-24 Months': [
      { id: 1, question: 'Occasionally uses 3 word sentences (such as “there it is”, play with blocks”)' },
      { id: 2, question: 'Refers to self by using his or her own names' },
      { id: 3, question: 'Begins using some pronouns but makes errors in syntax' },
    ],
    '25-27 Months': [
      { id: 1, question: 'Usually uses 2 or 3 word sentences' },
      { id: 2, question: 'Often uses personal pronouns correctly. ( I, you, he, me, it, etc)' },
      { id: 3, question: 'Asks for help with some personal needs such as washing hands, going to the toilet, etc' },
    ],
    '28-30 Months': [
      { id: 1, question: 'Name at least 1 correctly' },
      { id: 2, question: 'Refers to self by using a pronoun rather than by his or her proper name' },
      { id: 3, question: 'Repeats 2 or more numbers correctly' },
    ],
    '31-33 Months': [
      { id: 1, question: 'Tells gender when asked “Are you a boy or girl?”' },
      { id: 2, question: 'Names and talks about what he or she has scribbled or drawn when asked' },
    ],
    '34-36 Months': [
      { id: 1, question: 'Regularly relates experiences from the recent past (what happened while he or she was "out or separated from parents")' },
      { id: 2, question: 'Uses several verb forms correctly in relating what is going on in action pictures' },
      { id: 3, question: 'Uses some plural forms correctly in speech' },
    ],
    '3-3.6 Years': [
      { id: 1, question: 'Identifies 5 primary colours and names' },
      { id: 2, question: "Uses cannot, don't, on and plural marker's" },
      { id: 3, question: 'Has a vocabulary of more than 1000 words and uses he, she ,they' },
      { id: 4, question: 'Uses 3 word sentences and is non fluent'},
    ],
    '3.7-4 Years': [
      { id: 1, question: 'Uses verbs predominantly' },
      { id: 2, question: "Uses 3-4 words/sentences and is non fluent" },
      { id: 3, question: 'Identifies all major colours and names' },
      { id: 4, question: 'Uses simple present and future tense with feminine and masculine gender markers'},
      { id: 5, question: 'Uses He-remote/proximate'},
    ],
    '4-4.6 Years': [
      { id: 1, question: 'Uses below, inside, on top, out, what, where, who. Why. Whose. How. N' },
      { id: 2, question: "Uses a little, fat, black. She-remote/proximate" },
      { id: 3, question: 'Tends to enacts in body posture and gestures what is told in story' },
      { id: 4, question: 'Uses 4 words/sentences and is non fluent, often uses or in a missing fashion at the beginning of a phrase and repeats seldom'},
      { id: 5, question: 'Can narrate a story on his own'},
      { id: 6, question: 'Uses simple past and past continuous tenses'},
    ],
    '4.7-5 Years': [
      { id: 1, question: 'Has a vocabulary of 1500-2500 words and is nonaffluent' },
      { id: 2, question: "Uses past irregular verbs (went, caught)" },
      { id: 3, question: 'Uses all who questions' },
      { id: 4, question: 'Uses’ how much’ in front of, white straight, that this, three, a, the'},
      { id: 5, question: 'Uses numbers up to 3 and can write all the letters of the alphabets'},
    ],
    '5-6 Years': [
      { id: 1, question: 'Uses 5-6 words/ sentences and is fluent' },
      { id: 2, question: "Relative clauses are embedded with a sentence to add further information" },
      { id: 3, question: 'Matches word to object' },
      { id: 4, question: 'Uses all ‘who’ questions yes/no questions'},
      { id: 5, question: 'Writing'},
    ],
    '6-7 Years': [
      { id: 1, question: 'Uses 6-7 words in sentences' },
      { id: 2, question: "Uses double adjectives nouns phrases" },
      { id: 3, question: 'Uses coordinates with, and but, ever though if so' },
      { id: 4, question: 'Is fluent in his speech & intelligible'},
      { id: 5, question: 'Can articulate all the sounds in his language'},
    ],
  },
  
  RLA: {
    '0-1 Month': [
      { id: 1, question: 'Startle response to loud noises' },
      { id: 2, question: 'Activity arrested when approached by sound' },
      { id: 3, question: 'Often quieted by a familiar friendly voice' },
    ],
    '2 Months': [
      { id: 1, question: 'Frequently gives direct attention to other voices' },
      { id: 2, question: 'Appears to listen to speaker' },
      { id: 3, question: 'Often looks at speaker and responds by smiling' },
    ],
    '3 Months': [
      { id: 1, question: 'Responds to speech by looking directly at speaker face' },
      { id: 2, question: 'Regularly localizes speaker with eyes' },
      { id: 3, question: 'Frequently watches lips and mouth of speaker' },
    ],
    '4 Months': [
      { id: 1, question: 'Turns head deliberately towards the source of voice' },
      { id: 2, question: 'Looks about in search of speaker' },
      { id: 3, question: 'Usually frightened or disturbed by angry voices' },
    ],
    '5 Months': [
      { id: 1, question: 'Regularly localizes source of voice with accuracy' },
      { id: 2, question: 'Recognizes or responds to his own name' },
    ],
    '6 Months': [
      { id: 1, question: 'Appears by facial and gestures to be able to distinguish general meanings of warning, anger and friendly voice patterns' },
      { id: 2, question: 'Appears to recognize words like daddy, bye-bye etc' },
    ],
    '7 Months': [
      { id: 1, question: 'Responds in appropriate gestures to such words as come, hi, bye- bye, etc' },
      { id: 2, question: 'Appears to recognize names of family members in connected speech even when the person named is not in sight' },
    ],
    '8 Months': [
      { id: 1, question: 'Frequently appears to listen to whole conversation between others' },
      { id: 2, question: 'Regularly stops activity when called' },
      { id: 3, question: 'Appears to recognize the names of common object when spoken' },
    ],
    '9 Months': [
      { id: 1, question: 'Appears to understand some simple verbal request' },
      { id: 2, question: 'Regularly stops activity in response to NO' },
      { id: 3, question: 'Will sustain interest for up to a full minute in looking at pictures if they are named' },
    ],
    '10 Months': [
      { id: 1, question: 'Appears to enjoy listening to new words' },
      { id: 2, question: 'Generally able to listen to speech without being distracted by other sounds' },
      { id: 3, question: 'Often give toys or other objects to a parent on verbal request' },
    ],
    '11 Months': [
      { id: 1, question: 'Occasionally follow simple commands like "put playing alone"' },
      { id: 2, question: 'Appears to understand simple questions like “where is the ball”' },
      { id: 3, question: 'Responds to rhythmic music by bodily or hand movements in approximate time to music' },
    ],
    '12 Months': [
      { id: 1, question: 'Demonstrates understanding by responding appropriate gestures to several kind of verbal request' },
      { id: 2, question: 'Generally shows intense attention and responds to speech over a prolong period of time' },
      { id: 3, question: 'Demonstrates understanding by making appropriate verbal responses to some requests (says bye-bye)' }
    ],
    '13-14 Months': [
      { id: 1, question: 'Appears to understand some new words each week' },
      { id: 2, question: 'Seems to understand the psychological feelings and shades of meanings of most speakers' },
      { id: 3, question: 'Will sustain interest for 2 or minutes in looking at pictures are named' },
    ],
    '15-16 Months': [
      { id: 1, question: 'Demonstrates understanding by carrying out verbal request to select and bring some familiar object from another room' },
      { id: 2, question: 'Recognizes and identifies many objects an pictures of when they are named' },
      { id: 3, question: 'Clearly recognizes names of various parts of the body' },
    ],
    '17-18 Months': [
      { id: 1, question: 'Comprehends simple questioned and carries 2 consecutive directions with the ball or the other objects' },
      { id: 2, question: 'Remembers and associates new words by categories(animals, etc)' },
      { id: 3, question: 'From a single request identifies 2 or more familiar objects from a group of 4 or more' },
    ],
    '19-20 Months': [
      { id: 1, question: 'Upon verbal request points to several parts of the body and various items of clothing shown in large pictures' },
      { id: 2, question: 'Demonstrates understanding by appropriate responses to such action words as sit down, come here, etc' },
      { id: 3, question: 'Demonstrates understanding of distinction in personal pronouns such as give it to he' },
    ],
    '21-22 Months': [
      { id: 1, question: 'Follows the series of 2 or 3 very simple but related commands' },
      { id: 2, question: 'Recognizes new words daily at an increasing rate' },
      { id: 3, question: 'Recognizes and identifies almost all common objects and pictures of common objects when they are named' },
    ],
    '23-24 Months': [
      { id: 1, question: 'Upon verbal request selects an items from a group of 4 or more varied items. (such as comb, spoon etc)' },
      { id: 2, question: 'Appears to listen to meaning and reason of language utterances not just words or sounds' },
      { id: 3, question: "Understands most complex sentence (e.g. “when we get to the store, I'll buy you an ice cream”)" },
    ],
    '25-27 Months': [
      { id: 1, question: 'Demonstrates an understanding of several action words (verb forms) by selecting appropriate pictures. (e.g. correctly chooses which picture shows citing)' },
      { id: 2, question: 'When asked, points to smaller parts of the body. Such as chin, elbow, eye brow, etc' },
      { id: 3, question: 'Recognizes and identifies general family categories such as baby, mother, grand-mother, etc' },
    ],
    '28-30 Months': [
      { id: 1, question: 'Demonstrates an understanding of word association through functional identification (correctly answer such as what do you do with your car?)' },
      { id: 2, question: 'Understand size differences ( small vs. large etc) from among a group of similar objects' },
      { id: 3, question: 'Recognizes the names and pictures of most common objects' },
    ],
    '31-33 Months': [
      { id: 1, question: 'Understands very long and complex sentences' },
      { id: 2, question: 'Demonstrates and understanding of most common adjectives' },
    ],
    '34-36 Months': [
      { id: 1, question: 'Shows interest in explanations of “why” things and “how” things functions' },
      { id: 2, question: 'Carries out 3 simple verbal commands given in one long utterance' },
      { id: 3, question: 'Demonstrates an understanding of prepositions. (such as on, under, front, behind, etc)' },
    ],
    '3-3.6 Years': [
      { id: 1, question: 'Comprehends “how much” more and the numerical marker test' },
      { id: 2, question: "Comprehends “no” used to indicate non-existence" },
      { id: 3, question: 'Understands contrasts in 3" person singular pronouns' },
      { id: 4, question: 'Comprehends 1ft ordered embedded sentences e.g. Show the dog which is running'},
    ],
    '3.7-4 Years': [
      { id: 1, question: 'Points out to animals, objects and foods from a large group of other pictures' },
      { id: 2, question: "Recognizes time in pictures and all colours" },
      { id: 3, question: 'Comprehends simple present and future present and future past with feminine and masculine genders' },
      { id: 4, question: 'Comprehends demonstrative nouns such as this, that, there'},
      { id: 5, question: 'Comprehends comparison sentences'},
    ],
    '4-4.6 Years': [
      { id: 1, question: 'Comprehends ‘how far’, ‘a little’, ‘all’, ‘a few’ ‘you both’' },
      { id: 2, question: "Comprehends simple past and past continuous tenses" },
      { id: 3, question: 'Comprehends causatives verbal sentences e.g. 1 got it done by him' },
      { id: 4, question: 'Comprehends question type of yes-no questions. (big red house)'},
      { id: 5, question: 'Comprehends noun/phrase with adjectives. (big red house)'},
      { id: 6, question: 'Distinguishes between comparative/superlative degrees'},
    ],
    '4.7-5 Years': [
      { id: 1, question: 'Comprehends opposite concepts ‘Brother is a boy’, Sister is a girl’' },
      { id: 2, question: "Comprehends Singular/Plural contrasts for nouns" },
      { id: 3, question: 'Comprehends Prepositions, ‘at side of, in front of, between' },
      { id: 4, question: 'Can identify most of the alphabets and can criminate appropriate pictures in response to speech'},
      { id: 5, question: 'Can read all the alphabets in his language'},
    ],
    '5-6 Years': [
      { id: 1, question: 'Comprehends quantitative adjectives (pain, few, and many)' },
      { id: 2, question: "Comprehends Verb no. is vs. are" },
      { id: 3, question: 'Distinguishes between can/cannot' },
      { id: 4, question: 'Vocabulary of understanding about 16000 words'},
      { id: 5, question: 'Reading'},
    ],
    '6-7 Years': [
      { id: 1, question: 'Comprehends the meaning of half' },
      { id: 2, question: "Comprehends the meaning of quantity adjectives 1$,2%,3" },
      { id: 3, question: 'Comprehends the quality adjectives (soft, fast...)' },
      { id: 4, question: 'Comprehends personal gender pronouns, he, she, it'},
      { id: 5, question: 'Comprehends Passive voice & future tense'},
    ],
  },
};

const ELARLATest = ({ navigation }) => {
  const [currentSection, setCurrentSection] = useState('ELA');
  const [currentSubSection, setCurrentSubSection] = useState('0-1 Month');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const scrollViewRef = useRef(null); // Reference to the ScrollView

  const currentQuestions = questionsData[currentSection][currentSubSection] || [];

  let [fontsLoaded] = useFonts({
    Koulen_400Regular,
  });

  const moveToNext = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Move to the next subsection
      const subsections = Object.keys(questionsData[currentSection]);
      const currentSubSectionIndex = subsections.indexOf(currentSubSection);
      if (currentSubSectionIndex < subsections.length - 1) {
        const nextSubSection = subsections[currentSubSectionIndex + 1];
        setCurrentSubSection(nextSubSection);
        setCurrentQuestionIndex(0);

        // Scroll to center the next subsection
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({
            x: (currentSubSectionIndex + 1) * (width / 3) - (width / 2) + (width / 6), // Adjust scroll position to center active tab
            animated: true,
          });
        }, 200);
      } else {
        // Move to the next section
        const sections = Object.keys(questionsData);
        const currentSectionIndex = sections.indexOf(currentSection);
        if (currentSectionIndex < sections.length - 1) {
          const nextSection = sections[currentSectionIndex + 1];
          setCurrentSection(nextSection);
          const firstSubSection = Object.keys(questionsData[nextSection])[0];
          setCurrentSubSection(firstSubSection);
          setCurrentQuestionIndex(0);

          // Scroll to the first subsection of the new section
          setTimeout(() => {
            scrollViewRef.current?.scrollTo({
              x: 0,
              animated: true,
            });
          }, 200);
        } else {
          // All questions are answered, navigate to a completion screen or show a message
          navigation.navigate('CompletionScreen');
        }
      }
    }
  };

  const handleYes = () => {
    moveToNext();
  };

  const handleNo = () => {
    moveToNext();
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ImageBackground source={require('../assets/Shape.png')} style={styles.background}>
      <View style={styles.container}>
        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <View style={[styles.tab, currentSection === 'ELA' ? styles.activeTab : {}]}>
            <Text style={[styles.tabText, currentSection === 'ELA' ? styles.activeTabText : {}]}>ELA</Text>
          </View>
          <View style={[styles.tab, currentSection === 'RLA' ? styles.activeTab : {}]}>
            <Text style={[styles.tabText, currentSection === 'RLA' ? styles.activeTabText : {}]}>RLA</Text>
          </View>
        </View>

        {/* Subsection Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={scrollViewRef}
          style={styles.subTabsContainer}
          contentContainerStyle={styles.subTabsContentContainer}
        >
          {Object.keys(questionsData[currentSection]).map((subSection, index) => (
            <View
              key={`subtab-${index}`}
              style={[
                styles.subTab,
                currentSubSection === subSection ? styles.activeSubTab : {},
              ]}>
              <Text style={[
                styles.subTabText,
                currentSubSection === subSection ? styles.activeSubTabText : {},
              ]}>
                {subSection}
              </Text>
            </View>
          ))}
        </ScrollView>

        <Image
          source={require('../assets/Toys.png')} // Ensure the path to Toys.png is correct
          style={styles.toysImage}
        />

        {/* Question Card */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            {currentQuestions[currentQuestionIndex]?.question}
          </Text>
          <Text style={styles.questionCount}>
            {currentQuestionIndex + 1} of {currentQuestions.length}
          </Text>
        </View>

        {/* Answer Buttons */}
        <View style={styles.answerContainer}>
          <TouchableOpacity style={styles.yesButton} onPress={handleYes}>
            <Text style={styles.buttonText}>YES</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.noButton} onPress={handleNo}>
            <Text style={styles.buttonText}>NO</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30, // Reduced space from top of the screen
    marginTop: 40,
    marginBottom: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  tab: {
    width: '40%',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    elevation: 5,  // For a slight shadow effect
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  activeTabText: {
    color: '#000', // Ensure text color contrast on the active tab
  },
  subTabsContainer: {
    width: '100%',
    height: 50,
  },
  subTabsContentContainer: {
    alignItems: 'center',
    paddingLeft: 10,
  },
  subTab: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,  // Ensure rounded corners for all sub-tabs
    marginHorizontal: 5,
    // backgroundColor: '#E0E0E0', // Optional: add background to non-active sub-tabs for testing
  },
  activeSubTab: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    elevation: 5,  // For a slight shadow effect
  },
  subTabText: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold',
  },
  activeSubTabText: {
    color: '#000', // Ensure text color contrast on the active sub-tab
  },
  questionContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20, // Space between question and answer buttons
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  questionCount: {
    marginTop: 10,
    fontSize: 14,
    color: '#888',
  },
  answerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 10, // Reduced space from the question container
  },
  yesButton: {
    width: '45%',
    paddingVertical: 13,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    alignItems: 'center',
    opacity: 0.8,
  },
  noButton: {
    width: '45%',
    paddingVertical: 13,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    alignItems: 'center',
    opacity: 0.8,
  },
  buttonText: {
    fontSize: 35,
    color: '#006769',
    fontFamily: 'Koulen_400Regular',
  },
  toysImage: {
    width: '80%',
    height: '25%',
    resizeMode: 'contain',
    marginBottom: 10, // Space between the image and the elements above/below
  },
});

export default ELARLATest;
