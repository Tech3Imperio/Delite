import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Input, YStack } from "tamagui";
import { useColorScheme } from "react-native";
import { Text } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useThemeColors } from "../../../store/themeColors";
import { Cover, CoverProtocol } from "../../../types/product/accessories";
import { FinishCode, FinishName } from "../../../types/product/common";
import { SelectDemo } from "../../../lib/Select";
export const CoverSheet = () => {
    const theme = useColorScheme()
    const themeColors = useThemeColors((state) => theme === "light" ? state.light_colors : state.dark_colors)
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<Cover>({
        resolver: zodResolver(CoverProtocol),
        mode: "onBlur",
        defaultValues: {
            coverLength: [0, 0],
            finish: {
                color: FinishName.BLACK,
                code: FinishCode.BLACK
            }
        }
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
            <YStack gap={12} id="Test">
                <Controller
                    control={control}
                    rules={{
                        maxLength: 100,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input onChange={onChange} keyboardType="numeric" inputMode="numeric" value={value.toString()} size="$2" placeholder='User ID' paddingBlock={0} onBlur={onBlur} placeholderTextColor={themeColors.ph_color} />
                    )}
                    name="coverLength.0"
                />
                {errors.coverLength?.[0] && (
                    <Text style={{ color: "red", fontSize: 12 }}>{errors.coverLength[0].message}</Text>
                )}
                <Controller
                    control={control}
                    rules={{
                        maxLength: 100,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input onChange={onChange} keyboardType="numeric" inputMode="numeric" value={value.toString()} size="$2" placeholder='User ID' paddingBlock={0} onBlur={onBlur} placeholderTextColor={themeColors.ph_color} />
                    )}
                    name="coverLength.1"
                />
                {errors.coverLength?.[1] && (
                    <Text style={{ color: "red", fontSize: 12 }}>{errors.coverLength[1].message}</Text>
                )}
                <SelectDemo />
            </YStack>
        </>
    )
}