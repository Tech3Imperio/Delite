import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button, Input, YStack } from "tamagui";
import { SignInFormType, SignInFromSchema } from "../../dataTypes/auth/SignInFormType";
import { useThemeColors } from "../../states/themeColors";
import { useColorScheme } from "react-native";
import { LogIn } from "@tamagui/lucide-icons";
import { Text } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { getApiBaseUrl } from "../../utils/auth/baseAPI";
import { useNavigation } from "@react-navigation/native";
export const SignInFrom = () => {
    const navigation = useNavigation()
    const theme = useColorScheme()
    const themeColors = useThemeColors((state) => theme === "light" ? state.light_colors : state.dark_colors)
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormType>({
        resolver: zodResolver(SignInFromSchema),
        mode: "onBlur",
        defaultValues: {
            userID: "",
            password: ""
        }
    })
    const onSubmit: SubmitHandler<SignInFormType> = async (data) => {
        try {
            const response = await fetch(`${getApiBaseUrl()}/auth/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.detail || "Something went wrong");
            }

            const result = await response.json();
            console.log(result)
            if (result.status === true) {
                console.log("Reached Here")
                navigation.navigate({ name: "Dashboard", params: {} })
            }

            // handle success (e.g., store token, navigate, etc.)
        } catch (error) {
            if (error instanceof Error) {
                console.error("Sign-in error:", error.message);
            } else {
                console.error("Sign-in error:", error);
            }
        }
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
                        <Input onChangeText={onChange} value={value} size="$2" placeholder='User ID' paddingBlock={0} onBlur={onBlur} placeholderTextColor={themeColors.ph_color} />
                    )}
                    name="userID"
                />
                {errors.userID && (
                    <Text style={{ color: "red", fontSize: 12 }}>{errors.userID.message}</Text>
                )}
                <Controller
                    control={control}
                    rules={{
                        required: true,
                        minLength: 8
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input onChangeText={onChange} value={value} size="$2" placeholder='Password' paddingBlock={0} onBlur={onBlur} placeholderTextColor={themeColors.ph_color} />
                    )}
                    name="password"
                />
                {errors.password && (
                    <Text style={{ color: "red", fontSize: 12 }}>{errors.password.message}</Text>
                )}
                <Button
                    themeInverse
                    size="$3"
                    borderWidth={0.5}
                    iconAfter={LogIn}
                    onPress={handleSubmit(onSubmit)
                    }
                >Sign In</Button>
            </YStack>
        </>
    )
}