// import React from "react";
// import { View, Text, StyleSheet, FlatList } from "react-native";
// import { Calendar } from "react-native-calendars";
//
// const DashboardLayout = () => {
//     // Hardcoded selected date
//     const selectedDate = "2025-09-08";
//
//     // Hardcoded tasks
//     const tasks = {
//         "2025-09-08": [
//             { id: "1", title: "Meeting with Boss" },
//             { id: "2", title: "Call Client" },
//         ],
//         "2025-09-10": [
//             { id: "3", title: "Project Review" },
//         ],
//     };
//
//     // Mark the dates
//     const markedDates: any = {
//         "2025-09-08": { marked: true, dotColor: "blue", selected: true, selectedColor: "#00adf5" },
//         "2025-09-10": { marked: true, dotColor: "blue" },
//     };
//
//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>awa magula</Text>
//
//             {/* Calendar */}
//             <Calendar markedDates={markedDates} />
//
//             {/* Tasks for selected date */}
//             <View style={styles.tasksContainer}>
//                 <Text style={styles.tasksTitle}>Tasks for {selectedDate}</Text>
//                 <FlatList
//                     data={tasks[selectedDate]}
//                     keyExtractor={(item) => item.id}
//                     renderItem={({ item }) => (
//                         <View style={styles.taskItem}>
//                             <Text>{item.title}</Text>
//                         </View>
//                     )}
//                 />
//             </View>
//         </View>
//     );
// };
//
// export default DashboardLayout;
//
// const styles = StyleSheet.create({
//     container: { flex: 1, padding: 20, backgroundColor: "#fff" },
//     title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
//     tasksContainer: { marginTop: 20 },
//     tasksTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
//     taskItem: {
//         backgroundColor: "#f0f0f0",
//         padding: 10,
//         marginBottom: 10,
//         borderRadius: 6,
//     },
// });



import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Calendar } from "react-native-calendars";

const DashboardLayout = () => {
    // State for selected date
    const [selectedDate, setSelectedDate] = useState("2025-09-08");

    // Hardcoded tasks
    const tasks: Record<string, { id: string; title: string }[]> = {
        "2025-09-08": [
            { id: "1", title: "Meeting with Boss" },
            { id: "2", title: "Call Client" },
        ],
        "2025-09-10": [
            { id: "3", title: "Project Review" },
        ],
    };

    // Marked dates
    const markedDates: any = {
        "2025-09-08": { marked: true, dotColor: "blue" },
        "2025-09-10": { marked: true, dotColor: "blue" },
        [selectedDate]: { selected: true, selectedColor: "#00adf5" }, // highlight the chosen date
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dashboard</Text>

            {/* Calendar */}
            <Calendar
                markedDates={markedDates}
                onDayPress={(day) => {
                    setSelectedDate(day.dateString);
                }}
            />

            {/* Tasks for selected date */}
            <View style={styles.tasksContainer}>
                <Text style={styles.tasksTitle}>Tasks for {selectedDate}</Text>
                {tasks[selectedDate] ? (
                    <FlatList
                        data={tasks[selectedDate]}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.taskItem}>
                                <Text>{item.title}</Text>
                            </View>
                        )}
                    />
                ) : (
                    <Text style={{ color: "gray" }}>No tasks for this date</Text>
                )}
            </View>
        </View>
    );
};

export default DashboardLayout;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
    tasksContainer: { marginTop: 20 },
    tasksTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
    taskItem: {
        backgroundColor: "#f0f0f0",
        padding: 10,
        marginBottom: 10,
        borderRadius: 6,
    },
});
