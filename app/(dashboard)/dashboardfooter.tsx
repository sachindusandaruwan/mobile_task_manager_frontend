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




// import React, { useEffect } from "react";
// import { View, Text, StyleSheet, FlatList } from "react-native";
// import { Calendar } from "react-native-calendars";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/store/store";
// import { getTasksByUserId } from "@/slice/taskSlice";
// import { Task } from "@/model/task";
//
// const DashboardLayout = () => {
//     const dispatch = useDispatch<AppDispatch>();
//
//     // ✅ Redux state
//     const tasks = useSelector((state: RootState) => state.tasks);
//     const { userId, jwtToken } = useSelector((state: RootState) => state.userReducer);
//
//     // ✅ Fetch tasks when component mounts
//     useEffect(() => {
//         if (userId && jwtToken) {
//             console.log("userId ", userId ,"  ", jwtToken);
//             dispatch(getTasksByUserId({ userId, jwtToken }));
//         }
//     }, [userId, jwtToken, dispatch]);
//
//     // ✅ Group tasks by date (YYYY-MM-DD from startDateTime)
//     const groupedTasks: Record<string, Task[]> = tasks.reduce((acc, task) => {
//         const date = task.startDateTime.split("T")[0];
//         if (!acc[date]) acc[date] = [];
//         acc[date].push(task);
//         return acc;
//     }, {} as Record<string, Task[]>);
//
//     // ✅ Mark calendar dates
//     const markedDates: Record<string, any> = Object.keys(groupedTasks).reduce((acc, date) => {
//         acc[date] = { marked: true, dotColor: "blue" };
//         return acc;
//     }, {} as Record<string, any>);
//
//     // ✅ Flatten tasks for FlatList
//     const allTasks = Object.entries(groupedTasks).flatMap(([date, taskList]) =>
//         taskList.map((task) => ({ ...task, date }))
//     );
//
//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>📌 My Tasks</Text>
//
//             {/* Calendar */}
//             <Calendar markedDates={markedDates} />
//
//             {/* All tasks */}
//             <View style={styles.tasksContainer}>
//                 <Text style={styles.tasksTitle}>All Tasks</Text>
//                 <FlatList
//                     data={allTasks}
//                     keyExtractor={(item) => item._id}
//                     renderItem={({ item }) => (
//                         <View style={styles.taskItem}>
//                             <Text style={styles.taskTitle}>{item.title}</Text>
//                             <Text style={styles.taskDate}>📅 {item.date}</Text>
//                             <Text style={styles.taskPlace}>📍 {item.place}</Text>
//                             <Text style={styles.taskStatus}>✅ {item.status}</Text>
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
//     taskPlace: { fontSize: 14, color: "black" },
//     taskStatus: { fontSize: 14, color: "green" },
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
//     const dispatch = useDispatch<AppDispatch>();
//
//     // ✅ Redux state
//     const tasks = useSelector((state: RootState) => state.tasks);
//     const { userId, jwtToken } = useSelector((state: RootState) => state.userReducer);
//
//     // ✅ State for selected date
//     const [selectedDate, setSelectedDate] = useState<string>("");
//
//     // ✅ Fetch tasks when component mounts
//     useEffect(() => {
//         if (userId && jwtToken) {
//             dispatch(getTasksByUserId({ userId, jwtToken }));
//         }
//     }, [userId, jwtToken, dispatch]);
//
//     // ✅ Group tasks by date
//     const groupedTasks: Record<string, Task[]> = tasks.reduce((acc, task) => {
//         const date = task.startDateTime.split("T")[0];
//         if (!acc[date]) acc[date] = [];
//         acc[date].push(task);
//         return acc;
//     }, {} as Record<string, Task[]>);
//
//     // ✅ Mark dates in calendar (highlight selected too)
//     const markedDates: Record<string, any> = Object.keys(groupedTasks).reduce((acc, date) => {
//         acc[date] = { marked: true, dotColor: "blue" };
//         return acc;
//     }, {} as Record<string, any>);
//
//     if (selectedDate) {
//         markedDates[selectedDate] = {
//             ...(markedDates[selectedDate] || {}),
//             selected: true,
//             selectedColor: "orange",
//         };
//     }
//
//     // ✅ Filter tasks for selected date
//     const filteredTasks = selectedDate ? groupedTasks[selectedDate] || [] : [];
//
//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>📌 My Tasks</Text>
//
//             {/* Calendar */}
//             <Calendar
//                 markedDates={markedDates}
//                 onDayPress={(day) => setSelectedDate(day.dateString)}
//             />
//
//             {/* Selected date tasks */}
//             <View style={styles.tasksContainer}>
//                 <Text style={styles.tasksTitle}>
//                     {selectedDate ? `Tasks for ${selectedDate}` : "Select a date"}
//                 </Text>
//
//                 <FlatList
//                     data={filteredTasks}
//                     keyExtractor={(item) => item._id}
//                     renderItem={({ item }) => (
//                         <View style={styles.taskItem}>
//                             <Text style={styles.taskTitle}>{item.title}</Text>
//                             <Text style={styles.taskDate}>📅 {item.startDateTime.split("T")[0]}</Text>
//                             <Text style={styles.taskPlace}>📍 {item.place}</Text>
//                             <Text style={styles.taskStatus}>✅ {item.status}</Text>
//
//                         </View>
//                     )}
//                     ListEmptyComponent={
//                         selectedDate ? (
//                             <Text style={{ textAlign: "center", marginTop: 20 }}>
//                                 No tasks on this day
//                             </Text>
//                         ) : null
//                     }
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
//     taskPlace: { fontSize: 14, color: "black" },
//     taskStatus: { fontSize: 14, color: "green" },
// });





