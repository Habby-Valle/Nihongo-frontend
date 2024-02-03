type AdjectiveType = "Adjective - i" | "Adjective - na"
type VerbType = "Verb - Group 1" | "Verb - Group 2" | "Verb - Group 3"

export type TypeLevel = "N1" | "N2" | "N3" | "N4" | "N5" | "Unknown"

export type TypeWord =
  | VerbType
  | "Noun"
  | AdjectiveType
  | "Adverb"
  | "Pronoun"
  | "Preposition"
  | "Conjunction"
  | "Interjection"
  | "Phrase"
  | "Expression"
  | "Counter"
  | "Number"
  | "Prefix"
  | "Suffix"
  | "Particle"
  | "Auxiliary verb"
  | "Honorific"
  | "Onomatopoeia"
  | "Proverb"
  | "Other"
  | "Unknown"
