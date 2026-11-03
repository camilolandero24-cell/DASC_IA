# MANUAL DE USUARIO Y GUÍA DE OPERACIÓN — DASC_IA
### Plataforma de Observatorio, Análisis Estadístico y Métodos de Pronósticos sobre Adopción de IA

---

## 1. INTRODUCCIÓN GENERAL AL PROYECTO DASC_IA

**DASC_IA** es un sistema integral de investigación, diagnóstico pedagógico y modelado de pronósticos diseñado para el entorno formativo institucional. La plataforma procesa los hallazgos empíricos de 23 entrevistas en profundidad recolectadas en octubre de 2026, combinando:

1. **Análisis Estadístico y Visual:** Dashboards cuantitativos sobre penetración de herramientas (OpenAI, Meta AI, Gemini, Luzia, Dola), percepción de utilidad cotidiana y riesgos asociados.
2. **Métodos de Pronósticos Matemáticos y Cualitativos:** Implementación de la taxonomía formal de predicción:
   - *Métodos Cualitativos:* Consenso de panel, Pronóstico visionario, Analogía histórica y Método Delphi.
   - *Métodos Cuantitativos Univariados (Series de Tiempo):* Promedios móviles simples y de $k$ periodos, Suavización exponencial simple, Suavización doble (Brown y Holt), Suavización triple (Winters con estacionalidad) y Descomposición de series (Aditiva y Multiplicativa).
   - *Modelos Causales Multivariados:* Regresión lineal simple $Y = f(X_1)$ y Regresión múltiple $Y = f(X_1, X_2, \dots, X_k)$.
3. **Generador Dinámico de Códigos QR:** Módulo vectorial y ráster con redirección inmediata a la plataforma web oficial para difusión en pósteres, diapositivas y guías impresas.
4. **Roadmap Estratégico:** 5 pilares de acción para mitigar la dependencia cognitiva y promover una pedagogía socrática con IA.

---

## 2. MANUAL PARA EL ROL DE INSTRUCTOR

### 2.1. Propósito del Rol
El **Instructor** utiliza **DASC_IA** como herramienta didáctica para transformar la relación de los aprendices con la inteligencia artificial: pasar del uso fraudulento/pasivo ("que la IA me haga la tarea") hacia un uso analítico, socrático y ético, al tiempo que enseña conceptos estadísticos y de modelado de pronósticos.

### 2.2. Guía Paso a Paso para la Sesión Formativa

#### Paso 1: Sensibilización y Diagnóstico Inicial (Pestaña "Hallazgos Clave" y "Resumen Ejecutivo")
1. Ingrese a la plataforma **DASC_IA** y proyecte la sección **"Hallazgos Clave"**.
2. Abra el panel de **Consensos Mayoritarios**:
   - Muestre a los aprendices cómo el **91.3%** recurre a ChatGPT y el **78.3%** la utiliza casi exclusivamente para entregar deberes.
   - Proyecte las citas textuales directas (por ejemplo: *“¿Riesgo? De que no aprendo nada”* o *“Una desventaja sería no saber qué responder en una entrevista de trabajo”*).
3. Abra un debate guiado de 10 minutos: *¿Se sienten identificados con el miedo a perder la capacidad de responder a conciencia sin la máquina?*

#### Paso 2: Análisis de Diferencias y Segmentación (Pestaña "Perfiles & Contraste")
1. Explique los 3 arquetipos detectados en el estudio:
   - **El Pragmático Utilitario (47.8%):** Centrado únicamente en la velocidad de entrega.
   - **El Crítico Escéptico (30.4%):** Alerta ante la atrofia del pensamiento.
   - **El Explorador Estratégico (21.7%):** Domina el *Prompt Engineering* y comprende el valor del criterio humano.
2. Solicite a los aprendices que identifiquen en qué cuadrante se ubican y qué acciones tomarían para avanzar al rol de explorador.

#### Paso 3: Taller de Métodos de Pronósticos (Pestaña "Pronósticos")
1. Diríjase a la pestaña **"Métodos de Pronósticos"**.
2. **Caso Práctico 1 — Series Estacionarias (Promedios Móviles y Suavización Simple):**
   - Muestre la serie temporal de 23 periodos sobre la tasa de advertencia de dependencia.
   - Ajuste el parámetro $\alpha$ de la Suavización Exponencial Simple: explique que valores altos ($\alpha = 0.8$) dan mayor peso a las respuestas recientes, mientras que valores bajos ($\alpha = 0.2$) filtran el ruido estocástico.
