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
    length: number;
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
        length: z.number({ required_error: "Length is required" }),
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
    size: 50 | 38;
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
        size: z.union([
            z.literal(50),
            z.literal(38),
        ]),
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
        handrail: handrailKey ? createHandRailProtocol(handrailKey).nullable() : z.literal(undefined)
    })
}

export type Ace = z.infer<ReturnType<typeof createAceProtocol>>

// export type Pro<K extends keyof HandrailName> = {
//     baseProfileID: BaseType<"PRO">["ID"];
//     base: ContinousBaseType<"PRO">[];
//     handrail: Handrail<K>
// }

export function createProProtocol<K extends keyof HandrailName>(handrailKey: K) {
    return z.object({
        baseProfileID: BaseNameProtocol.shape["PRO"].shape.ID,
        base: z.array(createContinousBaseProtocol("PRO")),
        handrail: createHandRailProtocol(handrailKey)
    })
}

export type Pro<K extends keyof HandrailName> = z.infer<ReturnType<typeof createProProtocol<K>>>;


// export type Smart<K extends keyof HandrailName> = {
//     baseProfileID: BaseType<"SMART">["ID"];
//     base: ContinousBaseType<"SMART">[];
//     handrail: Handrail<K>
// }

export function createSmartProtocol<K extends keyof HandrailName>(handrailKey: K) {
    return z.object({
        baseProfileID: BaseNameProtocol.shape["SMART"].shape.ID,
        base: z.array(createContinousBaseProtocol("SMART")),
        handrail: createHandRailProtocol(handrailKey)
    })
}

export type Smart<K extends keyof HandrailName> = z.infer<ReturnType<typeof createSmartProtocol<K>>>;


// export type Mini<K extends keyof HandrailName> = {
//     baseProfileID: BaseType<"MINI">["ID"];
//     base: ContinousBaseType<"MINI">[];
//     handrail: Handrail<K>
// }

export function createMiniProtocol<K extends keyof HandrailName>(handrailKey: K) {
    return z.object({
        baseProfileID: BaseNameProtocol.shape["MINI"].shape.ID,
        base: z.array(createContinousBaseProtocol("MINI")),
        handrail: createHandRailProtocol(handrailKey)
    })
}

export type Mini<K extends keyof HandrailName> = z.infer<ReturnType<typeof createMiniProtocol<K>>>;


// export type SemiPro<K extends keyof HandrailName> = {
//     baseProfileID: BaseType<"SEMIPRO">["ID"];
//     base: SemiBaseType<"SEMIPRO">[];
//     handrail: Handrail<K>
// }

export function createSemiProProtocol<K extends keyof HandrailName>(handrailKey: K) {
    return z.object({
        baseProfileID: BaseNameProtocol.shape["SEMIPRO"].shape.ID,
        base: z.array(createSemiBaseProtocol("SEMIPRO")),
        handrail: createHandRailProtocol(handrailKey)
    })
}

export type SemiPro<K extends keyof HandrailName> = z.infer<ReturnType<typeof createSemiProProtocol<K>>>;


// export type SemiSmart<K extends keyof HandrailName> = {
//     baseProfileID: BaseType<"SEMISMART">["ID"];
//     base: SemiBaseType<"SEMISMART">[];
//     handrail: Handrail<K>
// }

export function createSemiSmartProtocol<K extends keyof HandrailName>(handrailKey: K) {
    return z.object({
        baseProfileID: BaseNameProtocol.shape["SEMISMART"].shape.ID,
        base: z.array(createSemiBaseProtocol("SEMISMART")),
        handrail: createHandRailProtocol(handrailKey)
    })
}

export type SemiSmart<K extends keyof HandrailName> = z.infer<ReturnType<typeof createSemiSmartProtocol<K>>>;


// export type SemiMini<K extends keyof HandrailName> = {
//     baseProfileID: BaseType<"SEMIMINI">["ID"];
//     base: SemiBaseType<"SEMIMINI">[];
//     handrail: Handrail<K>
// }

export function createSemiMiniProtocol<K extends keyof HandrailName>(handrailKey: K) {
    return z.object({
        baseProfileID: BaseNameProtocol.shape["SEMIMINI"].shape.ID,
        base: z.array(createSemiBaseProtocol("SEMIMINI")),
        handrail: createHandRailProtocol(handrailKey)
    })
}

export type SemiMini<K extends keyof HandrailName> = z.infer<ReturnType<typeof createSemiMiniProtocol<K>>>;


// export type Lux<K extends keyof HandrailName> = {
//     baseProfileID: BaseType<"LUX">["ID"];
//     base: SemiBaseType<"LUX">[];
//     handrail: Handrail<K>
// }

export function createLuxProtocol<K extends keyof HandrailName>(handrailKey: K) {
    return z.object({
        baseProfileID: BaseNameProtocol.shape["LUX"].shape.ID,
        base: z.array(createSemiBaseProtocol("LUX")),
        handrail: createHandRailProtocol(handrailKey)
    })
}

export type Lux<K extends keyof HandrailName> = z.infer<ReturnType<typeof createLuxProtocol<K>>>;


// export type Spigot<K extends keyof HandrailName> = {
//     baseProfileID: BaseType<"SPIGOT">["ID"];
//     base: SpigotBaseType<"SPIGOT">[];
//     handrail: Handrail<K>
// }

export function createSpigotProtocol<K extends keyof HandrailName>(handrailKey: K) {
    return z.object({
        baseProfileID: BaseNameProtocol.shape["SPIGOT"].shape.ID,
        base: z.array(createSpigotBaseProtocol("SPIGOT")),
        handrail: createHandRailProtocol(handrailKey)
    })
}

export type Spigot<K extends keyof HandrailName> = z.infer<ReturnType<typeof createSpigotProtocol<K>>>;


// export type Dot<K extends keyof HandrailName> = {
//     baseProfileID: BaseType<"DOT">["ID"];
//     base: DotBaseType<"DOT">[];
//     handrail: Handrail<K>
// }

export function createDotProtocol<K extends keyof HandrailName>(handrailKey: K) {
    return z.object({
        baseProfileID: BaseNameProtocol.shape["DOT"].shape.ID,
        base: z.array(createDotBaseProtocol("DOT")),
        handrail: createHandRailProtocol(handrailKey)
    })
}

export type Dot<K extends keyof HandrailName> = z.infer<ReturnType<typeof createDotProtocol<K>>>;


// export type Micro<K extends keyof HandrailName> = {
//     baseProfileID: BaseType<"MICRO">["ID"];
//     base: MicroBaseType<"MICRO">[];
//     handrail: Handrail<K>
// }

export function createMicroProtocol<K extends keyof HandrailName>(handrailKey: K) {
    return z.object({
        baseProfileID: BaseNameProtocol.shape["MICRO"].shape.ID,
        base: z.array(createMicroBaseProtocol("MICRO")),
        handrail: createHandRailProtocol(handrailKey)
    })
}

export type Micro<K extends keyof HandrailName> = z.infer<ReturnType<typeof createMicroProtocol<K>>>;
