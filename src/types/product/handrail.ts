import { Finish } from "./common";

enum handrailtype {
    SLEEK12 = "Sleek12",
    SLEEK17 = "Sleek17",
    SLEEK21 = "Sleek21",
    SQUARE40 = "Square40",
    SQUARE50 = "Square50",
    ROUND50 = "Round50",
    OVAL60 = "Oval60",
    LED20 = "LED20",
    LED40 = "LED40",
    LED80 = "LED80"
}

type Accessories = {
    wallBracketQuantity: number;
    endCapQuantity: number;
    cornerQuantity: number;
    joinerQuantity: number;
    modularBendQuantity?: number;
}

export type HandRail = {
    handrailtype: handrailtype;
    finish: Finish;
    length: [number, number];
    accessories: Accessories;
    glassThickness: 12 | 13.52 | 17.52 | 21.52;
}