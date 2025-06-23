import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Input, YStack, Text } from "tamagui";
import { useColorScheme } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useThemeColors } from "../../../store/themeColors";
import { Anchor, Cover, createAnchorProtocol } from "../../../types/product/accessories";
import { BaseName } from "../../../types/product/common";
// import { FinishCode, FinishName } from "../../../types/product/common";
export const AnchorForm = ({ baseKey, setOpen }: { baseKey: keyof BaseName, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const theme = useColorScheme()
    const themeColors = useThemeColors((state) => theme === "light" ? state.light_colors : state.dark_colors)
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<Anchor<typeof baseKey>>({
        resolver: zodResolver(createAnchorProtocol(baseKey)),
        mode: "onBlur",
    })

    const onSubmit: SubmitHandler<Cover> = async (data) => {
        // try {
        //     const response = await fetch(`${getApiBaseUrl()}/auth/signin`, {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify(data),
        //     });
        //     const result = await response.json();
        //     if (result.success) {
        //         await storeToken(result.access_token)
        //         signIn(result.role)
        //     }
        // } catch (error) {
        //     if (error instanceof Error) {
        //         console.error("Sign-in error:", error.message);
        //     } else {
        //         console.error("Sign-in error:", error);
        //     }
        // }
    };

    return (
        <>
            <YStack gap={16} id="Test">
                <YStack style={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "flex-start", gap: 8 }}>
                    <Text style={{ fontSize: 14 }}>Anchor Length Quantity</Text>
                    <YStack style={{ display: "flex", flexDirection: "row", alignItems: "start", justifyContent: "flex-start", gap: 8 }}>
                        <YStack style={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "flex-start", gap: 8 }}>
                            <Controller
                                control={control}
                                rules={{
                                    maxLength: 100,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input pl={12} width={150} keyboardType="numeric" inputMode="numeric" onChangeText={(text) => {
                                        const sanitized = text.replace(/[^0-9]/g, ''); // allows only digits
                                        const num = Number(sanitized);
                                        onChange(Number.isNaN(num) ? undefined : num);
                                    }} value={value?.toString()} size="$2" placeholder='For 12 Feet' paddingBlock={0} onBlur={onBlur} placeholderTextColor={themeColors.ph_color} />
                                )}
                                name="anchorSize"
                            />
                            {errors.anchorSize && (
                                <Text style={{ color: "red", fontSize: 12, }}>{errors.anchorSize.message}</Text>
                            )}
                        </YStack>
                        <YStack style={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "flex-start", gap: 8 }}>
                            <Controller
                                control={control}
                                rules={{
                                    maxLength: 100,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input width={150} keyboardType="numeric" inputMode="numeric" onChangeText={(text) => {
                                        const sanitized = text.replace(/[^0-9]/g, ''); // allows only digits
                                        const num = Number(sanitized);
                                        onChange(Number.isNaN(num) ? undefined : num);
                                    }} value={value?.toString()} size="$2" placeholder='For 15 Feet' paddingBlock={0} onBlur={onBlur} placeholderTextColor={themeColors.ph_color} />
                                )}
                                name="quantity"
                            />
                            {errors.quantity && (
                                <Text style={{ color: "red", fontSize: 12 }}>{errors.quantity.message}</Text>
                            )}
                        </YStack>
                    </YStack>
                </YStack>
            </YStack>
        </>
    )
}