3. **Caso Práctico 2 — Series con Tendencia (Método de Holt):**
   - Active el método de Holt. Ajuste $\alpha$ (nivel) y $\beta$ (tendencia). Demuestre a los aprendices cómo la proyección a 6 periodos futuros predice un incremento en la adopción si no median intervenciones pedagógicas.
4. **Caso Práctico 3 — Modelos Causales (Regresión Lineal Simple y Múltiple):**
   - Demuestre la correlación matemática: a mayor número de herramientas conocidas y prompts elaborados ($X$), menor es la dependencia pasiva ($Y$) y mayor la autonomía crítica.

#### Paso 4: Rediseño Evaluativo y Aplicación en Aula
1. Consulte la pestaña **"Estrategias"** y adopte la recomendación **REC-02**: implemente defensas orales individuales del 60% de la nota y permita el uso de IA solo en la fase preparatoria previa con prompts documentados.
2. Genere el código QR en la pestaña **"Código QR"**, descárguelo en PNG/SVG e insértelo en la guía de aprendizaje del curso para que los estudiantes accedan desde sus dispositivos móviles.

---

## 3. MANUAL PARA EL ROL DE APRENDIZ

### 3.1. Propósito del Rol
El **Aprendiz** emplea **DASC_IA** para auto-evaluar sus propios hábitos digitales, aprender técnicas formales de predicción cuantitativa y cualitativa con datos reales, y superar la trampa de la "pereza cognitiva" mediante el uso reflexivo de la IA.

### 3.2. Guía de Uso y Aprendizaje Autónomo

#### Paso 1: Autodiagnóstico del Perfil de Usuario
1. Ingrese a la plataforma web mediante el enlace directo o escaneando el **Código QR** facilitado por su instructor.
2. Navegue a la pestaña **"Perfiles & Contraste"**.
3. Lea las características de los tres segmentos:
   - Si sueles copiar la primera respuesta del bot para entregar rápido, estás en el segmento **Pragmático**.
   - Si sientes ansiedad o desconfianza por no ejercitar tu mente, estás en el segmento **Crítico**.
   - Tu meta formativa es alcanzar el segmento **Explorador Estratégico**: aquel que formula prompts socráticos, verifica fuentes y no expone datos sensibles.

#### Paso 2: Exploración de la Base de Datos (Pestaña "Base de Datos")
1. Diríjase a la tabla interactiva de las 23 entrevistas.
2. Use el buscador para filtrar temas de su interés: escriba *"entrevista"*, *"floja"*, *"medicina"*, *"falsa"* o *"colegio"*.
3. Haga clic en el botón de **"Ojo" (Ver Detalle)** de cualquier registro para revisar las respuestas íntegras de ese informante.
4. Descargue el dataset en formato `.CSV` con el botón **"Exportar a CSV"** para realizar sus propios ejercicios en hojas de cálculo o Python/R.

#### Paso 3: Práctica de Métodos de Pronósticos
1. Entre a la pestaña **"Métodos de Pronósticos"**.
2. Experimente con los métodos vistos en clase:
   - **Promedio Móvil Simple ($k=3$):** Observe cómo suaviza las fluctuaciones entre respuestas consecutivas.
   - **Suavización Exponencial Simple:** Mueva el deslizador de $\alpha$ entre $0.1$ y $0.9$ y compruebe cómo cambia el pronóstico para el periodo siguiente.
   - **Regresión Lineal:** Identifique la ecuación de la recta $Y = \beta_0 + \beta_1 X$ y el coeficiente de determinación $R^2$.
3. Responda las preguntas de las guías de taller utilizando los resultados calculados por la plataforma.

#### Paso 4: Reglas de Oro de Higiene Digital (Zero Sensitive Data)
- **Nunca proporcione información confidencial:** nombres reales, contraseñas, números de documento, direcciones o fotografías privadas a chatbots en redes de mensajería (WhatsApp, Instagram, etc.).
- **Fact-Checking Obligatorio:** Toda afirmación generada por un modelo de lenguaje debe ser contrastada con al menos dos fuentes académicas o libros oficiales.

---

## 4. MANUAL PARA EL ROL DE COORDINADOR ACADÉMICO

### 4.1. Propósito del Rol
El **Coordinador Académico** utiliza **DASC_IA** como un panel de control directivo (Management Dashboard) para monitorear el impacto de la inteligencia artificial en el currículo, evaluar riesgos ético-legales y liderar la toma de decisiones basada en datos empíricos.

### 4.2. Protocolo de Gestión y Auditoría

