import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Modal,
    TextInput,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { gStyle } from "../styles/style";
import { EditTodo } from "../components/EditTodo";
import { AddTodo } from "../components/AddTodo";
import { getUserId } from "../functions/getUserId";
import { getUsersPlans } from "../functions/getUsersPlans";

export const Search = () => {
    const [todos, setTodos] = useState([]);
    const [userId, setUserId] = useState('');
    const [modalWindowEdit, setModalWindowEdit] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);
    const [modalWindowCreate, setModalWindowCreate] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

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
            const plans = await getUsersPlans(userId);
            setTodos(plans);
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
            // Refresh the list after deletion
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

    const handleItemPress = (item) => {
        setSelectedClass(item);
        setModalWindowEdit(true);
    };

    const handleCancel = () => {
        setModalWindowCreate(false);
    };

    const renderClassItem = ({ item }) => {
        const formatTime = (timeString, isStart) => {
            const time = new Date(timeString);
            const day = time.getDate().toString().padStart(2, '0');
            const month = (time.getMonth() + 1).toString().padStart(2, '0');
            const year = time.getFullYear().toString().substr(-2); // Останні дві цифри року

            if (isStart) {
                return `${day}/${month}/${year}`;
            } else {
                return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            }
        };


        return (
            <View style={styles.classItem}>
                <View style={styles.timelineContainer}>
                    <View style={styles.timelineDot} />
                    <View style={styles.timelineLine} />
                </View>

                <View style={styles.classContent}>
                    <View style={styles.classHours}>
                        <Text style={styles.startTime}>{formatTime(item.start_time, true)}</Text>
                        <Text style={styles.startTime}>{formatTime(item.start_time, false)}</Text>
                        <Text style={styles.startTime}>{formatTime(item.end_time, false)}</Text>
                    </View>

                    <TouchableOpacity onPress={() => handleItemPress(item)}>
                        <View style={[styles.card, gStyle.smthOnOneLine, { width:'83%'}]}>

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

    const filteredTodos = todos.filter(todo =>
        todo.plan_title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={gStyle.container}>
            <View style={gStyle.smthOnOneLine}>
                <TextInput
                    style={[styles.searchInput, gStyle.placeHolderText]}
                    placeholder="Search..."
                    placeholderTextColor="#aaa"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <FontAwesome6 name="add" size={24} color="white" onPress={() => setModalWindowCreate(true)} />
                <Modal visible={modalWindowCreate} transparent={true} animationType="slide">
                    <View style={styles.modalContainer}>
                        <AddTodo item onSave={handleSave} cancel={handleCancel} />
                    </View>
                </Modal>
            </View>
            <FlatList
                contentContainerStyle={{ paddingHorizontal: 16 }}
                data={filteredTodos}
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
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        marginLeft: 16,
        color: 'white'
    },
    searchInput: {
        backgroundColor: '#333',
        borderRadius: 10,
        color: 'white',
        paddingHorizontal: 16,
        paddingVertical: 8,
        flex: 1,
        marginRight: 8,
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

