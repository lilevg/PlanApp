import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Modal,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { gStyle } from "../styles/style";
import { EditTodo } from "../components/EditTodo";
import { AddTodo } from "../components/AddTodo";
import { Calendar } from "../components/Calendar";
import { getUserId } from "../functions/getUserId";
import {getUsersPlans} from "../functions/getUsersPlans";
import {log} from "expo/build/devtools/logger";

export const Mynew = () => {
    const [todos, setTodos] = useState([]);
    const [userId, setUserId] = useState('');
    const [modalWindowEdit, setModalWindowEdit] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);
    const [modalWindowCreate, setModalWindowCreate] = useState(false);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const user_id = await getUserId();
                if (user_id) {
                    setUserId(user_id);
                    fetchUserPlans(user_id);
                }
            } catch (e) {
                console.error(e);
            }
        };

        fetchUserId();
    }, []);

    useEffect(() => {
        if (userId) {
            fetchUserPlans(userId);
        }
    }, [userId]);

    const fetchUserPlans = async (userId) => {
        try {
            const today = new Date();
            const startOfDay = new Date(today);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(today);
            endOfDay.setHours(23, 59, 59, 999);

            const plans = await getUsersPlans(userId);

            // Перевірка, чи має todos значення перед використанням filter
            if (plans) {
                const todayPlans = plans.filter(plan => {
                    const planDate = new Date(plan.start_time);
                    return planDate >= startOfDay && planDate <= endOfDay;
                });

                setTodos(todayPlans);
            }
        } catch (e) {
            console.error(e.message);
        }
    };


    const handleDelete = async (planId) => {
        try {
            await fetch(`http://192.168.1.100:8001/plan/${userId}/${planId}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            fetchUserPlans(userId);
        } catch (e) {
            console.error(e.message);
        }
    };

    const handleEdit = async (editedItem) => {
        setModalWindowEdit(false);
        setModalWindowCreate(false);
        try {
            await fetch(`http://192.168.1.100:8001/plan/${userId}/${editedItem.id}`, {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    plan_title: editedItem.title,
                    start_time: editedItem.start_time,
                    end_time: editedItem.end_time,
                    description: editedItem.description,
                    importance: 'low',
                    completed: false
                }),
            });
            fetchUserPlans(userId); // Refresh the list after saving
        } catch (e) {
            console.error(e.message);
        }
    };

    const handleSave = async (editedItem) => {
        setModalWindowEdit(false);
        setModalWindowCreate(false);
        try {
            await fetch(`http://192.168.1.100:8001/plan/${userId}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    plan_title: editedItem.title,
                    start_time: editedItem.startTime,
                    end_time: editedItem.endTime,
                    description: editedItem.description,
                    importance: 'low',
                    completed: false
                }),
            });
            fetchUserPlans(userId);
        } catch (e) {
            console.error(e.message);
        }
    };

    const handleItemPress = (item) => {
        setSelectedClass(item);
        setModalWindowEdit(true);
    };

    const handleCancel = () => {
        setModalWindowCreate(false);
    };

    const renderClassItem = ({ item }) => {
        const formatTime = (timeString) => {
            const time = new Date(timeString);
            const hours = time.getHours().toString().padStart(2, '0');
            const minutes = time.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        };


        return (
            <View style={styles.classItem}>
                <View style={styles.timelineContainer}>
                    <View style={styles.timelineDot} />
                    <View style={styles.timelineLine} />
                </View>

                <View style={styles.classContent}>
                    <View style={styles.classHours}>
                        <Text style={styles.startTime}>{formatTime(item.start_time)}</Text>
                        <Text style={styles.startTime}>{formatTime(item.end_time)}</Text>
                    </View>

                    <TouchableOpacity onPress={() => handleItemPress(item)}>
                        <View style={[styles.card, gStyle.smthOnOneLine, { width:'88%'}]}>
                            <View>
                                <Text style={styles.cardTitle}>{item.plan_title}</Text>
                                <Text style={styles.cardDate}>{item.importance}</Text>
                            </View>
                            <View>
                                <View style={styles.buttonsContainer}>
                                    <TouchableOpacity>
                                        <MaterialIcons
                                            name="delete"
                                            size={24}
                                            color="white"
                                            onPress={() => handleDelete(item.id)}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <Modal visible={modalWindowEdit} transparent={true} animationType="slide">
                            <View style={styles.modalContainer}>
                                <EditTodo item={selectedClass} onSave={handleEdit} />
                            </View>
                        </Modal>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
            <View style={[gStyle.container]}>
                <View style={gStyle.smthOnOneLine}>
                    <Text style={styles.title}>Today's  plans</Text>
                    <FontAwesome6 name="add" size={24} color="white" onPress={() => setModalWindowCreate(true)} />
                    <Modal visible={modalWindowCreate} transparent={true} animationType="slide">
                        <View style={styles.modalContainer}>
                            <AddTodo item onSave={handleSave} cancel={handleCancel} />
                        </View>
                    </Modal>
                </View>
                <Calendar/>
                <FlatList
                    contentContainerStyle={{ paddingHorizontal: 16 }}
                    data={todos}
                    renderItem={renderClassItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'poppins-b',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        marginLeft: 16,
        color: 'white'
    },
    card: {
        flex: 1,
        backgroundColor: '#282828',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        marginBottom: 16,
        padding: 16,
    },
    timelineContainer: {
        width: 30,
        alignItems: 'center',
    },
    timelineDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#ffffff',
        marginBottom: 8,
    },
    timelineLine: {
        flex: 1,
        width: 2,
        backgroundColor: '#ffffff',
    },
    classContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8,
    },
    classHours: {
        marginRight: 8,
        alignItems: 'flex-end',
    },
    startTime: {
        fontFamily: 'poppins',
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    endTime: {
        color: '#ffffff',
        fontSize: 16,
    },
    cardTitle: {
        fontSize: 16,
        color: '#ffffff',
        marginBottom: 4,
    },
    cardDate: {
        fontSize: 12,
        color: '#ffffff',
        marginBottom: 8,
    },
    classItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        padding: 8,
        backgroundColor: '#000000',
        borderRadius: 10,
        shadowColor: '#ffffff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    icon: {
        width: 24,
        height: 24,
        tintColor: '#fff',
        marginLeft: 8,
    },
});
