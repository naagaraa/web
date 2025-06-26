import { EducationItems } from "@/data/Education";
import Describe from "@/src/components/common/Describe";
import Title from "@/src/components/common/Title";
import List from "@/src/components/common/List";
import Section from "@/src/components/ui/Section";

export default function Education() {
  return (
    <Section>
      <Title value="Education" />
      <Describe value="Education what i got it This is also long journey" />
      <List modelItem="education" dataItems={EducationItems} />
    </Section>
  );
}
