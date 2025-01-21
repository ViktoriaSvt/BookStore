import { useEffect, useState } from "react";
import { getFaqTranslations } from "../api/translation-requests";


export function useGetLang(language) {
    const [translation, setTranslation] = useState([]);

     useEffect(() => {
       (async () => {
      
           const data = await getFaqTranslations(language);
           setTranslation(data);

       })();
     }, [language]);

    return translation
}