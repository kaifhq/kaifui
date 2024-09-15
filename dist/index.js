import o from "kaif";
const k = ({ getDynamicConfig: t }) => {
  const {
    close: e,
    cancel: s,
    okay: a,
    title: c,
    inputs: i,
    onsubmit: u,
    onclose: m
  } = t(), f = typeof c == "string" ? /* @__PURE__ */ o.h("h2", null, c) : typeof c == "function" ? c() : "", d = typeof s == "string" ? /* @__PURE__ */ o.h("a", { onclick: e }, s) : typeof s == "function" ? s() : "", h = typeof a == "string" ? /* @__PURE__ */ o.h("button", null, a) : typeof a == "function" ? a() : "", b = Array.isArray(i) ? /* @__PURE__ */ o.h(o.Fragment, null, i.map((r) => /* @__PURE__ */ o.h("input", { name: r }))) : typeof i == "function" ? i() : "";
  return !f && !b && !h && !d ? /* @__PURE__ */ o.h("dialog", { className: "kaifui-dynamic" }) : /* @__PURE__ */ o.h(
    "dialog",
    {
      onclick: e,
      onclose: m,
      className: "kaifui-dynamic"
    },
    /* @__PURE__ */ o.h(
      "form",
      {
        onclick: (r) => r.stopPropagation(),
        onsubmit: u
      },
      f,
      b,
      /* @__PURE__ */ o.h("div", { className: "button-group" }, [d, h].filter((r) => !!r))
    )
  );
};
let y = null, n = null, l = null;
const g = () => l, p = (t) => (l = t, y != null ? (y(), n) : (n = document.querySelector(".kaifui-dynamic"), n || (n = document.createElement("dialog"), document.body.append(n)), y = o.init(
  n,
  k.bind(null, { getDynamicConfig: g })
), n)), C = {
  alert(t = "Alert") {
    return new Promise((e, s) => {
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
    return new Promise((e, s) => {
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
    return new Promise((e, s) => {
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
            new FormData(a.target).forEach((u, m) => c[m] = u);
            const i = Object.keys(c);
            e(
              i.length === 1 ? c[i[0]] : c
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
