const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'Unidades_Español');

// ==========================================
// UNIT 10: SIMPLE AND COMPOUND SENTENCES
// ==========================================
const unit10 = `# UNIDAD 10: ORACIONES SIMPLES Y COMPUESTAS (*SIMPLE AND COMPOUND SENTENCES*)

---

## 1. EVALUACIÓN DIAGNÓSTICA (*WHAT DO YOU KNOW?*)

### Preguntas de Discusión:
1. *How do modern civil engineering projects balance architectural aesthetics with functional urban demands?*  
   (¿Cómo equilibran los proyectos de ingeniería civil moderna la estética arquitectónica con las demandas funcionales urbanas?)
2. *Why is syntactic variety (combining simple and compound sentences) crucial for engaging academic writing?*  
   (¿Por qué la variedad sintáctica al combinar oraciones simples y compuestas es fundamental para una redacción académica atractiva?)

---

### Detección de Errores en Párrafo Sintáctico (*Find the Errors*)

> **Instrucción:** El siguiente párrafo académico contiene dos errores de puntuación u oraciones mal coordinadas (*run-ons / comma splices*). Encuentra los errores y corrígelos.

#### **Texto Modelo: The Architecture of Modern Skyscrapers**
> [1] Modern skyscrapers dominate urban skylines around the world, they represent significant advancements in structural engineering. [2] Architects incorporate innovative materials into building designs, and engineers calculate aerodynamic forces to ensure stability. [3] Steel frames provide essential structural flexibility during severe earthquakes. [4] Concrete cores resist immense gravitational loads, but high-performance glass facades reduce internal energy consumption. [5] Sustainable architectural designs lower heating costs and they minimize the environmental footprint of large commercial buildings. [6] Ultimately, contemporary skyscrapers combine aesthetic beauty with advanced engineering efficiency.

---

## 2. FORMAS GRAMATICALES (*GRAMMAR FORMS*)

### Estructura de la Oración Simple vs. Oración Compuesta

#### a) Oración Simple (*Simple Sentence*):
Contiene **una sola cláusula independiente** (un sujeto y un verbo, o sujetos/verbos compuestos bajo un solo predicado):
- *The researchers analyzed the statistical data.* (1 sujeto + 1 verbo)
- *Solar panels and wind turbines generate clean electricity.* (Sujeto compuesto + 1 verbo)
- *The team collected water samples and tested them in the laboratory.* (1 sujeto + Verbo compuesto)

#### b) Oración Compuesta (*Compound Sentence*):
Contiene **dos cláusulas independientes completas** unidas mediante una de dos fórmulas:

1. **Fórmula con Conjunción Coordinante (*FANBOYS*):**  
   > \`[ Cláusula Independiente 1 ] + [ , + Conjunción Coordinante ] + [ Cláusula Independiente 2 ]\`  
   - **FANBOYS:** **F**or, **A**nd, **N**or, **B**ut, **O**r, **Y**et, **S**o.  
   - *The initial experiment failed**, but** subsequent trials produced positive results.*

2. **Fórmula con Punto y Coma (*Semicolon*):**  
   > \`[ Cláusula Independiente 1 ] + [ ; ] + [ Cláusula Independiente 2 ]\`  
   > \`[ Cláusula 1 ] + [ ; + Adverbio de Transición + , ] + [ Cláusula 2 ]\`  
   - *The initial experiment failed**; however,** subsequent trials produced positive results.*

---

## 3. USOS REALES EN ESCRITURA ACADÉMICA (*COMMON USES*)

1. **Evitar la monotonía y la fragmentación (*Choppy Sentences*):**  
   La prosa compuesta conecta ideas interrelacionadas y aporta fluidez y ritmo al argumento.
2. **Establecer contrastes lógicos y relaciones de causa-efecto balanceadas:**  
   *The economic policy stimulated short-term growth**, yet** it increased national debt.*
3. **Contrastar metodologías o resultados entre dos fuentes:**  
   *Quantitative metrics provide numerical precision**, and** qualitative analysis offers deep contextual meaning.*

---

## 4. ERRORES COMUNES EN ESCRITURA ACADÉMICA (*COMMON ERRORS*)

### ⚠️ Error 10.1: Empalme de Comas (*Comma Splice*)
- **Incorrecto:** *The survey was comprehensive**,** it included over one thousand participants.*
- **Correcto:** *The survey was comprehensive**, and** it included over one thousand participants.* \| *The survey was comprehensive**;** it included...*
- **Explicación:** Una coma sola no tiene la fuerza sintáctica de unir dos oraciones independientes.

### ⚠️ Error 10.2: Oración Encadenada (*Run-on / Fused Sentence*)
- **Incorrecto:** *The laboratory had advanced equipment the scientists conducted tests quickly.*
- **Correcto:** *The laboratory had advanced equipment**, so** the scientists conducted tests quickly.*

### ⚠️ Error 10.3: Omitir la coma antes de la conjunción coordinante
- **Incorrecto:** *Urban populations grew rapidly **and** city infrastructure struggled to cope.*
- **Correcto:** *Urban populations grew rapidly**, and** city infrastructure struggled to cope.*

---

## 5. VOCABULARIO ACADÉMICO Y TRANSICIONES (*ACADEMIC VOCABULARY*)

Conjunciones y adverbios de transición para oraciones compuestas:

| Función Lógica | Conjunción Coordinante (*, + FANBOYS*) | Adverbio de Transición (*; + Transición + ,*) |
|:---|:---:|:---:|
| **Adición** | *, and* | *; furthermore, / ; moreover, / ; in addition,* |
| **Contraste** | *, but / , yet* | *; however, / ; nevertheless, / ; in contrast,* |
| **Causa / Consecuencia** | *, so / , for* | *; therefore, / ; consequently, / ; as a result,* |
| **Alternativa** | *, or / , nor* | *; alternatively, / ; otherwise,* |

---

## 6. INTEGRACIÓN Y PRODUCCIÓN (*PUT IT TOGETHER*)

### **REVIEW QUIZ (*EXAMEN DE AUTOEVALUACIÓN*)**
1. The research team gathered empirical data (*, and they / and they*) analyzed the statistical correlations.
2. Solar energy reduces carbon emissions (*; however, / , however*) initial installation costs remain high.
3. The clinical trial showed promising results (*, but / ,*) further testing is necessary before widespread adoption.
4. Urban areas must invest in public transit (*; otherwise, / , otherwise*) traffic congestion will worsen significantly.
5. The study examined five major metropolitan cities (*, and it / ; and it*) compared their sustainability metrics.

---

### **BUILDING GREATER SENTENCES (*COMBINACIÓN DE ORACIONES*)**
- *Sentence A:* Artificial intelligence systems can process vast amounts of medical imaging data.
- *Sentence B:* These systems assist doctors in detecting early-stage diseases accurately.
- *Sentence C:* Human physicians must always make the final diagnosis.
> **Oración combinada:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

## 🔑 CLAVE DE RESPUESTAS EXPLICADA (*ANSWER KEY*)

### 1. Detección de Errores (Párrafo Inicial)
- **Oración 1:** *...skylines around the world**, they** represent...* $\rightarrow$ **...around the world, and they represent...** o **...around the world; they represent...** (error de *comma splice*).
- **Oración 5:** *...designs lower heating costs **and they** minimize...* $\rightarrow$ **...costs, and they minimize...** (falta la coma antes de *and* al unir dos cláusulas con sujeto propio).

### 2. Review Quiz
1. **, and they** *(oración compuesta con dos cláusulas completas requiere coma)*
2. **; however,** *(transición interoracional con punto y coma y coma)*
3. **, but** *(evita el comma splice)*
4. **; otherwise,** *(adverbio de transición condicional)*
5. **, and it** *(coordinación estándar con FANBOYS)*

### 3. Building Greater Sentences
- **Modelo:** *Artificial intelligence systems can process vast amounts of medical imaging data, and they assist doctors in detecting early-stage diseases accurately; however, human physicians must always make the final diagnosis.*

---
`;

