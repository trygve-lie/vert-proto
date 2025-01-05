// ../../node_modules/lit-html/lit-html.js
var t = globalThis, i = t.trustedTypes, s = i ? i.createPolicy("lit-html", { createHTML: (t5) => t5 }) : void 0, e = "$lit$", h = `lit$${Math.random().toFixed(9).slice(2)}$`, o = "?" + h, n = `<${o}>`, r = document, l = () => r.createComment(""), c = (t5) => null === t5 || "object" != typeof t5 && "function" != typeof t5, a = Array.isArray, u = (t5) => a(t5) || "function" == typeof t5?.[Symbol.iterator], d = "[ 	\n\f\r]", f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, v = /-->/g, _ = />/g, m = RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), p = /'/g, g = /"/g, $ = /^(?:script|style|textarea|title)$/i, y = (t5) => (i8, ...s5) => ({ _$litType$: t5, strings: i8, values: s5 }), x = y(1), b = y(2), w = y(3), T = Symbol.for("lit-noChange"), E = Symbol.for("lit-nothing"), A = /* @__PURE__ */ new WeakMap(), C = r.createTreeWalker(r, 129);
function P(t5, i8) {
  if (!a(t5) || !t5.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== s ? s.createHTML(i8) : i8;
}
var V = (t5, i8) => {
  const s5 = t5.length - 1, o6 = [];
  let r7, l5 = 2 === i8 ? "<svg>" : 3 === i8 ? "<math>" : "", c6 = f;
  for (let i9 = 0; i9 < s5; i9++) {
    const s6 = t5[i9];
    let a3, u5, d5 = -1, y3 = 0;
    for (; y3 < s6.length && (c6.lastIndex = y3, u5 = c6.exec(s6), null !== u5); ) y3 = c6.lastIndex, c6 === f ? "!--" === u5[1] ? c6 = v : void 0 !== u5[1] ? c6 = _ : void 0 !== u5[2] ? ($.test(u5[2]) && (r7 = RegExp("</" + u5[2], "g")), c6 = m) : void 0 !== u5[3] && (c6 = m) : c6 === m ? ">" === u5[0] ? (c6 = r7 ?? f, d5 = -1) : void 0 === u5[1] ? d5 = -2 : (d5 = c6.lastIndex - u5[2].length, a3 = u5[1], c6 = void 0 === u5[3] ? m : '"' === u5[3] ? g : p) : c6 === g || c6 === p ? c6 = m : c6 === v || c6 === _ ? c6 = f : (c6 = m, r7 = void 0);
    const x2 = c6 === m && t5[i9 + 1].startsWith("/>") ? " " : "";
    l5 += c6 === f ? s6 + n : d5 >= 0 ? (o6.push(a3), s6.slice(0, d5) + e + s6.slice(d5) + h + x2) : s6 + h + (-2 === d5 ? i9 : x2);
  }
  return [P(t5, l5 + (t5[s5] || "<?>") + (2 === i8 ? "</svg>" : 3 === i8 ? "</math>" : "")), o6];
};
var N = class _N {
  constructor({ strings: t5, _$litType$: s5 }, n5) {
    let r7;
    this.parts = [];
    let c6 = 0, a3 = 0;
    const u5 = t5.length - 1, d5 = this.parts, [f5, v3] = V(t5, s5);
    if (this.el = _N.createElement(f5, n5), C.currentNode = this.el.content, 2 === s5 || 3 === s5) {
      const t6 = this.el.content.firstChild;
      t6.replaceWith(...t6.childNodes);
    }
    for (; null !== (r7 = C.nextNode()) && d5.length < u5; ) {
      if (1 === r7.nodeType) {
        if (r7.hasAttributes()) for (const t6 of r7.getAttributeNames()) if (t6.endsWith(e)) {
          const i8 = v3[a3++], s6 = r7.getAttribute(t6).split(h), e6 = /([.?@])?(.*)/.exec(i8);
          d5.push({ type: 1, index: c6, name: e6[2], strings: s6, ctor: "." === e6[1] ? H : "?" === e6[1] ? I : "@" === e6[1] ? L : k }), r7.removeAttribute(t6);
        } else t6.startsWith(h) && (d5.push({ type: 6, index: c6 }), r7.removeAttribute(t6));
        if ($.test(r7.tagName)) {
          const t6 = r7.textContent.split(h), s6 = t6.length - 1;
          if (s6 > 0) {
            r7.textContent = i ? i.emptyScript : "";
            for (let i8 = 0; i8 < s6; i8++) r7.append(t6[i8], l()), C.nextNode(), d5.push({ type: 2, index: ++c6 });
            r7.append(t6[s6], l());
          }
        }
      } else if (8 === r7.nodeType) if (r7.data === o) d5.push({ type: 2, index: c6 });
      else {
        let t6 = -1;
        for (; -1 !== (t6 = r7.data.indexOf(h, t6 + 1)); ) d5.push({ type: 7, index: c6 }), t6 += h.length - 1;
      }
      c6++;
    }
  }
  static createElement(t5, i8) {
    const s5 = r.createElement("template");
    return s5.innerHTML = t5, s5;
  }
};
function S(t5, i8, s5 = t5, e6) {
  if (i8 === T) return i8;
  let h5 = void 0 !== e6 ? s5._$Co?.[e6] : s5._$Cl;
  const o6 = c(i8) ? void 0 : i8._$litDirective$;
  return h5?.constructor !== o6 && (h5?._$AO?.(false), void 0 === o6 ? h5 = void 0 : (h5 = new o6(t5), h5._$AT(t5, s5, e6)), void 0 !== e6 ? (s5._$Co ??= [])[e6] = h5 : s5._$Cl = h5), void 0 !== h5 && (i8 = S(t5, h5._$AS(t5, i8.values), h5, e6)), i8;
}
var M = class {
  constructor(t5, i8) {
    this._$AV = [], this._$AN = void 0, this._$AD = t5, this._$AM = i8;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t5) {
    const { el: { content: i8 }, parts: s5 } = this._$AD, e6 = (t5?.creationScope ?? r).importNode(i8, true);
    C.currentNode = e6;
    let h5 = C.nextNode(), o6 = 0, n5 = 0, l5 = s5[0];
    for (; void 0 !== l5; ) {
      if (o6 === l5.index) {
        let i9;
        2 === l5.type ? i9 = new R(h5, h5.nextSibling, this, t5) : 1 === l5.type ? i9 = new l5.ctor(h5, l5.name, l5.strings, this, t5) : 6 === l5.type && (i9 = new z(h5, this, t5)), this._$AV.push(i9), l5 = s5[++n5];
      }
      o6 !== l5?.index && (h5 = C.nextNode(), o6++);
    }
    return C.currentNode = r, e6;
  }
  p(t5) {
    let i8 = 0;
    for (const s5 of this._$AV) void 0 !== s5 && (void 0 !== s5.strings ? (s5._$AI(t5, s5, i8), i8 += s5.strings.length - 2) : s5._$AI(t5[i8])), i8++;
  }
};
var R = class _R {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t5, i8, s5, e6) {
    this.type = 2, this._$AH = E, this._$AN = void 0, this._$AA = t5, this._$AB = i8, this._$AM = s5, this.options = e6, this._$Cv = e6?.isConnected ?? true;
  }
  get parentNode() {
    let t5 = this._$AA.parentNode;
    const i8 = this._$AM;
    return void 0 !== i8 && 11 === t5?.nodeType && (t5 = i8.parentNode), t5;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t5, i8 = this) {
    t5 = S(this, t5, i8), c(t5) ? t5 === E || null == t5 || "" === t5 ? (this._$AH !== E && this._$AR(), this._$AH = E) : t5 !== this._$AH && t5 !== T && this._(t5) : void 0 !== t5._$litType$ ? this.$(t5) : void 0 !== t5.nodeType ? this.T(t5) : u(t5) ? this.k(t5) : this._(t5);
  }
  O(t5) {
    return this._$AA.parentNode.insertBefore(t5, this._$AB);
  }
  T(t5) {
    this._$AH !== t5 && (this._$AR(), this._$AH = this.O(t5));
  }
  _(t5) {
    this._$AH !== E && c(this._$AH) ? this._$AA.nextSibling.data = t5 : this.T(r.createTextNode(t5)), this._$AH = t5;
  }
  $(t5) {
    const { values: i8, _$litType$: s5 } = t5, e6 = "number" == typeof s5 ? this._$AC(t5) : (void 0 === s5.el && (s5.el = N.createElement(P(s5.h, s5.h[0]), this.options)), s5);
    if (this._$AH?._$AD === e6) this._$AH.p(i8);
    else {
      const t6 = new M(e6, this), s6 = t6.u(this.options);
      t6.p(i8), this.T(s6), this._$AH = t6;
    }
  }
  _$AC(t5) {
    let i8 = A.get(t5.strings);
    return void 0 === i8 && A.set(t5.strings, i8 = new N(t5)), i8;
  }
  k(t5) {
    a(this._$AH) || (this._$AH = [], this._$AR());
    const i8 = this._$AH;
    let s5, e6 = 0;
    for (const h5 of t5) e6 === i8.length ? i8.push(s5 = new _R(this.O(l()), this.O(l()), this, this.options)) : s5 = i8[e6], s5._$AI(h5), e6++;
    e6 < i8.length && (this._$AR(s5 && s5._$AB.nextSibling, e6), i8.length = e6);
  }
  _$AR(t5 = this._$AA.nextSibling, i8) {
    for (this._$AP?.(false, true, i8); t5 && t5 !== this._$AB; ) {
      const i9 = t5.nextSibling;
      t5.remove(), t5 = i9;
    }
  }
  setConnected(t5) {
    void 0 === this._$AM && (this._$Cv = t5, this._$AP?.(t5));
  }
};
var k = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t5, i8, s5, e6, h5) {
    this.type = 1, this._$AH = E, this._$AN = void 0, this.element = t5, this.name = i8, this._$AM = e6, this.options = h5, s5.length > 2 || "" !== s5[0] || "" !== s5[1] ? (this._$AH = Array(s5.length - 1).fill(new String()), this.strings = s5) : this._$AH = E;
  }
  _$AI(t5, i8 = this, s5, e6) {
    const h5 = this.strings;
    let o6 = false;
    if (void 0 === h5) t5 = S(this, t5, i8, 0), o6 = !c(t5) || t5 !== this._$AH && t5 !== T, o6 && (this._$AH = t5);
    else {
      const e7 = t5;
      let n5, r7;
      for (t5 = h5[0], n5 = 0; n5 < h5.length - 1; n5++) r7 = S(this, e7[s5 + n5], i8, n5), r7 === T && (r7 = this._$AH[n5]), o6 ||= !c(r7) || r7 !== this._$AH[n5], r7 === E ? t5 = E : t5 !== E && (t5 += (r7 ?? "") + h5[n5 + 1]), this._$AH[n5] = r7;
    }
    o6 && !e6 && this.j(t5);
  }
  j(t5) {
    t5 === E ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t5 ?? "");
  }
};
var H = class extends k {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t5) {
    this.element[this.name] = t5 === E ? void 0 : t5;
  }
};
var I = class extends k {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t5) {
    this.element.toggleAttribute(this.name, !!t5 && t5 !== E);
  }
};
var L = class extends k {
  constructor(t5, i8, s5, e6, h5) {
    super(t5, i8, s5, e6, h5), this.type = 5;
  }
  _$AI(t5, i8 = this) {
    if ((t5 = S(this, t5, i8, 0) ?? E) === T) return;
    const s5 = this._$AH, e6 = t5 === E && s5 !== E || t5.capture !== s5.capture || t5.once !== s5.once || t5.passive !== s5.passive, h5 = t5 !== E && (s5 === E || e6);
    e6 && this.element.removeEventListener(this.name, this, s5), h5 && this.element.addEventListener(this.name, this, t5), this._$AH = t5;
  }
  handleEvent(t5) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t5) : this._$AH.handleEvent(t5);
  }
};
var z = class {
  constructor(t5, i8, s5) {
    this.element = t5, this.type = 6, this._$AN = void 0, this._$AM = i8, this.options = s5;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t5) {
    S(this, t5);
  }
};
var Z = { M: e, P: h, A: o, C: 1, L: V, R: M, D: u, V: S, I: R, H: k, N: I, U: L, B: H, F: z }, j = t.litHtmlPolyfillSupport;
j?.(N, R), (t.litHtmlVersions ??= []).push("3.2.1");
var B = (t5, i8, s5) => {
  const e6 = s5?.renderBefore ?? i8;
  let h5 = e6._$litPart$;
  if (void 0 === h5) {
    const t6 = s5?.renderBefore ?? null;
    e6._$litPart$ = h5 = new R(i8.insertBefore(l(), t6), t6, void 0, s5 ?? {});
  }
  return h5._$AI(t5), h5;
};

