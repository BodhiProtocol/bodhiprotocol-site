"""Build one self-contained publishing kit per platform for a Great Minds entry.

usage: python3 bundle.py <config.json> <content-root> <out-dir>

Each kit is a single HTML file: a "before you paste" panel (title, subtitle,
tags or email subject, Note, steps, copy buttons) followed by the article,
with the cover and any inline images embedded so the file works offline.
"""
import base64, html, json, os, re, sys, yaml

cfg = json.load(open(sys.argv[1]))
root, out = sys.argv[2], sys.argv[3]
slug = cfg["slug"]
if cfg.get("article_html"):
    # Pre-rendered article body (from scripts/cross-post): keep everything after its <h1>,
    # minus its own cover image and "Originally published" footer.
    src = open(cfg["article_html"]).read()
    src = src.split("</h1>", 1)[1]
    src = re.split(r'<p style="margin-top: 32px', src)[0]
    src = re.sub(r"</div>\s*$", "", src.strip())
    d = {"name": cfg["name"]}
    body = ""
    url = cfg["url"]
else:
    raw = open(os.path.join(root, f"content/great-minds/{slug}.mdx")).read()
    _, fm, body = raw.split("---", 2)
    d = yaml.safe_load(fm)
    url = f"https://bodhiprotocol.com/great-minds/{slug}"

def e(s):
    return html.escape(s, quote=True)

def data_uri(path):
    ext = os.path.splitext(path)[1].lower().lstrip(".")
    mime = {"png": "image/png", "jpg": "image/jpeg", "jpeg": "image/jpeg", "webp": "image/webp"}[ext]
    return f"data:{mime};base64," + base64.b64encode(open(path, "rb").read()).decode()

def figure(img):
    return (f'<figure><img src="{data_uri(img["path"])}" alt="{e(img["alt"])}" />'
            f'<figcaption>{e(img["caption"])}</figcaption></figure>')

def paras(text):
    return [p.strip() for p in text.strip().split("\n\n") if p.strip()]

def lst(items, k, v):
    return "<ul>\n" + "\n".join(f"<li><strong>{e(i[k])}</strong> — {e(i[v])}</li>" for i in items) + "\n</ul>"

def take(key):
    return f"<blockquote>{e(d[key])}</blockquote>" if d.get(key) else ""

def rep(t):
    for old, new in cfg.get("replace", {}).items():
        t = t.replace(old, new)
    return t

if cfg.get("article_html"):
    for img in cfg.get("inline", []):
        # For pre-rendered articles, place an inline image just before a named section heading.
        if img.get("before_heading"):
            h = html.escape(img["before_heading"], quote=True)
            src = src.replace(f"<h2>{h}</h2>", figure(img) + f"\n<h2>{h}</h2>", 1)
    parts = [figure(cfg["cover"]), rep(src),
             f'<p><em>Originally published on <a href="{url}">BodhiProtocol</a>. '
             f'<a href="https://bodhiprotocol.com">Explore more at bodhiprotocol.com</a>.</em></p>']
else:
    intro = paras(body)
    for old, new in cfg.get("replace", {}).items():
        intro = [p.replace(old, new) for p in intro]

    parts = [figure(cfg["cover"])]
    for i, p in enumerate(intro):
        parts.append(f"<p>{e(p)}</p>")
        for img in cfg.get("inline", []):
            if img["after_paragraph"] == i + 1:
                parts.append(figure(img))
    parts.append("<h2>Core Philosophy</h2>" + "".join(f"<p>{e(p)}</p>" for p in paras(d["corePhilosophy"])) + take("corePhilosophyTakeaway"))
    parts.append("<h2>Thinking Process</h2>" + lst(d["thinkingProcess"], "title", "description") + take("thinkingProcessTakeaway"))
    parts.append("<h2>Mental Models</h2>" + lst(d["mentalModels"], "name", "description") + take("mentalModelsTakeaway"))
    parts.append("<h2>Big Ideas</h2>" + lst(d["bigIdeas"], "title", "description"))
    if d.get("scholarshipNotes"):
        parts.append("<h2>Notes on the Record</h2><ul>" + "".join(f"<li>{e(rep(n))}</li>" for n in d["scholarshipNotes"]) + "</ul>")
    parts.append("".join(f"<p>{e(p)}</p>" for p in paras(d.get("closingReflection", ""))))
    parts.append(f'<p><em>Originally published on <a href="{url}">BodhiProtocol</a> as part of the Great Minds series. '
                 f'<a href="https://bodhiprotocol.com/great-minds">Explore all the Great Minds</a>.</em></p>')
article = "\n".join(parts)

def field(label, value, multiline=False):
    tag = "textarea" if multiline else "input"
    inner = (f'<textarea readonly rows="4">{e(value)}</textarea>' if multiline
             else f'<input readonly value="{e(value)}" />')
    return (f'<div class="field"><span class="lbl">{e(label)}</span>'
            f'<div class="row">{inner}<button type="button" class="copy">Copy</button></div></div>')

