import { CoverForm } from "../forms/CoverForm"
import { AnchorForm } from "../forms/AnchorForm"
import { WallBracketForm } from "../forms/WallBracketForm"
import { BaseBlockForm } from "../forms/BaseBlockForm"
import { CornerForm } from "../forms/CornerForm"
import { HandrailEndCapForm } from "../forms/HandrailEndCap"
import { JoinerForm } from "../forms/Joiner"
import { EPDMRubberFrom } from "../forms/EPDMRubberForm"
import { ModularBendForm } from "../forms/ModularBendForm"
import { BaseEndCapForm } from "../forms/BaseEndCapForm"
import { HandrailForm } from "../forms/HandrailForm"

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