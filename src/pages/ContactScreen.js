import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

const ContactScreen = () => {
  const [form, setForm] = useState({});
  const forms = [
    {
      label: "Ваше име (обавезно)",
      value: "your-name"
    },
    {
      label: "Ваша е-пошта (обавезно)",
      value: "your-email"
    },
    {
      label: "Наслов поруке",
      value: "your-subject"
    },
    {
      label: "Ваша порука",
      value: "your-message"
    }
  ];

  const renderInput = ({ label, value }) => (
    <View style={styles.input}>
      <Text>{label}</Text>
      <TextInput
        style={value === "your-message" ? styles.inputArea : styles.inputField}
        autoCapitalize={true}
        multiline={value === "your-message" || false}
        onChangeText={text => setForm({ ...form, [`${value}`]: text })}
        value={form[value]}
      />
    </View>
  );

  const get_set_cookies = function(headers) {
    const set_cookies = [];
    for (const [name, value] of headers) {
      if (name === "set-cookie") {
        set_cookies.push(value);
      }
    }
    return set_cookies;
  };

  const sendData = async () => {
    var serializeJSON = function(data) {
      return Object.keys(data)
        .map(function(keyName) {
          return (
            encodeURIComponent(keyName) +
            "=" +
            encodeURIComponent(data[keyName])
          );
        })
        .join("&");
    };
    const data = new FormData();
    data.append("your-name", form["your-name"]);
    data.append("your-email", form["your-email"]);
    data.append("your-subject", form["your-subject"]);
    data.append("your-message", form["your-message"]);
    data.append("_wpcf7_nonce", "6afe0e836b");

    // const response = await fetch('http://omladinskenovine.rs/', {
    //     method: "GET",
    //     credentials: "same-origin", // or 'include' depending on CORS
    // })
    // console.log(response)
    // const set_cookies = get_set_cookies(response.headers)
    // console.log(set_cookies)
    // const cookies_to_send = set_cookies
    // .map(cookie => {
    //     const parsed_cookie = SetCookieParser.parse(cookie)
    //     return `${cookie.name}=${cookie.value}`
    // })
    // .join('; ')
    // console.log(cookies_to_send)
    let res = await fetch(
      "http://omladinskenovine.rs/wp-json/contact-form-7/v1/contact-forms/186/feedback",
      {
        headers: {
          Cookie: "PH_HPXY_CHECK=s1; Path=/; Domain=omladinskenovine.rs"
        },
        method: "POST",
        body: data
      }
    );
    console.log(res);
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View>
        <Image
          style={styles.image}
          source={{
            uri:
              "http://omladinskenovine.rs/wp-content/uploads/facebook.com-1922342_755087504510296_1039571794_n.jpg"
          }}
        ></Image>
      </View>

      <View style={styles.mainTextContainer}>
        <View style={styles.title}>
          <Text style={styles.titleText}>КОНТАКТ</Text>
        </View>
        <View style={styles.textContainer}>
          <Text>
            Знате младе људе из вашег окружења за које мислите да заслужују да
            се о њима пише? Контактирајте са нама на urednik@omladinskenovine.rs
            и наш тим ће радо писати о њима.
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles.form}
        behavior="padding"
        enabled
      >
        {forms.map(renderInput)}
        <TouchableOpacity onPress={() => sendData()} style={styles.send}>
          <Text style={styles.sendText}>ПОШАЉИ</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    aspectRatio: 1.75
  },
  textContainer: {
    textAlign: "justify"
  },
  title: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "#000000",
    marginBottom: 10
  },
  titleText: {
    color: "#FFFFFF",
    fontSize: 30,
    fontFamily: "RobotoSlab-Bold"
  },
  mainTextContainer: {
    flex: 1,
    alignItems: "baseline",
    justifyContent: "center",
    padding: 15
  },
  form: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 15
  },
  input: {
    paddingVertical: 10,
    width: "100%"
  },
  inputField: {
    width: "100%",
    padding: 5,
    height: 35,
    borderColor: "black",
    borderWidth: 1
  },
  inputArea: {
    width: "100%",
    padding: 5,
    height: 140,
    borderColor: "black",
    borderWidth: 1,
    textAlignVertical: "top"
  },
  send: {
    backgroundColor: "#EE4528",
    paddingHorizontal: 30,
    paddingVertical: 7,
    margin: 15
  },
  sendText: {
    fontFamily: "Oswald",
    color: "#FFFFFF"
  }
});
