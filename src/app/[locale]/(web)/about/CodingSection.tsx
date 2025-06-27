import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import useLoading from "@/composables/hook/useLoading";
import Describe from "@/src/components/common/Describe";
import WrapperContent from "@/src/components/ui/WrapperContent";
import SectionHeader from "./SectionHeader";

export default function CodingSection() {
  const { isLoading } = useLoading(true, 500);

  if (isLoading) {
    return (
      <WrapperContent>
        <Skeleton count={6} height={20} className="mb-2" />
        <Skeleton height={200} className="my-4" />
        <Skeleton count={2} height={20} />
      </WrapperContent>
    );
  }

  return (
    <WrapperContent>
      <SectionHeader
        title="GitHub Activity"
        description="Recent coding contributions on GitHub"
        link="https://github.com/naagaraa"
      />

      <div className="flex justify-center items-center">
        <Image
          src="https://ghchart.rshah.org/naagaraa"
          alt="GitHub contribution graph for @naagaraa"
          width={800}
          height={200}
          priority
          unoptimized
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>

      <Describe value="Most of my recent coding activity has moved to GitLab over the past 3 years due to company preferences and workflows." />

      <SectionHeader
        title="GitLab"
        description="Recent coding contributions on GitLab"
        link="https://gitlab.com/naagaraa"
      />
    </WrapperContent>
  );
}
