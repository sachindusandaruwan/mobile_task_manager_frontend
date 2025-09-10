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
//


// import React, {useEffect, useState} from "react";
// import { View, Text, StyleSheet, FlatList } from "react-native";
// import { Calendar } from "react-native-calendars";
// import {Task} from "@/model/task";
// import {state} from "sucrase/dist/types/parser/traverser/base";
// import {AppDispatch, RootState} from "@/store/store";
// import {useDispatch, useSelector} from "react-redux";
// import {getTasksByUserId} from "@/slice/taskSlice";
//
// const DashboardLayout = () => {
//     // State for selected date
//     const [selectedDate, setSelectedDate] = useState("2025-09-08");
//
//
//     const tasks : Task[]=useSelector((state : RootState)=>state.tasks);
//     const userId=useSelector((state:RootState)=>state.userReducer.userId);
//     const jwtToken=useSelector((state:RootState)=>state.userReducer.jwtToken);
//     const[selectedTask, setSelectedTask] = useState<Task | null>(null);
//     const dispatch = useDispatch<AppDispatch>();
//
//     useEffect(() => {
//         if (userId && jwtToken) {
//             dispatch(getTasksByUserId({ userId, jwtToken })); // Pass parameters correctly
//         }
//     }, [userId, jwtToken, dispatch]);
//
//     // Map the tasks to the format required by react-big-calendar
//     const events = tasks.map((task) => ({
//         title: task.title,
//         start: new Date(task.startDateTime), // Ensure this is a Date object
//         end: new Date(task.endDateTime),     // Ensure this is a Date object
//         status: task.status,
//         place: task.place,
//         taskObject: task // Store the full task object for reference
//     }));
//
//     // Function to handle task click and open update popup
//     const handleEventClick = (event: any) => {
//         setSelectedTask(event.taskObject);
//     };
//
//
//
//     // Hardcoded tasks
//     const tasks: Record<string, { id: string; title: string }[]> = {
//         "2025-09-08": [
//             { id: "1", title: "Meeting with Boss" },
//             { id: "2", title: "Call Client" },
//         ],
//         "2025-09-10": [
//             { id: "3", title: "Project Review" },
//         ],
//     };
//
//     // Marked dates
//     const markedDates: any = {
//         "2025-09-08": { marked: true, dotColor: "blue" },
//         "2025-09-10": { marked: true, dotColor: "blue" },
//         [selectedDate]: { selected: true, selectedColor: "#00adf5" }, // highlight the chosen date
//     };
//
//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Dashboard</Text>
//
//             {/* Calendar */}
//             <Calendar
//                 markedDates={markedDates}
//                 onDayPress={handleEventClick}
//             />
//
//             {/* Tasks for selected date */}
//             <View style={styles.tasksContainer}>
//                 <Text style={styles.tasksTitle}>Tasks for {selectedDate}</Text>
//                 {tasks[selectedDate] ? (
//                     <FlatList
//                         data={tasks[selectedDate]}
//                         keyExtractor={(item) => item.id}
//                         renderItem={({ item }) => (
//                             <View style={styles.taskItem}>
//                                 <Text>{item.title}</Text>
//                             </View>
//                         )}
//                     />
//                 ) : (
//                     <Text style={{ color: "gray" }}>No tasks for this date</Text>
//                 )}
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




// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, FlatList } from "react-native";
// import { Calendar } from "react-native-calendars";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/store/store";
// import { getTasksByUserId } from "@/slice/taskSlice";
// import { Task } from "@/model/task";
//
// const DashboardLayout = () => {
//     // selected date
//     const [selectedDate, setSelectedDate] = useState("2025-09-08");
//
//     // redux state
//     const tasks: Task[] = useSelector((state: RootState) => state.tasks);
//     const userId = useSelector((state: RootState) => state.userReducer.userId);
//     const jwtToken = useSelector((state: RootState) => state.userReducer.jwtToken);
//
//     const dispatch = useDispatch<AppDispatch>();
//
//     // load tasks when userId + token available
//     useEffect(() => {
//         console.log(userId , "and " , jwtToken);
//         if (userId && jwtToken) {
//             dispatch(getTasksByUserId({ userId, jwtToken }));
//         }
//     }, [userId, jwtToken, dispatch]);
//
//     // 🔹 Convert tasks to calendar format
//     const markedDates: Record<string, any> = tasks.reduce((acc, task) => {
//         const dateKey = task.startDateTime.split("T")[0]; // extract YYYY-MM-DD
//         acc[dateKey] = {
//             ...(acc[dateKey] || {}),
//             marked: true,
//             dotColor: "blue",
//         };
//         return acc;
//     }, {} as Record<string, any>);
//
//     // highlight the selected date
//     markedDates[selectedDate] = {
//         ...(markedDates[selectedDate] || {}),
//         selected: true,
//         selectedColor: "#00adf5",
//     };
//
//     // 🔹 Filter tasks for selected date
//     const tasksForDate = tasks.filter(
//         (task) => task.startDateTime.split("T")[0] === selectedDate
//     );
//
//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Dashboard</Text>
//
//             {/* Calendar */}
//             <Calendar
//                 markedDates={markedDates}
//                 onDayPress={(day) => setSelectedDate(day.dateString)}
//             />
//
//             {/* Tasks list */}
//             <View style={styles.tasksContainer}>
//                 <Text style={styles.tasksTitle}>Tasks for {selectedDate}</Text>
//                 {tasksForDate.length > 0 ? (
//                     <FlatList
//                         data={tasksForDate}
//                         keyExtractor={(item) => item._id}
//                         renderItem={({ item }) => (
//                             <View style={styles.taskItem}>
//                                 <Text style={styles.taskTitle}>{item.title}</Text>
//                                 <Text>{item.place}</Text>
//                                 <Text>Status: {item.status}</Text>
//                             </View>
//                         )}
//                     />
//                 ) : (
//                     <Text style={{ color: "gray" }}>No tasks for this date</Text>
//                 )}
//             </View>
//         </View>
//     );
// };
//
// export default DashboardLayout;
//
// const styles = StyleSheet.create({
//     container: { flex: 1, padding: 20, backgroundColor: "#fff" },
//     title: {
//         fontSize: 24,
//         fontWeight: "bold",
//         marginBottom: 20,
//         textAlign: "center",
//     },
//     tasksContainer: { marginTop: 20 },
//     tasksTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
//     taskItem: {
//         backgroundColor: "#f0f0f0",
//         padding: 10,
//         marginBottom: 10,
//         borderRadius: 6,
//     },
//     taskTitle: { fontSize: 16, fontWeight: "600" },
// });



// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, FlatList } from "react-native";
// import { Calendar } from "react-native-calendars";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/store/store";
// import { getTasksByUserId } from "@/slice/taskSlice";
// import { Task } from "@/model/task";
//
// const DashboardLayout = () => {
//     const [selectedDate, setSelectedDate] = useState<string>("");
//
//     const tasks: Task[] = useSelector((state: RootState) => state.tasks);
//     const userId = useSelector((state: RootState) => state.userReducer.userId);
//     const jwtToken = useSelector((state: RootState) => state.userReducer.jwtToken);
//
//     const dispatch = useDispatch<AppDispatch>();
//
//     // 🔹 Fetch tasks for user once
//     useEffect(() => {
//         console.log(userId,"          ", jwtToken);
//         if (userId && jwtToken) {
//             dispatch(getTasksByUserId({ userId, jwtToken }));
//         }
//     }, [userId, jwtToken, dispatch]);
//
//     // 🔹 Normalize date to YYYY-MM-DD (local time)
//     const formatDate = (dateString: string) => {
//         const date = new Date(dateString);
//         return date.toISOString().split("T")[0];
//     };
//
//     // 🔹 Mark dates on calendar
//     const markedDates: Record<string, any> = tasks.reduce((acc, task) => {
//         const dateKey = formatDate(task.startDateTime);
//         acc[dateKey] = {
//             ...(acc[dateKey] || {}),
//             marked: true,
//             dotColor: "blue",
//         };
//         return acc;
//     }, {} as Record<string, any>);
//
//     // 🔹 Highlight selected date
//     if (selectedDate) {
//         markedDates[selectedDate] = {
//             ...(markedDates[selectedDate] || {}),
//             selected: true,
//             selectedColor: "#00adf5",
//         };
//     }
//
//     // 🔹 Tasks for the selected date
//     const tasksForDate = selectedDate
//         ? tasks.filter((task) => formatDate(task.startDateTime) === selectedDate)
//         : [];
//
//     // 🔹 Debugging log
//     useEffect(() => {
//         console.log("All tasks:", tasks);
//         console.log("Selected date:", selectedDate);
//         console.log("Tasks for selected date:", tasksForDate);
//     }, [tasks, selectedDate]);
//
//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Dashboard</Text>
//
//             {/* Calendar */}
//             <Calendar
//                 markedDates={markedDates}
//                 onDayPress={(day) => setSelectedDate(day.dateString)} // <-- tap date
//             />
//
//             {/* Task List */}
//             <View style={styles.tasksContainer}>
//                 <Text style={styles.tasksTitle}>
//                     {selectedDate ? `Tasks for ${selectedDate}` : "Select a date"}
//                 </Text>
//
//                 {tasksForDate.length > 0 ? (
//                     <FlatList
//                         data={tasksForDate}
//                         keyExtractor={(item) => item._id}
//                         renderItem={({ item }) => (
//                             <View style={styles.taskItem}>
//                                 <Text style={styles.taskTitle}>{item.title}</Text>
//                                 <Text>Place: {item.place}</Text>
//                                 <Text>Status: {item.status}</Text>
//                                 <Text>
//                                     {new Date(item.startDateTime).toLocaleTimeString()} -{" "}
//                                     {new Date(item.endDateTime).toLocaleTimeString()}
//                                 </Text>
//                             </View>
//                         )}
//                     />
//                 ) : (
//                     <Text style={{ color: "gray" }}>
//                         {selectedDate ? "No tasks for this date" : "Tap a date to see tasks"}
//                     </Text>
//                 )}
//             </View>
//         </View>
//     );
// };
//
// export default DashboardLayout;
//
// const styles = StyleSheet.create({
//     container: { flex: 1, padding: 20, backgroundColor: "#fff" },
//     title: {
//         fontSize: 24,
//         fontWeight: "bold",
//         marginBottom: 20,
//         textAlign: "center",
//     },
//     tasksContainer: { marginTop: 20 },
//     tasksTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
//     taskItem: {
//         backgroundColor: "#f0f0f0",
//         padding: 10,
//         marginBottom: 10,
//         borderRadius: 6,
//     },
//     taskTitle: { fontSize: 16, fontWeight: "600" },
// });
//




// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, FlatList } from "react-native";
// import { Calendar } from "react-native-calendars";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/store/store";
// import { getTasksByUserId } from "@/slice/taskSlice";
// import { Task } from "@/model/task";
//
// const DashboardLayout = () => {
//     const [selectedDate, setSelectedDate] = useState<string>("");
//
//     const tasks: Task[] = useSelector((state: RootState) => state.tasks);
//     const userId = useSelector((state: RootState) => state.userReducer.userId);
//     const jwtToken = useSelector((state: RootState) => state.userReducer.jwtToken);
//
//     const dispatch = useDispatch<AppDispatch>();
//
//     // ✅ Load ALL tasks for the logged-in user (only once)
//     useEffect(() => {
//         if (userId && jwtToken) {
//             dispatch(getTasksByUserId({ userId, jwtToken }));
//         }
//     }, [userId, jwtToken, dispatch]);
//
//     // ✅ Format date to YYYY-MM-DD (for filtering & calendar)
//     const formatDate = (dateString: string) => {
//         return new Date(dateString).toISOString().split("T")[0];
//     };
//
//     // ✅ Mark task dates on the calendar
//     const markedDates: Record<string, any> = tasks.reduce((acc, task) => {
//         const dateKey = formatDate(task.startDateTime);
//         acc[dateKey] = {
//             ...(acc[dateKey] || {}),
//             marked: true,
//             dotColor: "blue",
//         };
//         return acc;
//     }, {} as Record<string, any>);
//
//     // ✅ Highlight selected date
//     if (selectedDate) {
//         markedDates[selectedDate] = {
//             ...(markedDates[selectedDate] || {}),
//             selected: true,
//             selectedColor: "#00adf5",
//         };
//     }
//
//     // ✅ Filter tasks for the selected date
//     const tasksForDate = selectedDate
//         ? tasks.filter((task) => formatDate(task.startDateTime) === selectedDate)
//         : [];
//
//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Dashboard</Text>
//
//             {/* Calendar */}
//             <Calendar
//                 markedDates={markedDates}
//                 onDayPress={(day) => setSelectedDate(day.dateString)}
//             />
//
//             {/* Task List */}
//             <View style={styles.tasksContainer}>
//                 <Text style={styles.tasksTitle}>
//                     {selectedDate ? `Tasks for ${selectedDate}` : "Select a date"}
//                 </Text>
//
//                 {tasksForDate.length > 0 ? (
//                     <FlatList
//                         data={tasksForDate}
//                         keyExtractor={(item) => item._id}
//                         renderItem={({ item }) => (
//                             <View style={styles.taskItem}>
//                                 <Text style={styles.taskTitle}>{item.title}</Text>
//                                 <Text>📍 {item.place}</Text>
//                                 <Text>Status: {item.status}</Text>
//                                 <Text>
//                                     {new Date(item.startDateTime).toLocaleTimeString()} -{" "}
//                                     {new Date(item.endDateTime).toLocaleTimeString()}
//                                 </Text>
//                             </View>
//                         )}
//                     />
//                 ) : (
//                     <Text style={{ color: "gray", marginTop: 10 }}>
//                         {selectedDate
//                             ? "No tasks for this date"
//                             : "Tap a date to see tasks"}
//                     </Text>
//                 )}
//             </View>
//         </View>
//     );
// };
//
// export default DashboardLayout;
//
// const styles = StyleSheet.create({
//     container: { flex: 1, padding: 20, backgroundColor: "#fff" },
//     title: {
//         fontSize: 24,
//         fontWeight: "bold",
//         marginBottom: 20,
//         textAlign: "center",
//     },
//     tasksContainer: { marginTop: 20, flex: 1 },
//     tasksTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
//     taskItem: {
//         backgroundColor: "#f0f0f0",
//         padding: 12,
//         marginBottom: 10,
//         borderRadius: 8,
//     },
//     taskTitle: { fontSize: 16, fontWeight: "600" },
// });




// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, FlatList } from "react-native";
// import { Calendar } from "react-native-calendars";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/store/store";
// import { getTasksByUserId } from "@/slice/taskSlice";
// import { Task } from "@/model/task";
//
// const DashboardLayout = () => {
//     const [selectedDate, setSelectedDate] = useState<string>("");
//
//     const tasks: Task[] = useSelector((state: RootState) => state.tasks);
//     const userId = useSelector((state: RootState) => state.userReducer.userId);
//     const jwtToken = useSelector((state: RootState) => state.userReducer.jwtToken);
//
//     const dispatch = useDispatch<AppDispatch>();
//
//     // ✅ Load ALL tasks for the logged-in user
//     useEffect(() => {
//         if (userId && jwtToken) {
//             dispatch(getTasksByUserId({ userId, jwtToken }));
//         }
//     }, [userId, jwtToken, dispatch]);
//
//     // ✅ Format date to YYYY-MM-DD
//     const formatDate = (dateString: string) => {
//         return new Date(dateString).toISOString().split("T")[0];
//     };
//
//     // ✅ Mark task dates on the calendar
//     const markedDates: Record<string, any> = tasks.reduce((acc, task) => {
//         const dateKey = formatDate(task.startDateTime);
//         acc[dateKey] = {
//             ...(acc[dateKey] || {}),
//             marked: true,
//             dotColor: "blue",
//         };
//         return acc;
//     }, {} as Record<string, any>);
//
//     // ✅ Highlight selected date (optional)
//     if (selectedDate) {
//         markedDates[selectedDate] = {
//             ...(markedDates[selectedDate] || {}),
//             selected: true,
//             selectedColor: "#00adf5",
//             marked: true,
//             dotColor: "blue",
//         };
//     }
//
//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Dashboard</Text>
//
//             {/* Calendar */}
//             <Calendar
//                 markedDates={markedDates}
//                 onDayPress={(day) => setSelectedDate(day.dateString)}
//             />
//
//             {/* Task List - Always ALL tasks */}
//             <View style={styles.tasksContainer}>
//                 <Text style={styles.tasksTitle}>All Tasks</Text>
//
//                 {tasks.length > 0 ? (
//                     <FlatList
//                         data={tasks}
//                         keyExtractor={(item) => item._id}
//                         renderItem={({ item }) => (
//                             <View style={styles.taskItem}>
//                                 <Text style={styles.taskTitle}>{item.title}</Text>
//                                 <Text>📍 {item.place}</Text>
//                                 <Text>Status: {item.status}</Text>
//                                 <Text>
//                                     {new Date(item.startDateTime).toLocaleTimeString()} -{" "}
//                                     {new Date(item.endDateTime).toLocaleTimeString()}
//                                 </Text>
//                             </View>
//                         )}
//                     />
//                 ) : (
//                     <Text style={{ color: "gray", marginTop: 10 }}>
//                         No tasks available
//                     </Text>
//                 )}
//             </View>
//         </View>
//     );
// };
//




// export default DashboardLayout;
//
// const styles = StyleSheet.create({
//     container: { flex: 1, padding: 20, backgroundColor: "#fff" },
//     title: {
//         fontSize: 24,
//         fontWeight: "bold",
//         marginBottom: 20,
//         textAlign: "center",
//     },
//     tasksContainer: { marginTop: 20, flex: 1 },
//     tasksTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
//     taskItem: {
//         backgroundColor: "#f0f0f0",
//         padding: 12,
//         marginBottom: 10,
//         borderRadius: 8,
//     },
//     taskTitle: { fontSize: 16, fontWeight: "600" },
// });


