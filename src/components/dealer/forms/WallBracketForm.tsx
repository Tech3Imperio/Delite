import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Input, XStack, YStack, Text, Button, View } from "tamagui";
import { useColorScheme } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useThemeColors } from "../../../store/themeColors";
import { Corner, createCornerProtocol, createWallBracketProtocol, WallBracket } from "../../../types/product/accessories";
import { SelectDemo } from "../../../lib/Select";
import { useEffect } from "react";
import { getFinishCode } from "../../../utils/dealer/getFinishCode";
import { QuantityInput } from "../../../lib/QuantityInput";
import { HandrailName, HandrailType } from "../../../types/product/common";
import { handrailValues } from "../../../lib/HandrailSelect";
export function WallBracketForm<K extends keyof HandrailName>({ handrailKey, setOpen }: { handrailKey: K, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  console.log("In Wall Bracket form")
  const theme = useColorScheme()
  const themeColors = useThemeColors((state) => theme === "light" ? state.light_colors : state.dark_colors)
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<WallBracket<keyof HandrailName>>({
    resolver: zodResolver(createWallBracketProtocol(handrailKey)),
    mode: "onBlur",
  })

  useEffect(() => {
    const color = watch("finish.color")
    console.log("Color", color)
    const code = color !== undefined && getFinishCode(color)
    console.log("In useEffect", code)
    if (code) {
      setValue("finish.code", code) // or a mapping function if needed
    }
  }, [watch("finish.color")])

  useEffect(() => {
    setValue("handrailType", handrailValue.name as WallBracket<K>["handrailType"]);
    setValue("handrailCode", handrailValue.code as WallBracket<K>["handrailCode"]);
  }, []);

  const handrailValue: HandrailType<typeof handrailKey> = handrailValues[handrailKey];

  const onSubmit: SubmitHandler<WallBracket<keyof HandrailName>> = async (data) => {
    console.log("Data from Wallbracket", data)
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
      <YStack id="Test" height={"85%"} style={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "space-between", gap: 16 }}>
        <YStack width={"100%"} style={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "flex-start", gap: 16, }}>
          <YStack style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", gap: 16 }}>
            <Text style={{ fontSize: 14 }}>Handrail Name</Text>
            <Input
              defaultValue={handrailValue.name}
              editable={false}
              size="$3"
              pt={0}
              pb={0}
              placeholder="Handrail Code"
              placeholderTextColor={themeColors.ph_color}
            />
          </YStack>
          <YStack style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", gap: 16 }}>
            <Text style={{ fontSize: 14 }}>Handrail Code</Text>
            <Input
              defaultValue={handrailValue.code}
              editable={false}
              size="$3"
              pt={0}
              pb={0}
              placeholder="Handrail Code"
              placeholderTextColor={themeColors.ph_color}
            />
          </YStack>
          <YStack style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", gap: 16 }}>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>Quantity</Text>
            <Controller
              control={control}
              rules={{
                maxLength: 100,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <QuantityInput value={value} onChange={onChange} onBlur={onBlur} />
              )}
              name="wallBracketQuantity"
            />
            {errors.wallBracketQuantity && (
              <Text style={{ color: "red", fontSize: 12, }}>{errors.wallBracketQuantity.message}</Text>
            )}
          </YStack>
          <YStack style={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "flex-start", gap: 8 }}>
            <XStack style={{ display: "flex", flexDirection: "row", alignItems: "flex-end", justifyContent: "flex-start", gap: 16 }}>
              <Controller
                control={control}
                rules={{
                  maxLength: 100,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <SelectDemo onChange={onChange} onBlur={onBlur} value={value} />
                )}
                name="finish.color"
              />
              {errors.finish?.color && (
                <Text style={{ color: "red", fontSize: 12 }}>{errors.finish.color.message}</Text>
              )}
              <Controller
                control={control}
                rules={{
                  maxLength: 100,
                }}
                render={({ field: { onBlur, value } }) => (
                  <Input width={150} readOnly value={value?.toString()} size="$2" placeholder='Color Code' paddingBlock={0} onBlur={onBlur} placeholderTextColor={themeColors.ph_color} />
                )}
                name="finish.code"
              />
              {errors.finish?.code && (
                <Text style={{ color: "red", fontSize: 12 }}>{errors.finish.code.message}</Text>
              )}
            </XStack>
          </YStack>
        </YStack>
        <XStack gap={"$2"} style={{ alignSelf: "flex-end" }}>
          <Button size={"$3"} style={{ alignSelf: "flex-end" }} width={100} variant="outlined" onPress={() => setOpen(prev => !prev)}>Cancel</Button>
          <Button size={"$3"} style={{ alignSelf: "flex-end" }} width={100} themeInverse onPress={handleSubmit(onSubmit)}>Place Order</Button>
        </XStack>
      </YStack>
    </>
  )
}