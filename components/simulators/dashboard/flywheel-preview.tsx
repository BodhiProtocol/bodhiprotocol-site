import { FlywheelDiagram } from "@/components/simulators/flywheel/flywheel-diagram";
import { DEFAULT_STATE } from "@/components/simulators/flywheel/use-flywheel-simulator";

function FlywheelPreview() {
  return (
    <div className="mx-auto w-full max-w-[200px]">
      <FlywheelDiagram state={DEFAULT_STATE} momentum={55} spinning selfSustaining={false} />
    </div>
  );
}

export { FlywheelPreview };
