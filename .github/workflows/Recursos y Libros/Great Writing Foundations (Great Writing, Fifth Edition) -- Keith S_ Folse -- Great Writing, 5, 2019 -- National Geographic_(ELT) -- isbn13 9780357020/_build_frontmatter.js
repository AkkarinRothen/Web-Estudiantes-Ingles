const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'Unidades_Español');

// 00_Indice_General.md
const indiceGeneral = `# GREAT WRITING: FOUNDATIONS (5.ª EDICIÓN)
## Edición Pedagógica Bilingüe para Estudiantes Hispanohablantes
**Autor:** Keith S. Folse | **Editorial:** National Geographic Learning / Cengage

---

## 📖 GUÍA PEDAGÓGICA DE ESTUDIO

Bienvenido a la versión adaptada pedagógicamente de ***Great Writing: Foundations***. Este curso está diseñado para construir desde cero las bases de la precisión gramatical, la fonética ortográfica, el vocabulario académico y la estructuración de oraciones y párrafos en inglés.

### 🌟 Principios de la Adaptación Bilingüe
1. **Explicaciones e Instrucciones en Español:** Todas las reglas gramaticales, explicaciones fonéticas y consignas se presentan en un español claro y riguroso para asegurar una comprensión conceptual sólida.
2. **Práctica Activa 100% en Inglés:** Las oraciones modelo, ejercicios prácticos (*scrambled sentences, error corrections, vocabulary fill-ins*) y textos de escritura se mantienen en inglés.
3. **Fonética y Ortografía Contrastiva:** En cada unidad se explica cómo articular los sonidos vocálicos del inglés y sus patrones ortográficos (vocales cortas, largas, diptongos y dígrafos).
4. **Clave de Respuestas Explicada (*Answer Key*):** Cada unidad concluye con una sección completa de soluciones comentadas para que puedas verificar tu trabajo y entender el porqué de cada corrección.

---

## 📑 ÍNDICE GENERAL DE UNIDADES

| N.º | Unidad Temática | Enfoque Gramatical | Sonido Vocálico / Ortografía | Archivo |
|:---:|:---|:---|:---|:---:|
| 📌 | **Material Preliminar** | Estructura de la Serie y Filosofía | — | [00_Frontmatter.md](00_Frontmatter.md) |
| **01** | **Sentences (La Oración)** | ¿Qué es una oración? (Sujeto + Verbo), Mayúsculas y Puntuación | Sonido /æ/ en *Cat* | [01_Unit1.md](01_Unit1.md) |
| **02** | **The Simple Present of Be** | Verbo *Be* afirmativo, negativo y patrones oracionales | Sonido /ɛ/ en *Bed* | [02_Unit2.md](02_Unit2.md) |
| **03** | **The Simple Present** | Presente simple afirmativo, terminación *-s/-es*, irregulares y negativos | Sonido /ɪ/ en *Fish* | [03_Unit3.md](03_Unit3.md) |
| **04** | **Nouns (Sustantivos)** | Sustantivos comunes, propios, plurales regulares e irregulares | Sonido /ɑ/ en *Hot* | [04_Unit4.md](04_Unit4.md) |
| **05** | **Pronouns (Pronombres)** | Pronombres sujeto y objeto; la no omisión del sujeto en inglés | Sonido /ʌ/ en *Cup* | [05_Unit5.md](05_Unit5.md) |
| **06** | **Adjectives (Adjetivos)** | Adjetivos descriptivos, posesivos, demostrativos y sustantivos como adjetivos | Sonido /eɪ/ en *Cake* | [06_Unit6.md](06_Unit6.md) |
| **07** | **The Conjunction And** | Conjunción *and* en sujetos/verbos compuestos y listas con coma | Sonido /i/ en *Eat* | [07_Unit7.md](07_Unit7.md) |
| **08** | **Articles (Artículos)** | Artículos *a/an*, *the*, omisión de artículo, sustantivos contables/incontables | Sonido /aɪ/ en *Rice* | [08_Unit8.md](08_Unit8.md) |
| **09** | **Prepositions (Preposiciones)** | Preposiciones de lugar y tiempo, frases iniciales y combinaciones | Sonido /oʊ/ en *Hello* | [09_Unit9.md](09_Unit9.md) |
| **10** | **Simple and Compound Sentences** | Oraciones compuestas unidas por coma + *and*, evitar *run-ons* | Sonido /u/ en *School* | [10_Unit10.md](10_Unit10.md) |
| **11** | **The Simple Past** | Pasado simple regular (*-ed*) e irregular, frases temporales y negación | Sonido /ɔ/ en *Straw* | [11_Unit11.md](11_Unit11.md) |
| **12** | **Complex Sentences** | Cláusulas de razón (*because*), tiempo (*after, before, when*) y condición (*if*) | Sonido /ʊ/ en *Wood* | [12_Unit12.md](12_Unit12.md) |
| **13** | **Adverbs (Adverbios)** | Adverbios de lugar, tiempo, modo (*-ly*), frecuencia y grado | Sonido /aʊ/ en *Flower* | [13_Unit13.md](13_Unit13.md) |
| **14** | **The Present Progressive** | Presente continuo (*Be + -ing*), reglas ortográficas y contraste de tiempos | Sonido /ɔɪ/ en *Boy* | [14_Unit14.md](14_Unit14.md) |
| 📚 | **Writer's Handbook** | Guía de ortografía, puntuación, verbos irregulares y revisión entre pares | — | [15_Handbook.md](15_Handbook.md) |
| 🔤 | **Vocabulary & Subject Index** | Glosario alfabético bilingüe completo e Índice temático | — | [16_Index.md](16_Index.md) |

---
`;

