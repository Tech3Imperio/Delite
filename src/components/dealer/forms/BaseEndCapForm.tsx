import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Input, XStack, YStack, Text, Button } from 'tamagui';
import { useColorScheme } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { useThemeColors } from '../../../store/themeColors';
import {
  BaseEndCap,
  createBaseEndCapProtocol,
} from '../../../types/product/accessories';
import { SelectDemo } from '../../../lib/Select';
import { useEffect } from 'react';
import { getFinishCode } from '../../../utils/dealer/getFinishCode';
import { QuantityInput } from '../../../lib/QuantityInput';
import { BaseName, BaseType } from '../../../types/product/common';
import { baseValues } from '../../../lib/BaseSelect';

export const BaseEndCapForm = ({
  baseKey,
  setOpen,
}: {
  baseKey: keyof BaseName;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const theme = useColorScheme();
  const themeColors = useThemeColors(state =>
    theme === 'light' ? state.light_colors : state.dark_colors,
  );

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BaseEndCap<keyof BaseName>>({
    resolver: zodResolver(createBaseEndCapProtocol(baseKey)),
    mode: 'onBlur',
  });

  useEffect(() => {
    const color = watch("finish.color")
    console.log("Color", color)
    const code = color !== undefined && getFinishCode(color)
    console.log("In useEffect", code)
    if (code) {
      setValue("finish.code", code) // or a mapping function if needed
    }
  }, [watch("finish.color")])

  const baseValue: BaseType<typeof baseKey> = baseValues[baseKey];

  useEffect(() => {
    setValue("baseProfileID", baseValue.ID as BaseEndCap<typeof baseKey>["baseProfileID"]);
  }, []);

  const onSubmit: SubmitHandler<BaseEndCap<keyof BaseName>> = async data => {
    console.log('Submitted BaseEndCap data:', data);
  };

  return (
    <YStack
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 16,
      }}>
      <YStack gap={16}>
        <YStack style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", gap: 16 }}>
          <Text style={{ fontSize: 14 }}>Base Name</Text>
          <Input
            defaultValue={baseKey}
            editable={false}
            size="$3"
            pt={0}
            pb={0}
            placeholder="Handrail Code"
            placeholderTextColor={baseValue.ID}
          />
        </YStack>
        <YStack style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", gap: 16 }}>
          <Text style={{ fontSize: 14 }}>Base ID</Text>
          <Input
            defaultValue={baseValue.ID}
            editable={false}
            size="$3"
            pt={0}
            pb={0}
            placeholder="Handrail Code"
            placeholderTextColor={themeColors.ph_color}
          />
        </YStack>
        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>End Cap Quantity</Text>

        {/* Left End Cap */}
        <XStack gap={30} style={{ alignItems: 'center' }}>
          <Text>Left</Text>
          <Controller
            control={control}
            name="endCapLeftQuantity"
            render={({ field: { onChange, value, onBlur } }) => (
              <QuantityInput
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {errors.endCapLeftQuantity && (
            <Text style={{ color: 'red', fontSize: 12 }}>
              {errors.endCapLeftQuantity.message}
            </Text>
          )}
        </XStack>

        {/* Right End Cap */}
        <XStack gap={24} style={{ alignItems: 'center' }}>
          <Text>Right</Text>
          <Controller
            control={control}
            name="endCapRightQuantity"
            render={({ field: { onChange, value, onBlur } }) => (
              <QuantityInput
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {errors.endCapRightQuantity && (
            <Text style={{ color: 'red', fontSize: 12 }}>
              {errors.endCapRightQuantity.message}
            </Text>
          )}
        </XStack>

        {/* Finish Color & Code */}

        <XStack gap={16} style={{ alignItems: 'flex-end' }}>
          <Controller
            control={control}
            name="finish.color"
            render={({ field: { onChange, value, onBlur } }) => (
              <SelectDemo onChange={onChange} value={value} onBlur={onBlur} />
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
            render={({ field: { value } }) => (
              <Input
                readOnly
                width={150}
                size="$2"
                pt={0}
                pb={0}
                placeholder="Color Code"
                value={value?.toString()}
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

      {/* Actions */}
      <XStack gap={'$2'} style={{ alignSelf: 'flex-end' }}>
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
};
