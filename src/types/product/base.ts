import { Anchor, Cover, BaseEndCap, CoverProtocol, createBaseEndCapProtocol, createAnchorProtocol, createHandRailProtocol } from "./accessories";
import { BaseName, BaseType, DotFinishCode, DotFinishName, FinishName, FinishCode, HandrailName, FinishNameProtocol, FinishCodeProtocol, DotFinishNameProtocol, DotFinishCodeProtocol, BaseNameProtocol, HandrailNameProtocol } from "./common";
import { z } from 'zod'

type AceBaseType<T extends keyof BaseName> = {
    blockSize: [number, number, number, number];
    quantity: number;
    finish: { color: FinishName, code: FinishCode };
    cover: Cover
    endCap: BaseEndCap<T>;
    anchor: Anchor<T>
}

export function createAceBaseProtocol<T extends keyof BaseName>(baseKey: T) {
    return z.object({
        finish: z.object({
            color: FinishNameProtocol.refine((val) => Object.values(FinishNameProtocol.enum).includes(val), {
                message: "Invalid finish color",
            }),
            code: FinishCodeProtocol.refine((val) => Object.values(FinishCodeProtocol.enum).includes(val), {
                message: "Invalid finish code",
            }),
        }, { required_error: "Finish is required" }),
        blockSize: z.tuple([z.number({ required_error: "Q1 is required" }), z.number({ required_error: "Q2 is required" }), z.number({ required_error: "Q3 is required" }), z.number({ required_error: "Q4 is required" })], { required_error: "Quantity is required is required" }),
        quantity: z.number({ required_error: "Quantity is required" }),
        cover: CoverProtocol,
        endCap: createBaseEndCapProtocol(baseKey),
        anchor: createAnchorProtocol(baseKey)
    }) satisfies z.ZodType<AceBaseType<T>>
}

type ContinousBaseType<T extends keyof BaseName> = {
    length: [number, number];
    quantity: number;
    finish: { color: FinishName, code: FinishCode };
    endCap: BaseEndCap<T>;
    anchor: Anchor<T>
}

export function createContinousBaseProtocol<T extends keyof BaseName>(baseKey: T) {
    return z.object({
        finish: z.object({
            color: FinishNameProtocol.refine((val) => Object.values(FinishNameProtocol.enum).includes(val), {
                message: "Invalid finish color",
            }),
            code: FinishCodeProtocol.refine((val) => Object.values(FinishCodeProtocol.enum).includes(val), {
                message: "Invalid finish code",
            }),
        }, { required_error: "Finish is required" }),
        length: z.tuple([z.number({ required_error: "L1 is required" }), z.number({ required_error: "L2 is required" })], { required_error: "Cover Length is required" }),
        quantity: z.number({ required_error: "Quantity is required" }),
        endCap: createBaseEndCapProtocol(baseKey),
        anchor: createAnchorProtocol(baseKey)
    }) satisfies z.ZodType<ContinousBaseType<T>>
}

type SemiBaseType<T extends keyof BaseName> = {
    quantity: number;
    finish: { color: FinishName, code: FinishCode };
    anchor: Anchor<T>
}

export function createSemiBaseProtocol<T extends keyof BaseName>(baseKey: T) {
    return z.object({
        finish: z.object({
            color: FinishNameProtocol.refine((val) => Object.values(FinishNameProtocol.enum).includes(val), {
                message: "Invalid finish color",
            }),
            code: FinishCodeProtocol.refine((val) => Object.values(FinishCodeProtocol.enum).includes(val), {
                message: "Invalid finish code",
            }),
        }, { required_error: "Finish is required" }),
        quantity: z.number({ required_error: "Quantity is required" }),
        anchor: createAnchorProtocol(baseKey)
    }) satisfies z.ZodType<SemiBaseType<T>>
}

type SpigotBaseType<T extends keyof BaseName> = {
    size: 100 | 150 | 200 | 250 | 300;
    quantity: number;
    finish: { color: FinishName, code: FinishCode };
    anchor: Anchor<T>
}

export function createSpigotBaseProtocol<T extends keyof BaseName>(baseKey: T) {
    return z.object({
        finish: z.object({
            color: FinishNameProtocol.refine((val) => Object.values(FinishNameProtocol.enum).includes(val), {
                message: "Invalid finish color",
            }),
            code: FinishCodeProtocol.refine((val) => Object.values(FinishCodeProtocol.enum).includes(val), {
                message: "Invalid finish code",
            }),
        }, { required_error: "Finish is required" }),
        quantity: z.number({ required_error: "Quantity is required" }),
        anchor: createAnchorProtocol(baseKey),
        size: z.union([
            z.literal(100),
            z.literal(150),
            z.literal(200),
            z.literal(250),
            z.literal(300)
        ]),
    }) satisfies z.ZodType<SpigotBaseType<T>>
}