// 00_Frontmatter.md
const frontmatter = `# INFORMACIÓN EDITORIAL Y FILOSOFÍA PEDAGÓGICA
## *Great Writing: Foundations (Fifth Edition)*
**Autor:** Keith S. Folse  
**Editorial:** National Geographic Learning, a Cengage Learning Company (Boston, MA, USA / 2020)  
**ISBN-13:** 978-0-357-02081-4 (Student Edition) | 978-0-357-02104-0 (Student Edition with Online Access)

---

## FILOSOFÍA DE LA SERIE: *GREAT WRITING MAKES GREAT WRITERS*

La quinta edición de ***Great Writing: Foundations*** proporciona explicaciones gramaticales claras, modelos de redacción auténticos y práctica focalizada para ayudar a los estudiantes iniciales a redactar oraciones sólidas y párrafos coherentes en inglés.

Las imágenes y contenidos de **National Geographic** estimulan la imaginación de los estudiantes y contextualizan la práctica del idioma en situaciones del mundo real.

### Estructura de Cada Unidad:
Cada unidad del libro se articula en cuatro partes pedagógicamente secuenciadas:

- **PARTE 1: Gramática para la Escritura (*Grammar for Writing*):**  
  Presenta las estructuras gramaticales esenciales que los estudiantes principiantes necesitan para construir oraciones correctas en inglés. Incluye la sección de **Errores Comunes (*Common Mistakes*)**, que ayuda a notar patrones de error frecuentes (omisión de sujetos, orden de palabras, falta de puntuación) para evitarlos en la propia redacción.

- **PARTE 2: Desarrollo de Vocabulario y Ortografía (*Building Better Vocabulary and Spelling*):**  
  Contiene listas de palabras organizadas por sonidos vocálicos específicos del inglés (*target vowel sounds*) y sus patrones ortográficos para afianzar la pronunciación y la ortografía correcta.

- **PARTE 3: Construcción de Oraciones con Vocabulario (*Building Better Sentences with Vocabulary*):**  
  Focaliza al estudiante en ejercicios a nivel de oración: ordenar palabras (*scrambled sentences*), identificar y corregir errores sintácticos (*editing*), y completar oraciones con léxico contextualizado.

- **PARTE 4: Taller de Escritura (*Writing*):**  
  Contextualiza las oraciones modelo dentro de párrafos breves guiados (*guided writing*) y prepara al estudiante para producir sus propios textos descriptivos y narrativos.

---

## MENSAJE DE LOS AUTORES (*FROM THE AUTHORS*)

> *Great Writing* comenzó en 1998 cuando tres de nosotros enseñábamos escritura en inglés y frecuentemente nos quejábamos de la falta de materiales prácticos para estudiantes de ESL (*English as a Second Language*). Muchos libros hablaban sobre escribir, pero no pedían a los alumnos que escribieran hasta el final del capítulo. Los estudiantes leían mucho pero escribían muy poco. Lo que faltaba era una instrucción secuenciada y útil que pusiera a los estudiantes a escribir activamente desde el primer momento.
>
> Combinamos nuestras actividades de aula en un método coherente. El resultado fueron los libros originales *Great Paragraphs* y *Great Essays*. Con el paso de las ediciones, añadimos cuatro niveles más, perfeccionamos los enfoques y hoy nos enorgullece presentar esta 5.ª edición con el mismo enfoque probado en gramática y escritura, pero con un énfasis redoblado en la construcción de oraciones precisas y la expansión del vocabulario académico.
>
> — **Keith S. Folse, April Muchmore-Vokoun, Elena Vestri, David Clabeaux, Tison Pugh**

---
`;

fs.writeFileSync(path.join(outDir, '00_Indice_General.md'), indiceGeneral, 'utf8');
fs.writeFileSync(path.join(outDir, '00_Frontmatter.md'), frontmatter, 'utf8');
console.log('Frontmatter and Indice General written successfully.');