// ../../node_modules/lit-html/private-ssr-support.js
var r2 = null;
var i2 = { boundAttributeSuffix: Z.M, marker: Z.P, markerMatch: Z.A, HTML_RESULT: Z.C, getTemplateHtml: Z.L, overrideDirectiveResolve: (e6, t5) => class extends e6 {
  _$AS(e7, r7) {
    return t5(this, r7);
  }
}, patchDirectiveResolve: (e6, t5) => {
  if (e6.prototype._$AS !== t5) {
    r2 ??= e6.prototype._$AS.name;
    for (let i8 = e6.prototype; i8 !== Object.prototype; i8 = Object.getPrototypeOf(i8)) if (i8.hasOwnProperty(r2)) return void (i8[r2] = t5);
    throw Error("Internal error: It is possible that both dev mode and production mode Lit was mixed together during SSR. Please comment on the issue: https://github.com/lit/lit/issues/4527");
  }
}, setDirectiveClass(e6, t5) {
  e6._$litDirective$ = t5;
}, getAttributePartCommittedValue: (e6, r7, i8) => {
  let o6 = T;
  return e6.j = (e7) => o6 = e7, e6._$AI(r7, e6, i8), o6;
}, connectedDisconnectable: (e6) => ({ ...e6, _$AU: true }), resolveDirective: Z.V, AttributePart: Z.H, PropertyPart: Z.B, BooleanAttributePart: Z.N, EventPart: Z.U, ElementPart: Z.F, TemplateInstance: Z.R, isIterable: Z.D, ChildPart: Z.I };

