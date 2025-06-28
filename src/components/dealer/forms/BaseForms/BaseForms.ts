import { baseValues } from "../../../../lib/BaseSelect"
import { BaseName } from "../../../../types/product/common"
import { AceForm } from "./AceForm"
import { DotForm } from "./DotForm"
import { LuxForm } from "./LuxForm"
import { MicroForm } from "./MicroForm"
import { MiniForm } from "./MiniForm"
import { ProForm } from "./ProForm"
import { SemiMiniForm } from "./SemiMiniForm"
import { SemiProForm } from "./SemiProForm"
import { SemiSmartForm } from "./SemiSmartForm"
import { SmartForm } from "./SmartForm"
import { SpigotForm } from "./SpigotForm"

export const baseForms: Record<keyof BaseName, React.FC<any>> = {
    ACE: AceForm,
    PRO: ProForm,
    SMART: SmartForm,
    SEMIPRO: SemiProForm,
    SEMISMART: SemiSmartForm,
    SEMIMINI: SemiMiniForm,
    MINI: MiniForm,
    LUX: LuxForm,
    SPIGOT: SpigotForm,
    DOT: DotForm,
    MICRO: MicroForm,
}