// import { Task } from "@/model/task";
// import { getTasksByUserId } from "@/slice/taskSlice";
// import { AppDispatch, RootState } from "@/store/store";
// import { useRouter } from "expo-router"; // ✅ Import useRouter
// import React, { useEffect, useState } from "react";
// import {
//   FlatList,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { Calendar } from "react-native-calendars";
// import { useDispatch, useSelector } from "react-redux";
//
// const DashboardLayout = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const router = useRouter(); // ✅ Use router
//
//   const tasks = useSelector((state: RootState) => state.tasks);
//   const { userId, jwtToken } = useSelector(
//     (state: RootState) => state.userReducer
//   );
//
//   const [selectedDate, setSelectedDate] = useState<string>("");
//
//   useEffect(() => {
//     if (userId && jwtToken) {
//       console.log("Fetching tasks for userId:", userId);
//       dispatch(getTasksByUserId({ userId, jwtToken }));
//     }
//   }, [userId, jwtToken, dispatch]);
//
//   // Debug: Log tasks when they change
//   useEffect(() => {
//     console.log("Tasks updated:", tasks);
//     console.log("Tasks length:", tasks.length);
//     if (tasks.length > 0) {
//       console.log("First task:", tasks[0]);
//     }
//   }, [tasks]);
//
//   const groupedTasks: Record<string, Task[]> = tasks.reduce((acc, task) => {
//     // Add null check for startDateTime
//     if (!task.startDateTime) {
//       console.warn("Task missing startDateTime:", task);
//       return acc;
//     }
//     const date = task.startDateTime.split("T")[0];
//     if (!acc[date]) acc[date] = [];
//     acc[date].push(task);
//     return acc;
//   }, {} as Record<string, Task[]>);
//
//   const markedDates: Record<string, any> = Object.keys(groupedTasks).reduce(
//     (acc, date) => {
//       acc[date] = { marked: true, dotColor: "blue" };
//       return acc;
//     },
//     {} as Record<string, any>
//   );
//
//   if (selectedDate) {
//     markedDates[selectedDate] = {
//       ...(markedDates[selectedDate] || {}),
//       selected: true,
//       selectedColor: "orange",
//     };
//   }
//
//   const filteredTasks = selectedDate ? groupedTasks[selectedDate] || [] : [];
//
//   const formatTime = (dateTime: string) =>
//     new Date(dateTime).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>📌 My Tasks</Text>
//
//       {/* Add Task Button */}
//       <TouchableOpacity
//         style={styles.addButton}
//         onPress={() => router.push("/addPop")} // ✅ Open AddPop screen
//       >
//         <Text style={styles.addButtonText}>+ Add Task</Text>
//       </TouchableOpacity>
//
//       {/* Calendar */}
//       <Calendar
//         markedDates={markedDates}
//         onDayPress={(day) => setSelectedDate(day.dateString)}
//       />
//
//       {/* Selected date tasks */}
//       <View style={styles.tasksContainer}>
//         <Text style={styles.tasksTitle}>
//           {selectedDate ? `Tasks for ${selectedDate}` : "Select a date"}
//         </Text>
//
//         <FlatList
//           data={filteredTasks}
//           keyExtractor={(item) => item._id}
//           renderItem={({ item }) => (
//             <View style={styles.taskItem}>
//               <Text style={styles.taskTitle}>{item.title}</Text>
//               <Text style={styles.taskDate}>
//                 📅{" "}
//                 {item.startDateTime
//                   ? item.startDateTime.split("T")[0]
//                   : "No date"}
//               </Text>
//               <Text style={styles.taskTime}>
//                 ⏰{" "}
//                 {item.startDateTime
//                   ? formatTime(item.startDateTime)
//                   : "No start time"}{" "}
//                 -{" "}
//                 {item.endDateTime
//                   ? formatTime(item.endDateTime)
//                   : "No end time"}
//               </Text>
//               <Text style={styles.taskPlace}>
//                 📍 {item.place || "No location"}
//               </Text>
//               <Text style={styles.taskStatus}>
//                 ✅ {item.status || "No status"}
//               </Text>
//             </View>
//           )}
//           ListEmptyComponent={
//             selectedDate ? (
//               <Text style={{ textAlign: "center", marginTop: 20 }}>
//                 No tasks on this day
//               </Text>
//             ) : null
//           }
//         />
//       </View>
//     </View>
//   );
// };
//
// export default DashboardLayout;
//
// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#fff" },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 10,
//     textAlign: "center",
//   },
//   addButton: {
//     backgroundColor: "#007bff",
//     padding: 12,
//     borderRadius: 8,
//     alignItems: "center",
//     marginBottom: 15,
//   },
//   addButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   tasksContainer: { marginTop: 20, flex: 1 },
//   tasksTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
//   taskItem: {
//     backgroundColor: "#f0f0f0",
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 6,
//   },
//   taskTitle: { fontSize: 16, fontWeight: "600" },
//   taskDate: { fontSize: 14, color: "gray" },
//   taskTime: { fontSize: 14, color: "purple" },
//   taskPlace: { fontSize: 14, color: "black" },
//   taskStatus: { fontSize: 14, color: "green" },
// });