// ../../node_modules/lit-html/directive.js
var t2 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, e2 = (t5) => (...e6) => ({ _$litDirective$: t5, values: e6 });
var i3 = class {
  constructor(t5) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t5, e6, i8) {
    this._$Ct = t5, this._$AM = e6, this._$Ci = i8;
  }
  _$AS(t5, e6) {
    return this.update(t5, e6);
  }
  update(t5, e6) {
    return this.render(...e6);
  }
};

// ../../node_modules/lit-html/directive-helpers.js
var { I: t3 } = Z, i4 = (o6) => null === o6 || "object" != typeof o6 && "function" != typeof o6, n2 = { HTML: 1, SVG: 2, MATHML: 3 }, e3 = (o6, t5) => void 0 === t5 ? void 0 !== o6?._$litType$ : o6?._$litType$ === t5, l2 = (o6) => null != o6?._$litType$?.h, c2 = (o6) => void 0 !== o6?._$litDirective$, d2 = (o6) => o6?._$litDirective$, f2 = (o6) => void 0 === o6.strings, s2 = () => document.createComment(""), r3 = (o6, i8, n5) => {
  const e6 = o6._$AA.parentNode, l5 = void 0 === i8 ? o6._$AB : i8._$AA;
  if (void 0 === n5) {
    const i9 = e6.insertBefore(s2(), l5), c6 = e6.insertBefore(s2(), l5);
    n5 = new t3(i9, c6, o6, o6.options);
  } else {
    const t5 = n5._$AB.nextSibling, i9 = n5._$AM, c6 = i9 !== o6;
    if (c6) {
      let t6;
      n5._$AQ?.(o6), n5._$AM = o6, void 0 !== n5._$AP && (t6 = o6._$AU) !== i9._$AU && n5._$AP(t6);
    }
    if (t5 !== l5 || c6) {
      let o7 = n5._$AA;
      for (; o7 !== t5; ) {
        const t6 = o7.nextSibling;
        e6.insertBefore(o7, l5), o7 = t6;
      }
    }
  }
  return n5;
}, v2 = (o6, t5, i8 = o6) => (o6._$AI(t5, i8), o6), u2 = {}, m2 = (o6, t5 = u2) => o6._$AH = t5, p2 = (o6) => o6._$AH, M2 = (o6) => {
  o6._$AP?.(false, true);
  let t5 = o6._$AA;
  const i8 = o6._$AB.nextSibling;
  for (; t5 !== i8; ) {
    const o7 = t5.nextSibling;
    t5.remove(), t5 = o7;
  }
}, h2 = (o6) => {
  o6._$AR();
};

