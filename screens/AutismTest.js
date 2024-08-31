// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';

// const { width } = Dimensions.get('window');

// const questions = [
//   {
//     id: 1,
//     question: 'Relating to people',
//     options: 
//     [
//         "No evidence of difficulty in regulating people. The child's behaviour is for his or her age. Some shyness, fussiness, or annoyance at being told what to do may be observed, but not to a typical degree.", 
//         'Mildly abnormal relationships. The child may avoid looking the adult in the eye, the adult or become fussy if interaction is forced, be excessively shy, not be as responsive to the adult as is typical or to parents somewhat more than most children of the same age.', 
//         "Moderately abnormal relationships. The child shows aloofness (seems unaware of adult). Persistent and forceful attempts are necessary to get the child's attention at time. The child initiates minimal contact.", 
//         "Severely abnormal relationship. The child is consistently aloof or unaware that what adults are doing, he or she almost not responds or initiates contact with the adults. Once the most persistent attempts to get the child's attention have any effect.",
//     ],
//   },
//   {
//     id: 2,
//     question: 'Imitations',
//     options: 
//     [
//         'Appropriate imitation. The child can be imitate sounds , words and movements, which are appropriate for his or her skill level.', 
//         'Mildly abnormal imitation. The child imitates simple, behaviours such as clapping or single verbal’s sound most of the time, occasionally imitates only after prodding or after a delay.', 
//         'Moderately abnormal imitation. The child imitates only part of the time and requires a great deal of persistence and help from the adult, frequently imitates only after a delay.', 
//         'Severely abnormal imitation. The child rarely or never imitates sound, words or movements even with prodding and assistance from the adults.'
//     ],
//   },
//   {
//     id: 3,
//     question: 'Emotional Response',
//     options: 
//     [
//         'Age appropriate and situation appropriate emotional responses. Shows the appropriate type and degree of emotional response as indicated in facial expression posture and manner.', 
//         'Mildly abnormal emotional response. The child occasionally displays what inappropriate type of degree of emotional reactions. Reactions are sometimes unrelated to the objects or events surrounding them.', 
//         'Moderately emotional responses. The child shows definite inappropriate type or degree of emotional response. Reaction may be quite inhibited and unrelated to the situation may grimace laugh or become rigid even though no apparent emotion producing objects or events are present.', 
//         'Severely abnormal emotional response. Response are seldom appearing in the situation once the child gets in a certain mood. It is very difficult to change the mood. Conversely, the child may wildly different emotions when nothing changed.'
//     ],
//   },
//   {
//     id: 4,
//     question: 'Body Use',
//     options: 
//     [
//         'Age appropriate body use. The child moves with the same ease. Age appropriate co-ordination of a normal child of the same age.', 
//         'Mildly abnormal body use. Some minor peculiarities may be present with clumsiness, repetitive movements, poor co-ordination or the rare appearances of unusual movements.', 
//         'Moderately abnormal body use. Behaviours that are clearly strange or unusual in a child of this age may include strange finger movements, peculiar finger or hand turning, staring or pickling at the body , self directed aggression, rocking, spinning wiggling or toe walking.', 
//         'Severely abnormal body use. Intense or frequent movements of the type above are signs of abnormal body use. These behaviours may persist which attempts to discourage them or involve the child in other activities.'
//     ],
//   },
//   {
//     id: 5,
//     question: 'Object Use',
//     options: 
//     [
//         'Appropriate use of and interest in toys and other objects. The child shows normal interest in toys and other objects appropriate for his or her skill level and uses these toys in an appropriate manner.', 
//         'Mildly in appropriate interest in or use of toys and other objects. The child may show a typical interest in a toy or play with it in an inappropriately childish way (e.g. banging or sucking in the toy).', 
//         'Moderately inappropriate interest in or use of toys and other objects. The child may show little interest in toys or other objects, or may be preoccupied with using an objects or toy in some strange way. He or she may focus in some insignificant part of a toy, become fascinated with light reflecting of the objects. Or play with one object exclusively.', 
//         'Severely inappropriate interest in, or use of, toys in other objects. The child may engage in some behaviours as above, with greater frequency and intensity. The child is difficult to distract when engaged in these inappropriate activities.'
//     ],
//   },
//   {
//     id: 6,
//     question: 'Adaptation to Change',
//     options: 
//     [
//         'Age appropriate response to change. While the child may notice or comment on changes in routine, he or she accept these changes without undue distress.', 
//         'Mildly abnormal adaptation to change. When an adult tries to change tasks the child may continue the same activity or use the same materials.', 
//         'Moderately abnormal adaptation to change. The child actively resists changes in routine, tries to continue the old activity and is difficult to distract. He or she may become angry and unhappy when an established routine is altered.', 
//         'Severely abnormal adaptation to change. The child shows severe reactions to change. If a change is forced, he or she may become extremely angry or uncooperative and responds with tantrums.'
//     ],
//   },
//   {
//     id: 7,
//     question: 'Visual Responses',
//     options: 
//     [
//         'Age appropriate visual responses. The child visual behavior is normal and appropriate for that age. Vision is used together with other senses as a way to explore a new object.', 
//         'Mildly abnormal visual responses. The child must be occasionally reminded to look at the object. The child may be more interested in looking at mirror or lighting them peers, may occasionally stares off spaces, or may also avoiding looking people in the eye.', 
//         'Moderately abnormal visual response. The child must be reminded frequently in what he or she is doing. He or she may stare into space avoid looking people in the eye, looking at object from an unusual angle, or hold objects very close to the eyes.', 
//         'Severely abnormal visual response. The child consistently avoids looking at people or certain objects and may show forms of other visual peculiarities etc. described below.'
//     ],
//   },
//   {
//     id: 8,
//     question: 'Listening Responses',
//     options: 
//     [
//         'Age appropriate listening response. The child’s listening behavior is normal and appropriate for age. Listening is used together with other senses.', 
//         'Mildly abnormal listening responses. There may be lack of response and mild overreaction to certain sound. Responses to sound may be delayed and sometimes may need repetition to catch the child’s attention. The child may be distracted by extraneous sound.', 
//         'Moderately abnormal listening response. The child’s response to sound are slow and May often ignore a sound a first few times it is made, may be started or cover ears when hearing same everyday sound.', 
//         'Severely abnormal listening response. The child overreacts and or under reacts sounds to an extremely marked degree regardless of the type of sound.'
//     ],
//   },
//   {
//     id: 9,
//     question: 'Touch, Smell and Taste Response and Use',
//     options: 
//     [
//         'Normal use of, and response in taste, smell and touch. The child explores new object in an age appropriate manner, generally by feeling and looking. Taste and smell may be used when appropriate. When reacting to minor everyday pain the child expresses discomfort but does not overreact.', 
//         'Mildly abnormal use of,, and response to taste, smell and touch, the child may persist in painting object in or her mouth, may taste or smell inedible objects, may ignore or overreacts to mild pain that a normal child would express as discomfort able.', 
//         'Moderately abnormal use of, and response to taste, smell and touch. The child may be moderately pre occupied with touching, smelling or tasting objects or people. The child may either react too much or too little.', 
//         'Severely abnormal use of, and response to taste, smell and touch. The child is pre occupied with tasting, smelling and feeling object more for the sensation than a normal exploration or use of the objects. The child may completely ignore pain or react very strongly to slight discomfort.'
//     ],
//   },
//   {
//     id: 10,
//     question: 'Fear or Nervousness',
//     options: 
//     [
//         'Normal fear or nervousness. The child’s behavior is appropriate both to the situation and to his or her age', 
//         'Mildly abnormal fears or nervousness. The child occasionally shows to much or too little fear or nervousness compared to the reaction of a normal child of the same age in similar situation.', 
//         'Moderately abnormal fears or nervousness. The child shows either quite a bit more little a bit less fear than is typical even for a younger child in a similar situation.', 
//         'Severely abnormal fears or nervousness. Fears persist even after repeated experience with harmless events or objects. It is extremely difficult to calm or comfort the child. The child may conversely fail to show appropriate regard for hazard, which other children of the same age avoid.'
//     ],
//   },
//   {
//     id: 11,
//     question: 'Verbal Communication',
//     options: 
//     [
//         'Normal verbal communication, age and situation appropriate.', 
//         'Mildly abnormal verbal communication. Speech shows overall retardation. Most speech is meaningful. However, some echolalia or pronoun reversal may occur. Some peculiar words or jargon may be used occasionally.', 
//         'Moderately abnormal verbal communication. Speech may be absent. When present verbal communication may be absent. When present verbal communication may be a mixture of some meaningful speech and some peculiar speech and some peculiar speech such as jargon. Echolalia or pronoun reversal. Peculiarities in meaningful speech include excessive questioning or pre occupation with peculiar topics.', 
//         'Severely abnormal verbal communication. Meaningful speech is not used. The child may make infantile squeals, weird or animal like sounds. Complex noises approximating speech or may show persistent, bizarre use of some recognizable words or phrases.'
//     ],
//   },
//   {
//     id: 12,
//     question: 'Non-Verbal Communication',
//     options: 
//     [
//         'Normal use of nonverbal communication, age situation appropriate.', 
//         'Mildly abnormal use of nonverbal communication. Immature use nonverbal communication may only point vaguely or reach for what he or she wants in situation where same age child may point or gesture more specifically to indicate what he or she wants.', 
//         'Moderately abnormal use of nonverbal communication. The child is generally unable to express needs or desires nonverbally and cannot understand the nonverbal communication of others.', 
//         'Severely abnormal use of nonverbal communication. The child only use bizarre or peculiar gesture, which have no apparent meaning and shows no awareness of the meaning associated with the gestures or facial expression of others.'
//     ],
//   },
//   {
//     id: 13,
//     question: 'Activity Level',
//     options: 
//     [
//         'Normal activity level for age and circumstances. The child is neither overactive nor less active than a normal child of the same age in a similar situation.', 
//         'Mildly abnormal activity level. The child may either be mildly restless active and difficult to restrain. He or she may have boundless energy and may not go to sleep readily at night. Conversely the child may be quite lethargic, and need a great deal of prompts to get him or her to move about.', 
//         'Moderately abnormal activity level.child may be quite active and difficult to restrain. He or she may have boundless energy and may not go to sleep readily at night. Conversely the child may be quite lethargic, and need a great deal or prompts to get him or her to move about.', 
//         'Severely abnormal activity level. The child exhibits extremes of activity or less activity or may even shift from one extreme to the others.'
//     ],
//   },
//   {
//     id: 14,
//     question: 'Level and Consistency of Intellectual Response',
//     options: 
//     [
//         'Intelligence is normal and reasonably consistent across various areas. The child is as intelligent as typical children of the same age and does not have any unusual intellectual’s skills or problem.', 
//         'Mildly abnormal intellectual functioning. The child is not as smart as typical children of the same age, appear fairly evenly retarded across all areas.', 
//         'Moderately abnormal intellectual functioning. The child is not as small as typical children of the same age, skills appear fairly evenly retarded across all areas.', 
//         'Severely abnormal intellectual functioning. While the child generally is not smart as the typical child of his age, he or she may function even better than the normal child of the same age in one or more areas.'
//     ],
//   },
//   {
//     id: 15,
//     question: 'General Impressions',
//     options: 
//     [
//         'No autism. The child shows none of the symptoms characteristics of autism.', 
//         'Mild autism. The child shows only a few symptoms or only a mild degree of autism.', 
//         'Moderate autism. The child shows a number of symptoms or a moderate degree of autism.', 
//         'Severe autism. The child shows many symptoms or an extreme degree of autism.'
//     ],
//   },
// ];

