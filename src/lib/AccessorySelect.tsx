import { useState } from "react"
import { FlatList, useColorScheme } from "react-native"
import { Sheet, YStack, Button } from "tamagui"
import { useThemeColors } from "../store/themeColors"
import { Accessory } from "../components/dealer/cards/AccessoriesCard"
import { AccessoryCode } from "../components/dealer/forms/AccessoryForms/AccessoryForms"
const accessories: Accessory[] = [
    {
        created_at: "2025-06-06T06:48:37.098711+00:00",
        code: "CC",
        name: "Corner",
        thumbnail: "https://mevjrvyjfmvqucbnsedb.supabase.co/storage/v1/object/sign/accessories-images/Corner/corner.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hOTZmMmJlMC04YjYyLTRjZWEtYWVhMy1iZDgxYTQ2MGY5OTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhY2Nlc3Nvcmllcy1pbWFnZXMvQ29ybmVyL2Nvcm5lci5qcGciLCJpYXQiOjE3NTAxNTA1MzYsImV4cCI6MjA2NTUxMDUzNn0.FHxeyg6fSiofCPuJDmTLO1Grqi5XyklD3dNXQWO9fmU",
        description: "Corner for handrails"
    },
    {
        created_at: "2025-06-06T06:49:23.5361+00:00",
        code: "FC",
        name: "Modular Bend (Flexible Corner)",
        thumbnail: "https://mevjrvyjfmvqucbnsedb.supabase.co/storage/v1/object/sign/accessories-images/ModularBend/modularBend.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hOTZmMmJlMC04YjYyLTRjZWEtYWVhMy1iZDgxYTQ2MGY5OTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhY2Nlc3Nvcmllcy1pbWFnZXMvTW9kdWxhckJlbmQvbW9kdWxhckJlbmQuanBnIiwiaWF0IjoxNzUwMTUwNTU1LCJleHAiOjIwNjU1MTA1NTV9.G3F4q5qmrX8ac0WhqOi5OwpDcu4_uww13KaQaiG3nUs",
        description: "Flexible Corner (Modular Bends) for handrails"
    },
    {
        created_at: "2025-06-06T06:47:01.482541+00:00",
        code: "HEC",
        name: "Handrail End Cap",
        thumbnail: "https://mevjrvyjfmvqucbnsedb.supabase.co/storage/v1/object/sign/accessories-images/HandrailEndCap/handrailEndCap.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hOTZmMmJlMC04YjYyLTRjZWEtYWVhMy1iZDgxYTQ2MGY5OTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhY2Nlc3Nvcmllcy1pbWFnZXMvSGFuZHJhaWxFbmRDYXAvaGFuZHJhaWxFbmRDYXAuanBnIiwiaWF0IjoxNzUwMTUwNTk0LCJleHAiOjIwNjU1MTA1OTR9.ziCNSpslVUX3U4psQd6q1lFjZT-Z29xz0aDmk0GkpN4",
        description: "End Caps suitable for handrails"
    },
    {
        created_at: "2025-06-06T06:48:12.095272+00:00",
        code: "LJ",
        name: "Line Joiner",
        thumbnail: "https://mevjrvyjfmvqucbnsedb.supabase.co/storage/v1/object/sign/accessories-images/Joiner/joiner.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hOTZmMmJlMC04YjYyLTRjZWEtYWVhMy1iZDgxYTQ2MGY5OTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhY2Nlc3Nvcmllcy1pbWFnZXMvSm9pbmVyL2pvaW5lci5qcGciLCJpYXQiOjE3NTAxNTA2MTAsImV4cCI6MjA2NTUxMDYxMH0.jIUoCNj2i8Vx0ppGCXM-pO86qcxEnOEstqm6I4f_PC4",
        description: "Joiner for handrials"
    },
    {
        created_at: "2025-06-06T06:47:49.479533+00:00",
        code: "WB",
        name: "Wall Bracket",
        thumbnail: "https://mevjrvyjfmvqucbnsedb.supabase.co/storage/v1/object/sign/accessories-images/WallBracket/wallBracket.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hOTZmMmJlMC04YjYyLTRjZWEtYWVhMy1iZDgxYTQ2MGY5OTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhY2Nlc3Nvcmllcy1pbWFnZXMvV2FsbEJyYWNrZXQvd2FsbEJyYWNrZXQuanBnIiwiaWF0IjoxNzUwMTUwNjM0LCJleHAiOjIwNjU1MTA2MzR9.MahtnmYM_PtA_IqrWTyETjnCzSklMeiIMmHs2M5tADo",
        description: "Wall Brackets for handrails"
    },
    {
        created_at: "2025-06-06T06:50:15.632587+00:00",
        code: "RG",
        name: "EPDM Rubber",
        thumbnail: "https://mevjrvyjfmvqucbnsedb.supabase.co/storage/v1/object/sign/accessories-images/EPDMRubber/epdmRubber.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hOTZmMmJlMC04YjYyLTRjZWEtYWVhMy1iZDgxYTQ2MGY5OTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhY2Nlc3Nvcmllcy1pbWFnZXMvRVBETVJ1YmJlci9lcGRtUnViYmVyLmpwZyIsImlhdCI6MTc1MDE1MTQ2NywiZXhwIjoyMDY1NTExNDY3fQ.z2wJTcp7w6BRkjNwfdFnXZ2RTof1K4aacAjNwM8H89M",
        description: "Rubber for glass of handrails"
    }
];


export const HandrailAccessorySelect = ({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const handlePress = (accessoryCode: AccessoryCode) => {
        console.log("Reached handlePress")
        setOpen(!open)
        // openAccessorySheet(accessoryCode)
    }

    const theme = useColorScheme()
    const themeColors = useThemeColors((state) => theme === "light" ? state.light_colors : state.dark_colors)
    const [position, setPosition] = useState<number>(0)
    return (
        <Sheet
            forceRemoveScrollEnabled={open}
            open={open}
            modal={true}
            zIndex={100_000}
            position={position}
            onPositionChange={setPosition}
            snapPoints={[50]}
            animation={"quick"}
            onOpenChange={setOpen}
            dismissOnSnapToBottom={true}
        >
            <Sheet.Overlay
                style={{ backgroundColor: 'rgba(0,0,0, 0.5)' }}
                animation="quick"
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }} />
            <Sheet.Handle style={{ backgroundColor: themeColors.s_color }} />
            <Sheet.Frame style={{ backgroundColor: themeColors.s_color, padding: 20 }}>
                <FlatList
                    data={accessories}
                    keyExtractor={(item) => item.code}
                    renderItem={({ item }) => (
                        <YStack p={12} borderBottomWidth={1} borderColor="gray">
                            <Button size={"$2"} fontSize={14} onPress={() => handlePress(item.code)}>{item.name}</Button>
                        </YStack>
                    )}
                />
            </Sheet.Frame>
        </Sheet>
    )
}