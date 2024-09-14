import o from "kaif";
const k = ({ getDynamicConfig: t }) => {
  const {
    close: e,
    cancel: i,
    okay: a,
    title: c,
    inputs: s,
    onsubmit: u,
    onclose: b
  } = t(), y = typeof c == "string" ? /* @__PURE__ */ o.h("h2", null, c) : typeof c == "function" ? c() : "", f = typeof i == "string" ? /* @__PURE__ */ o.h("a", { onclick: e }, i) : typeof i == "function" ? i() : "", d = typeof a == "string" ? /* @__PURE__ */ o.h("button", null, a) : typeof a == "function" ? a() : "", h = Array.isArray(s) ? /* @__PURE__ */ o.h(o.Fragment, null, s.map((r) => /* @__PURE__ */ o.h("input", { name: r }))) : typeof s == "function" ? s() : "";
  return !y && !h && !d && !f ? /* @__PURE__ */ o.h("dialog", { className: "kaifui-dynamic" }) : /* @__PURE__ */ o.h(
    "dialog",
    {
      onclick: e,
      onclose: b,
      className: "kaifui-dynamic"
    },
    /* @__PURE__ */ o.h(
      "form",
      {
        onclick: (r) => r.stopPropagation(),
        onsubmit: u
      },
      y,
      h,
      /* @__PURE__ */ o.h("div", { className: "button-group" }, [f, d].filter((r) => !!r))
    )
  );
};
let m = null, n = null, l = null;
const g = () => l, p = (t) => (l = t, m != null ? (m(), n) : (n = document.querySelector(".kaifui-dynamic"), n || (n = document.createElement("dialog"), document.body.append(n)), m = o.init(
  n,
  k.bind(null, { getDynamicConfig: g })
), n)), C = {
  alert(t = "Alert") {
    return new Promise((e, i) => {
      t = Object.assign(
        {
          cancel: "Close",
          close: () => {
            l = {}, n.close(), e();
          },
          onclose: () => {
            l = {}, e();
          }
        },
        typeof t == "string" ? { title: t } : t
      ), p(t).showModal();
    });
  },
  confirm(t = "Confirm") {
    return new Promise((e, i) => {
      t = Object.assign(
        {
          cancel: "Close",
          okay: "OK",
          close: () => {
            l = {}, n.close(), e(!1);
          },
          onsubmit: (a) => {
            a.preventDefault(), e(!0), l = {}, n.close();
          },
          onclose: () => {
            l = {}, e(!1);
          }
        },
        typeof t == "string" ? { title: t } : t
      ), p(t).showModal();
    });
  },
  prompt(t = "Prompt") {
    return new Promise((e, i) => {
      t = Object.assign(
        {
          cancel: "Close",
          okay: "OK",
          inputs: ["val"],
          close: () => {
            l = {}, n.close(), e("");
          },
          onsubmit: (a) => {
            a.preventDefault();
            const c = {};
            new FormData(a.target).forEach((s, u) => c[u] = s), e(
              Object.keys(c).length === 1 ? c.val : c
            ), l = {}, n.close();
          },
          onclose: () => {
            l = {}, e("");
          }
        },
        typeof t == "string" ? { title: t } : t
      ), p(t).showModal();
    });
  }
};
export {
  C as dynamic
};
