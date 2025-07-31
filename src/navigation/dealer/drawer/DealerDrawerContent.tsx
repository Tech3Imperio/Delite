import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {Pressable, useColorScheme} from 'react-native';
import {YStack, Text} from 'tamagui';
import {useThemeColors} from '../../../store/themeColors';

export const DealerDrawerContent = ({
  props,
}: {
  props: DrawerContentComponentProps;
}) => {
  const theme = useColorScheme();
  const themeColors = useThemeColors(state =>
    theme === 'light' ? state.light_colors : state.dark_colors,
  );
  const {navigation} = props;
  return (
    <DrawerContentScrollView
      {...props}
      style={{
        backgroundColor: themeColors.s_color,
        margin: 0,
      }}>
      <YStack gap="$2" p="$4">
        <Pressable onPress={() => navigation.navigate('Dealer')}>
          <Text color="$color" fontWeight="bold">
            Dealer
          </Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Settings')}>
          <Text color="$color" fontWeight="bold">
            Settings
          </Text>
        </Pressable>
      </YStack>
    </DrawerContentScrollView>
  );
};
