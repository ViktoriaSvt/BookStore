import { useEffect, useState } from "react";
import { getFaqTranslations } from "../api/translation-requests";

const defaultTranslation = {
  questions: [],
  staticContent: {
    header: "Everything you need to know",
    label: "  Have a question? Ask us!",
    placeholder: "Cannot submit question at the moment",
    submitButton: "Unavailable"
  }
};

export function useGetLang(language) {
  const [translation, setTranslation] = useState(defaultTranslation);

  useEffect(() => {
    getFaqTranslations(language)
      .then(data => setTranslation(data || defaultTranslation))
      .catch(() => setTranslation(defaultTranslation));
  }, [language]);

  return translation;
}
