import { BaseName, BaseType, FinishName, FinishCode, HandrailName, ModularBendHandrailName, FinishNameProtocol, FinishCodeProtocol, HandrailNameProtocol, HandrailType, ModularBendHandrailNameProtocol, ModularBendHandrailType, BaseNameProtocol } from "./common"
import { z } from "zod"

export const CoverProtocol = z.object({
    finish: z.object({
        color: FinishNameProtocol.refine((val) => Object.values(FinishNameProtocol.enum).includes(val), {
            message: "Invalid finish color",
        }),
        code: FinishCodeProtocol.refine((val) => Object.values(FinishCodeProtocol.enum).includes(val), {
            message: "Invalid finish code",
        }),
    }, { required_error: "Finish is required" }),
    coverLength: z.tuple([z.number({ required_error: "L1 is required" }), z.number({ required_error: "L2 is required" })], { required_error: "Cover Length is required" }),
});

export type Cover = z.infer<typeof CoverProtocol>;

export type BaseEndCap<T extends keyof BaseName> = {
    baseProfileID: BaseType<T>["ID"];
    finish: { color: FinishName, code: FinishCode };
    endCapLeftQuantity: number;
    endCapRightQuantity: number;
}

export function createBaseEndCapProtocol<T extends keyof BaseName>(
    baseKey: T
) {
    return z.object({
        finish: z.object({
            color: FinishNameProtocol.refine((val) => Object.values(FinishNameProtocol.enum).includes(val), {
                message: "Invalid finish color",
            }),
            code: FinishCodeProtocol.refine((val) => Object.values(FinishCodeProtocol.enum).includes(val), {
                message: "Invalid finish code",
            }),
        }, { required_error: "Finish is required" }),
        baseProfileID: BaseNameProtocol.shape[baseKey].shape.ID,
        endCapLeftQuantity: z.number({ required_error: "Left Shape Quantity is required" }),
        endCapRightQuantity: z.number({ required_error: "Right Shape Quantity is required" }),
    }) satisfies z.ZodType<BaseEndCap<T>>;
}

export type HandrailEndCap<K extends keyof HandrailName> = {
    finish: { color: FinishName, code: FinishCode };
    handrailType: HandrailType<K>["name"],
    handrailCode: HandrailType<K>["code"],
    endCapLeftQuantity: number;
    endCapRightQuantity: number;
}

export function createHandrailEndCapProtocol<K extends keyof HandrailName>(
    handrailKey: K
) {
    return z.object({
        finish: z.object({
            color: FinishNameProtocol.refine((val) => Object.values(FinishNameProtocol.enum).includes(val), {
                message: "Invalid finish color",
            }),
            code: FinishCodeProtocol.refine((val) => Object.values(FinishCodeProtocol.enum).includes(val), {
                message: "Invalid finish code",
            }),
        }, { required_error: "Finish is required" }),
        handrailType: HandrailNameProtocol.shape[handrailKey].shape.name,
        handrailCode: HandrailNameProtocol.shape[handrailKey].shape.code,
        endCapLeftQuantity: z.number({ required_error: "Left Shape Quantity is required" }),
        endCapRightQuantity: z.number({ required_error: "Right Shape Quantity is required" }),
    }) satisfies z.ZodType<HandrailEndCap<K>>;
}

export type WallBracket<K extends keyof HandrailName> = {
    finish: { color: FinishName, code: FinishCode };
    wallBracketQuantity: number;
    handrailType: HandrailType<K>["name"],
    handrailCode: HandrailType<K>["code"],
}

export function createWallBracketProtocol<K extends keyof HandrailName>(
    handrailKey: K
) {
    return z.object({
        finish: z.object({
            color: FinishNameProtocol.refine((val) => Object.values(FinishNameProtocol.enum).includes(val), {
                message: "Invalid finish color",
            }),
            code: FinishCodeProtocol.refine((val) => Object.values(FinishCodeProtocol.enum).includes(val), {
                message: "Invalid finish code",
            }),
        }, { required_error: "Finish is required" }),
        handrailType: HandrailNameProtocol.shape[handrailKey].shape.name,
        handrailCode: HandrailNameProtocol.shape[handrailKey].shape.code,
        wallBracketQuantity: z.number({ required_error: "Wall Bracket Quantity is required" }),
    }) satisfies z.ZodType<WallBracket<K>>;
}

