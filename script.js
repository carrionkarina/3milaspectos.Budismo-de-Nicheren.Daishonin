/*
  script.js corregido:
  - Eliminado bloque JSON mal formado al inicio.
  - Añadido comprobación de D3.
  - Envoltorio DOMContentLoaded.
  - Uso de idCounter único para keys.
*/

document.addEventListener("DOMContentLoaded", () => {
  if (typeof d3 === "undefined") {
    console.error("D3 no está cargado. Comprueba la inclusión de d3.v7.min.js en index.htm");
    return;
  }

  // Resumen sintetizado (para el panel superior)
  const summaryData = [
    {
      title: "Los Diez Estados",
      equivalent: "Las emociones y condiciones de vida que experimentamos a diario (Infierno, Ira, Humanidad, Budeidad, etc.).",
      implication: "No son compartimentos fijos, sino condiciones dinámicas. Ej.: el 'Infierno' puede ser el odio y desesperanza tras pérdida de empleo y apoyo social."
    },
    {
      title: "Posesión Mutua de los Diez Estados",
      equivalent: "En el peor momento, siempre conservas el potencial de la sabiduría y el coraje.",
      implication: "Aunque estés en 'Infierno', el potencial de la Budeidad permanece latente. Ej.: una persona con agotamiento laboral puede recuperar compasión y sentido con apoyo adecuado."
    },
    {
      title: "Los Tres Principios de Individualización",
      equivalent: "Tu yo (cuerpo/mente), tus relaciones y tu entorno.",
      implication: "El Ichinen determina cómo percibes e interactúas. Ej.: manifestar sabiduría armoniza cuerpo, relaciones y ambiente."
    },
    {
      title: "Transformación del Karma",
      equivalent: "Superar desafíos y generar valor perdurable.",
      implication: "Al enfocar la intención (metáfora: Nam-myoho-renge-kyo), se puede redirigir la causalidad: convertir sufrimiento en desarrollo."
    }
  ];

  function renderSummary() {
    const panel = d3.select("#summary-panel");
    if (panel.empty()) return;
    panel.html("");
    panel.append("h2").text("Resumen clave y aplicación actual");
    summaryData.forEach(item => {
      const node = panel.append("div").attr("class", "summary-item");
      node.append("strong").text(item.title);
      node.append("div").attr("class", "equivalent").html(`<em>Equivalente en la realidad actual:</em> ${item.equivalent}`);
      node.append("div").attr("class", "implication").html(`<em>Implicación práctica:</em> ${item.implication}`);
    });
  }

  // Datos principales (proporcionados)
  const ichinenSanzenData = {
    "title": "ICHINEN SANZEN: Principio Budista de los 3,000 Aspectos de la Vida",
    "explanation": "La expresión 'tres mil' es una integración de: Los Diez Estados, la Posesión Mutua de los Diez Estados, los Diez Factores, y los Tres ámbitos de la Existencia (10 x 10 x 10 x 3 = 3,000).",
    "current_analogy": "Este principio revela que el estado mental a cada instante es un microcosmos que contiene todo el universo. Al transformar el Ichinen (tu profunda determinación), transformas tu destino y tu entorno.",
    "children": [
      {
        "title": "1º. LOS DIEZ ESTADOS (x10)",
        "explanation": "Describe el profundo estado o condición en que percibimos nuestra vida a cada instante (Infierno a Budas).",
        "current_analogy": "Son condiciones dinámicas de la vida, no ámbitos físicos o compartimentos estancos.",
        "children": [
          { "title": "1. Infierno", "explanation": "El estado de mayor sufrimiento.", "current_analogy": "Furia y violencia que llevan a la autodestrucción." },
          { "title": "2. Entidades hambrientas", "explanation": "Estado caracterizado por el deseo insaciable.", "current_analogy": "Esclavitud de los deseos en lugar de utilizarlos para crear valor." },
          { "title": "3. Estado de la animalidad", "explanation": "Se vive movido por los instintos.", "current_analogy": "Se carece de razón o moral, dominado por las circunstancias inmediatas." },
          { "title": "4. Asuras", "explanation": "Estado de ira o perversidad.", "current_analogy": "Apego a la ilusión de superioridad; se adula a otros mientras se les desprecia interiormente." },
          { "title": "5. Seres humanos", "explanation": "Se controlan los impulsos mediante la razón.", "current_analogy": "Primer paso hacia el dominio del yo y la victoria sobre uno mismo." },
          { "title": "6. Seres celestiales o éxtasis", "explanation": "Condición subjetiva de contento y alegría.", "current_analogy": "Felicidad no duradera, sujeta a que las condiciones externas sean favorables." },
          { "title": "7. Aprendizaje", "explanation": "Se dedica a la transformación personal, aprendiendo continuamente de otros.", "current_analogy": "Conciencia de la transitoriedad e inestabilidad, búsqueda de autosuperación." },
          { "title": "8. Comprensión intuitiva", "explanation": "Arriba a verdades en forma independiente, buscando la verdad a través de la percepción directa.", "current_analogy": "Disposición a enfrentar la realidad, superando el apego a lo transitorio." },
          { "title": "9. Bodhisattvas", "explanation": "Su afán es lograr la iluminación para sí mismo y para conducir a sus semejantes a ese gran anhelo (altruismo).", "current_analogy": "Solidaridad y amor compasivo; tomar iniciativas para impartir alegría a los demás." },
          { "title": "10. Budas", "explanation": "Estado de sabiduría ilimitada, amor compasivo, coraje y felicidad indestructible.", "current_analogy": "No significa erradicar los otros nueve estados, sino emplearlos positivamente para transformar las dificultades en desarrollo." }
        ]
      },
      {
        "title": "2º. POSESIÓN MUTUA DE LOS DIEZ ESTADOS (x10)",
        "explanation": "Cada uno de los diez estados posee el potencial de la totalidad de los 10 estados.",
        "current_analogy": "Aun en el estado más bajo, el potencial de la Budeidad permanece latente. Esto explica que todas las personas son capaces de lograr la Budeidad en cualquier momento."
      },
      {
        "title": "3º. LOS DIEZ FACTORES (x10)",
        "explanation": "Describen la entidad de la vida, que manifiesta los diez estados, y la Ley de causa y efecto. Son coherentes para cada uno de los 10 estados.",
        "current_analogy": "Al manifestar la Budeidad, se activa el 'Poder' innato (uno de los factores) de nuestra sabiduría, transformando la causa y el efecto para generar valor perdurable.",
        "children": [
          { "title": "1. Apariencia", "explanation": "Aspecto exterior de un ser vivo.", "current_analogy": "Nuestra manifestación física y cómo nos presentamos al mundo." },
          { "title": "2. Naturaleza", "explanation": "Atributos intrínsecos o carácter innato y consistente de un ser.", "current_analogy": "La esencia interna que guía nuestra vida." },
          { "title": "3. Entidad", "explanation": "La cosa o el ser en sí mismo, que posee los aspectos de Apariencia y Naturaleza." },
          { "title": "4. Poder", "explanation": "El potencial interior o la energía interna.", "current_analogy": "La fuerza vital que poseemos para enfrentar desafíos." },
          { "title": "5. Influencia", "explanation": "La expresión externa de ese poder interno.", "current_analogy": "El impacto que nuestra energía ejerce sobre otras vidas o fenómenos." },
          { "title": "6. Causa Interna", "explanation": "La causa primaria o directa, latente en la vida." },
          { "title": "7. Relación", "explanation": "Condición externa que estimula la Causa Interna y funciona como causa auxiliar." },
          { "title": "8. Efecto latente", "explanation": "El resultado intrínseco o imperceptible que surge de la interacción entre Causa Interna y Relación." },
          { "title": "9. Efecto manifiesto", "explanation": "El resultado evidente que surge del Efecto Latente." },
          { "title": "10. Coherencia de principio al fin", "explanation": "Todos los demás factores mantienen una congruencia desde el comienzo (Apariencia) hasta el fin (Efecto Manifiesto)." }
        ]
      },
      {
        "title": "4º. LOS TRES PLANOS DE LA EXISTENCIA (x3)",
        "explanation": "El plano en el que se expresa cada uno de los Diez Estados.",
        "current_analogy": "Un cambio en nuestro estado mental (Ichinen) produce un cambio en estos tres planos: nuestro cuerpo, nuestras relaciones y nuestro entorno.",
        "children": [
          {
            "title": "1. El plano de los Cinco Componentes",
            "explanation": "Funciones físicas y psíquicas de la vida.",
            "current_analogy": "Cómo nuestro estado mental afecta nuestro Aspecto físico (Forma) y Aspecto espiritual (Percepción, Conceptualización, Volición y Conciencia)."
          },
          {
            "title": "2. El plano de los seres vivos",
            "explanation": "El ser vivo individual, formado por la unión temporal de los 5 componentes, que manifiesta y experimenta cualquiera de los 10 estados.",
            "current_analogy": "Nuestras relaciones y el conjunto de individuos con quienes interactuamos."
          },
          {
            "title": "3. El plano del Medio Ambiente",
            "explanation": "El entorno individual que sustenta la existencia del ser vivo.",
            "current_analogy": "El ambiente laboral, la comunidad, la ciudad o el país; cómo nuestro Ichinen influye en la creación de una 'Tierra de Buda' en nuestro entorno."
          }
        ]
      }
    ]
  };

  // Renderizar resumen inicial
  renderSummary();

  /* ------------------ Visualización D3 ------------------ */
  const SVG_WIDTH = 1300;
  const BASE_SVG_HEIGHT = 900;
  const svg = d3.select("#mindmap-container")
    .attr("preserveAspectRatio", "xMidYMid meet")
    .style("max-width", "100%")
    .style("height", "auto");

  const container = svg.append("g").attr("class", "container");
  const g = container.append("g")
    .attr("transform", `translate(180, ${BASE_SVG_HEIGHT / 2})`);

  const zoom = d3.zoom()
    .scaleExtent([0.3, 3])
    .on("zoom", (event) => { container.attr("transform", event.transform); });
  svg.call(zoom);

  let idCounter = 0;
  const duration = 700;
  let root;
  const treeLayout = d3.tree();

  root = d3.hierarchy(ichinenSanzenData, d => d.children);
  root.x0 = BASE_SVG_HEIGHT / 2;
  root.y0 = 0;

  if (root.children) root.children.forEach(collapse);

  update(root);

  function collapse(d) {
    if (d.children) {
      d._children = d.children;
      d._children.forEach(collapse);
      d.children = null;
    }
  }

  function uid(d) { return d.id || (d.id = ++idCounter); }

  function computeMaxNodesPerDepth(rootNode) {
    const counts = [];
    rootNode.each(d => { counts[d.depth] = (counts[d.depth] || 0) + 1; });
    return Math.max(...counts, 1);
  }

  function diagonal(s, d) {
    return `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`;
  }

  function update(source) {
    const maxPerDepth = computeMaxNodesPerDepth(root);
    const nodeVerticalSpacing = 36;
    const computedHeight = Math.max(BASE_SVG_HEIGHT, (maxPerDepth + 2) * nodeVerticalSpacing * 1.6);

    svg.attr("viewBox", `0 0 ${SVG_WIDTH} ${computedHeight}`);
    treeLayout.size([computedHeight, SVG_WIDTH - 420]);

    const treeData = treeLayout(root);
    const nodes = treeData.descendants();
    const links = treeData.descendants().slice(1);

    nodes.forEach(d => { d.y = d.depth * 220; });

    // LINKS
    const link = g.selectAll("path.link")
      .data(links, d => uid(d));

    const linkEnter = link.enter().insert("path", "g")
      .attr("class", "link")
      .attr("d", d => { const o = { x: source.x0, y: source.y0 }; return diagonal(o, o); })
      .style("fill", "none")
      .style("stroke", "#9a9a9a")
      .style("stroke-width", 1.6);

    link.merge(linkEnter).transition().duration(duration)
      .attr("d", d => diagonal(d, d.parent));

    link.exit().transition().duration(duration)
      .attr("d", d => { const o = { x: source.x, y: source.y }; return diagonal(o, o); })
      .remove();

    // NODES
    const node = g.selectAll("g.node")
      .data(nodes, d => uid(d));

    const nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${source.y0},${source.x0})`)
      .on("click", click)
      .attr("role", "button")
      .attr("tabindex", 0)
      .on("keydown", (event, d) => { if (event.key === "Enter" || event.key === " ") click(event, d); });

    nodeEnter.append("circle")
      .attr("r", 1e-6)
      .style("fill", d => d._children ? "#0b5563" : "#0da58b")
      .style("stroke", "#0b5563")
      .style("stroke-width", 1.6);

    nodeEnter.append("text")
      .attr("dy", ".35em")
      .attr("x", d => d._children || d.children ? -24 : 24)
      .attr("text-anchor", d => d._children || d.children ? "end" : "start")
      .text(d => d.data.title)
      .style("font-family", "sans-serif")
      .style("font-size", d => d.depth === 0 ? "22px" : d.depth === 1 ? "16px" : "14px")
      .style("font-weight", d => d.depth === 0 ? "800" : d.depth === 1 ? "700" : "500");

    const nodeUpdate = node.merge(nodeEnter).transition().duration(duration)
      .attr("transform", d => `translate(${d.y},${d.x})`);

    nodeUpdate.select("circle")
      .attr("r", d => d.depth === 0 ? 16 : 12)
      .style("fill", d => d._children ? "#0b5563" : "#0da58b")
      .attr("cursor", "pointer");

    const nodeExit = node.exit().transition().duration(duration)
      .attr("transform", d => `translate(${source.y},${source.x})`)
      .remove();

    nodeExit.select("circle").attr("r", 1e-6);
    nodeExit.select("text").style("fill-opacity", 1e-6);

    nodes.forEach(d => { d.x0 = d.x; d.y0 = d.y; });

    if (source === root) showDetails(root);
  }

  function click(event, d) {
    if (d.children) { d._children = d.children; d.children = null; }
    else { d.children = d._children; d._children = null; }
    update(d);
    showDetails(d);
  }

  function showDetails(d) {
    const body = d3.select("body");
    let panel = body.select(".details-panel");
    if (panel.empty()) {
      panel = body.append("div").attr("class", "details-panel");
    }

    panel.html("");
    panel.append("h3").text(d.data.title || "Sin título");
    panel.append("p").html(`<strong>Explicación:</strong> ${d.data.explanation || "No aplica"}`);
    panel.append("p").html(`<strong>Analogía Actual (circunstancia concreta):</strong> ${d.data.current_analogy || d.data.currentAnalogy || "No aplica"}`);

    const children = (d.children && d.children.length) ? d.children
                    : (d._children && d._children.length) ? d._children
                    : null;

    if (children) {
      panel.append("h4").text("Subestados y analogías actuales:");
      const list = panel.append("ul");
      children.forEach(ch => {
        list.append("li").html(`<strong>${ch.data.title}:</strong> ${ch.data.current_analogy || ch.data.currentAnalogy || ch.data.explanation || "No aplica"}`);
      });
    }
  }
});