import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Input, XStack, YStack, Text, Button } from 'tamagui';
import { useColorScheme } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { useThemeColors } from '../../../../store/themeColors';
import {
  ModularBend,
  createModularBendProtocol,
} from '../../../../types/product/accessories';
import { SelectDemo } from '../../../../lib/Select';
import { useEffect } from 'react';
import { getFinishCode } from '../../../../utils/dealer/getFinishCode';
import { QuantityInput } from '../../../../lib/QuantityInput';
import {
  ModularBendHandrailName,
  ModularBendHandrailType,
} from '../../../../types/product/common';
import { ModularBendHandrailValues } from '../../../../lib/ModularBendHandrailSelect';

export function ModularBendForm<K extends keyof ModularBendHandrailName>({
  handrailKey,
  setOpen,
}: {
  handrailKey: K;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  console.log('In Modular Bend form');

  const theme = useColorScheme();
  const themeColors = useThemeColors(state =>
    theme === 'light' ? state.light_colors : state.dark_colors,
  );

  const ModularBendHandRailValue: ModularBendHandrailType<K> = ModularBendHandrailValues[handrailKey];

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ModularBend<keyof ModularBendHandrailName>>({
    resolver: zodResolver(createModularBendProtocol(handrailKey)),
    mode: 'onBlur',
  });

  // Auto-update finish code when color changes
  useEffect(() => {
    const color = watch('finish.color');
    const code = color && getFinishCode(color);
    if (code) {
      setValue('finish.code', code);
    }
  }, [watch('finish.color')]);

  // Pre-fill handrail name and code
  useEffect(() => {
    setValue("handrailType", ModularBendHandRailValue.name as ModularBend<K>["handrailType"]);
    setValue("handrailCode", ModularBendHandRailValue.code as ModularBend<K>["handrailCode"]);
  }, []);

  const onSubmit: SubmitHandler<ModularBend<keyof ModularBendHandrailName>> = async data => {
    console.log('Modular Bend data submitted:', data);
  };

  return (
    <YStack id="Test" flex={1} style={{ alignItems: "start", justifyContent: "space-between", gap: 16 }}>
      <YStack width={'100%'} gap={16}>
        {/* Handrail Name */}
        <YStack flexDirection="row" gap={16} style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 14 }}>Handrail Name</Text>
          <Input
            defaultValue={ModularBendHandRailValue.name}
            editable={false}
            size="$3"
            pt={0}
            pb={0}
            placeholder="Handrail Name"
            placeholderTextColor={themeColors.ph_color}
          />
        </YStack>

        {/* Handrail Code */}
        <YStack flexDirection="row" gap={16} style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 14 }}>Handrail Code</Text>
          <Input
            defaultValue={ModularBendHandRailValue.code}
            editable={false}
            size="$3"
            pt={0}
            pb={0}
            placeholder="Handrail Code"
            placeholderTextColor={themeColors.ph_color}
          />
        </YStack>

        {/* Quantity */}
        <YStack flexDirection="row" gap={16} style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Quantity</Text>
          <Controller
            control={control}
            name="modularBendQuantity"
            defaultValue={0}
            render={({ field: { onChange, onBlur, value } }) => (
              <QuantityInput
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {errors.modularBendQuantity && (
            <Text style={{ color: 'red', fontSize: 12 }}>
              {errors.modularBendQuantity.message}
            </Text>
          )}
        </YStack>

        {/* Finish Selection */}
        <YStack gap={8}>
          <XStack gap={16} style={{ alignItems: 'flex-end' }}>
            <Controller
              control={control}
              name="finish.color"
              render={({ field: { onChange, onBlur, value } }) => (
                <SelectDemo onChange={onChange} onBlur={onBlur} value={value} />
              )}
            />
            {errors.finish?.color && (
              <Text style={{ color: 'red', fontSize: 12 }}>
                {errors.finish.color.message}
              </Text>
            )}

            <Controller
              control={control}
              name="finish.code"
              render={({ field: { onBlur, value } }) => (
                <Input
                  width={150}
                  readOnly
                  value={value?.toString()}
                  size="$2"
                  placeholder="Color Code"
                  paddingBlock={0}
                  onBlur={onBlur}
                  placeholderTextColor={themeColors.ph_color}
                />
              )}
            />
            {errors.finish?.code && (
              <Text style={{ color: 'red', fontSize: 12 }}>
                {errors.finish.code.message}
              </Text>
            )}
          </XStack>
        </YStack>
      </YStack>

      {/* Action Buttons */}
      <XStack gap="$2" style={{ alignSelf: 'flex-end' }}>
        <Button
          size="$3"
          width={100}
          variant="outlined"
          onPress={() => setOpen(prev => !prev)}>
          Cancel
        </Button>
        <Button
          size="$3"
          width={100}
          themeInverse
          onPress={handleSubmit(onSubmit)}>
          Place Order
        </Button>
      </XStack>
    </YStack>
  );
}
