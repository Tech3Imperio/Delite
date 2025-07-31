import {useState} from 'react';
import {useColorScheme} from 'react-native';
import {Sheet, View, Text} from 'tamagui';
import {useThemeColors} from '../../../store/themeColors';
import {
  BaseName,
  HandrailName,
  ModularBendHandrailName,
} from '../../../types/product/common';
import {StyleSheet} from 'react-native';
import {Accessory} from '../cards/AccessoriesCard';
import {
  BaseAccessoryCode,
  baseAccessoryForms,
  HandrailAccessoryCode,
  handrailAccessoryForms,
} from '../forms/AccessoryForms/AccessoryForms';

export const NewAccessorySheet = ({
  open,
  setOpen,
  accessory,
  code,
  handrailName,
  baseName,
  forBase,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  accessory: Accessory;
  code: HandrailAccessoryCode | BaseAccessoryCode;
  handrailName: keyof HandrailName | null;
  baseName: keyof BaseName | null;
  forBase: boolean;
}) => {
  if (code === 'BC' || code === 'BB') {
    baseName = 'ACE';
  }
  console.log('accessory', accessory);
  const theme = useColorScheme();
  const themeColors = useThemeColors(state =>
    theme === 'light' ? state.light_colors : state.dark_colors,
  );
  const [position, setPosition] = useState<number>(0);

  return (
    <Sheet
      forceRemoveScrollEnabled={open}
      open={open}
      modal={true}
      zIndex={100_000}
      position={position}
      onPositionChange={setPosition}
      snapPoints={[75]}
      animation={'quick'}
      onOpenChange={setOpen}
      dismissOnSnapToBottom={true}>
      <Sheet.Overlay
        id="SheetOverlayID"
        style={{backgroundColor: 'rgba(0,0,0, 0.5)'}}
        animation="quick"
        enterStyle={{opacity: 0}}
        exitStyle={{opacity: 0}}
      />
      <Sheet.Handle style={{backgroundColor: themeColors.s_color}} />
      <Sheet.Frame
        id="FrameContentID"
        width={'100%'}
        style={{backgroundColor: themeColors.s_color, padding: 20}}>
        <View id="This" style={{flex: 1, flexDirection: 'column', gap: 12}}>
          <Text>{`Purchasing ${accessory.name} for ${
            handrailName || baseName
          }`}</Text>
          <View
            style={{
              width: '100%',
              height: StyleSheet.hairlineWidth,
              backgroundColor: `${themeColors.b_color}`,
            }}></View>
          {(() => {
            if (forBase && baseName) {
              const FormComponent =
                baseAccessoryForms[code as BaseAccessoryCode];
              return FormComponent ? (
                <FormComponent baseKey={baseName} setOpen={setOpen} />
              ) : null;
            }

            if (!forBase && handrailName) {
              const FormComponent =
                handrailAccessoryForms[code as HandrailAccessoryCode];
              if (FormComponent) {
                const Component = FormComponent as React.ComponentType<{
                  handrailKey: keyof HandrailName | ModularBendHandrailName;
                  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
                }>;
                return (
                  <Component handrailKey={handrailName} setOpen={setOpen} />
                );
              }
              return null;
            }

            return null;
          })()}
        </View>
      </Sheet.Frame>
    </Sheet>
  );
};
