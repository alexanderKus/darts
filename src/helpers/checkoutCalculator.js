const singles = Array.from({ length: 20 }, (_, i) => i + 1);
const doubles = singles.map(n => n * 2);
const trebles = singles.map(n => n * 3);
const bull = 50;
const outerBull = 25;

const allScores = [
  ...singles.map(n => ({ name: `S${n}`, value: n })),
  ...doubles.map(n => ({ name: `D${n / 2}`, value: n })),
  ...trebles.map(n => ({ name: `T${n / 3}`, value: n })),
  { name: "Bull", value: bull },
  { name: "Outer Bull", value: outerBull },
];

export function getCheckouts(remainingScore, mustDouble = true) {
  const results = [];

  // try 1-dart finish
  for (const dart1 of allScores) {
    if (dart1.value === remainingScore && (!mustDouble || dart1.name.startsWith("D") || dart1.name === "Bull")) {
      results.push([dart1.name]);
    }
  }

  // try 2-dart finish
  for (const dart1 of allScores) {
    for (const dart2 of allScores) {
      if (
        dart1.value + dart2.value === remainingScore &&
        (!mustDouble || dart2.name.startsWith("D") || dart2.name === "Bull")
      ) {
        results.push([dart1.name, dart2.name]);
      }
    }
  }

  // try 3-dart finish (max standard)
  for (const dart1 of allScores) {
    for (const dart2 of allScores) {
      for (const dart3 of allScores) {
        if (
          dart1.value + dart2.value + dart3.value === remainingScore &&
          (!mustDouble || dart3.name.startsWith("D") || dart3.name === "Bull")
        ) {
          results.push([dart1.name, dart2.name, dart3.name]);
        }
      }
    }
  }

  // remove duplicates and sort
  const uniqueResults = results
    .map(r => r.join(", "))
    .filter((v, i, arr) => arr.indexOf(v) === i);

  if (uniqueResults.length === 0) {
    return [];
  }

  return uniqueResults.slice(0, 5); // limit to 5 best options
}