// const AutismTest = () => {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const currentQuestion = questions[currentQuestionIndex];

//   const handleOptionPress = (option) => {
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else {
//       // Handle the completion of the test
//       alert('Test completed!');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image
//         source={require('../assets/Toys.png')} // Update the path to the image accordingly
//         style={styles.toysImage}
//       />
//       <Text style={styles.questionText}>{currentQuestion.question}</Text>
//       <ScrollView style={styles.optionsContainer}>
//         {currentQuestion.options.map((option, index) => (
//           <TouchableOpacity key={index} style={styles.optionButton} onPress={() => handleOptionPress(option)}>
//             <Text style={styles.optionText}>{option}</Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#DFF3E4', // Light green background
//     padding: 20,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   toysImage: {
//     height: "22%",
//     resizeMode: 'contain',
//     marginBottom: 10,
//   },
//   questionText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   optionsContainer: {
//     width: '100%',
//   },
//   optionButton: {
//     backgroundColor: '#A7F3D0', // Light green button
//     padding: 15,
//     borderRadius: 10,
//     marginVertical: 8,
//     alignItems: 'center',
//   },
//   optionText: {
//     fontSize: 18,
//     color: '#000',
//   },
// });

// export default AutismTest;


import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView, Animated } from 'react-native';

const { width, height } = Dimensions.get('window');