export type Corner<K extends keyof HandrailName> = {
    finish: { color: FinishName, code: FinishCode };
    cornerQuantity: number;
    handrailType: HandrailType<K>["name"],
    handrailCode: HandrailType<K>["code"],
}

export function createCornerProtocol<K extends keyof HandrailName>(
    handrailKey: K
) {
    return z.object({
        finish: z.object({
            color: FinishNameProtocol.refine((val) => Object.values(FinishNameProtocol.enum).includes(val), {
                message: "Invalid finish color",
            }),
            code: FinishCodeProtocol.refine((val) => Object.values(FinishCodeProtocol.enum).includes(val), {
                message: "Invalid finish code",
            }),
        }, { required_error: "Finish is required" }),
        handrailType: HandrailNameProtocol.shape[handrailKey].shape.name,
        handrailCode: HandrailNameProtocol.shape[handrailKey].shape.code,
        cornerQuantity: z.number({ required_error: "Wall Bracket Quantity is required" }),
    }) satisfies z.ZodType<Corner<K>>;
}

export type Joiner<K extends keyof HandrailName> = {
    finish: { color: FinishName, code: FinishCode };
    joinerQuantity: number;
    handrailType: HandrailType<K>["name"],
    handrailCode: HandrailType<K>["code"],
}

export function createJoinerProtocol<K extends keyof HandrailName>(
    handrailKey: K
) {
    return z.object({
        finish: z.object({
            color: FinishNameProtocol.refine((val) => Object.values(FinishNameProtocol.enum).includes(val), {
                message: "Invalid finish color",
            }),
            code: FinishCodeProtocol.refine((val) => Object.values(FinishCodeProtocol.enum).includes(val), {
                message: "Invalid finish code",
            }),
        }, { required_error: "Finish is required" }),
        handrailType: HandrailNameProtocol.shape[handrailKey].shape.name,
        handrailCode: HandrailNameProtocol.shape[handrailKey].shape.code,
        joinerQuantity: z.number({ required_error: "Wall Bracket Quantity is required" }),
    }) satisfies z.ZodType<Joiner<K>>;
}

export type ModularBend<K extends keyof ModularBendHandrailName> = {
    finish: { color: FinishName, code: FinishCode };
    modularBendQuantity: number;
    handrailType: HandrailType<K>["name"],
    handrailCode: HandrailType<K>["code"],
}

export function createModularBendProtocol<K extends keyof ModularBendHandrailName>(
    handrailKey: K
) {
    return z.object({
        finish: z.object({
            color: FinishNameProtocol.refine((val) => Object.values(FinishNameProtocol.enum).includes(val), {
                message: "Invalid finish color",
            }),
            code: FinishCodeProtocol.refine((val) => Object.values(FinishCodeProtocol.enum).includes(val), {
                message: "Invalid finish code",
            }),
        }, { required_error: "Finish is required" }),
        handrailType: HandrailNameProtocol.shape[handrailKey].shape.name,
        handrailCode: HandrailNameProtocol.shape[handrailKey].shape.code,
        modularBendQuantity: z.number({ required_error: "Wall Bracket Quantity is required" }),
    }) satisfies z.ZodType<ModularBend<K>>;
}

export type EPDMRubber<K extends keyof HandrailName> = {
    finish: { color: FinishName, code: FinishCode };
    epdmRubberQuantity: number;
    handrailType: HandrailType<K>["name"],
    handrailCode: HandrailType<K>["code"],
    glassThickness: 12 | 13.52 | 17.52 | 21.52;
}

export function createEPDMRubberrotocol<K extends keyof HandrailName>(
    handrailKey: K
) {
    return z.object({
        finish: z.object({
            color: FinishNameProtocol.refine((val) => Object.values(FinishNameProtocol.enum).includes(val), {
                message: "Invalid finish color",
            }),
            code: FinishCodeProtocol.refine((val) => Object.values(FinishCodeProtocol.enum).includes(val), {
                message: "Invalid finish code",
            }),
        }, { required_error: "Finish is required" }),
        handrailType: HandrailNameProtocol.shape[handrailKey].shape.name,
        handrailCode: HandrailNameProtocol.shape[handrailKey].shape.code,
        epdmRubberQuantity: z.number({ required_error: "Wall Bracket Quantity is required" }),
        glassThickness: z.union([
            z.literal(12),
            z.literal(13.52),
            z.literal(17.52),
            z.literal(21.52),
        ])
    }) satisfies z.ZodType<EPDMRubber<K>>;
}

