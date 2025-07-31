import {Popover, Button, Text, YStack, View} from 'tamagui';
import {AuthContext} from '../../navigation/auth/AuthContext';
import {useContext} from 'react';
import {removeToken} from '../../utils/auth/session';
import {Menu} from '@tamagui/lucide-icons';
import {Dimensions} from 'react-native';
export function ProfilePopover() {
  const {signOut} = useContext(AuthContext);
  const {width, height} = Dimensions.get('window');
  return (
    <YStack justify="center" verticalAlign="middle" flex={1}>
      <Popover placement="bottom-end" offset={12}>
        <Popover.Trigger asChild>
          <Menu size={24} />
        </Popover.Trigger>
        <Popover.Content
          borderWidth={1}
          width={width}
          height={height * 0.78}
          bg="$background"
          borderColor="$borderColor"
          enterStyle={{y: -10, opacity: 0}}
          exitStyle={{y: -10, opacity: 0}}
          elevate
          animation="quick">
          <Popover.Arrow />
          <YStack p="$3" width="100%" height={'100%'} justify="space-between">
            <View
              style={{
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                gap: 8,
              }}>
              <Button
                size="$3"
                themeInverse
                onPress={() => {
                  console.log('HI');
                  signOut();
                  removeToken();
                }}>
                Sign Out
              </Button>
            </View>
            <Text>Hi</Text>
          </YStack>
        </Popover.Content>
      </Popover>
    </YStack>
  );
}