type DotBaseType<T extends keyof BaseName> = {
    grade: 304 | 316;
    size: 50;
    quantity: number;
    finish: { color: DotFinishName, code: DotFinishCode };
    anchor: Anchor<T>
}

export function createDotBaseProtocol<T extends keyof BaseName>(baseKey: T) {
    return z.object({
        finish: z.object({
            color: DotFinishNameProtocol.refine((val) => Object.values(DotFinishNameProtocol.enum).includes(val), {
                message: "Invalid finish color",
            }),
            code: DotFinishCodeProtocol.refine((val) => Object.values(DotFinishCodeProtocol.enum).includes(val), {
                message: "Invalid finish code",
            }),
        }, { required_error: "Finish is required" }),
        quantity: z.number({ required_error: "Quantity is required" }),
        anchor: createAnchorProtocol(baseKey),
        size: z.literal(50),
        grade: z.union([
            z.literal(304),
            z.literal(316)
        ])
    }) satisfies z.ZodType<DotBaseType<T>>
}

type MicroBaseType<T extends keyof BaseName> = {
    quantity: number;
    length: 12;
    finish: { color: FinishName, code: FinishCode };
    anchor: Anchor<T>
}

export function createMicroBaseProtocol<T extends keyof BaseName>(baseKey: T) {
    return z.object({
        finish: z.object({
            color: FinishNameProtocol.refine((val) => Object.values(FinishNameProtocol.enum).includes(val), {
                message: "Invalid finish color",
            }),
            code: FinishCodeProtocol.refine((val) => Object.values(FinishCodeProtocol.enum).includes(val), {
                message: "Invalid finish code",
            }),
        }, { required_error: "Finish is required" }),
        quantity: z.number({ required_error: "Quantity is required" }),
        anchor: createAnchorProtocol(baseKey),
        length: z.literal(12)
    }) satisfies z.ZodType<MicroBaseType<T>>
}

// export type Ace<K extends keyof HandrailName> = {
//     baseProfileID: BaseType<"ACE">["ID"]
//     base: AceBaseType<"ACE">[];
//     handrail: Handrail<K>
// }

export function createAceProtocol(handrailKey: keyof HandrailName | null) {
    return z.object({
        baseProfileID: BaseNameProtocol.shape["ACE"].shape.ID,
        base: createAceBaseProtocol("ACE"),
        handrail: handrailKey ? createHandRailProtocol(handrailKey).nullable() : z.literal(null)
    })
}

export type Ace = z.infer<ReturnType<typeof createAceProtocol>>

// export type Pro<K extends keyof HandrailName> = {
//     baseProfileID: BaseType<"PRO">["ID"];
//     base: ContinousBaseType<"PRO">[];
//     handrail: Handrail<K>
// }

export function createProProtocol(handrailKey: keyof HandrailName | null) {
    return z.object({
        baseProfileID: BaseNameProtocol.shape["PRO"].shape.ID,
        base: createContinousBaseProtocol("PRO"),
        handrail: handrailKey ? createHandRailProtocol(handrailKey).nullable() : z.literal(null)
    })
}

export type Pro = z.infer<ReturnType<typeof createProProtocol>>;


// export type Smart<K extends keyof HandrailName> = {
//     baseProfileID: BaseType<"SMART">["ID"];
//     base: ContinousBaseType<"SMART">[];
//     handrail: Handrail<K>
// }

export function createSmartProtocol(handrailKey: keyof HandrailName | null) {
    return z.object({
        baseProfileID: BaseNameProtocol.shape["SMART"].shape.ID,
        base: createContinousBaseProtocol("SMART"),
        handrail: handrailKey ? createHandRailProtocol(handrailKey).nullable() : z.literal(null)
    })
}

export type Smart = z.infer<ReturnType<typeof createSmartProtocol>>;


// export type Mini<K extends keyof HandrailName> = {
//     baseProfileID: BaseType<"MINI">["ID"];
//     base: ContinousBaseType<"MINI">[];
//     handrail: Handrail<K>
// }

export function createMiniProtocol(handrailKey: keyof HandrailName | null) {
    return z.object({
        baseProfileID: BaseNameProtocol.shape["MINI"].shape.ID,
        base: createContinousBaseProtocol("MINI"),
        handrail: handrailKey ? createHandRailProtocol(handrailKey).nullable() : z.literal(null)
    })
}

export type Mini = z.infer<ReturnType<typeof createMiniProtocol>>;