// ../../node_modules/@lit-labs/ssr-client/lib/hydrate-lit-html.js
var { TemplateInstance: l3, isIterable: s3, resolveDirective: d3, ChildPart: c3, ElementPart: p3 } = i2, f3 = (e6, t5, r7 = {}) => {
  if (void 0 !== t5._$litPart$) throw Error("container already contains a live render");
  let n5, o6, i8;
  const a3 = [], l5 = document.createTreeWalker(t5, NodeFilter.SHOW_COMMENT);
  let s5;
  for (; null !== (s5 = l5.nextNode()); ) {
    const t6 = s5.data;
    if (t6.startsWith("lit-part")) {
      if (0 === a3.length && void 0 !== n5) throw Error(`There must be only one root part per container. Found a part marker (${s5}) when we already have a root part marker (${o6})`);
      i8 = m3(e6, s5, a3, r7), void 0 === n5 && (n5 = i8), o6 ??= s5;
    } else if (t6.startsWith("lit-node")) u3(s5, a3, r7);
    else if (t6.startsWith("/lit-part")) {
      if (1 === a3.length && i8 !== n5) throw Error("internal error");
      i8 = h3(s5, i8, a3);
    }
  }
  if (void 0 === n5) {
    const e7 = t5 instanceof ShadowRoot ? "{container.host.localName}'s shadow root" : t5 instanceof DocumentFragment ? "DocumentFragment" : t5.localName;
    console.error(`There should be exactly one root part in a render container, but we didn't find any in ${e7}.`);
  }
  t5._$litPart$ = n5;
}, m3 = (t5, r7, a3, p5) => {
  let f5, m4;
  if (0 === a3.length) m4 = new c3(r7, null, void 0, p5), f5 = t5;
  else {
    const e6 = a3[a3.length - 1];
    if ("template-instance" === e6.type) m4 = new c3(r7, null, e6.instance, p5), e6.instance._$AV.push(m4), f5 = e6.result.values[e6.instancePartIndex++], e6.templatePartIndex++;
    else if ("iterable" === e6.type) {
      m4 = new c3(r7, null, e6.part, p5);
      const t6 = e6.iterator.next();
      if (t6.done) throw f5 = void 0, e6.done = true, Error("Unhandled shorter than expected iterable");
      f5 = t6.value, e6.part._$AH.push(m4);
    } else m4 = new c3(r7, null, e6.part, p5);
  }
  if (f5 = d3(m4, f5), f5 === T) a3.push({ part: m4, type: "leaf" });
  else if (i4(f5)) a3.push({ part: m4, type: "leaf" }), m4._$AH = f5;
  else if (e3(f5)) {
    if (l2(f5)) throw Error("compiled templates are not supported");
    const e6 = "lit-part " + w2(f5);
    if (r7.data !== e6) throw Error("Hydration value mismatch: Unexpected TemplateResult rendered to part");
    {
      const e7 = c3.prototype._$AC(f5), t6 = new l3(e7, m4);
      a3.push({ type: "template-instance", instance: t6, part: m4, templatePartIndex: 0, instancePartIndex: 0, result: f5 }), m4._$AH = t6;
    }
  } else s3(f5) ? (a3.push({ part: m4, type: "iterable", value: f5, iterator: f5[Symbol.iterator](), done: false }), m4._$AH = []) : (a3.push({ part: m4, type: "leaf" }), m4._$AH = f5 ?? "");
  return m4;
}, h3 = (e6, t5, r7) => {
  if (void 0 === t5) throw Error("unbalanced part marker");
  t5._$AB = e6;
  const n5 = r7.pop();
  if ("iterable" === n5.type && !n5.iterator.next().done) throw Error("unexpected longer than expected iterable");
  if (r7.length > 0) return r7[r7.length - 1].part;
}, u3 = (e6, t5, n5) => {
  const o6 = /lit-node (\d+)/.exec(e6.data), i8 = parseInt(o6[1]), l5 = e6.nextElementSibling;
  if (null === l5) throw Error("could not find node for attribute parts");
  l5.removeAttribute("defer-hydration");
  const s5 = t5[t5.length - 1];
  if ("template-instance" !== s5.type) throw Error("Hydration value mismatch: Primitive found where TemplateResult expected. This usually occurs due to conditional rendering that resulted in a different value or template being rendered between the server and client.");
  {
    const e7 = s5.instance;
    for (; ; ) {
      const t6 = e7._$AD.parts[s5.templatePartIndex];
      if (void 0 === t6 || t6.type !== t2.ATTRIBUTE && t6.type !== t2.ELEMENT || t6.index !== i8) break;
      if (t6.type === t2.ATTRIBUTE) {
        const o7 = new t6.ctor(l5, t6.name, t6.strings, s5.instance, n5), i9 = f2(o7) ? s5.result.values[s5.instancePartIndex] : s5.result.values, d5 = !(o7.type === t2.EVENT || o7.type === t2.PROPERTY);
        o7._$AI(i9, o7, s5.instancePartIndex, d5), s5.instancePartIndex += t6.strings.length - 1, e7._$AV.push(o7);
      } else {
        const t7 = new p3(l5, s5.instance, n5);
        d3(t7, s5.result.values[s5.instancePartIndex++]), e7._$AV.push(t7);
      }
      s5.templatePartIndex++;
    }
  }
}, w2 = (e6) => {
  const t5 = new Uint32Array(2).fill(5381);
  for (const r8 of e6.strings) for (let e7 = 0; e7 < r8.length; e7++) t5[e7 % 2] = 33 * t5[e7 % 2] ^ r8.charCodeAt(e7);
  const r7 = String.fromCharCode(...new Uint8Array(t5.buffer));
  return btoa(r7);
};

