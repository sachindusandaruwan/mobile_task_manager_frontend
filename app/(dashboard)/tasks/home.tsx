import React, { useState } from "react";
import { View, Text, Button } from "react-native";

const Dashboard: React.FC = () => {
    const [count, setCount] = useState(0); // state define

    return (
        <View>
            <Text>Count: {count}</Text>
            <Button title="Increase" onPress={() => setCount(count + 1)} />
        </View>
    );
};
export default Dashboard;