import { Task } from "@/model/task";
import { deleteTask, getTasksByUserId } from "@/slice/taskSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "expo-router"; // ✅ Import useRouter
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useDispatch, useSelector } from "react-redux";

const DashboardLayout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter(); // ✅ Use router

  const tasks = useSelector((state: RootState) => state.tasks);
  const { userId, jwtToken } = useSelector(
      (state: RootState) => state.userReducer
  );

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    if (userId && jwtToken) {
      console.log("Fetching tasks for userId:", userId);
      dispatch(getTasksByUserId({ userId, jwtToken }));
    }
  }, [userId, jwtToken, dispatch]);

  // Debug: Log tasks when they change
  useEffect(() => {
    console.log("Tasks updated:", tasks);
    console.log("Tasks length:", tasks.length);
    if (tasks.length > 0) {
      console.log("First task:", tasks[0]);
    }
  }, [tasks]);

  const groupedTasks: Record<string, Task[]> = tasks.reduce((acc, task) => {
    // Add null check for startDateTime
    if (!task.startDateTime) {
      console.warn("Task missing startDateTime:", task);
      return acc;
    }
    const date = task.startDateTime.split("T")[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  const markedDates: Record<string, any> = Object.keys(groupedTasks).reduce(
      (acc, date) => {
        acc[date] = { marked: true, dotColor: "blue" };
        return acc;
      },
      {} as Record<string, any>
  );

  if (selectedDate) {
    markedDates[selectedDate] = {
      ...(markedDates[selectedDate] || {}),
      selected: true,
      selectedColor: "orange",
    };
  }

  const filteredTasks = selectedDate ? groupedTasks[selectedDate] || [] : [];

  const formatTime = (dateTime: string) =>
      new Date(dateTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

  // Handle task selection
  const handleTaskPress = (task: Task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTask(null);
  };

  // Handle update task
  const handleUpdateTask = () => {
    if (selectedTask && jwtToken) {
      Alert.alert("Update Task", "Do you want to update this task?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Update",
          onPress: async () => {
            try {
              setShowModal(false);
              // For now, we'll navigate to the update screen
              // You can modify this to show an inline update form if needed
              router.push({
                pathname: "/(pops)/updateDeletePop",
                params: { taskId: selectedTask._id, mode: "update" },
              });
            } catch (error) {
              console.error("Error updating task:", error);
              Alert.alert("Error", "Failed to update task");
            }
          },
        },
      ]);
    }
  };

  // Handle delete task
  const handleDeleteTask = () => {
    if (selectedTask && jwtToken) {
      Alert.alert(
          "Delete Task",
          `Are you sure you want to delete "${selectedTask.title}"?`,
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Delete",
              style: "destructive",
              onPress: async () => {
                try {
                  setShowModal(false);
                  await dispatch(deleteTask({ _id: selectedTask._id, jwtToken }));
                  Alert.alert("Success", "Task deleted successfully");
                } catch (error) {
                  console.error("Error deleting task:", error);
                  Alert.alert("Error", "Failed to delete task");
                }
              },
            },
          ]
      );
    }
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>📌 My Tasks</Text>

        {/* Add Task Button */}
        <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push("/addPop")} // ✅ Open AddPop screen
        >
          <Text style={styles.addButtonText}>+ Add Task</Text>
        </TouchableOpacity>

        {/* Calendar */}
        <Calendar
            markedDates={markedDates}
            onDayPress={(day) => setSelectedDate(day.dateString)}
        />

        {/* Selected date tasks */}
        <View style={styles.tasksContainer}>
          <Text style={styles.tasksTitle}>
            {selectedDate ? `Tasks for ${selectedDate}` : "Select a date"}
          </Text>

          <FlatList
              data={filteredTasks}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                  <TouchableOpacity
                      style={styles.taskItem}
                      onPress={() => handleTaskPress(item)}
                  >
                    <Text style={styles.taskTitle}>{item.title}</Text>
                    <Text style={styles.taskDate}>
                      📅{" "}
                      {item.startDateTime
                          ? item.startDateTime.split("T")[0]
                          : "No date"}
                    </Text>
                    <Text style={styles.taskTime}>
                      ⏰{" "}
                      {item.startDateTime
                          ? formatTime(item.startDateTime)
                          : "No start time"}{" "}
                      -{" "}
                      {item.endDateTime
                          ? formatTime(item.endDateTime)
                          : "No end time"}
                    </Text>
                    <Text style={styles.taskPlace}>
                      📍 {item.place || "No location"}
                    </Text>
                    <Text style={styles.taskStatus}>
                      ✅ {item.status || "No status"}
                    </Text>
                  </TouchableOpacity>
              )}
              ListEmptyComponent={
                selectedDate ? (
                    <Text style={{ textAlign: "center", marginTop: 20 }}>
                      No tasks on this day
                    </Text>
                ) : null
              }
          />
        </View>

        {/* Task Details Modal */}
        <Modal
            visible={showModal}
            transparent={true}
            animationType="fade"
            onRequestClose={handleCloseModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Task Details</Text>

              {selectedTask && (
                  <>
                    <View style={styles.modalTaskInfo}>
                      <Text style={styles.modalTaskTitle}>
                        {selectedTask.title}
                      </Text>
                      <Text style={styles.modalTaskDate}>
                        📅{" "}
                        {selectedTask.startDateTime
                            ? selectedTask.startDateTime.split("T")[0]
                            : "No date"}
                      </Text>
                      <Text style={styles.modalTaskTime}>
                        ⏰{" "}
                        {selectedTask.startDateTime
                            ? formatTime(selectedTask.startDateTime)
                            : "No start time"}{" "}
                        -{" "}
                        {selectedTask.endDateTime
                            ? formatTime(selectedTask.endDateTime)
                            : "No end time"}
                      </Text>
                      <Text style={styles.modalTaskPlace}>
                        📍 {selectedTask.place || "No location"}
                      </Text>
                      <Text style={styles.modalTaskStatus}>
                        ✅ {selectedTask.status || "No status"}
                      </Text>
                    </View>

                    <View style={styles.modalButtons}>
                      <TouchableOpacity
                          style={[styles.modalButton, styles.updateButton]}
                          onPress={handleUpdateTask}
                      >
                        <Text style={styles.updateButtonText}>✏️ Update</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                          style={[styles.modalButton, styles.deleteButton]}
                          onPress={handleDeleteTask}
                      >
                        <Text style={styles.deleteButtonText}>🗑️ Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </>
              )}

              <TouchableOpacity
                  style={styles.closeButton}
                  onPress={handleCloseModal}
              >
                <Text style={styles.closeButtonText}>✕ Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
  );
};

export default DashboardLayout;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
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
  taskTime: { fontSize: 14, color: "purple" },
  taskPlace: { fontSize: 14, color: "black" },
  taskStatus: { fontSize: 14, color: "green" },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    margin: 20,
    minWidth: 300,
    maxWidth: 350,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#333",
  },
  modalTaskInfo: {
    marginBottom: 20,
  },
  modalTaskTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  modalTaskDate: { fontSize: 14, color: "gray", marginBottom: 5 },
  modalTaskTime: { fontSize: 14, color: "purple", marginBottom: 5 },
  modalTaskPlace: { fontSize: 14, color: "black", marginBottom: 5 },
  modalTaskStatus: { fontSize: 14, color: "green", marginBottom: 5 },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: "center",
  },
  updateButton: {
    backgroundColor: "#007bff",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#6c757d",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
