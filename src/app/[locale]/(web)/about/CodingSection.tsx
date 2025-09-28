import Image from "next/image";
import useLoading from "@/composables/hook/useLoading";
import Describe from "@/src/components/common/Describe";
import WrapperContent from "@/src/components/ui/WrapperContent";
import SectionHeader from "./SectionHeader";

export default function CodingSection() {
  const { isLoading } = useLoading(true, 500);

  if (isLoading) {
    return (
      <WrapperContent>
        <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto animate-pulse"></div>
        <div className="w-full h-72 md:h-96 bg-gray-300 rounded-xl mx-auto animate-pulse"></div>
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
