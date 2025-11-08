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

  // Datos con 'current_analogy' añadida a cada subvalor
  const ichinenSanzenData = {
    title: "ICHINEN SANZEN: El Mapa Dinámico de los 3,000 Aspectos de la Vida",
    explanation: "El principio que revela que cada existencia individual es un microcosmos del universo...",
    current_analogy: "Un individuo que cambia su actitud puede cambiar dinámicas familiares, laborales y sociales.",
    children: [
      {
        title: "Cálculo 1: Los Diez Estados (x10)",
        explanation: "Describe el profundo estado o condición...",
        current_analogy: "Cada estado se manifiesta en comportamientos concretos en la vida diaria",
        children: [
          { title: "1. Infierno", explanation: "Estado de mayor sufrimiento...", current_analogy: "Persona sin hogar tras pérdida de empleo y red de apoyo" },
          { title: "2. Hambre", explanation: "Deseo insaciable...", current_analogy: "Adicción al consumo rápido de contenidos y compras compulsivas" },
          { title: "3. Animalidad", explanation: "Movido por los instintos...", current_analogy: "Actuar por impulsos en relaciones sin considerar consecuencias" },
          { title: "4. Ira (Asuras)", explanation: "Perversidad...", current_analogy: "Conflictos en el teletrabajo que escalan por falta de límites" },
          { title: "5. Humanidad", explanation: "Se esfuerza por controlar los impulsos...", current_analogy: "Persona que busca terapia para regular emociones" },
          { title: "6. Éxtasis", explanation: "Condición subjetiva de contento...", current_analogy: "Búsqueda de experiencias intensas en redes sociales para validación" },
          { title: "7. Aprendizaje (Dos Vehículos)", explanation: "Toma conciencia de la transitoriedad...", current_analogy: "Reorientación profesional tras crisis económica" },
          { title: "8. Comprensión Intuitiva (Dos Vehículos)", explanation: "Llega a verdades en forma independiente...", current_analogy: "Innovador que detecta una necesidad no cubierta en su comunidad" },
          { title: "9. Bodisatva", explanation: "Se esfuerza por lograr la iluminación...", current_analogy: "Activista que renuncia a confort personal por ayudar a otros" },
          { title: "10. Budeidad", explanation: "Estado de completo acceso a sabiduría...", current_analogy: "Líder que actúa con visión a largo plazo en políticas públicas" }
        ]
      },
      {
        title: "Cálculo 2: Posesión Mutua de los Diez Estados (x10 = 100)",
        explanation: "Cada uno de los diez estados, además de contenerse a sí mismo, contiene el potencial de los otros nueve.",
        current_analogy: "Un profesional puede mostrar paciencia (humanidad) en el trabajo pero volverse reactivo bajo estrés extremo (ira). Ejemplo: burnout que transforma conducta habitual."
      },
      {
        title: "Cálculo 3: Los Diez Factores de la Vida (x10 = 1,000)",
        explanation: "Diez aspectos comunes a todas las formas de vida...",
        current_analogy: "Factores que explican por qué una misma persona reacciona distinto según contexto",
        children: [
          { title: "1-3. Apariencia, Naturaleza, Entidad", explanation: "Existencia y esencia...", current_analogy: "Imagen pública y reputación afectadas por una polémica en redes sociales" },
          { title: "4-5. Poder e Influencia", explanation: "Funciones dinámicas...", current_analogy: "Influencers o algoritmos que moldean decisiones de consumo masivo" },
          { title: "6-9. Causa Interna, Relación, Efecto Latente, Efecto Manifiesto", explanation: "Ley de causalidad aplicada a la vida", current_analogy: "Hábitos diarios (causa interna) que con el tiempo generan salud o enfermedad (efecto manifiesto)" },
          { title: "10. Coherencia de Principio a Fin", explanation: "Congruencia entre inicio y resultado...", current_analogy: "Proyectos que fracasan por falta de coherencia entre misión y ejecución (startups)" }
        ]
      },
      {
        title: "Cálculo 4: Los Tres Principios de Individualización (x3 = 3,000)",
        explanation: "Tres planos en los que se expresan los diez estados...",
        current_analogy: "La misma predisposición mental se expresa diferente según cuerpo, vida y ambiente",
        children: [
          { title: "1. Ámbito de los Cinco Componentes", explanation: "Funciones físicas y psíquicas...", current_analogy: "Strés crónico durante la pandemia que desgasta la salud física y mental" },
          { title: "2. Ámbito de los Seres Vivos", explanation: "El ser vivo individualizado...", current_analogy: "Relaciones familiares tensas por cambios económicos" },
          { title: "3. Ámbito del Ambiente", explanation: "El lugar o tierra donde habitan los seres...", current_analogy: "Ciudades con falta de espacios verdes que aumentan el aislamiento urbano" }
        ]
      }
    ]
  };

  // Configuración base
  const SVG_WIDTH = 1200;
  const BASE_SVG_HEIGHT = 800;
  const svg = d3.select("#mindmap-container")
    .attr("preserveAspectRatio", "xMidYMid meet")
    .style("max-width", "100%")
    .style("height", "auto");

  const container = svg.append("g").attr("class", "container");
  const g = container.append("g")
    .attr("transform", `translate(140, ${BASE_SVG_HEIGHT / 2})`);

  const zoom = d3.zoom()
    .scaleExtent([0.4, 2])
    .on("zoom", (event) => {
      container.attr("transform", event.transform);
    });
  svg.call(zoom);

  let idCounter = 0;
  const duration = 750;
  let root;
  let treeLayout = d3.tree();

  root = d3.hierarchy(ichinenSanzenData, d => d.children);
  root.x0 = BASE_SVG_HEIGHT / 2;
  root.y0 = 0;

  if (root.children) {
    root.children.forEach(collapse);
  }

  update(root);

  function collapse(d) {
    if (d.children) {
      d._children = d.children;
      d._children.forEach(collapse);
      d.children = null;
    }
  }

  function uid(d) {
    return d.id || (d.id = ++idCounter);
  }

  function update(source) {
    const maxPerDepth = computeMaxNodesPerDepth(root);
    const nodeVerticalSpacing = 28;
    const computedHeight = Math.max(BASE_SVG_HEIGHT, (maxPerDepth + 2) * nodeVerticalSpacing * 1.5);

    svg.attr("viewBox", `0 0 ${SVG_WIDTH} ${computedHeight}`);
    treeLayout.size([computedHeight, SVG_WIDTH - 300]);

    const treeData = treeLayout(root);
    const nodes = treeData.descendants();
    const links = treeData.descendants().slice(1);

    nodes.forEach(d => { d.y = d.depth * 180; });

    // LINKS
    const link = g.selectAll("path.link")
      .data(links, d => uid(d));

    const linkEnter = link.enter().insert("path", "g")
      .attr("class", "link")
      .attr("d", d => {
        const o = { x: source.x0, y: source.y0 };
        return diagonal(o, o);
      })
      .style("fill", "none")
      .style("stroke", "#888")
      .style("stroke-width", 1.5);

    link.merge(linkEnter).transition().duration(duration)
      .attr("d", d => diagonal(d, d.parent));

    link.exit().transition().duration(duration)
      .attr("d", d => {
        const o = { x: source.x, y: source.y };
        return diagonal(o, o);
      })
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
      .on("keydown", (event, d) => {
        if (event.key === "Enter" || event.key === " ") click(event, d);
      });

    nodeEnter.append("circle")
      .attr("r", 1e-6)
      .style("fill", d => d._children ? "#004d40" : "#009688")
      .style("stroke", "#004d40")
      .style("stroke-width", 1.5);

    // tamaño de fuente por profundidad: root grande, principales más grandes
    nodeEnter.append("text")
      .attr("dy", ".35em")
      .attr("x", d => d._children || d.children ? -16 : 16)
      .attr("text-anchor", d => d._children || d.children ? "end" : "start")
      .text(d => d.data.title)
      .style("font-family", "sans-serif")
      .style("font-size", d => d.depth === 0 ? "18px" : d.depth === 1 ? "14px" : "12px")
      .style("font-weight", d => d.depth === 0 ? "700" : d.depth === 1 ? "600" : "400");

    const nodeUpdate = node.merge(nodeEnter).transition().duration(duration)
      .attr("transform", d => `translate(${d.y},${d.x})`);

    nodeUpdate.select("circle")
      .attr("r", d => d.depth === 0 ? 14 : 10)
      .style("fill", d => d._children ? "#004d40" : "#009688")
      .attr("cursor", "pointer");

    const nodeExit = node.exit().transition().duration(duration)
      .attr("transform", d => `translate(${source.y},${source.x})`)
      .remove();

    nodeExit.select("circle").attr("r", 1e-6);
    nodeExit.select("text").style("fill-opacity", 1e-6);

    nodes.forEach(d => {
      d.x0 = d.x;
      d.y0 = d.y;
    });

    if (source === root) {
      showDetails(root);
    }
  }

  function computeMaxNodesPerDepth(rootNode) {
    const counts = [];
    rootNode.each(d => {
      counts[d.depth] = (counts[d.depth] || 0) + 1;
    });
    return Math.max(...counts, 1);
  }

  function diagonal(s, d) {
    return `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`;
  }

  function click(event, d) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    update(d);
    showDetails(d);
  }

  function showDetails(d) {
    const body = d3.select("body");
    let panel = body.select(".details-panel");
    if (panel.empty()) {
      panel = body.append("div")
        .attr("class", "details-panel");
    }

    panel.html("");
    panel.append("h3").text(d.data.title || "Sin título");
    panel.append("p").html(`<strong>Explicación:</strong> ${d.data.explanation || "No aplica"}`);
    panel.append("p").html(`<strong>Analogía Actual (circunstancia concreta):</strong> ${d.data.current_analogy || "No aplica"}`);

    const children = (d.children && d.children.length) ? d.children
                    : (d._children && d._children.length) ? d._children
                    : null;

    if (children) {
      panel.append("h4").text("Subestados y analogías actuales:");
      const list = panel.append("ul");
      children.forEach(ch => {
        list.append("li").html(`<strong>${ch.data.title}:</strong> ${ch.data.current_analogy || ch.data.explanation || "No aplica"}`);
      });
    }
  }
});