import { Finish } from "./common";

enum DotFinish {
    SSMATT = "SSMatt",
    SSGLOSSY = "SSGlossy",
    GOLDMATT = "GoldMatt",
    GOLDGLOSSY = "GoldGlossy",
    ROSEGOLDMATT = "RoseGoldMatt",
    ROSEGOLDGLOSSY = "RoseGoldGLossy",
    BLACKMATT = "BlackMatt",
    BLACKGLOSSY = "BlackGlossy"
}

type BaseName = {
    ACE: { anchorType: "C10", ID: "A50" },
    PRO: { anchorType: "H10", ID: "L50" },
    SMART: { anchorType: "H10", ID: "C75" },
    MINI: { anchorType: "H8", ID: "F55" },
    SEMIPRO: { anchorType: "H10", ID: "C50" },
    SEMISMART: { anchorType: "H10", ID: "D75" },
    SEMIMINI: { anchorType: "H8", ID: "D55" },
    LUX: { anchorType: "C10", ID: "T100" },
    SPIGOT: { anchorType: "C10", ID: "E80" },
    DOT: { anchorType: "M12", ID: "E50" },
    MICRO: { anchorType: "NA", ID: "F40" }
};

type BaseType<T extends keyof BaseName> = BaseName[T];


type AceBaseType<T extends keyof BaseName> = {
    size: number;
    quantity: number;
    finish: Finish;
    coverQuantity: [number, number]
    endCapQuantity: number;
    anchorType: BaseType<T>["anchorType"]
    anchorSize: number
}

type ContinousBaseType<T extends keyof BaseName> = {
    length: number;
    quantity: number;
    finish: Finish;
    endCapQuantity: number;
    anchorType: BaseType<T>["anchorType"]
    anchorSize: number
}

type SemiBaseType<T extends keyof BaseName> = {
    quantity: number;
    finish: Finish;
    anchorType: BaseType<T>["anchorType"]
    anchorSize: number
}

type SpigotBaseType<T extends keyof BaseName> = {
    size: 100 | 150 | 200 | 250 | 300;
    quantity: number;
    finish: Finish;
    anchorType: BaseType<T>["anchorType"]
    anchorSize: number
}

type DotBaseType<T extends keyof BaseName> = {
    grade: 304 | 316;
    size: 50 | 38;
    quantity: number;
    finish: DotFinish;
    anchorType: BaseType<T>["anchorType"]
    anchorSize: 100
}

type MicroBaseType<T extends keyof BaseName> = {
    quantity: number;
    length: 12;
    finish: Finish;
    anchorType: BaseType<T>["anchorType"]
}

export type ACE<T extends keyof BaseName = "ACE"> = {
    baseProfileID: BaseType<T>["ID"]
    base: AceBaseType<T>[];
}

export type Pro<T extends keyof BaseName = "PRO"> = {
    baseProfileID: BaseType<T>["ID"];
    base: ContinousBaseType<T>[];
}
export type Smart<T extends keyof BaseName = "SMART"> = {
    baseProfileID: BaseType<T>["ID"];
    base: ContinousBaseType<T>[];
}
export type Mini<T extends keyof BaseName = "MINI"> = {
    baseProfileID: BaseType<T>["ID"];
    base: ContinousBaseType<T>[];
}
export type SemiPro<T extends keyof BaseName = "SEMIPRO"> = {
    baseProfileID: BaseType<T>["ID"];
    base: SemiBaseType<T>[];
}
export type SemiSmart<T extends keyof BaseName = "SEMISMART"> = {
    baseProfileID: BaseType<T>["ID"];
    base: SemiBaseType<T>[];
}
export type SemiMini<T extends keyof BaseName = "SEMIMINI"> = {
    baseProfileID: BaseType<T>["ID"];
    base: SemiBaseType<T>[];
}
export type Lux<T extends keyof BaseName = "LUX"> = {
    baseProfileID: BaseType<T>["ID"];
    base: SemiBaseType<T>[];
}

export type Spigot<T extends keyof BaseName = "SPIGOT"> = {
    baseProfileID: BaseType<T>["ID"];
    base: SpigotBaseType<T>[];
}

export type Dot<T extends keyof BaseName = "DOT"> = {
    baseProfileID: BaseType<T>["ID"];
    base: DotBaseType<T>[];
}

export type Micro<T extends keyof BaseName = "MICRO"> = {
    baseProfileID: BaseType<T>["ID"];
    base: MicroBaseType<T>[];
}





