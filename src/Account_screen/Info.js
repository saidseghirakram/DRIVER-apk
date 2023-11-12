import React from "react";
import {
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  Touchable,
  TextInput,
} from "react-native";

export default function InfoApp({ navigation }) {
  return (
    <ScrollView style={styles.container}>
        <Image
                style={styles.img}
                source={require("./img/20230602225419__fpdl.in__manuel-instructions-homme-intelligent-ordinateur-portable-etudiant-manuel-lisant-personnage-dessin-anime-guide-utilisez-termes-guide-didactique-documentation-numerique_335657-.png")}
         />
      <View style={styles.item}>
        <Text style={styles.title}>Privacy Policy of Driver</Text>
        <Text style={styles.discription}>
          At Driver, we value and prioritize the privacy of our users. This
          Privacy Policy outlines the information we collect, how we use it, and
          the measures we take to protect your personal data. By using our
          application, you consent to the practices described in this policy.
        </Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>Information Collection:</Text>
        <Text style={styles.discription}>
          We may collect the following types of information when you use our
          application: Personal Information: Such as your name, email address,
          and contact information, which you provide voluntarily when
          registering or using certain features of the application. Usage
          Information: We may collect non-personal information about how you
          interact with our application, including but not limited to device
          information, IP address, browser type, and operating system
        </Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>Information Use</Text>
        <Text style={styles.discription}>
          We use the collected information for the following purposes: To
          provide and improve our services: We may use the information to
          deliver personalized content, enhance user experience, and develop new
          features. Communication: We may use your email address to send
          important notifications, updates, and respond to your inquiries.
          Analytics: We may analyze user behavior and trends to gain insights
          into app usage patterns and improve our application. Information
          Sharing: We do not sell, trade, or rent your personal information to
          third parties. However, we may share your information under the
          following circumstances: With your consent: We may share your
          information when you explicitly authorize us to do so. Service
          Providers: We may engage trusted third-party service providers to
          assist us in delivering our services. These providers are obligated to
          maintain the confidentiality and security of your information. Legal
          Compliance: We may disclose your information if required by law or in
          response to valid legal requests.
        </Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>Data Security:</Text>
        <Text style={styles.discription}>
          We implement industry-standard security measures to protect your
          personal information from unauthorized access, alteration, disclosure,
          or destruction. However, no method of transmission over the internet
          or electronic storage is entirely secure, and we cannot guarantee
          absolute security.
        </Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>Children's Privacy:</Text>
        <Text style={styles.discription}>
          Our application is not intended for use by individuals under the age
          of 13. We do not knowingly collect personal information from children.
          If we become aware of any such information being collected
          inadvertently, we will promptly delete it.
        </Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>Changes to this Privacy Policy:</Text>
        <Text style={styles.discription}>
          We may update this Privacy Policy from time to time. Any changes will
          be effective immediately upon posting the revised policy in the
          application. We recommend reviewing this policy periodically to stay
          informed about our information practices.
        </Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>Contact Us:</Text>
        <Text style={styles.discription}>
          If you have any questions, concerns, or feedback regarding our Privacy
          Policy or the use of your personal information, please contact us at
          Driver@gmail.com .
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
    display: "flex",
    backgroundColor: "#fff",
  },
  img: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    marginBottom: 10,
  },
  item: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginVertical: 5,
    padding: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#84CAE2",
    marginBottom: 10,
  },
  discription: {
    fontSize: 15,
    color: "gray",
    marginBottom: 10,
    paddingLeft: 10,
  },
});
