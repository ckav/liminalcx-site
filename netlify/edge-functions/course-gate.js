// Paid course gate. Everything under /learn/<course>/ needs that course's access code.
// The code lives in a Netlify environment variable, never in this repo:
//   course folder /learn/ai-business/  ->  variable CODE_AI_BUSINESS
// Change the variable to change the code (everyone then re-enters the new one).
// /learn/unlock/ is the public page where people type the code.

const norm = (s) => String(s || "").trim().toUpperCase().replace(/\s+/g, "");
const slugOf = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9-]/g, "");
const codeFor = (slug) => norm(Netlify.env.get("CODE_" + slug.toUpperCase().replace(/-/g, "_")));

async function token(code) {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("liminalcx-course:" + code));
  return [...new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default async (request, context) => {
  const url = new URL(request.url);
  const slug = slugOf(url.pathname.split("/").filter(Boolean)[1]);

  if (!slug) return; // /learn/ itself is public

  if (slug === "unlock") {
    if (request.method !== "POST") return; // show the code page
    const form = await request.formData();
    const course = slugOf(form.get("course"));
    const real = course && codeFor(course);
    if (real && norm(form.get("code")) === real) {
      return new Response(null, {
        status: 303,
        headers: {
          Location: `/learn/${course}/`,
          "Set-Cookie": `lcx_${course}=${await token(real)}; Path=/learn/; Max-Age=31536000; HttpOnly; Secure; SameSite=Lax`,
        },
      });
    }
    return Response.redirect(new URL(`/learn/unlock/?course=${course}&wrong=1`, url), 303);
  }

  const real = codeFor(slug);
  if (real && context.cookies.get(`lcx_${slug}`) === (await token(real))) {
    const res = await context.next();
    res.headers.set("Cache-Control", "private, no-store");
    return res;
  }
  return Response.redirect(new URL(`/learn/unlock/?course=${slug}`, url), 302);
};

export const config = { path: "/learn/*" };