#### Paso 1: Monitoreo de Indicadores de Riesgo Institucional
1. Ingrese a la pestaña **"Resumen Ejecutivo"** y audite los cuatro KPIs directivos:
   - Tasa de penetración tecnológica ($91.3\%$).
   - Concentración de uso en tareas mecánicas ($78.3\%$).
   - Índice de alarma por atrofia del pensamiento ($65.2\%$).
   - Incidencia de alucinaciones y desinformación ($17.4\%$).
2. Compruebe la correlación en la pestaña **"Gráficas & Stats"** para anticipar si los estudiantes de ciclos formativos están reduciendo su capacidad analítica en evaluaciones estándar.

#### Paso 2: Análisis Prospectivo para Planificación Curricular (Pestaña "Pronósticos")
1. Revise las proyecciones calculadas mediante **Descomposición de Series de Tiempo** y **Métodos de Tendencia (Holt / Brown)**:
   - Estas proyecciones indican que, sin intervención pedagógica activa, el uso pasivo de la IA aumentará más de un 25% en los próximos semestres.
   - Utilice los métodos cualitativos (**Método Delphi** y **Consenso de Panel**) para convocar a los líderes de área y alinear el plan docente.

#### Paso 3: Ejecución de las Recomendaciones Estratégicas (Pestaña "Estrategias")
1. Supervise el cumplimiento del **Roadmap Institucional 2026-2027**:
   - **Fase 1 (Mes 1-2):** Taller docente sobre Fact-Checking y aprobación del protocolo de privacidad.
   - **Fase 2 (Mes 3-4):** Modificación del reglamento de evaluación para exigir al menos un 60% de pruebas orales y resolución de problemas prácticos sin dispositivos.
   - **Fase 3 (Mes 5-6+):** Creación del Club de Innovación y certificación de instructores en *Prompt Engineering Educativo*.

#### Paso 4: Socialización y Reportes Oficiales
1. Haga clic en el botón superior **"Informe Completo"**.
2. Utilice la función **"Imprimir / PDF"** para obtener el dossier institucional formateado como informe de investigación ejecutiva para comités curriculares y consejos directivos.
3. Utilice la pestaña **"Código QR"** para generar códigos vectoriales institucionales dirigidos a la URL pública del centro de formación.

---

## 5. RESUMEN DE MÉTODOS DE PRONÓSTICOS INCLUIDOS EN DASC_IA

| Categoría | Método | Formulación Matemática Clave | Aplicación en DASC_IA |
| :--- | :--- | :--- | :--- |
| **Cualitativo** | Consenso de Panel / Delphi | Síntesis ponderada de opiniones de expertos | Interpretación del futuro laboral y ético |
| **Cualitativo** | Analogía Histórica | Comparación con adopción de calculadoras e Internet | Proyección de maduración de la IA en el aula |
| **Series de Tiempo** | Promedio Móvil Simple ($k$) | $\hat{Y}_{t+1} = \frac{1}{k} \sum_{i=0}^{k-1} Y_{t-i}$ | Suavización del índice de adopción temporal |
| **Series de Tiempo** | Suavización Exponencial Simple | $\hat{Y}_{t+1} = \alpha Y_t + (1-\alpha) \hat{Y}_t$ | Predicción a corto plazo con ponderación $\alpha$ |
| **Series de Tiempo** | Suavización de Holt (Doble) | $L_t = \alpha Y_t + (1-\alpha)(L_{t-1} + T_{t-1})$; $\hat{Y}_{t+p} = L_t + p T_t$ | Captura de tendencia alcista en preocupación cognitiva |
| **Series de Tiempo** | Suavización de Winters (Triple) | Incorpora factores estacionales $S_t$ (multiplicativo o aditivo) | Proyección sujeta a picos de exámenes y entregas |
| **Series de Tiempo** | Descomposición de Series | $Y_t = T_t \times S_t \times C_t \times I_t$ (o aditivo $+$) | Aislamiento de tendencia pura vs. fluctuaciones puntuales |
| **Causal Multivariado** | Regresión Lineal Simple | $Y = \beta_0 + \beta_1 X_1$ | Impacto del número de herramientas sobre el nivel de alerta |
| **Causal Multivariado** | Regresión Lineal Múltiple | $Y = \beta_0 + \beta_1 X_1 + \beta_2 X_2 + \dots + \beta_k X_k$ | Modelado predictivo de autonomía y pensamiento crítico |

---

*Documento oficial generado para el sistema DASC_IA. Octubre de 2026.*
