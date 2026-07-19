import { NetworkGraph } from "@/components/simulators/network-effects/network-graph";

function NetworkEffectsPreview() {
  return (
    <div className="mx-auto w-full max-w-[200px]">
      <NetworkGraph users={8000} mode="positive" congested={false} />
    </div>
  );
}

export { NetworkEffectsPreview };
