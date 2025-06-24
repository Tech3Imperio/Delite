import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Input, XStack, YStack, Text, Button } from 'tamagui';
import { useColorScheme } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { useThemeColors } from '../../../store/themeColors';
import {
    Anchor,
    createAnchorProtocol,
} from '../../../types/product/accessories';
import { useEffect } from 'react';
import { QuantityInput } from '../../../lib/QuantityInput';
import { BaseName, BaseType } from '../../../types/product/common';
import { baseValues } from '../../../lib/BaseSelect';
import { SelectAnchorSize } from '../../../lib/AnchorSizeSelect';

export const AnchorForm = ({
    baseKey,
    setOpen,
}: {
    baseKey: keyof BaseName;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const theme = useColorScheme()
    const themeColors = useThemeColors((state) => theme === "light" ? state.light_colors : state.dark_colors)

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<Anchor<keyof BaseName>>({
        resolver: zodResolver(createAnchorProtocol(baseKey)),
        mode: 'onBlur',
    });

    const baseValue: BaseType<typeof baseKey> = baseValues[baseKey];

    useEffect(() => {
        setValue("baseProfileID", baseValue.ID as Anchor<typeof baseKey>["baseProfileID"]);
        setValue("anchorID", baseValue.anchorID as Anchor<typeof baseKey>["anchorID"]);
        setValue("anchorType", baseValue.anchorType as Anchor<typeof baseKey>["anchorType"]);

    }, []);

    const onSubmit: SubmitHandler<Anchor<keyof BaseName>> = async data => {
        console.log('Submitted BaseEndCap data:', data);
    };

    return (
        <YStack id="Test" flex={1} style={{ alignItems: "start", justifyContent: "space-between", gap: 16 }}>
            <YStack style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 16,
            }}>
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
                <YStack gap={16}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>End Cap Quantity</Text>
                    <XStack gap={30} style={{ alignItems: 'center' }}>
                        <Text>Left</Text>
                        <Controller
                            control={control}
                            name="quantity"
                            render={({ field: { onChange, value, onBlur } }) => (
                                <QuantityInput
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                />
                            )}
                        />
                        {errors.quantity && (
                            <Text style={{ color: 'red', fontSize: 12 }}>
                                {errors.quantity.message}
                            </Text>
                        )}
                    </XStack>
                </YStack>
                <YStack style={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "flex-start", gap: 8 }}>
                    <Controller
                        control={control}
                        rules={{
                            maxLength: 100,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <SelectAnchorSize onChange={onChange} onBlur={onBlur} value={value} />
                        )}
                        name="anchorSize"
                    />
                    {errors.anchorSize && (
                        <Text style={{ color: "red", fontSize: 12 }}>{errors.anchorSize.message}</Text>
                    )}
                </YStack>
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
