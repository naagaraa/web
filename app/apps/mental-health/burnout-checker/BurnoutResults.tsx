export function BurnoutResults({
  answers,
  questions,
}: {
  answers: { [key: number]: number };
  questions: { id: number; text: string; category: string }[];
}) {
  const scores = { EE: 0, DP: 0, PA: 0 };

  for (const q of questions) {
    scores[q.category as keyof typeof scores] += answers[q.id];
  }

  const interpret = (score: number, category: string) => {
    if (category === "EE") {
      if (score >= 27) return "High";
      if (score >= 17) return "Moderate";
      return "Low";
    } else if (category === "DP") {
      if (score >= 13) return "High";
      if (score >= 7) return "Moderate";
      return "Low";
    } else {
      // PA is inversed
      if (score >= 39) return "Low Burnout";
      if (score >= 32) return "Moderate";
      return "High Burnout Risk";
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center">
        Your Burnout Results
      </h2>
      <div className="bg-white p-4 rounded shadow space-y-2">
        <p>
          <strong>Emotional Exhaustion (EE):</strong> {scores.EE} (
          {interpret(scores.EE, "EE")})
        </p>
        <p>
          <strong>Depersonalization (DP):</strong> {scores.DP} (
          {interpret(scores.DP, "DP")})
        </p>
        <p>
          <strong>Personal Accomplishment (PA):</strong> {scores.PA} (
          {interpret(scores.PA, "PA")})
        </p>
      </div>
    </div>
  );
}