// ../../node_modules/@lit-labs/ssr-client/lit-element-hydrate-support.js
globalThis.litElementHydrateSupport = ({ LitElement: s5 }) => {
  const h5 = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(s5), "observedAttributes").get;
  Object.defineProperty(s5, "observedAttributes", { get() {
    return [...h5.call(this), "defer-hydration"];
  } });
  const e6 = s5.prototype.attributeChangedCallback;
  s5.prototype.attributeChangedCallback = function(t5, i8, s6) {
    "defer-hydration" === t5 && null === s6 && n5.call(this), e6.call(this, t5, i8, s6);
  };
  const n5 = s5.prototype.connectedCallback;
  s5.prototype.connectedCallback = function() {
    this.hasAttribute("defer-hydration") || n5.call(this);
  };
  const o6 = s5.prototype.createRenderRoot;
  s5.prototype.createRenderRoot = function() {
    return this.shadowRoot ? (this._$AG = true, this.shadowRoot) : o6.call(this);
  };
  const r7 = Object.getPrototypeOf(s5.prototype).update;
  s5.prototype.update = function(s6) {
    const h6 = this.render();
    if (r7.call(this, s6), this._$AG) {
      this._$AG = false;
      for (let t5 = 0; t5 < this.attributes.length; t5++) {
        const i8 = this.attributes[t5];
        if (i8.name.startsWith("hydrate-internals-")) {
          const t6 = i8.name.slice(18);
          this.removeAttribute(t6), this.removeAttribute(i8.name);
        }
      }
      f3(h6, this.renderRoot, this.renderOptions);
    } else B(h6, this.renderRoot, this.renderOptions);
  };
};

