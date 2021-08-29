import React, { Component } from "react";
import { Text, View, Image, StyleSheet, SafeAreaView, Platform, StatusBar, Dimensions, ScrollView } from "react-native";

import DropDownPicker from "react-native-dropdown-picker";

import { RFValue } from "react-native-responsive-fontsize";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

let customFonts = {
	"Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class CreateStory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fontsLoaded: false,
            previewImage: "img1",
            dropdownheight: 40
		};
	}

	async _loadFontsAsync() {
		await Font.loadAsync(customFonts);
		this.setState({ fontsLoaded: true });
	}

	componentDidMount() {
		this._loadFontsAsync();
	}

	render() {
		if (!this.state.fontsLoaded) {
			return <AppLoading />
		} else {
            let previewImages = {
                "img1" : require("../assets/story_image_1.png"),
                "img2" : require("../assets/story_image_2.png"),
                "img3" : require("../assets/story_image_3.png"),
                "img4" : require("../assets/story_image_4.png"),
                "img5" : require("../assets/story_image_5.png"),
            };
			return(
                <View style={styles.container}>
				<SafeAreaView style={styles.droidSafeArea} />
				<View style={styles.appTitle}>
					<View style={styles.appIcon}>
						<Image
							source={require("../assets/logo.png")}
							style={styles.iconImage}
						></Image>
					</View>
					<View style={styles.appTitleTextContainer}>
						<Text style={styles.appTitleText}>New Story</Text>
					</View>
				 </View>
                 <View style={styles.fieldsContainer}>
                     <ScrollView>
                       <Image source={previewImages[this.state.previewImage]} style={styles.previewImage}/>
                       <View style={{ height: RFValue(this.state.dropdownheight) }}>
                          <DropDownPicker
                             items={[
                                 {label: "Image 1", value: "img1"},
                                 {label: "Image 2", value: "img2"},
                                 {label: "Image 3", value: "img3"},
                                 {label: "Image 4", value: "img4"},
                                 {label: "Image 5", value: "img5"},
                             ]}
                             defaultValue={this.state.previewImage}
                             containerStyle={{ height: 40, borderRadius: 20, marginBottom: 10 }}
                             onOpen={()=>{
                                 this.setState({ dropdownheight: 170})
                             }}
                             onClose={()=>{
                                this.setState({ dropdownheight: 40})
                            }}
                            style={{ backgroundColor: "transparent" }}
                            itemStyle={{ 
                                justifyContent: "flex-start"
                            }}
                            dropDownStyle={{ backgroundColor: "#2f345d"}}
                            labelStyle={{ color: "#fff", fontFamily: "Bubblegum-Sans" }}
                            arrowStyle={{ color: "#fff", fontFamily: "Bubblegum-Sans" }}
                            onChangeItem={item=>this.setState({ previewImage: item.value })}
                          />
                       </View>
                     </ScrollView>
                 </View>
			  </View>
            )
		}
	}
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#15193c"
    },
    droidSafeArea: {
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    appTitle: {
      flex: 0.07,
      flexDirection: "row"
    },
    appIcon: {
      flex: 0.3,
      justifyContent: "center",
      alignItems: "center"
    },
    iconImage: {
      width: "100%",
      height: "100%",
      resizeMode: "contain"
    },
    appTitleTextContainer: {
      flex: 0.7,
      justifyContent: "center"
    },
    appTitleText: {
      color: "white",
      fontSize: RFValue(28),
      fontFamily: "Bubblegum-Sans"
    },
    fieldsContainer: {
      flex: 0.85
    },
    previewImage: {
      width: "93%",
      height: RFValue(250),
      alignSelf: "center",
      borderRadius: RFValue(10),
      marginVertical: RFValue(10),
      resizeMode: "contain"
    },
    inputFont: {
      height: RFValue(40),
      borderColor: "white",
      borderWidth: RFValue(1),
      borderRadius: RFValue(10),
      paddingLeft: RFValue(10),
      color: "white",
      fontFamily: "Bubblegum-Sans"
    },
    inputFontExtra: {
      marginTop: RFValue(15)
    },
    inputTextBig: {
      textAlignVertical: "top",
      padding: RFValue(5)
    }
  });