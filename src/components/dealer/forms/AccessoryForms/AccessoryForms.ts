import { CoverForm } from "./CoverForm"
import { AnchorForm } from "./AnchorForm"
import { WallBracketForm } from "./WallBracketForm"
import { BaseBlockForm } from "./BaseBlockForm"
import { CornerForm } from "./CornerForm"
import { HandrailEndCapForm } from "./HandrailEndCap"
import { JoinerForm } from "./Joiner"
import { EPDMRubberFrom } from "./EPDMRubberForm"
import { ModularBendForm } from "./ModularBendForm"
import { BaseEndCapForm } from "./BaseEndCapForm"
import { HandrailForm } from "./HandrailForm"

const accessoryForms: {
    BA: typeof AnchorForm,
    BC: typeof CoverForm,
    BB: typeof BaseBlockForm
    BEC: typeof BaseEndCapForm
    CC: typeof CornerForm
    FC: typeof ModularBendForm
    H: typeof HandrailForm
    HEC: typeof HandrailEndCapForm
    LJ: typeof JoinerForm
    RG: typeof EPDMRubberFrom
    WB: typeof WallBracketForm
} = {
    BA: AnchorForm,
    BC: CoverForm,
    BB: BaseBlockForm,
    BEC: BaseEndCapForm,
    CC: CornerForm,
    FC: ModularBendForm,
    H: HandrailForm,
    HEC: HandrailEndCapForm,
    LJ: JoinerForm,
    RG: EPDMRubberFrom,
    WB: WallBracketForm,
}

export const handrailAccessoryForms: {
    CC: typeof CornerForm
    FC: typeof ModularBendForm
    H: typeof HandrailForm
    HEC: typeof HandrailEndCapForm
    LJ: typeof JoinerForm
    RG: typeof EPDMRubberFrom
    WB: typeof WallBracketForm
} = {
    CC: CornerForm,
    FC: ModularBendForm,
    H: HandrailForm,
    HEC: HandrailEndCapForm,
    LJ: JoinerForm,
    RG: EPDMRubberFrom,
    WB: WallBracketForm,
}

export const baseAccessoryForms: {
    BA: typeof AnchorForm,
    BC: typeof CoverForm,
    BB: typeof BaseBlockForm
    BEC: typeof BaseEndCapForm
} = {
    BA: AnchorForm,
    BC: CoverForm,
    BB: BaseBlockForm,
    BEC: BaseEndCapForm,
}

export type AccessoryCode = keyof typeof accessoryForms
export type HandrailAccessoryCode = keyof typeof handrailAccessoryForms
export type BaseAccessoryCode = keyof typeof baseAccessoryForms