import { SwitchingWellVisualization } from "@/components/simulators/switching-costs/switching-well-visualization";
import { DEFAULT_STATE } from "@/components/simulators/switching-costs/use-switching-costs-simulator";

function SwitchingCostsPreview() {
  return (
    <div className="mx-auto w-full max-w-[200px]">
      <SwitchingWellVisualization state={DEFAULT_STATE} switchingCost={18} escaped={false} strainRatio={0.83} />
    </div>
  );
}

export { SwitchingCostsPreview };