// import React from "react";
// import { View, Text, StyleSheet, FlatList } from "react-native";
// import { Calendar } from "react-native-calendars";
//
// const DashboardLayout = () => {
//     // Hardcoded tasks (grouped by date)
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
//     // Mark the dates with tasks
//     const markedDates: any = Object.keys(tasks).reduce((acc, date) => {
//         acc[date] = { marked: true, dotColor: "blue" };
//         return acc;
//     }, {} as Record<string, any>);
//
//     // Flatten tasks into an array with date included
//     const allTasks = Object.entries(tasks).flatMap(([date, taskList]) =>
//         taskList.map((task) => ({ ...task, date }))
//     );
//
//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>awa magula</Text>
//
//             {/* Calendar */}
//             <Calendar markedDates={markedDates} />
//
//             {/* All tasks list */}
//             <View style={styles.tasksContainer}>
//                 <Text style={styles.tasksTitle}>All Tasks</Text>
//                 <FlatList
//                     data={allTasks}
//                     keyExtractor={(item) => item.id}
//                     renderItem={({ item }) => (
//                         <View style={styles.taskItem}>
//                             <Text style={styles.taskTitle}>{item.title}</Text>
//                             <Text style={styles.taskDate}>📅 {item.date}</Text>
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
//     tasksContainer: { marginTop: 20, flex: 1 },
//     tasksTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
//     taskItem: {
//         backgroundColor: "#f0f0f0",
//         padding: 10,
//         marginBottom: 10,
//         borderRadius: 6,
//     },
//     taskTitle: { fontSize: 16, fontWeight: "600" },
//     taskDate: { fontSize: 14, color: "gray" },
// });
//
//




import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Calendar } from "react-native-calendars";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getTasksByUserId } from "@/slice/taskSlice";
import { Task } from "@/model/task";

const DashboardLayout = () => {
    const dispatch = useDispatch<AppDispatch>();

    // ✅ Redux state
    const tasks = useSelector((state: RootState) => state.tasks);
    const { userId, jwtToken } = useSelector((state: RootState) => state.userReducer);

    // ✅ Fetch tasks when component mounts
    useEffect(() => {
        if (userId && jwtToken) {
            console.log("userId ", userId ,"  ", jwtToken);
            dispatch(getTasksByUserId({ userId, jwtToken }));
        }
    }, [userId, jwtToken, dispatch]);

    // ✅ Group tasks by date (YYYY-MM-DD from startDateTime)
    const groupedTasks: Record<string, Task[]> = tasks.reduce((acc, task) => {
        const date = task.startDateTime.split("T")[0];
        if (!acc[date]) acc[date] = [];
        acc[date].push(task);
        return acc;
    }, {} as Record<string, Task[]>);

    // ✅ Mark calendar dates
    const markedDates: Record<string, any> = Object.keys(groupedTasks).reduce((acc, date) => {
        acc[date] = { marked: true, dotColor: "blue" };
        return acc;
    }, {} as Record<string, any>);

    // ✅ Flatten tasks for FlatList
    const allTasks = Object.entries(groupedTasks).flatMap(([date, taskList]) =>
        taskList.map((task) => ({ ...task, date }))
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>📌 My Tasks</Text>

            {/* Calendar */}
            <Calendar markedDates={markedDates} />

            {/* All tasks */}
            <View style={styles.tasksContainer}>
                <Text style={styles.tasksTitle}>All Tasks</Text>
                <FlatList
                    data={allTasks}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <View style={styles.taskItem}>
                            <Text style={styles.taskTitle}>{item.title}</Text>
                            <Text style={styles.taskDate}>📅 {item.date}</Text>
                            <Text style={styles.taskPlace}>📍 {item.place}</Text>
                            <Text style={styles.taskStatus}>✅ {item.status}</Text>
                        </View>
                    )}
                />
            </View>
        </View>
    );
};

export default DashboardLayout;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
    tasksContainer: { marginTop: 20, flex: 1 },
    tasksTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
    taskItem: {
        backgroundColor: "#f0f0f0",
        padding: 10,
        marginBottom: 10,
        borderRadius: 6,
    },
    taskTitle: { fontSize: 16, fontWeight: "600" },
    taskDate: { fontSize: 14, color: "gray" },
    taskPlace: { fontSize: 14, color: "black" },
    taskStatus: { fontSize: 14, color: "green" },
});