// ==========================================
// UNIT 11: USING PARALLEL STRUCTURE
// ==========================================
const unit11 = `# UNIDAD 11: ESTRUCTURA PARALELA (*USING PARALLEL STRUCTURE*)

---

## 1. EVALUACIÓN DIAGNÓSTICA (*WHAT DO YOU KNOW?*)

### Preguntas de Discusión:
1. *How do renewable energy technologies (solar, wind, hydroelectric) compare in terms of environmental impact, efficiency, and cost?*  
   (¿Cómo se comparan las tecnologías de energía renovable en términos de impacto ambiental, eficiencia y costo?)
2. *Why does parallel structure enhance the readability, balance, and persuasive power of academic arguments?*  
   (¿Por qué la estructura paralela mejora la legibilidad, el equilibrio y la fuerza persuasiva de los argumentos académicos?)

---

### Detección de Errores en Párrafo de Evaluación (*Find the Errors*)

> **Instrucción:** El siguiente párrafo académico contiene dos errores de estructura paralela (*faulty parallelism*). Encuentra los errores y corrígelos.

#### **Texto Modelo: Comparing Clean Energy Sources**
> [1] Transitioning to clean energy requires evaluating efficiency, environmental impact, and how much it costs. [2] Solar energy is popular because panels are easy to install, operate quietly, and generating electricity with zero emissions. [3] Similarly, wind power is both cost-effective and environmentally sustainable. [4] Hydroelectric facilities not only generate massive amounts of power but also provide reliable water storage for agriculture. [5] By adopting a diversified energy portfolio, nations can reduce carbon emissions, stimulate economic growth, and create sustainable employment opportunities. [6] A balanced approach ensures long-term energy security for future generations.

---

## 2. FORMAS GRAMATICALES (*GRAMMAR FORMS*)

### Principio de la Estructura Paralela (*Parallelism*)

> **Regla de Oro:** Cuando dos o más elementos gramaticales se unen mediante conjunciones coordinantes (*and, but, or*) o conjunciones correlativas (*both...and, either...or, neither...nor, not only...but also*), deben tener la **misma forma gramatical** (mismo tiempo verbal, misma categoría de palabra o misma estructura de frase).

| Categoría Gramatical | Elementos Paralelos | Ejemplo en Redacción Académica |
|:---|:---|:---|
| **Sustantivos** | Sustantivo + Sustantivo + Sustantivo | *The policy promotes **innovation**, **efficiency**, and **sustainability**.* |
| **Adjetivos** | Adjetivo + Adjetivo + Adjetivo | *The methodology was **rigorous**, **transparent**, and **reproducible**.* |
| **Verbos en Serie** | Verbo + Verbo + Verbo *(mismo tiempo)* | *The team **collected** data, **analyzed** trends, and **published** results.* |
| **Gerundios (-ing)** | Gerundio + Gerundio + Gerundio | *The program focuses on **recruiting** talent, **providing** training, and **evaluating** outcomes.* |
| **Infinitivos (to)** | Infinitivo + Infinitivo + Infinitivo | *The objective is **to reduce** costs, **improve** quality, and **expand** access.* *(el segundo "to" puede omitirse si se mantiene en todos).* |

---

### Paralelismo con Conjunciones Correlativas (*Paired Conjunctions*)

Las conjunciones correlativas deben colocarse inmediatamente antes de los elementos paralelos equivalentes:

- **Both... and:** *The program was **both** [adjetivo: cost-effective] **and** [adjetivo: environmentally sustainable].*
- **Not only... but also:** *The reform **not only** [verbo: enhanced] efficiency **but also** [verbo: reduced] operational costs.*
- **Either... or:** *Researchers must **either** [verbo: publish] their findings **or** [verbo: present] at the symposium.*
- **Neither... nor:** *The trial showed **neither** [sustantivo: toxic effects] **nor** [sustantivo: negative interactions].*

---

## 3. USOS REALES EN ESCRITURA ACADÉMICA (*COMMON USES*)

1. **Redactar enunciados de tesis (*Thesis Statements*) equilibrados y claros:**  
   *This essay analyzes the economic causes, social consequences, and political implications of urbanization.*
2. **Enumerar objetivos metodológicos y etapas de investigación:**  
   *The primary goals are to isolate the protein, test its stability, and measure its efficacy.*
3. **Formular comparaciones rigurosas y juicios de valor balanceados:**  
   *The new framework is not only theoretically sound but also practically applicable.*

---

## 4. ERRORES COMUNES EN ESCRITURA ACADÉMICA (*COMMON ERRORS*)

### ⚠️ Error 11.1: Mezclar gerundios, infinitivos y oraciones en una lista
- **Incorrecto:** *The scholar enjoys **reading** literature, **to conduct** research, and **writes** academic articles.*
- **Correcto:** *The scholar enjoys **reading** literature, **conducting** research, and **writing** academic articles.*

### ⚠️ Error 11.2: Desplazamiento de conjunciones correlativas
- **Incorrecto:** *The university **not only provides** scholarships **but also** internships.*
- **Correcto:** *The university provides **not only scholarships but also internships**.*

### ⚠️ Error 11.3: Ruptura de paralelismo tras conjunciones coordinantes
- **Incorrecto:** *The project required significant funding and that the team dedicate many hours.*
- **Correcto:** *The project required **significant funding** and **extensive dedication**.*

---

## 5. VOCABULARIO ACADÉMICO Y COLOCACIONES (*ACADEMIC VOCABULARY*)

Estructuras emparejadas de alta frecuencia en prosa académica:

| Estructura Paralela Académica | Significado en Español | Ejemplo en Contexto |
|:---|:---|:---|
| **both qualitative and quantitative** | tanto cualitativo como cuantitativo | *The study employs both qualitative and quantitative methods.* |
| **not only enhances... but also reduces...** | no solo mejora... sino que también reduce... | *The system not only enhances speed but also reduces errors.* |
| **economic, social, and political** | económico, social y político | *economic, social, and political consequences* |
| **to design, implement, and evaluate** | diseñar, implementar y evaluar | *to design, implement, and evaluate public policies* |
| **clarity, coherence, and accuracy** | claridad, coherencia y precisión | *The paper demonstrates clarity, coherence, and accuracy.* |

---

## 6. INTEGRACIÓN Y PRODUCCIÓN (*PUT IT TOGETHER*)

### **REVIEW QUIZ (*EXAMEN DE AUTOEVALUACIÓN*)**
1. The university curriculum aims to cultivate critical thinking, effective communication, and (*problem-solving abilities / to solve problems*).
2. The new transportation plan is (*both economically feasible / economically both feasible*) and environmentally sustainable.
3. The research assistant spent the summer collecting field data, interviewing subjects, and (*transcribing audio recordings / to transcribe audio recordings*).
4. Renewable energy sources not only reduce greenhouse emissions (*but also create / but creating*) high-paying technical jobs.
5. The proposed policy was described as innovative, practical, and (*effective / it was effective*).

---

### **BUILDING GREATER SENTENCES (*COMBINACIÓN DE ORACIONES*)**
- *Sentence A:* Modern education should foster intellectual curiosity.
- *Sentence B:* It should develop analytical problem-solving skills.
- *Sentence C:* It should promote social responsibility.
> **Oración combinada:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

## 🔑 CLAVE DE RESPUESTAS EXPLICADA (*ANSWER KEY*)

### 1. Detección de Errores (Párrafo Inicial)
- **Oración 1:** *...evaluating efficiency, environmental impact, and **how much it costs**.* $\rightarrow$ **and economic cost** (paralelismo de tres frases nominales).
- **Oración 2:** *...easy to install, operate quietly, and **generating electricity**...* $\rightarrow$ **and generate electricity** (paralelismo de tres verbos en forma base: *install, operate, generate*).

### 2. Review Quiz
1. **problem-solving abilities** *(lista de frases nominales: critical thinking, effective communication, problem-solving abilities)*
2. **both economically feasible** *(colocación correlativa antes de adjetivo)*
3. **transcribing audio recordings** *(serie paralela de tres gerundios en -ing)*
4. **but also create** *(paralelismo con not only reduce)*
5. **effective** *(serie de tres adjetivos descriptivos)*

### 3. Building Greater Sentences
- **Modelo:** *Modern higher education should foster intellectual curiosity, develop analytical problem-solving skills, and promote ethical social responsibility.*

---
`;

