import { Input, XStack, Button } from 'tamagui';
import { useColorScheme } from 'react-native';
import { useThemeColors } from '../store/themeColors';
import { Noop } from 'react-hook-form';

type QuantityProps = {
  value: number
  onChange: (...event: any[]) => void,
  onBlur: Noop
}

export const QuantityInput = ({
  value,
  onChange,
  onBlur
}: QuantityProps) => {
  const theme = useColorScheme();
  const themeColors = useThemeColors(state =>
    theme === 'light' ? state.light_colors : state.dark_colors,
  );

  const increment = () => {
    const current = Number.isNaN(value) || value == null ? 0 : value;
    onChange(current + 1);
  };

  const decrement = () => {
    const current = Number.isNaN(value) || value == null ? 0 : value;
    if (current > 0) onChange(current - 1);
  };


  return (
    <XStack style={{ alignItems: 'center' }} gap="$2">
      <Button themeInverse size="$2" onPress={decrement} disabled={value <= 0}>
        -
      </Button>

      <Input
        keyboardType="numeric"
        value={value?.toString()}
        onChangeText={(text) => {
          const sanitized = text.replace(/[^0-9]/g, ''); // allows only digits
          const num = Number(sanitized);
          onChange(Number.isNaN(num) ? undefined : num);
        }}
        size="$2"
        pt={0}
        pb={0}
        inputMode="numeric"
        onBlur={onBlur}
        placeholderTextColor={themeColors.ph_color}
        width={40}
        style={{ textAlign: "center" }}
      />

      <Button themeInverse size="$2" onPress={increment}>
        +
      </Button>
    </XStack>
  );
};