// ../../node_modules/@lit/reactive-element/css-tag.js
var t4 = globalThis, e4 = t4.ShadowRoot && (void 0 === t4.ShadyCSS || t4.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s4 = Symbol(), o2 = /* @__PURE__ */ new WeakMap();
var n3 = class {
  constructor(t5, e6, o6) {
    if (this._$cssResult$ = true, o6 !== s4) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t5, this.t = e6;
  }
  get styleSheet() {
    let t5 = this.o;
    const s5 = this.t;
    if (e4 && void 0 === t5) {
      const e6 = void 0 !== s5 && 1 === s5.length;
      e6 && (t5 = o2.get(s5)), void 0 === t5 && ((this.o = t5 = new CSSStyleSheet()).replaceSync(this.cssText), e6 && o2.set(s5, t5));
    }
    return t5;
  }
  toString() {
    return this.cssText;
  }
};
var r4 = (t5) => new n3("string" == typeof t5 ? t5 : t5 + "", void 0, s4), i5 = (t5, ...e6) => {
  const o6 = 1 === t5.length ? t5[0] : e6.reduce((e7, s5, o7) => e7 + ((t6) => {
    if (true === t6._$cssResult$) return t6.cssText;
    if ("number" == typeof t6) return t6;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t6 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s5) + t5[o7 + 1], t5[0]);
  return new n3(o6, t5, s4);
}, S2 = (s5, o6) => {
  if (e4) s5.adoptedStyleSheets = o6.map((t5) => t5 instanceof CSSStyleSheet ? t5 : t5.styleSheet);
  else for (const e6 of o6) {
    const o7 = document.createElement("style"), n5 = t4.litNonce;
    void 0 !== n5 && o7.setAttribute("nonce", n5), o7.textContent = e6.cssText, s5.appendChild(o7);
  }
}, c4 = e4 ? (t5) => t5 : (t5) => t5 instanceof CSSStyleSheet ? ((t6) => {
  let e6 = "";
  for (const s5 of t6.cssRules) e6 += s5.cssText;
  return r4(e6);
})(t5) : t5;

// ../../node_modules/@lit/reactive-element/reactive-element.js
var { is: i6, defineProperty: e5, getOwnPropertyDescriptor: r5, getOwnPropertyNames: h4, getOwnPropertySymbols: o3, getPrototypeOf: n4 } = Object, a2 = globalThis, c5 = a2.trustedTypes, l4 = c5 ? c5.emptyScript : "", p4 = a2.reactiveElementPolyfillSupport, d4 = (t5, s5) => t5, u4 = { toAttribute(t5, s5) {
  switch (s5) {
    case Boolean:
      t5 = t5 ? l4 : null;
      break;
    case Object:
    case Array:
      t5 = null == t5 ? t5 : JSON.stringify(t5);
  }
  return t5;
}, fromAttribute(t5, s5) {
  let i8 = t5;
  switch (s5) {
    case Boolean:
      i8 = null !== t5;
      break;
    case Number:
      i8 = null === t5 ? null : Number(t5);
      break;
    case Object:
    case Array:
      try {
        i8 = JSON.parse(t5);
      } catch (t6) {
        i8 = null;
      }
  }
  return i8;
} }, f4 = (t5, s5) => !i6(t5, s5), y2 = { attribute: true, type: String, converter: u4, reflect: false, hasChanged: f4 };
Symbol.metadata ??= Symbol("metadata"), a2.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var b2 = class extends HTMLElement {
  static addInitializer(t5) {
    this._$Ei(), (this.l ??= []).push(t5);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t5, s5 = y2) {
    if (s5.state && (s5.attribute = false), this._$Ei(), this.elementProperties.set(t5, s5), !s5.noAccessor) {
      const i8 = Symbol(), r7 = this.getPropertyDescriptor(t5, i8, s5);
      void 0 !== r7 && e5(this.prototype, t5, r7);
    }
  }
  static getPropertyDescriptor(t5, s5, i8) {
    const { get: e6, set: h5 } = r5(this.prototype, t5) ?? { get() {
      return this[s5];
    }, set(t6) {
      this[s5] = t6;
    } };
    return { get() {
      return e6?.call(this);
    }, set(s6) {
      const r7 = e6?.call(this);
      h5.call(this, s6), this.requestUpdate(t5, r7, i8);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t5) {
    return this.elementProperties.get(t5) ?? y2;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d4("elementProperties"))) return;
    const t5 = n4(this);
    t5.finalize(), void 0 !== t5.l && (this.l = [...t5.l]), this.elementProperties = new Map(t5.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d4("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d4("properties"))) {
      const t6 = this.properties, s5 = [...h4(t6), ...o3(t6)];
      for (const i8 of s5) this.createProperty(i8, t6[i8]);
    }
    const t5 = this[Symbol.metadata];
    if (null !== t5) {
      const s5 = litPropertyMetadata.get(t5);
      if (void 0 !== s5) for (const [t6, i8] of s5) this.elementProperties.set(t6, i8);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t6, s5] of this.elementProperties) {
      const i8 = this._$Eu(t6, s5);
      void 0 !== i8 && this._$Eh.set(i8, t6);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s5) {
    const i8 = [];
    if (Array.isArray(s5)) {
      const e6 = new Set(s5.flat(1 / 0).reverse());
      for (const s6 of e6) i8.unshift(c4(s6));
    } else void 0 !== s5 && i8.push(c4(s5));
    return i8;
  }
  static _$Eu(t5, s5) {
    const i8 = s5.attribute;
    return false === i8 ? void 0 : "string" == typeof i8 ? i8 : "string" == typeof t5 ? t5.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t5) => this.enableUpdating = t5), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t5) => t5(this));
  }
  addController(t5) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t5), void 0 !== this.renderRoot && this.isConnected && t5.hostConnected?.();
  }
  removeController(t5) {
    this._$EO?.delete(t5);
  }
  _$E_() {
    const t5 = /* @__PURE__ */ new Map(), s5 = this.constructor.elementProperties;
    for (const i8 of s5.keys()) this.hasOwnProperty(i8) && (t5.set(i8, this[i8]), delete this[i8]);
    t5.size > 0 && (this._$Ep = t5);
  }
  createRenderRoot() {
    const t5 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S2(t5, this.constructor.elementStyles), t5;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t5) => t5.hostConnected?.());
  }
  enableUpdating(t5) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t5) => t5.hostDisconnected?.());
  }
  attributeChangedCallback(t5, s5, i8) {
    this._$AK(t5, i8);
  }
  _$EC(t5, s5) {
    const i8 = this.constructor.elementProperties.get(t5), e6 = this.constructor._$Eu(t5, i8);
    if (void 0 !== e6 && true === i8.reflect) {
      const r7 = (void 0 !== i8.converter?.toAttribute ? i8.converter : u4).toAttribute(s5, i8.type);
      this._$Em = t5, null == r7 ? this.removeAttribute(e6) : this.setAttribute(e6, r7), this._$Em = null;
    }
  }
  _$AK(t5, s5) {
    const i8 = this.constructor, e6 = i8._$Eh.get(t5);
    if (void 0 !== e6 && this._$Em !== e6) {
      const t6 = i8.getPropertyOptions(e6), r7 = "function" == typeof t6.converter ? { fromAttribute: t6.converter } : void 0 !== t6.converter?.fromAttribute ? t6.converter : u4;
      this._$Em = e6, this[e6] = r7.fromAttribute(s5, t6.type), this._$Em = null;
    }
  }
  requestUpdate(t5, s5, i8) {
    if (void 0 !== t5) {
      if (i8 ??= this.constructor.getPropertyOptions(t5), !(i8.hasChanged ?? f4)(this[t5], s5)) return;
      this.P(t5, s5, i8);
    }
    false === this.isUpdatePending && (this._$ES = this._$ET());
  }
  P(t5, s5, i8) {
    this._$AL.has(t5) || this._$AL.set(t5, s5), true === i8.reflect && this._$Em !== t5 && (this._$Ej ??= /* @__PURE__ */ new Set()).add(t5);
  }
  async _$ET() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t6) {
      Promise.reject(t6);
    }
    const t5 = this.scheduleUpdate();
    return null != t5 && await t5, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [t7, s6] of this._$Ep) this[t7] = s6;
        this._$Ep = void 0;
      }
      const t6 = this.constructor.elementProperties;
      if (t6.size > 0) for (const [s6, i8] of t6) true !== i8.wrapped || this._$AL.has(s6) || void 0 === this[s6] || this.P(s6, this[s6], i8);
    }
    let t5 = false;
    const s5 = this._$AL;
    try {
      t5 = this.shouldUpdate(s5), t5 ? (this.willUpdate(s5), this._$EO?.forEach((t6) => t6.hostUpdate?.()), this.update(s5)) : this._$EU();
    } catch (s6) {
      throw t5 = false, this._$EU(), s6;
    }
    t5 && this._$AE(s5);
  }
  willUpdate(t5) {
  }
  _$AE(t5) {
    this._$EO?.forEach((t6) => t6.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t5)), this.updated(t5);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t5) {
    return true;
  }
  update(t5) {
    this._$Ej &&= this._$Ej.forEach((t6) => this._$EC(t6, this[t6])), this._$EU();
  }
  updated(t5) {
  }
  firstUpdated(t5) {
  }
};
b2.elementStyles = [], b2.shadowRootOptions = { mode: "open" }, b2[d4("elementProperties")] = /* @__PURE__ */ new Map(), b2[d4("finalized")] = /* @__PURE__ */ new Map(), p4?.({ ReactiveElement: b2 }), (a2.reactiveElementVersions ??= []).push("2.0.4");

