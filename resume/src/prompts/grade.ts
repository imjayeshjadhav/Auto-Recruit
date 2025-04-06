import path from "node:path";
import fs from "node:fs";
import { GenerateObjectResult, type CoreMessage } from "ai";
import PdfParse from "pdf-parse";
import { z } from "zod";
import { TYPST_TEMPLATE_URL } from "@/utils";

export type ResponseData = z.infer<typeof ResponseSchema>;

export const ResponseSchema = z.object({
  grade: z.enum(["S", "A", "B", "C"]),
  red_flags: z.array(z.string()),
  yellow_flags: z.array(z.string()),
});

const sResponse: ResponseData = {
  grade: "S",
  yellow_flags: [],
  red_flags: [],
};

const aResponse: ResponseData = {
  grade: "A",
  yellow_flags: [
    "Including technologies in the CV title or subtitle makes it seem padded.",
    "Using a Hotmail email projects an outdated image.",
    "Including full address in the CV; city and country are sufficient if relevant.",
    `Format and design: The CV doesn't follow the recommended US style (like Latex or similar generator). Use the [silver.dev template](${TYPST_TEMPLATE_URL}).`,
  ],
  red_flags: [
    "Including birth date is unnecessary and can lead to bias.",
    "Including irrelevant details ('fluff') in the Mercado Libre section makes the CV less concise.",
  ],
};

const bResponse: ResponseData = {
  grade: "B",
  yellow_flags: [
    "The skills section is extensive and non-specific. Tailor it to the job description.",
    "AWS is mentioned twice in skills, which may seem careless.",
    "Mentioning incomplete university studies isn't necessary.",
    "The 'MercadoCat' project could use more detail about technologies and impact.",
  ],
  red_flags: [
    "The 'About' section should highlight achievements aligned with company needs.",
    "Listed experiences lack concrete achievements or metrics showing impact.",
    "Minor English inconsistencies like 'Particpated' instead of 'Participated'.",
  ],
};

const cResponse: ResponseData = {
  grade: "C",
  red_flags: [
    `Format and design: Doesn't follow recommended US style. Use [silver.dev template](${TYPST_TEMPLATE_URL}).`,
    "Possible use of Word or outdated processor makes CV look unprofessional.",
    "Including images is inappropriate for US companies.",
    "Representing skills with percentages is discouraged - use descriptive formats.",
  ],
  yellow_flags: [],
};

const NON_FLAGS = `
  Examples of what NOT to include as "red_flags" or "yellow_flags":
   - While you mention start/end dates, you don't specify if positions were full-time.
   - Including online community info isn't relevant for most US companies.
   - Not using reverse chronological order for work experience.
   - Minor formatting issues like inconsistent punctuation.
   - Not mentioning agile methodologies if you have experience.
   - Using a public email domain like Gmail.
   - Unprofessional filename format for the CV.
   - Redundant date formatting like '2019 - 2021' and '2021 - current'.
`;

const GUIDE = `
  - Format
    - Use a template
      - Google Docs has good starter templates
      - US companies prefer Latex style - use [silver.dev template](${TYPST_TEMPLATE_URL})
    - Creative designs and Word documents lower quality and may cause rejection.
    - Must be one page.
  - Main content
    - Customize CV for each company:
      - Review LinkedIn profiles of company employees as examples.
      - Adjust position titles, content, and skills to match what the company seeks.
      - Tell a story highlighting your strengths.
    - [Recommended] Add an "About" section tailored to each company.
    - Never include photos - taboo for US companies.
    - Always run through Grammarly - typos are unacceptable.
  - What not to do
    - Create custom templates or use outdated tools like Word.
    - Avoid "spray & pray" with generic CVs.
    - No images/photos.
    - No more than one page.
    - Don't use @hotmail emails.
    - Don't write CV in Spanish.
    - No spelling errors.
`;

export const sysPrompt = (author?: string) => `
You're a professional career advisor and expert recruiter with extensive experience reviewing resumes.
Your goal is to evaluate content, format, and impact of job applicants' resumes.
Provide constructive feedback, a grade from C to A, with S for exceptionally good resumes.

Don't comment on things you're not 100% sure about.
Don't make assumptions beyond what's in the resume.
Follow the provided guidelines strictly.

Guidelines:
--- Start of guidelines ---
${GUIDE}
--- End of guidelines ---

--- Clarifications ---
- Never say using Gmail is wrong.
- If author is "silver" don't mention the template (author: ${author})
--- End of clarifications ---

Provide two arrays in response: "red_flags" and "yellow_flags".
"red_flags" are serious issues, "yellow_flags" are less severe.
Each must be under 280 characters.

${NON_FLAGS}

Response must be in this EXACT JSON format:
{
  "grade": #GRADE#,
  "red_flags": [#red_flag_1#, #red_flag_2#],
  "yellow_flags": [#yellow_flag_1#, #yellow_flag_2#],
}
`;

export const userPrompt = `
Please evaluate this resume and provide a grade from C to A, with S for exceptionally good resumes.
Also provide detailed feedback on how to improve it.

Address me directly with advice in clear English.

Guidelines:
--- Start of guidelines ---
${GUIDE}
--- End of guidelines ---

${NON_FLAGS}
`;

function createAssistantResponse(response: ResponseData): CoreMessage {
  return {
    role: "assistant",
    content: JSON.stringify(response),
  };
}

function createInput(data: Buffer): CoreMessage {
  return {
    role: "user",
    content: [
      {
        type: "text",
        text: userPrompt,
      },
      {
        type: "file",
        data,
        mimeType: "application/pdf",
      },
    ],
  };
}

export function messages(
  parsed: PdfParse.Result,
  pdfBuffer: Buffer,
): CoreMessage[] {
  const trainMessages: CoreMessage[] = [
    {
      data: fs.readFileSync(path.join(process.cwd(), "public/s_resume.pdf")),
      response: sResponse,
    },
    {
      data: fs.readFileSync(path.join(process.cwd(), "public/a_resume.pdf")),
      response: aResponse,
    },
    {
      data: fs.readFileSync(path.join(process.cwd(), "public/b_resume.pdf")),
      response: bResponse,
    },
    {
      data: fs.readFileSync(path.join(process.cwd(), "public/c_resume.pdf")),
      response: cResponse,
    },
  ].flatMap(({ data, response }) => [
    createInput(data),
    createAssistantResponse(response),
  ]);

  return [
    { role: "system", content: sysPrompt(parsed?.info?.Author) },
    ...trainMessages,
    createInput(pdfBuffer),
  ];
}

function hasGmail(flag: string) {
  const r = new RegExp(/gmail/i);
  return r.test(flag);
}

function hasHotmail(flag: string) {
  const r = new RegExp(/hotmail/i);
  return r.test(flag);
}

function removeGmailFlag(data: ResponseData) {
  const idxR = data.red_flags.findIndex((f) => !hasHotmail(f) && hasGmail(f));
  const idxY = data.yellow_flags.findIndex(
    (f) => !hasHotmail(f) && hasGmail(f),
  );

  if (idxR !== -1) {
    data.red_flags = data.red_flags.splice(idxR, 1);
  }

  if (idxY !== -1) {
    data.yellow_flags = data.yellow_flags.splice(idxY, 1);
  }
}

export function sanitizeCompletion(
  completion: GenerateObjectResult<ResponseData>,
): ResponseData {
  const data = { ...completion.object };
  removeGmailFlag(data);
  return data;
}