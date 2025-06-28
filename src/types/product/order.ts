import { Ace, createAceProtocol, createDotProtocol, createLuxProtocol, createMicroProtocol, createMiniProtocol, createProProtocol, createSemiMiniProtocol, createSemiProProtocol, createSemiSmartProtocol, createSmartProtocol, createSpigotProtocol, Dot, Lux, Micro, Mini, Pro, SemiMini, SemiPro, SemiSmart, Smart, Spigot } from "./base";
import { CoverProtocol, createHandrailEndCapProtocol, createBaseEndCapProtocol, createWallBracketProtocol, createCornerProtocol, createJoinerProtocol, createModularBendProtocol, createEPDMRubberprotocol, createAccessoriesProtocol, createHandRailProtocol, createAnchorProtocol } from "./accessories";
import { BaseName, HandrailName, ModularBendHandrailName } from "./common";
import { z } from "zod"
type BaseProfileVariations = (Ace | Pro<keyof HandrailName> | Smart<keyof HandrailName> | Mini<keyof HandrailName> | SemiPro<keyof HandrailName> | SemiMini<keyof HandrailName> | SemiSmart<keyof HandrailName> | Lux<keyof HandrailName> | Spigot<keyof HandrailName> | Dot<keyof HandrailName> | Micro<keyof HandrailName>)[]

const handrailKeys: (keyof HandrailName)[] = [
    "SLEEK12", "SLEEK17", "SLEEK21", "SQUARE40", "SQUARE50",
    "ROUND50", "OVAL60", "LED20", "LED40", "LED80", "SLIM25"
]
const ModularBendHandrailKeys: (keyof ModularBendHandrailName)[] = ["SQUARE40", "SQUARE50", "ROUND50"]

const baseKeys: (keyof BaseName)[] = [
    "ACE",
    "PRO",
    "SMART",
    "MINI",
    "SEMIPRO",
    "SEMISMART",
    "SEMIMINI",
    "LUX",
    "SPIGOT",
    "DOT",
    "MICRO"
]

type BaseProtocolFunction =
    | typeof createAceProtocol
    | typeof createProProtocol
    | typeof createSmartProtocol
    | typeof createMiniProtocol
    | typeof createSemiProProtocol
    | typeof createSemiMiniProtocol
    | typeof createSemiSmartProtocol
    | typeof createSpigotProtocol
    | typeof createLuxProtocol
    | typeof createDotProtocol
    | typeof createMicroProtocol

type AccessoryProtocolFunctionForBase =
    | typeof createBaseEndCapProtocol
    | typeof createAnchorProtocol

type AccessoryProtocolFunctionForHandrail =
    | typeof createHandrailEndCapProtocol
    | typeof createWallBracketProtocol
    | typeof createCornerProtocol
    | typeof createJoinerProtocol
    | typeof createEPDMRubberprotocol
    | typeof createAccessoriesProtocol
    | typeof createHandRailProtocol

type AccessoryProtocolFunctionForModularBendHandrail = typeof createModularBendProtocol

const returnUnionsForBase = (protocol: BaseProtocolFunction) => {
    const [first, second, ...rest] = [...handrailKeys.map(key => protocol(key))]
    return z.union([first, second, ...rest])
}

const returnUnionsForAccessoriesOfBase = (protocol: AccessoryProtocolFunctionForBase) => {
    const [first, second, ...rest] = [...baseKeys.map(key => protocol(key))]
    return z.union([first, second, ...rest])
}

const returnUnionsForAccessoriesOfHandrail = (protocol: AccessoryProtocolFunctionForHandrail) => {
    const [first, second, ...rest] = [...handrailKeys.map(key => protocol(key))]
    return z.union([first, second, ...rest])
}

const returnModularBendHandrailRelatedUnions = (protocol: AccessoryProtocolFunctionForModularBendHandrail) => {
    const [first, second, ...rest] = [...ModularBendHandrailKeys.map(key => protocol(key))]
    return z.union([first, second, ...rest])
}

export const BaseProfileVariationProtocol = z.array(
    z.union([
        returnUnionsForBase(createAceProtocol),
        returnUnionsForBase(createProProtocol),
        returnUnionsForBase(createSmartProtocol),
        returnUnionsForBase(createMiniProtocol),
        returnUnionsForBase(createSemiProProtocol),
        returnUnionsForBase(createSemiMiniProtocol),
        returnUnionsForBase(createSemiSmartProtocol),
        returnUnionsForBase(createSpigotProtocol),
        returnUnionsForBase(createLuxProtocol),
        returnUnionsForBase(createDotProtocol),
        returnUnionsForBase(createMicroProtocol)
    ])
) satisfies z.ZodType<BaseProfileVariations>

type Inferred = z.infer<typeof BaseProfileVariationProtocol>;
// Error if Micro is missing? Let's test:
const test: BaseProfileVariations = {} as Inferred;

// type AccessoriesVariations = Cover[]
//     | HandrailEndCap<keyof HandrailName>[]
//     | WallBracket<keyof HandrailName>[]
//     | Handrail<keyof HandrailName>[]
//     | Corner<keyof HandrailName>[]
//     | Joiner<keyof HandrailName>[]
//     | ModularBend<keyof ModularBendHandrailName>[]
//     | EPDMRubber<keyof HandrailName>[]
//     | BaseEndCap<keyof BaseName>[]
//     | Anchor<keyof BaseName>[];

export const AccessoriesVariationsProtocol = z.union([
    z.array(CoverProtocol),
    z.array(returnUnionsForAccessoriesOfHandrail(createHandrailEndCapProtocol)),
    z.array(returnUnionsForAccessoriesOfBase(createBaseEndCapProtocol)),
    z.array(returnUnionsForAccessoriesOfHandrail(createWallBracketProtocol)),
    z.array(returnUnionsForAccessoriesOfHandrail(createCornerProtocol)),
    z.array(returnUnionsForAccessoriesOfHandrail(createJoinerProtocol)),
    z.array(returnModularBendHandrailRelatedUnions(createModularBendProtocol)),
    z.array(returnUnionsForAccessoriesOfHandrail(createEPDMRubberprotocol)),
    z.array(returnUnionsForAccessoriesOfHandrail(createAccessoriesProtocol)),
    z.array(returnUnionsForAccessoriesOfHandrail(createHandRailProtocol)),
    z.array(returnUnionsForAccessoriesOfBase(createAnchorProtocol))
])

export type AccessoriesVariations = z.infer<typeof AccessoriesVariationsProtocol>;


export const OrderProtocol = z.object({
    orderID: z.string(),
    orderVariation: z.union([BaseProfileVariationProtocol, AccessoriesVariationsProtocol])
})

export type OrderVariations = z.infer<typeof OrderProtocol>