const questions = [
  {
    id: 1,
    question: 'Relating to people',
    options: 
    [
        "No evidence of difficulty in regulating people. The child's behaviour is for his or her age. Some shyness, fussiness, or annoyance at being told what to do may be observed, but not to a typical degree.", 
        'Mildly abnormal relationships. The child may avoid looking the adult in the eye, the adult or become fussy if interaction is forced, be excessively shy, not be as responsive to the adult as is typical or to parents somewhat more than most children of the same age.', 
        "Moderately abnormal relationships. The child shows aloofness (seems unaware of adult). Persistent and forceful attempts are necessary to get the child's attention at time. The child initiates minimal contact.", 
        "Severely abnormal relationship. The child is consistently aloof or unaware that what adults are doing, he or she almost not responds or initiates contact with the adults. Once the most persistent attempts to get the child's attention have any effect.",
    ],
  },
  {
    id: 2,
    question: 'Imitations',
    options: 
    [
        'Appropriate imitation. The child can be imitate sounds , words and movements, which are appropriate for his or her skill level.', 
        'Mildly abnormal imitation. The child imitates simple, behaviours such as clapping or single verbal’s sound most of the time, occasionally imitates only after prodding or after a delay.', 
        'Moderately abnormal imitation. The child imitates only part of the time and requires a great deal of persistence and help from the adult, frequently imitates only after a delay.', 
        'Severely abnormal imitation. The child rarely or never imitates sound, words or movements even with prodding and assistance from the adults.'
    ],
  },
  {
    id: 3,
    question: 'Emotional Response',
    options: 
    [
        'Age appropriate and situation appropriate emotional responses. Shows the appropriate type and degree of emotional response as indicated in facial expression posture and manner.', 
        'Mildly abnormal emotional response. The child occasionally displays what inappropriate type of degree of emotional reactions. Reactions are sometimes unrelated to the objects or events surrounding them.', 
        'Moderately emotional responses. The child shows definite inappropriate type or degree of emotional response. Reaction may be quite inhibited and unrelated to the situation may grimace laugh or become rigid even though no apparent emotion producing objects or events are present.', 
        'Severely abnormal emotional response. Response are seldom appearing in the situation once the child gets in a certain mood. It is very difficult to change the mood. Conversely, the child may wildly different emotions when nothing changed.'
    ],
  },
  {
    id: 4,
    question: 'Body Use',
    options: 
    [
        'Age appropriate body use. The child moves with the same ease. Age appropriate co-ordination of a normal child of the same age.', 
        'Mildly abnormal body use. Some minor peculiarities may be present with clumsiness, repetitive movements, poor co-ordination or the rare appearances of unusual movements.', 
        'Moderately abnormal body use. Behaviours that are clearly strange or unusual in a child of this age may include strange finger movements, peculiar finger or hand turning, staring or pickling at the body , self directed aggression, rocking, spinning wiggling or toe walking.', 
        'Severely abnormal body use. Intense or frequent movements of the type above are signs of abnormal body use. These behaviours may persist which attempts to discourage them or involve the child in other activities.'
    ],
  },
  {
    id: 5,
    question: 'Object Use',
    options: 
    [
        'Appropriate use of and interest in toys and other objects. The child shows normal interest in toys and other objects appropriate for his or her skill level and uses these toys in an appropriate manner.', 
        'Mildly in appropriate interest in or use of toys and other objects. The child may show a typical interest in a toy or play with it in an inappropriately childish way (e.g. banging or sucking in the toy).', 
        'Moderately inappropriate interest in or use of toys and other objects. The child may show little interest in toys or other objects, or may be preoccupied with using an objects or toy in some strange way. He or she may focus in some insignificant part of a toy, become fascinated with light reflecting of the objects. Or play with one object exclusively.', 
        'Severely inappropriate interest in, or use of, toys in other objects. The child may engage in some behaviours as above, with greater frequency and intensity. The child is difficult to distract when engaged in these inappropriate activities.'
    ],
  },
  {
    id: 6,
    question: 'Adaptation to Change',
    options: 
    [
        'Age appropriate response to change. While the child may notice or comment on changes in routine, he or she accept these changes without undue distress.', 
        'Mildly abnormal adaptation to change. When an adult tries to change tasks the child may continue the same activity or use the same materials.', 
        'Moderately abnormal adaptation to change. The child actively resists changes in routine, tries to continue the old activity and is difficult to distract. He or she may become angry and unhappy when an established routine is altered.', 
        'Severely abnormal adaptation to change. The child shows severe reactions to change. If a change is forced, he or she may become extremely angry or uncooperative and responds with tantrums.'
    ],
  },
  {
    id: 7,
    question: 'Visual Responses',
    options: 
    [
        'Age appropriate visual responses. The child visual behavior is normal and appropriate for that age. Vision is used together with other senses as a way to explore a new object.', 
        'Mildly abnormal visual responses. The child must be occasionally reminded to look at the object. The child may be more interested in looking at mirror or lighting them peers, may occasionally stares off spaces, or may also avoiding looking people in the eye.', 
        'Moderately abnormal visual response. The child must be reminded frequently in what he or she is doing. He or she may stare into space avoid looking people in the eye, looking at object from an unusual angle, or hold objects very close to the eyes.', 
        'Severely abnormal visual response. The child consistently avoids looking at people or certain objects and may show forms of other visual peculiarities etc. described below.'
    ],
  },
  {
    id: 8,
    question: 'Listening Responses',
    options: 
    [
        'Age appropriate listening response. The child’s listening behavior is normal and appropriate for age. Listening is used together with other senses.', 
        'Mildly abnormal listening responses. There may be lack of response and mild overreaction to certain sound. Responses to sound may be delayed and sometimes may need repetition to catch the child’s attention. The child may be distracted by extraneous sound.', 
        'Moderately abnormal listening response. The child’s response to sound are slow and May often ignore a sound a first few times it is made, may be started or cover ears when hearing same everyday sound.', 
        'Severely abnormal listening response. The child overreacts and or under reacts sounds to an extremely marked degree regardless of the type of sound.'
    ],
  },
  {
    id: 9,
    question: 'Touch, Smell and Taste Response and Use',
    options: 
    [
        'Normal use of, and response in taste, smell and touch. The child explores new object in an age appropriate manner, generally by feeling and looking. Taste and smell may be used when appropriate. When reacting to minor everyday pain the child expresses discomfort but does not overreact.', 
        'Mildly abnormal use of,, and response to taste, smell and touch, the child may persist in painting object in or her mouth, may taste or smell inedible objects, may ignore or overreacts to mild pain that a normal child would express as discomfort able.', 
        'Moderately abnormal use of, and response to taste, smell and touch. The child may be moderately pre occupied with touching, smelling or tasting objects or people. The child may either react too much or too little.', 
        'Severely abnormal use of, and response to taste, smell and touch. The child is pre occupied with tasting, smelling and feeling object more for the sensation than a normal exploration or use of the objects. The child may completely ignore pain or react very strongly to slight discomfort.'
    ],
  },
  {
    id: 10,
    question: 'Fear or Nervousness',
    options: 
    [
        'Normal fear or nervousness. The child’s behavior is appropriate both to the situation and to his or her age', 
        'Mildly abnormal fears or nervousness. The child occasionally shows to much or too little fear or nervousness compared to the reaction of a normal child of the same age in similar situation.', 
        'Moderately abnormal fears or nervousness. The child shows either quite a bit more little a bit less fear than is typical even for a younger child in a similar situation.', 
        'Severely abnormal fears or nervousness. Fears persist even after repeated experience with harmless events or objects. It is extremely difficult to calm or comfort the child. The child may conversely fail to show appropriate regard for hazard, which other children of the same age avoid.'
    ],
  },
  {
    id: 11,
    question: 'Verbal Communication',
    options: 
    [
        'Normal verbal communication, age and situation appropriate.', 
        'Mildly abnormal verbal communication. Speech shows overall retardation. Most speech is meaningful. However, some echolalia or pronoun reversal may occur. Some peculiar words or jargon may be used occasionally.', 
        'Moderately abnormal verbal communication. Speech may be absent. When present verbal communication may be absent. When present verbal communication may be a mixture of some meaningful speech and some peculiar speech and some peculiar speech such as jargon. Echolalia or pronoun reversal. Peculiarities in meaningful speech include excessive questioning or pre occupation with peculiar topics.', 
        'Severely abnormal verbal communication. Meaningful speech is not used. The child may make infantile squeals, weird or animal like sounds. Complex noises approximating speech or may show persistent, bizarre use of some recognizable words or phrases.'
    ],
  },
  {
    id: 12,
    question: 'Non-Verbal Communication',
    options: 
    [
        'Normal use of nonverbal communication, age situation appropriate.', 
        'Mildly abnormal use of nonverbal communication. Immature use nonverbal communication may only point vaguely or reach for what he or she wants in situation where same age child may point or gesture more specifically to indicate what he or she wants.', 
        'Moderately abnormal use of nonverbal communication. The child is generally unable to express needs or desires nonverbally and cannot understand the nonverbal communication of others.', 
        'Severely abnormal use of nonverbal communication. The child only use bizarre or peculiar gesture, which have no apparent meaning and shows no awareness of the meaning associated with the gestures or facial expression of others.'
    ],
  },
  {
    id: 13,
    question: 'Activity Level',
    options: 
    [
        'Normal activity level for age and circumstances. The child is neither overactive nor less active than a normal child of the same age in a similar situation.', 
        'Mildly abnormal activity level. The child may either be mildly restless active and difficult to restrain. He or she may have boundless energy and may not go to sleep readily at night. Conversely the child may be quite lethargic, and need a great deal of prompts to get him or her to move about.', 
        'Moderately abnormal activity level.child may be quite active and difficult to restrain. He or she may have boundless energy and may not go to sleep readily at night. Conversely the child may be quite lethargic, and need a great deal or prompts to get him or her to move about.', 
        'Severely abnormal activity level. The child exhibits extremes of activity or less activity or may even shift from one extreme to the others.'
    ],
  },
  {
    id: 14,
    question: 'Level and Consistency of Intellectual Response',
    options: 
    [
        'Intelligence is normal and reasonably consistent across various areas. The child is as intelligent as typical children of the same age and does not have any unusual intellectual’s skills or problem.', 
        'Mildly abnormal intellectual functioning. The child is not as smart as typical children of the same age, appear fairly evenly retarded across all areas.', 
        'Moderately abnormal intellectual functioning. The child is not as small as typical children of the same age, skills appear fairly evenly retarded across all areas.', 
        'Severely abnormal intellectual functioning. While the child generally is not smart as the typical child of his age, he or she may function even better than the normal child of the same age in one or more areas.'
    ],
  },
  {
    id: 15,
    question: 'General Impressions',
    options: 
    [
        'No autism. The child shows none of the symptoms characteristics of autism.', 
        'Mild autism. The child shows only a few symptoms or only a mild degree of autism.', 
        'Moderate autism. The child shows a number of symptoms or a moderate degree of autism.', 
        'Severe autism. The child shows many symptoms or an extreme degree of autism.'
    ],
  },
];

