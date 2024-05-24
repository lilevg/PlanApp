import React, { useState, useRef } from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated} from 'react-native';

export const Calendar = () => {
    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const scrollViewRef = useRef(null);


    const today = new Date();

    const getDate = (daysToAdd) => {
        const date = new Date(today);
        date.setDate(today.getDate() + daysToAdd);
        return date;
    };

    const daysToDisplay = [0, 1, 2, 3, 4, 5, 6];

    const generateDates = () => {
        const dateList = daysToDisplay.map((day) => getDate(day));
        return dateList;
    };

    useState(() => {
        setDates(generateDates());
    }, []);

    const rotateDates = (direction) => {
        const rotatedDates = [...dates];

        if (direction === 'left') {
            const firstDate = new Date(rotatedDates[0]);
            firstDate.setDate(firstDate.getDate() - 1);
            rotatedDates.unshift(firstDate);
            rotatedDates.pop();
        } else {
            const lastDate = new Date(rotatedDates[rotatedDates.length - 1]);
            lastDate.setDate(lastDate.getDate() + 1);
            rotatedDates.shift();
            rotatedDates.push(lastDate);
        }
        setDates(rotatedDates);
        scrollViewRef.current.scrollTo({ x: 0, animated: false });
    };

    // const handleScroll = (event) => {
    //     const contentOffsetX = event.nativeEvent.contentOffset.x;
    //     const contentSizeWidth = event.nativeEvent.contentSize.width;
    //     const layoutMeasurementWidth = event.nativeEvent.layoutMeasurement.width;
    //     const scrollPosition = contentOffsetX + layoutMeasurementWidth;
    //
    //     if (scrollPosition >= contentSizeWidth) {
    //         rotateDates('right');
    //     }
    // };

    const handleDatePress = (date) => {
        setSelectedDate(date);
    };
    const handleScroll = (event) => {
        const positionX = event.nativeEvent.contentOffset.x;
        const positionY = event.nativeEvent.contentOffset.y;
    };
    return (
        <View style={{ paddingBottom: 15 }}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {dates.map((date, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.dateItem,
                            selectedDate === date && styles.selectedDateItem,
                        ]}
                        onPress={() => {
                            setSelectedDate(date);
                            handleDatePress(date);
                        }}
                    >
                        <Text style={[styles.dayOfWeek, selectedDate === date && styles.selectedDayOfWeek]}>
                            {getDayOfWeek(date)}
                        </Text>
                        <View style={[styles.dateCircle, selectedDate === date && styles.selectedDateCircle]}>
                            <Text style={[styles.dateText, selectedDate === date && styles.selectedDateText]}>
                                {date.getDate()}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

function getDayOfWeek(date) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
}

const styles = StyleSheet.create({
    scrollViewContent: {
        alignItems: 'center',
    },
    dateItem: {
        alignItems: 'center',
        marginHorizontal: 2.5,
    },
    dayOfWeek: {
        color: 'white',
        fontSize: 16,
        marginBottom: 5,
    },
    selectedDayOfWeek: {
        color: '#7a1b1b'
    },
    dateCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#282828',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedDateCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#7a1b1b',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff'
    },
});
