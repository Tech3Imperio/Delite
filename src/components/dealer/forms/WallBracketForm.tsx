import { useForm, Controller } from 'react-hook-form';
import { Button, Input, YStack, Text } from 'tamagui';
import { useColorScheme } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { useThemeColors } from '../../../store/themeColors';
import { handrailValues } from '../../../lib/HandrailSelect';
import { SelectDemo } from '../../../lib/Select';
import {
  WallBracket,
  createWallBracketProtocol,
} from '../../../types/product/accessories';
import { HandrailName } from '../../../types/product/common';
import { QuantityInput } from './QuantityInput';

export function WallBracketForm<K extends keyof HandrailName>({
  handrailKey,
  setOpen
}: { handrailKey: K, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const theme = useColorScheme();
  const themeColors = useThemeColors(state =>
    theme === 'light' ? state.light_colors : state.dark_colors,
  );

  const wallBracketSchema = createWallBracketProtocol(handrailKey);
  const handrailValue = handrailValues[handrailKey];
  const onSubmit = (data: WallBracket<K>) => {
    console.log('Submitted WallBracket data:', data);
  };
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<WallBracket<K>>({
    resolver: zodResolver(wallBracketSchema),
    mode: 'onBlur',
  });

  return (
    <YStack gap={12}>
      <Text style={{ fontSize: 24 }}>Wallbracket</Text>
      {errors.wallBracketQuantity && (
        <Text style={{ color: 'red', fontSize: 12 }}>
          {errors.wallBracketQuantity.message}
        </Text>
      )}
      <Text style={{ fontSize: 12 }}>Handrail Type</Text>
      <Input
        value={handrailValue.name}
        editable={false}
        size="$3"
        placeholder="Handrail Type"
        placeholderTextColor={themeColors.ph_color}
      />
      <Text style={{ fontSize: 12 }}>Handrail Code</Text>
      <Input
        value={handrailValue.code}
        editable={false}
        size="$3"
        placeholder="Handrail Code"
        placeholderTextColor={themeColors.ph_color}
      />
      <Text style={{ fontSize: 12 }}>Quantity</Text>
      <Controller
        control={control}
        name="wallBracketQuantity"
        render={({ field: { onChange, value } }) => (
          <QuantityInput value={value || 0} onChange={onChange} />
        )}
      />

      {/* Finish Select Component (ideally takes `control`, name, etc.) */}
      <SelectDemo />

      <Button size="$3" themeInverse onPress={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </YStack>
  );
}
