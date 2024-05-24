import {StyleSheet} from "react-native";

export const gStyle = StyleSheet.create({
    main:{
        main: 1
    },
    title:{
        fontFamily: 'poppins-b'
    },
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        // backgroundColor: '#282828',
        backgroundColor: '#191919',

        height: '100%'
    },
    headerStyle: {
        backgroundColor: '#191919',
        // height: 100
    },
    background: {
        backgroundColor: '#191919',
        flex: 1,
    },
    headerTitleStyle: {
        fontFamily: 'poppins-b',
        color: 'white'
    },
    smthOnOneLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 70,
    },
    placeHolderText: {
        color: 'white',
        fontFamily: 'poppins-placeholder'
    },
})