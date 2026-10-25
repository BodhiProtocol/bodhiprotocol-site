import sys, os, yaml, html
OUT=os.environ.get("OUT","cross-posts")
slug = sys.argv[1]
raw = open(f"content/great-minds/{slug}.mdx").read()
_, fm, body = raw.split("---", 2)
d = yaml.safe_load(fm)
e = lambda s: html.escape(s, quote=True).replace("&#x27;", "&#39;")
url = f"https://bodhiprotocol.com/great-minds/{slug}"
paras = lambda t: "\n".join(f"<p>{e(p.strip())}</p>" for p in t.strip().split("\n\n") if p.strip())
def lst(items, k, v):
    return "<ul>\n" + "\n".join(f"<li><strong>{e(i[k])}</strong> — {e(i[v])}</li>" for i in items) + "\n</ul>"
def take(key):
    return f"\n<p><em>{e(d[key])}</em></p>" if d.get(key) else ""
inner = paras(body)
inner += "\n<h2>Core Philosophy</h2>\n" + paras(d["corePhilosophy"]) + take("corePhilosophyTakeaway")
inner += "\n<h2>Thinking Process</h2>\n" + lst(d["thinkingProcess"], "title", "description") + take("thinkingProcessTakeaway")
inner += "\n<h2>Mental Models</h2>\n" + lst(d["mentalModels"], "name", "description") + take("mentalModelsTakeaway")
inner += "\n<h2>Big Ideas</h2>\n" + lst(d["bigIdeas"], "title", "description")
if d.get("scholarshipNotes"):
    inner += "\n<h2>Notes on the Record</h2>\n<ul>\n" + "\n".join(f"<li>{e(n)}</li>" for n in d["scholarshipNotes"]) + "\n</ul>"
inner += "\n" + paras(d["closingReflection"])
head = f'''<div style="font-family: Georgia, 'Times New Roman', serif; font-size: 20px; line-height: 1.65; max-width: 680px; margin: 60px auto; color: #0a0a0a;">
  <img src="{url}/opengraph-image" alt="{e(d["name"])}" style="width: 100%; height: auto; margin-bottom: 32px;" />
  <h1 style="font-size: 38px; line-height: 1.25; margin-bottom: 32px;">{e(d["name"])}</h1>
  {inner}
'''
sub = head + f'''
  <p style="margin-top: 32px; font-size: 14px; color: #52525b;">
    Originally published at <a href="{url}" style="color: #7c3aed;">bodhiprotocol.com</a>.
  </p>
</div>
'''
med = head + f'''
</div>
<hr style="max-width: 680px; margin: 0 auto;" />
<p style="font-family: sans-serif; font-size: 13px; color: #52525b; max-width: 680px; margin: 16px auto;">
  Not part of the story — for you, before you paste this in:<br />
  Tags to add on Medium's publish screen: {", ".join(d["roles"])}<br />
  Canonical link to set (Medium story menu "..." → "Change settings" → "Add canonical link"): {url}
</p>
'''
open(f"{OUT}/{slug}.substack.html","w").write(sub)
open(f"{OUT}/{slug}.medium.html","w").write(med)
