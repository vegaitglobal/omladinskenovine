import React, { Component } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default class AboutScreen extends Component {
  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <View>
          <Image
            style={styles.image}
            source={{
              uri:
                "http://omladinskenovine.rs/wp-content/uploads/2017/10/fb2-.jpg"
            }}
          ></Image>
        </View>

        <View style={styles.mainTextContainer}>
          <View style={styles.title}>
            <Text style={styles.titleText}>О НАМА</Text>
          </View>
          <View style={styles.textContainer}>
            <Text>
              Омладинске новине Click click boom су прве и једине афирмативне
              новине у Србији, основане 2013. године. Настале су са жељом да
              афирмишу младе и успешне људе из окружења који су уз помоћ
              сопственог труда и рада постигли значајне резултате из области
              спорта, културе, образовања, уметности и сл. {"\n\n"}Прво штампано
              издање нашло је пут до својих читалаца 2014. године и од тада до
              2017. излазило је периодично и бесплатно се делило младима у свим
              универзитетским центрима у Србији. {"\n\n"}Препознавши онлајн
              платформу као нови и све актуелнији медиј, новине прелазе у нову
              форму и нуде читаоцима већи избор тема, обухватајући при том, осим
              афирмације младих талената, и текстове информативне, едукативне и
              забавне природе. {"\n\n"}Новине су апсолутно независне у свом раду
              и прате искључиво успех, идеје, путовања, рад и машту младих у
              Србији. Циљ новина је да покажу да је сваки успех могућ и да треба
              бити храбар и веровати у своје снове, али и да отворе она питања
              која се у највећој могућој мери тичу положаја младих у нашој
              земљи.
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

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
  }
});