const AutismTest = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const progress = useRef(new Animated.Value(0)).current; // Animated progress value
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    // Calculate the progress as a fraction of the total questions
    const progressValue = (currentQuestionIndex + 1) / questions.length;

    // Animate the progress bar width
    Animated.timing(progress, {
      toValue: progressValue,
      duration: 500, // Duration of the animation
      useNativeDriver: false,
    }).start();
  }, [currentQuestionIndex]);

  const progressBarWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'], // Map the progress value to percentage width
  });

  const handleOptionPress = (option) => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Handle the completion of the test
      alert('Test completed!');
    }
  };

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <Animated.View style={[styles.progressBarFill, { width: progressBarWidth }]} />
      </View>

      <Image
        source={require('../assets/Test.png')} // Update the path to the image accordingly
        style={styles.toysImage}
      />
      <Text style={styles.questionText}>{currentQuestion.question}</Text>
      <ScrollView style={styles.optionsContainer}>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity key={index} style={styles.optionButton} onPress={() => handleOptionPress(option)}>
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DFF3E4', // Light green background
    padding: width * 0.05, // Padding adjusted according to screen width
    alignItems: 'center',
    marginTop: height * 0.02, // MarginTop adjusted according to screen height
  },
  progressBarContainer: {
    width: '100%',
    height: height * 0.005, // Height adjusted according to screen height
    backgroundColor: '#ccc',
    borderRadius: 5,
    marginBottom: height * 0.02, // MarginBottom adjusted according to screen height
    overflow: 'hidden',
    marginTop: height * 0.06, // MarginTop adjusted according to
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#000', // Progress bar color
  },
  toysImage: {
    height: height * 0.22, // Height adjusted according to screen height
    resizeMode: 'contain',
    marginBottom: height * 0.02, // MarginBottom adjusted according to screen height
  },
  questionText: {
    fontSize: width * 0.05, // FontSize adjusted according to screen width
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: height * 0.02, // MarginBottom adjusted according to screen height
  },
  optionsContainer: {
    width: '100%',
  },
  optionButton: {
    backgroundColor: '#A7F3D0', // Light green button
    padding: height * 0.02, // Padding adjusted according to screen height
    borderRadius: 10,
    marginVertical: height * 0.01, // MarginVertical adjusted according to screen height
    alignItems: 'center',
  },
  optionText: {
    fontSize: width * 0.045, // FontSize adjusted according to screen width
    color: '#000',
  },
});

export default AutismTest;
