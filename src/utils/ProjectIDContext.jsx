// src/context/ProjectIdContext.js

import { createContext, useContext } from 'react';

// 1. Context'i oluşturun. Başlangıçta bir değeri olmayabilir (null).
const ProjectIdContext = createContext(null);

// 2. Bu context'i kullanmak için özel bir hook (kanca) oluşturun.
// Bu, component'lerde 'useContext(ProjectIdContext)' yazmak yerine
// 'useProjectId()' yazmanızı sağlar. Çok daha temiz bir yöntemdir.
export const useProjectId = () => {
  return useContext(ProjectIdContext);
};

// 3. Provider'ı dışa aktarın
export const ProjectIdProvider = ProjectIdContext.Provider;