// type Accessories<K extends keyof HandrailName> = {
//     wallBracket: WallBracket<K>;
//     endCap: HandrailEndCap<K>;
//     corner: Corner<K>;
//     joiner: Joiner<K>;
//     modularBend: K extends keyof ModularBendHandrailName ? ModularBend<K> : null
// }

export function createAccessoriesProtocol<K extends keyof HandrailName>(
    handrailKey: K
) {
    const hasModularBend = handrailKey in ModularBendHandrailNameProtocol.shape;
    return z.object({
        wallBracket: createWallBracketProtocol(handrailKey),
        endCap: createHandrailEndCapProtocol(handrailKey),
        corner: createCornerProtocol(handrailKey),
        joiner: createJoinerProtocol(handrailKey),
        modularBend: hasModularBend ? createModularBendProtocol(handrailKey as keyof ModularBendHandrailName) : z.literal(null)
    });
}

type HandrailAccessories<K extends keyof HandrailName> = z.infer<ReturnType<typeof createAccessoriesProtocol<K>>>;


export type Handrail<K extends keyof HandrailName> = {
    handrailType: HandrailType<K>["name"],
    handrailCode: HandrailType<K>["code"],
    finish: { color: FinishName, code: FinishCode };
    length: [number, number];
    accessories: HandrailAccessories<K>;
    glassThickness: 12 | 13.52 | 17.52 | 21.52;
}

export function createHandRailProtocol<K extends keyof HandrailName>(
    handrailKey: K
) {
    return z.object({
        handrailType: HandrailNameProtocol.shape[handrailKey].shape.name,
        handrailCode: HandrailNameProtocol.shape[handrailKey].shape.code,
        finish: z.object({
            color: FinishNameProtocol.refine((val) => Object.values(FinishNameProtocol.enum).includes(val), {
                message: "Invalid finish color",
            }),
            code: FinishCodeProtocol.refine((val) => Object.values(FinishCodeProtocol.enum).includes(val), {
                message: "Invalid finish code",
            }),
        }, { required_error: "Finish is required" }),
        length: z.tuple([
            z.number({ required_error: "Length L1 is required" }),
            z.number({ required_error: "Length L2 is required" }),
        ], { required_error: "Length is required" }),
        accessories: createAccessoriesProtocol(handrailKey),
        glassThickness: z.union([
            z.literal(12),
            z.literal(13.52),
            z.literal(17.52),
            z.literal(21.52),
        ]),
    }) satisfies z.ZodType<Handrail<K>>;
}

// type AnchorSize<K extends keyof BaseName> = K extends "DOT" ? 100 : K extends "MICRO" ? null : 100 | 150 | 180 | 200;


export function getAnchorSizesProtocol<K extends keyof BaseName>(baseKey: K) {
    if (baseKey === "DOT") {
        return z.literal(100)
    } else if (baseKey === "MICRO") {
        return z.null()
    } else {
        return z.union([
            z.literal(100),
            z.literal(150),
            z.literal(180),
            z.literal(200),
        ])
    }
}

type AnchorSize<T extends keyof BaseName> = z.infer<ReturnType<typeof getAnchorSizesProtocol<T>>>;


export type Anchor<T extends keyof BaseName> = {
    baseProfileID: BaseType<T>["ID"];
    anchorType: BaseType<T>["anchorType"];
    anchorID: BaseType<T>["anchorID"];
    anchorSize: AnchorSize<T>;
    quantity: number;
}

export function createAnchorProtocol<T extends keyof BaseName>(
    baseKey: T
) {
    return z.object({
        baseProfileID: BaseNameProtocol.shape[baseKey].shape.ID,
        anchorType: BaseNameProtocol.shape[baseKey].shape.anchorType,
        anchorID: BaseNameProtocol.shape[baseKey].shape.anchorID,
        anchorSize: getAnchorSizesProtocol(baseKey),
        quantity: z.number({ required_error: "Quantity is required" }),
    }) satisfies z.ZodType<Anchor<T>>;
}