// ../../node_modules/lit-element/lit-element.js
var r6 = class extends b2 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t5 = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t5.firstChild, t5;
  }
  update(t5) {
    const s5 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t5), this._$Do = B(s5, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(true);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(false);
  }
  render() {
    return T;
  }
};
r6._$litElement$ = true, r6["finalized"] = true, globalThis.litElementHydrateSupport?.({ LitElement: r6 });
var i7 = globalThis.litElementPolyfillSupport;
i7?.({ LitElement: r6 });
var o4 = { _$AK: (t5, e6, s5) => {
  t5._$AK(e6, s5);
}, _$AL: (t5) => t5._$AL };
(globalThis.litElementVersions ??= []).push("4.1.1");

// ../../node_modules/lit-html/is-server.js
var o5 = false;

// ../horizontal-messaging/module.js
var module_default = x`<div data-podium-component="true" data-podium-src="http://localhost:3002/" id="count" class="counter">
    <h3>Messages:</h3>
    <p>Placeholder: messages</p>
</div>`;

// ../horizontal-header/module.js
var module_default2 = x`<h1 data-podium-component="true" data-podium-src="http://localhost:3001/">Placeholder: Header</h1>`;

// src/styles-menu.js
var styles_menu_default = i5`
    .menu {
        display: none;
    }

    @media only screen and (max-width: 1024px) and (min-width: 768px) {
        .menu {
            display: flex;
            flex-direction: column;  
            gap: 20px;
        }

        .menu app-view {
            align-self: center;
        }
    }

    @media only screen and (max-width: 768px) {
        .menu {
            display: flex;
            align-items: center;
            justify-content: space-evenly;   
            gap: 5px;
            height: 100%;
        }
    }



    /* Navigation */
    #navigation ul li {
        border-top: solid 1px rgb(46, 46, 46);
    }

    #navigation ul li:first-child {
        border-top: none;
    }

    #navigation ul li a {
        display: block;
        padding-top: 10px;
        padding-bottom: 10px;
    }        
`;

// src/styles-frame-default.js
var styles_frame_default_default = i5`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    ul {
        list-style: none;
    }

    /* Frame structure */ 
    :host {
        width: 100%;
        display: grid;
        grid-template-areas:
        "header header"
        "aside main"
        "footer footer";
        grid-template-columns: 300px 10fr;
    }

    .header {
        grid-area: header;
        height: 8vh;
        padding: 0;
    }

    .aside {
        grid-area: aside;
        height: 90vh;
        padding: 0;
    }

    .main {
        background-color:rgb(255, 255, 255);
        grid-area: main;
        height: 90vh;
        margin-right: 4px;
        border-radius: 10px;
        padding: 0;
    }

    .footer {
        grid-area: footer;
        height: 2vh;
        padding: 0;
    }

    /* Frame markers */
    .container {
        padding: 10px;
        margin: 10px;
    }

    .horizontal {
        border: solid 1px #008d3f;
    }

    .vertical {
        border: solid 1px #8d0000;
    }
`;

// src/styles-frame-medium.js
var styles_frame_medium_default = i5`
    @media only screen and (max-width: 1024px) and (min-width: 768px) {
        :host {
            width: 100%;
            display: grid;
            grid-template-areas:
            "header header"
            "aside main"
            "footer footer";
            grid-template-columns: 60px 10fr;
        }

        .header {
            grid-area: header;
            height: 8vh;
            padding: 0;
        }

        .aside {
            grid-area: aside;
            height: 90vh;
            padding: 0;
        }

        .main {
            background-color:rgb(255, 255, 255);
            grid-area: main;
            height: 90vh;
            margin-right: 4px;
            border-radius: 10px;
            padding: 0;
        }

        .footer {
            grid-area: footer;
            height: 2vh;
            padding: 0;
        }

        .menu {
            display: block;
        }

        /* Bottom sheet */
        .medium-sideSheet {
            position: absolute;
            background-color: white;
            top: 0;
            left: 0;
            bottom: 0;
            width: 60%;
            box-shadow: 10px 0px 10px #ccc;  
            /* box-shadow: 0 0 8px 4px #ccc; */
        }
        
        .hidden {
            display: none;
        }
    }
`;

// src/styles-frame-small.js
var styles_frame_small_default = i5`
    @media only screen and (max-width: 768px) {
        :host {
            width: 100%;
            display: grid;
            grid-template-areas:
            "header"
            "main"
            "aside";
            grid-template-columns: auto;
        }

        .header {
            grid-area: header;
            height: 8vh;
            padding: 0;
        }

        .aside {
            grid-area: aside;
            height: 8vh;
            padding: 0;
        }

        .main {
            background-color:rgb(255, 255, 255);
            grid-area: main;
            height: 84vh;
            margin-right: 0;
            border: none;
            border-radius: 0;
            padding: 0;
        }

        .footer {
            display: none;
        }

        /* Bottom sheet */
        .small-bottomSheet {
            display: block;
            position: absolute;
            background-color: white;
            border-radius: 10px 10px 0 0;
            box-shadow: 0 0 8px 4px #ccc;
            bottom: 0;
            height: 90%;
            margin-right: 4%;
            margin-left: 4%;
            width: 92%;
            z-index: 1000;
        }
        
        .hidden {
            display: none;
        }
    }
`;