// ==========================================
// UNIT 12: USING PASSIVE VOICE
// ==========================================
const unit12 = `# UNIDAD 12: USO DE LA VOZ PASIVA (*USING PASSIVE VOICE*)

---

## 1. EVALUACIÓN DIAGNÓSTICA (*WHAT DO YOU KNOW?*)

### Preguntas de Discusión:
1. *Why do scientific and technical research papers frequently utilize the passive voice in methodology sections?*  
   (¿Por qué los artículos de investigación científica y técnica utilizan con frecuencia la voz pasiva en las secciones de metodología?)
2. *When is it more appropriate to use the active voice instead of the passive voice in academic writing?*  
   (¿Cuándo es más apropiado emplear la voz activa en lugar de la pasiva en la redacción académica?)

---

### Detección de Errores en Párrafo de Proceso Científico (*Find the Errors*)

> **Instrucción:** El siguiente párrafo académico contiene dos errores en la formación o uso de la voz pasiva. Encuentra los errores y corrígelos.

#### **Texto Modelo: Archaeological Excavation Methods**
> [1] Archaeological excavations must be conducted with extreme precision to preserve historical artifacts. [2] Before digging begins, the site carefully mapped and divided into geometric grids. [3] Soil layers are systematically removed using specialized hand tools. [4] When artifacts were discovered, their precise locations are recorded with GPS technology. [5] All recovered specimens are cleaned, categorized, and transported to regional conservation laboratories. [6] Through these scientific methods, valuable historical insights are gained without damaging cultural heritage.

---

## 2. FORMAS GRAMATICALES (*GRAMMAR FORMS*)

### Estructura Universal de la Voz Pasiva

> **Fórmula:** \`[ Sujeto Receptor ] + [ Verbo BE (en el tiempo adecuado) ] + [ Participio Pasado ] (+ by + Agente)\`

| Tiempo Gramatical | Voz Activa | Voz Pasiva Académica |
|:---|:---|:---|
| **Presente Simple** | *Researchers **analyze** the data.* | *The data **are analyzed** (by researchers).* |
| **Pasado Simple** | *The team **conducted** the survey.* | *The survey **was conducted** in 2020.* |
| **Presente Perfecto** | *Scholars **have established** a framework.* | *A framework **has been established**.* |
| **Futuro con Will** | *The agency **will publish** the report.* | *The report **will be published** next month.* |
| **Verbos Modales** | *Scientists **must evaluate** the risks.* | *The risks **must be evaluated** carefully.* |

---

### ¿Cuándo Incluir o Excluir el Agente (*by + Agent*)?

En la redacción académica, el agente se **omite en más del 80% de los casos** porque:
1. **El agente es desconocido o irrelevante:** *The ancient monument was built thousands of years ago.*
2. **El agente es obvio:** *The patient was admitted to the hospital.* *(por el personal médico)*
3. **Se prioriza el proceso o resultado experimental:** *Ten milliliters of solution were added to the beaker.*
- **Se incluye (*by + Agent*) solo si la identidad del autor/causante es el foco crucial de la afirmación:**  
  *Penicillin was discovered **by Alexander Fleming** in 1928.*

---

## 3. USOS REALES EN ESCRITURA ACADÉMICA (*COMMON USES*)

1. **Secciones de Metodología y Procedimientos Experimentales:**  
   *Blood samples **were collected**, centrifuged, and stored at -80°C.*
2. **Enunciar consensos y clasificaciones científicas objetivas:**  
   *This phenomenon **is considered** a major driver of climate change.*
3. **Evitar pronombres personales informales (*I, we*) en textos formales:**  
   *Instead of "We conducted a survey", use: "A survey **was conducted**."*

---

## 4. ERRORES COMUNES EN ESCRITURA ACADÉMICA (*COMMON ERRORS*)

### ⚠️ Error 12.1: Omitir el verbo auxiliar *Be*
- **Incorrecto:** *The experiment **conducted** in a sterile environment.*
- **Correcto:** *The experiment **was conducted** in a sterile environment.*
- **Explicación:** Sin el verbo *Be*, la oración carece de forma pasiva completa.

### ⚠️ Error 12.2: Intentar hacer pasivos verbos intransitivos
- **Incorrecto:** *An unprecedented economic crisis **was occurred** in 2008.*
- **Correcto:** *An unprecedented economic crisis **occurred** in 2008.*
- **Explicación:** Verbos intransitivos como *occur, happen, exist, remain, disappear, arrive* **nunca** admiten voz pasiva porque no tienen objeto directo.

### ⚠️ Error 12.3: Participio pasado incorrecto
- **Incorrecto:** *The results were **demonstrate** by the research team.*
- **Correcto:** *The results were **demonstrated** by the research team.*

---

## 5. VOCABULARIO ACADÉMICO Y COLOCACIONES PASIVAS (*ACADEMIC VOCABULARY*)

Verbos pasivos de alta frecuencia en artículos científicos:

| Forma Pasiva Académica | Significado en Español | Ejemplo en Contexto |
|:---|:---|:---|
| **is considered to be** | es considerado como | *Renewable energy is considered to be sustainable.* |
| **was conducted in** | fue realizado en | *The clinical trial was conducted in three countries.* |
| **can be categorized into** | puede categorizarse en | *The data can be categorized into three groups.* |
| **has been demonstrated that** | ha sido demostrado que | *It has been demonstrated that sleep aids memory.* |
| **were observed during** | fueron observados durante | *Significant changes were observed during the trial.* |

---

## 6. INTEGRACIÓN Y PRODUCCIÓN (*PUT IT TOGETHER*)

### **REVIEW QUIZ (*EXAMEN DE AUTOEVALUACIÓN*)**
1. The statistical survey (*was conducted / conducted*) among five hundred university graduates.
2. A sudden power failure (*occurred / was occurred*) during the laboratory trial.
3. Strict quality control standards (*must be maintained / must maintained*) throughout the manufacturing process.
4. The historical documents (*were discovered / discovered*) in an ancient monastery in 1947.
5. All water samples (*were analyzed / was analyzed*) using advanced mass spectrometry.

---

### **BUILDING GREATER SENTENCES (*COMBINACIÓN DE ORACIONES*)**
- *Sentence A:* The clinical trial was conducted by medical researchers at Johns Hopkins University.
- *Sentence B:* The trial involved over two thousand patients.
- *Sentence C:* A new vaccine was proven to be highly effective.
> **Oración combinada:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

## 🔑 CLAVE DE RESPUESTAS EXPLICADA (*ANSWER KEY*)

### 1. Detección de Errores (Párrafo Inicial)
- **Oración 2:** *...the site **carefully mapped** and divided...* $\rightarrow$ **is carefully mapped and divided** (falta el verbo auxiliar *is* en la voz pasiva).
- **Oración 4:** *When artifacts **were discovered**, their precise locations are recorded...* $\rightarrow$ **are discovered** (concordancia en presente simple con el resto del párrafo metodológico).

### 2. Review Quiz
1. **was conducted** *(pasiva requerida: el estudio fue realizado)*
2. **occurred** *(verbo intransitivo; nunca pasivo)*
3. **must be maintained** *(pasiva con modal: must + be + participio)*
4. **were discovered** *(pasado pasivo plural)*
5. **were analyzed** *(concordancia con sujeto plural: All water samples)*

### 3. Building Greater Sentences
- **Modelo:** *In a clinical trial that was conducted by medical researchers at Johns Hopkins University and involved over two thousand patients, a new vaccine was proven to be highly effective.*

---
`;

fs.writeFileSync(path.join(outDir, '10_Unit10.md'), unit10, 'utf8');
fs.writeFileSync(path.join(outDir, '11_Unit11.md'), unit11, 'utf8');
fs.writeFileSync(path.join(outDir, '12_Unit12.md'), unit12, 'utf8');
console.log('Units 10, 11, and 12 generated successfully.');