// export type SemiPro<K extends keyof HandrailName> = {
//     baseProfileID: BaseType<"SEMIPRO">["ID"];
//     base: SemiBaseType<"SEMIPRO">[];
//     handrail: Handrail<K>
// }

export function createSemiProProtocol(handrailKey: keyof HandrailName | null) {
    return z.object({
        baseProfileID: BaseNameProtocol.shape["SEMIPRO"].shape.ID,
        base: createSemiBaseProtocol("SEMIPRO"),
        handrail: handrailKey ? createHandRailProtocol(handrailKey).nullable() : z.literal(null)
    })
}

export type SemiPro = z.infer<ReturnType<typeof createSemiProProtocol>>;


// export type SemiSmart<K extends keyof HandrailName> = {
//     baseProfileID: BaseType<"SEMISMART">["ID"];
//     base: SemiBaseType<"SEMISMART">[];
//     handrail: Handrail<K>
// }

export function createSemiSmartProtocol(handrailKey: keyof HandrailName | null) {
    return z.object({
        baseProfileID: BaseNameProtocol.shape["SEMISMART"].shape.ID,
        base: createSemiBaseProtocol("SEMISMART"),
        handrail: handrailKey ? createHandRailProtocol(handrailKey).nullable() : z.literal(null)
    })
}

export type SemiSmart = z.infer<ReturnType<typeof createSemiSmartProtocol>>;


// export type SemiMini<K extends keyof HandrailName> = {
//     baseProfileID: BaseType<"SEMIMINI">["ID"];
//     base: SemiBaseType<"SEMIMINI">[];
//     handrail: Handrail<K>
// }

export function createSemiMiniProtocol(handrailKey: keyof HandrailName | null) {
    return z.object({
        baseProfileID: BaseNameProtocol.shape["SEMIMINI"].shape.ID,
        base: createSemiBaseProtocol("SEMIMINI"),
        handrail: handrailKey ? createHandRailProtocol(handrailKey).nullable() : z.literal(null)
    })
}

export type SemiMini = z.infer<ReturnType<typeof createSemiMiniProtocol>>;


// export type Lux<K extends keyof HandrailName> = {
//     baseProfileID: BaseType<"LUX">["ID"];
//     base: SemiBaseType<"LUX">[];
//     handrail: Handrail<K>
// }

export function createLuxProtocol(handrailKey: keyof HandrailName | null) {
    return z.object({
        baseProfileID: BaseNameProtocol.shape["LUX"].shape.ID,
        base: createSemiBaseProtocol("LUX"),
        handrail: handrailKey ? createHandRailProtocol(handrailKey).nullable() : z.literal(null)
    })
}

export type Lux = z.infer<ReturnType<typeof createLuxProtocol>>;


// export type Spigot<K extends keyof HandrailName> = {
//     baseProfileID: BaseType<"SPIGOT">["ID"];
//     base: SpigotBaseType<"SPIGOT">[];
//     handrail: Handrail<K>
// }

export function createSpigotProtocol(handrailKey: keyof HandrailName | null) {
    return z.object({
        baseProfileID: BaseNameProtocol.shape["SPIGOT"].shape.ID,
        base: createSpigotBaseProtocol("SPIGOT"),
        handrail: handrailKey ? createHandRailProtocol(handrailKey).nullable() : z.literal(null)
    })
}

export type Spigot = z.infer<ReturnType<typeof createSpigotProtocol>>;


// export type Dot<K extends keyof HandrailName> = {
//     baseProfileID: BaseType<"DOT">["ID"];
//     base: DotBaseType<"DOT">[];
//     handrail: Handrail<K>
// }

export function createDotProtocol(handrailKey: keyof HandrailName | null) {
    return z.object({
        baseProfileID: BaseNameProtocol.shape["DOT"].shape.ID,
        base: createDotBaseProtocol("DOT"),
        handrail: handrailKey ? createHandRailProtocol(handrailKey).nullable() : z.literal(null)
    })
}

export type Dot = z.infer<ReturnType<typeof createDotProtocol>>;


// export type Micro<K extends keyof HandrailName> = {
//     baseProfileID: BaseType<"MICRO">["ID"];
//     base: MicroBaseType<"MICRO">[];
//     handrail: Handrail<K>
// }

export function createMicroProtocol(handrailKey: keyof HandrailName | null) {
    return z.object({
        baseProfileID: BaseNameProtocol.shape["MICRO"].shape.ID,
        base: createMicroBaseProtocol("MICRO"),
        handrail: handrailKey ? createHandRailProtocol(handrailKey).nullable() : z.literal(null)
    })
}

export type Micro = z.infer<ReturnType<typeof createMicroProtocol>>;
