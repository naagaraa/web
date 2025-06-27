import Describe from "@/src/components/common/Describe";
import Section from "@/src/components/ui/Section";
import { useTranslations } from "next-intl";

export default function StorySection() {
  const t = useTranslations("About.Story");
  return (
    <Section>
      <Describe value={t("paragraphs.1")} />
      <Describe value={t("paragraphs.2")} />
      <Describe value={t("paragraphs.3")} />
      <Describe value={t("paragraphs.4")} />
    </Section>
  );
}