// src/frame-controller.js
var ApplicationView = class extends r6 {
  static properties = {
    target: { type: String },
    type: { type: String }
  };
  static styles = [
    i5`
            @media only screen and (min-width: 1024px) {
                :host {
                    display: none;
                }
            }
        `
  ];
  constructor() {
    super();
    this.target = "default";
    this.type = "button";
  }
  _fireViewEvent() {
    console.log("Button - fire event:", this.target);
    this.dispatchEvent(new CustomEvent("view", {
      detail: {
        target: this.target
      },
      bubbles: true,
      composed: true,
      cancelable: true
    }));
  }
  render() {
    if (this.type === "icon") {
      return x`
                <div class="icon" @click=${this._fireViewEvent}><slot></slot></div>
            `;
    }
    return x`
            <button class="button" @click=${this._fireViewEvent}><slot></slot></button>
        `;
  }
};
if (!customElements.get("app-view")) {
  customElements.define("app-view", ApplicationView);
}

// src/frame.js
var ApplicationFrame = class extends r6 {
  static styles = [
    styles_frame_default_default,
    styles_frame_medium_default,
    styles_frame_small_default,
    styles_menu_default
  ];
  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("view", (e6) => {
      console.log("Frame - on event", e6.detail);
      const selector = `#${e6.detail.target}`;
      const target = this.renderRoot.querySelector(selector);
      if (target) {
        target.classList.toggle("hidden");
      }
    });
  }
  _iconHome() {
    const icon = b`<path d="M23.121,9.069,15.536,1.483a5.008,5.008,0,0,0-7.072,0L.879,9.069A2.978,2.978,0,0,0,0,11.19v9.817a3,3,0,0,0,3,3H21a3,3,0,0,0,3-3V11.19A2.978,2.978,0,0,0,23.121,9.069ZM15,22.007H9V18.073a3,3,0,0,1,6,0Zm7-1a1,1,0,0,1-1,1H17V18.073a5,5,0,0,0-10,0v3.934H3a1,1,0,0,1-1-1V11.19a1.008,1.008,0,0,1,.293-.707L9.878,2.9a3.008,3.008,0,0,1,4.244,0l7.585,7.586A1.008,1.008,0,0,1,22,11.19Z"/>`;
    return x`<svg viewBox="0 0 24 24" width="38" height="38" xmlns="http://www.w3.org/2000/svg">
            ${icon}
        </svg>`;
  }
  _iconNav() {
    const icon = b`<path d="M7,6H23a1,1,0,0,0,0-2H7A1,1,0,0,0,7,6Z"/><path d="M23,11H7a1,1,0,0,0,0,2H23a1,1,0,0,0,0-2Z"/><path d="M23,18H7a1,1,0,0,0,0,2H23a1,1,0,0,0,0-2Z"/><circle cx="2" cy="5" r="2"/><circle cx="2" cy="12" r="2"/><circle cx="2" cy="19" r="2"/>`;
    return x`<svg viewBox="0 0 24 24" width="38" height="38" xmlns="http://www.w3.org/2000/svg">
            ${icon}
        </svg>`;
  }
  _iconSearch() {
    const icon = b`<path d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z"/>`;
    return x`<svg viewBox="0 0 24 24" width="38" height="38" xmlns="http://www.w3.org/2000/svg">
            ${icon}
        </svg>`;
  }
  _iconMail() {
    const icon = b`<path d="M19,1H5A5.006,5.006,0,0,0,0,6V18a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V6A5.006,5.006,0,0,0,19,1ZM5,3H19a3,3,0,0,1,2.78,1.887l-7.658,7.659a3.007,3.007,0,0,1-4.244,0L2.22,4.887A3,3,0,0,1,5,3ZM19,21H5a3,3,0,0,1-3-3V7.5L8.464,13.96a5.007,5.007,0,0,0,7.072,0L22,7.5V18A3,3,0,0,1,19,21Z"/>`;
    return x`<svg viewBox="0 0 24 24" width="38" height="38" xmlns="http://www.w3.org/2000/svg">
            ${icon}
        </svg>`;
  }
  render() {
    return x`
            <header id="header" class="header">
                <div class="container horizontal">
                    <slot name="header">${module_default2}</slot>
                </div>
            </header>
            <aside id="aside" class="aside">
                <menu id="menu" class="menu">
                    <app-view type="icon" target="navigation">${this._iconHome()}</app-view>
                    <app-view type="icon" target="navigation">${this._iconNav()}</app-view>
                    <app-view type="icon" target="search">${this._iconSearch()}</app-view>
                    <app-view type="icon" target="messaging">${this._iconMail()}</app-view>
                </menu>
                <div id="navigation" class="small-bottomSheet medium-sideSheet hidden">
                    <div class="container horizontal">
                        <h3>Navigation:</h3>
                        <ul>
                            <li><a href='/a/'>Vertical A</a></li>
                            <li><a href='/b/'>Vertical B</a></li>
                            <li><a href='/c/'>Vertical C</a></li>
                            <li><a href='/'>Home</a></li>
                        </ul>
                        <app-view target="navigation">Close</app-view>
                    </div>
                </div>
                <div id="search" class="search small-bottomSheet medium-sideSheet hidden">
                    <div class="container vertical">
                        <slot name="search"></slot>
                    </div>
                </div>
                <div id="messaging" class="messaging small-bottomSheet medium-sideSheet hidden">
                    <div class="container horizontal">
                        <slot name="messaging">
                            ${module_default}
                            <app-view target="messaging">Close</app-view>
                        </slot>
                    </div>
                </div>
            </aside>
            <main id="main" class="main">
                <div class="container vertical">
                    <slot name="main"></slot>
                </div>
            </main>
            <footer id="footer" class="footer">
                Copyright something
            </footer>
        `;
  }
};
if (!customElements.get("app-frame")) {
  customElements.define("app-frame", ApplicationFrame);
}
export {
  ApplicationFrame as default
};
