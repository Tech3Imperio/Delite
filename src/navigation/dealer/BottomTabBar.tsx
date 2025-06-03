import { View } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Box } from '@tamagui/lucide-icons';


export const BottomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
    const { colors } = useTheme();
    const { buildHref } = useLinkBuilder();
    console.log("State", state)
    console.log("Descriptors", descriptors)
    console.log("navigation", navigation)
    return (
        <View style={{ flexDirection: 'row', height: "auto" }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                console.log("OPTIONS", options)
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                const icon =
                    typeof options.tabBarIcon === 'function'
                        ? options.tabBarIcon({
                            focused: isFocused,
                            color: isFocused ? colors.primary : colors.text,
                            size: 24,
                        })
                        : null;

                return (
                    <PlatformPressable
                        key={route.key}
                        href={buildHref(route.name, route.params)}
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1, alignItems: "center", flexDirection: "row", justifyContent: "center" }}
                    >
                        {icon}
                        <Text style={{ color: isFocused ? colors.primary : colors.text }}>
                            {typeof label === 'function' ? (
                                label({
                                    focused: isFocused,
                                    color: isFocused ? colors.primary : colors.text,
                                    position: "beside-icon", // or 'beside-icon' if applicable
                                    children: route.name,
                                })
                            ) : label}
                        </Text>
                    </PlatformPressable>
                );
            })}
        </View>
    );
}