def kit(platform):
    p = cfg[platform]
    fields = [field("Title", cfg["title"]), field("Subtitle", cfg["subtitle"])]
    if platform == "substack":
        fields.append(field("Email subject line (Settings → Email header)", p["email_subject"]))
        fields.append(field("Substack Note (post 1–2 days before)", p["note"], multiline=True))
    else:
        fields.append(field("Tags (add up to 5 on the publish screen)", ", ".join(p["tags"])))
        fields.append(field("Original link (Story settings → Advanced → originally published elsewhere)", url))
    steps = "".join(f"<li>{s}</li>" for s in p["steps"])
    imgs = "".join(
        f'<div class="thumb"><img src="{data_uri(i["path"])}" alt="{e(i["alt"])}" /><span>{e(i["use"] if platform == "substack" else i["use"].replace(" (and Substack social preview)", ""))}</span></div>'
        for i in [cfg["cover"]] + cfg.get("inline", []))
    name = "Substack" if platform == "substack" else "Medium"
    return f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(d['name'])} · {name} kit</title>
<style>
  :root {{ --bg:#fafafa; --ink:#0a0a0a; --muted:#52525b; --brand:#7c3aed; --soft:#f3eefe; --line:#e4dcf7; }}
  * {{ box-sizing:border-box; }}
  body {{ margin:0; background:var(--bg); color:var(--ink); font:18px/1.7 Georgia, "Times New Roman", serif; }}
  .wrap {{ max-width:720px; margin:0 auto; padding:28px 16px 80px; }}
  .kit {{ font:15px/1.5 system-ui, -apple-system, "Segoe UI", sans-serif; background:var(--soft); border:1px solid var(--line); border-radius:12px; padding:18px; display:grid; gap:14px; margin-bottom:40px; }}
  .kit h2 {{ margin:0; font-size:17px; color:var(--brand); }}
  .kit p {{ margin:0; color:var(--muted); }}
  .field {{ display:grid; gap:4px; }}
  .lbl {{ font-size:13px; font-weight:600; }}
  .row {{ display:flex; gap:8px; }}
  .row input, .row textarea {{ flex:1; min-width:0; font:inherit; border:1px solid var(--line); border-radius:8px; padding:8px 10px; background:#fff; color:var(--ink); resize:vertical; }}
  button {{ font:600 14px system-ui, sans-serif; border-radius:8px; border:1px solid var(--brand); background:#fff; color:var(--brand); padding:8px 14px; cursor:pointer; white-space:nowrap; }}
  button.big {{ background:var(--brand); color:#fff; padding:12px 18px; font-size:15px; }}
  ol {{ margin:0; padding-left:20px; color:var(--ink); }} ol li {{ margin:4px 0; }}
  .thumbs {{ display:flex; gap:12px; flex-wrap:wrap; }}
  .thumb {{ display:grid; gap:4px; width:200px; font-size:12px; color:var(--muted); }}
  .thumb img {{ width:100%; border:1px solid var(--line); border-radius:6px; background:#fff; }}
  #status {{ color:var(--brand); font-weight:600; }}
  article h1 {{ font-size:36px; line-height:1.2; margin:0 0 6px; }}
  article .sub {{ font-size:20px; color:var(--muted); margin:0 0 24px; font-style:italic; }}
  article h2 {{ margin-top:40px; }}
  article figure {{ margin:28px 0; }} article figure img {{ width:100%; height:auto; border-radius:6px; }}
  article figcaption {{ font-size:14px; color:var(--muted); text-align:center; margin-top:6px; }}
  article blockquote {{ border-left:3px solid var(--brand); margin:20px 0; padding:2px 16px; font-style:italic; }}
  article a {{ color:var(--brand); }}
</style></head><body><div class="wrap">
<section class="kit" aria-label="Publishing kit, not part of the article">
  <h2>{name} publishing kit · {e(d['name'])}</h2>
  <p>Everything for this post is in this one file. The purple box is for you; the article starts below it.</p>
  {''.join(fields)}
  <div class="field"><span class="lbl">Images (right-click an image → “Save image as…”, then upload it in {name})</span><div class="thumbs">{imgs}</div></div>
  <div class="field"><span class="lbl">Steps</span><ol>{steps}</ol></div>
  <div><button type="button" class="big" id="copyArticle">Copy article</button> <span id="status" aria-live="polite"></span></div>
</section>
<article id="article">
<h1>{e(cfg['title'])}</h1>
<p class="sub">{e(cfg['subtitle'])}</p>
{article}
</article>
</div>
<script>
document.querySelectorAll('.copy').forEach(b => b.addEventListener('click', async () => {{
  const box = b.parentElement.querySelector('input, textarea');
  try {{ await navigator.clipboard.writeText(box.value); b.textContent = 'Copied'; }}
  catch (err) {{ box.select(); b.textContent = 'Press Ctrl+C'; }}
  setTimeout(() => b.textContent = 'Copy', 2000);
}}));
document.getElementById('copyArticle').addEventListener('click', async () => {{
  const el = document.getElementById('article'), s = document.getElementById('status');
  try {{
    await navigator.clipboard.write([new ClipboardItem({{
      'text/html': new Blob([el.innerHTML], {{type: 'text/html'}}),
      'text/plain': new Blob([el.innerText], {{type: 'text/plain'}})
    }})]);
    s.textContent = 'Copied. Paste it into {name}.';
  }} catch (err) {{
    const r = document.createRange(); r.selectNodeContents(el);
    const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
    s.textContent = 'Article selected. Press Ctrl+C (Cmd+C on Mac) to copy.';
  }}
}});
</script>
</body></html>
"""

for platform in ("substack", "medium"):
    path = os.path.join(out, f"{slug}.{platform}-kit.html")
    open(path, "w").write(kit(platform))
    print(path, os.path.getsize(path))
