import { StyleSheet, useColorScheme, View } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { PlatformPressable } from '@react-navigation/elements';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useThemeColors } from '../../store/themeColors';
import { Text } from 'tamagui';
export const BottomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
    const { colors } = useTheme();
    const { buildHref } = useLinkBuilder();
    const theme = useColorScheme()
    const themeColors = useThemeColors((state) => theme === "light" ? state.light_colors : state.dark_colors)
    return (
        <View style={{ flexDirection: 'row', justifyContent: "space-evenly", height: 48, backgroundColor: themeColors.bg_color, borderTopColor: themeColors.b_color, borderTopWidth: StyleSheet.hairlineWidth }}>
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
                        style={{ alignSelf: "center", alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 8 }}
                    >
                        {icon}
                        <Text>
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