import Describe from "@/src/components/common/Describe";
import SubTitle from "@/src/components/common/SubTitle";
import Title from "@/src/components/common/Title";
import Section from "@/src/components/ui/Section";
import { useTranslations } from "next-intl";

export default function CertificationSection() {
  const t = useTranslations("About.Certification");
  return (
    <Section>
      <Title value={t("title")} />
      <SubTitle value={t("paragraphs.1")} />
      <Describe value={t("paragraphs.2")} />
      <Describe value={t("paragraphs.3")} />
      <Describe value={t("paragraphs.4")} />
    </Section>
  );
}
