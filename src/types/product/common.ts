import { z } from "zod"

export enum FinishName {
    SILVER = "Silver",
    CHAMPAGNE = "Champagne",
    BLACK = "Black",
    WOOD = "Wood",
    CUSTOM = "Custom",
    RAW = "Raw"
}

export const FinishNameProtocol = z.nativeEnum(FinishName) satisfies z.ZodType<FinishName>

export enum FinishCode {
    SILVER = "4",
    CHAMPAGNE = "12",
    BLACK = "34",
    WOOD = "41",
    CUSTOM = "XX",
    RAW = "00"
}

export const FinishCodeProtocol = z.nativeEnum(FinishCode) satisfies z.ZodType<FinishCode>

export enum DotFinishName {
    SSMATT = "SS Matt",
    SSGLOSSY = "SS Glossy",
    GOLDMATT = "Gold Matt",
    GOLDGLOSSY = "Gold Glossy",
    ROSEGOLDMATT = "Rose Gold Matt",
    ROSEGOLDGLOSSY = "Rose Gold GLossy",
    BLACKMATT = "Black Matt",
    BLACKGLOSSY = "Black Glossy"
}

export const DotFinishNameProtocol = z.nativeEnum(DotFinishName) satisfies z.ZodType<DotFinishName>


export enum DotFinishCode {
    SSMATT = "SSSM",
    SSGLOSSY = "SSSG",
    GOLDMATT = "GSM",
    GOLDGLOSSY = "GSG",
    ROSEGOLDMATT = "RGSM",
    ROSEGOLDGLOSSY = "RGSG",
    BLACKMATT = "BSM",
    BLACKGLOSSY = "BSG"
}

export const DotFinishCodeProtocol = z.nativeEnum(DotFinishCode) satisfies z.ZodType<DotFinishCode>

export const HandrailNameProtocol = z.object({
    SLEEK12: z.object({ name: z.literal("Sleek 12"), code: z.literal("S12") }),
    SLEEK17: z.object({ name: z.literal("Sleek 17"), code: z.literal("S17") }),
    SLEEK21: z.object({ name: z.literal("Sleek 21"), code: z.literal("S21") }),
    SQUARE40: z.object({ name: z.literal("Square 40"), code: z.literal("S40") }),
    SQUARE50: z.object({ name: z.literal("Square 50"), code: z.literal("S50") }),
    ROUND50: z.object({ name: z.literal("Round 50"), code: z.literal("R50") }),
    OVAL60: z.object({ name: z.literal("Oval 60"), code: z.literal("O60") }),
    LED20: z.object({ name: z.literal("LED 20"), code: z.literal("L20") }),
    LED40: z.object({ name: z.literal("LED 40"), code: z.literal("L40") }),
    LED80: z.object({ name: z.literal("LED 80"), code: z.literal("L80") }),
    SLIM25: z.object({ name: z.literal("Slim 25"), code: z.literal("S25") }),
});

export type HandrailName = z.infer<typeof HandrailNameProtocol>;
export type HandrailType<K extends keyof HandrailName> = HandrailName[K];

export const ModularBendHandrailNameProtocol = z.object({
    SQUARE40: z.object({ name: z.literal("Square 40"), code: z.literal("S40") }),
    SQUARE50: z.object({ name: z.literal("Square 50"), code: z.literal("S50") }),
    ROUND50: z.object({ name: z.literal("Round 50"), code: z.literal("R50") }),
});

export type ModularBendHandrailName = z.infer<typeof ModularBendHandrailNameProtocol>;
export type ModularBendHandrailType<T extends keyof ModularBendHandrailName> = ModularBendHandrailName[T];


export const BaseNameProtocol = z.object({
    ACE: z.object({ anchorID: z.literal("CH"), anchorType: z.literal("C10"), ID: z.literal("A50") }),
    PRO: z.object({ anchorID: z.literal("HH"), anchorType: z.literal("H10"), ID: z.literal("L50") }),
    SMART: z.object({ anchorID: z.literal("HH"), anchorType: z.literal("H10"), ID: z.literal("C75") }),
    MINI: z.object({ anchorID: z.literal("HK"), anchorType: z.literal("H8"), ID: z.literal("F55") }),
    SEMIPRO: z.object({ anchorID: z.literal("HH"), anchorType: z.literal("H10"), ID: z.literal("C50") }),
    SEMISMART: z.object({ anchorID: z.literal("HH"), anchorType: z.literal("H10"), ID: z.literal("D75") }),
    SEMIMINI: z.object({ anchorID: z.literal("HK"), anchorType: z.literal("H8"), ID: z.literal("D55") }),
    LUX: z.object({ anchorID: z.literal("CH"), anchorType: z.literal("C10"), ID: z.literal("T100") }),
    SPIGOT: z.object({ anchorID: z.literal("CH"), anchorType: z.literal("C10"), ID: z.literal("E80") }),
    DOT: z.object({ anchorID: z.literal("M12"), anchorType: z.literal("M12"), ID: z.literal("E50") }),
    MICRO: z.object({ anchorID: z.literal("NA"), anchorType: z.literal("NA"), ID: z.literal("F40") }),
});

export type BaseName = z.infer<typeof BaseNameProtocol>;
export type BaseType<T extends keyof BaseName> = BaseName[T];