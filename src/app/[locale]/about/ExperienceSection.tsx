import { ExperienceItems } from "@/data/Experience";
import Describe from "@/src/components/common/Describe";
import SubTitle from "@/src/components/common/SubTitle";
import Title from "@/src/components/common/Title";
import ListEducation from "@/src/components/ui/list/ListEducation";
import Section from "@/src/components/ui/Section";
import { useTranslations } from "next-intl";

export default function ExperienceSection() {
  const t = useTranslations("About.Experience");
  return (
    <Section>
      <Title value={t("title")} />
      <SubTitle value={t("paragraphs.1")} />
      <Describe value={t("paragraphs.2")} />
      <Describe value={t("paragraphs.3")} />
      <Describe value={t("paragraphs.4")} />
      <ListEducation dataItems={ExperienceItems} />
    </Section>
  );
}
