"use client"

import { useMemo, useState } from "react"

type StageId = "VIII" | "IX" | "X" | "XI" | "XII" | "GRAD"
type Period = "Next 30 days" | "Next 3–6 months" | "This academic year"
type Task = { id: string; period: Period; title: string; purpose: string }
type Stage = {
  id: StageId
  label: string
  verb: string
  heading: string
  summary: string
  outputs: string[]
  tasks: Task[]
  parentPrompt: string
}

const stages: Stage[] = [
  {
    id: "VIII", label: "Class VIII", verb: "Discover",
    heading: "Discover strengths and possibilities",
    summary: "Explore interests, learning preferences and the world of careers. No early career lock-in.",
    outputs: ["Student Discovery Profile", "5–8 career clusters to explore", "Development roadmap"],
    parentPrompt: "Encourage curiosity, observe interests and discuss experiences without choosing a career for the student.",
    tasks: [
      { id: "8a", period: "Next 30 days", title: "Complete the discovery conversation", purpose: "Document interests, preferred subjects and activities." },
      { id: "8b", period: "Next 3–6 months", title: "Explore three different career clusters", purpose: "Build awareness through talks, research or interactive activities." },
      { id: "8c", period: "This academic year", title: "Review interests and academic development", purpose: "Update the profile with school feedback and new experiences." },
    ],
  },
  {
    id: "IX", label: "Class IX", verb: "Explore",
    heading: "Explore careers before choosing a direction",
    summary: "Compare possible pathways, academic strengths and skills without assuming one assessment determines the future.",
    outputs: ["Career interest report", "3–5 pathways for consideration", "Class IX–X plan"],
    parentPrompt: "Ask what the student enjoyed learning and exploring rather than pushing for a final career choice.",
    tasks: [
      { id: "9a", period: "Next 30 days", title: "Review interests and subject strengths", purpose: "Combine student reflections with school performance." },
      { id: "9b", period: "Next 3–6 months", title: "Research five careers and shortlist three", purpose: "Compare daily work, study routes and alternate pathways." },
      { id: "9c", period: "This academic year", title: "Prepare for Class X subject decisions", purpose: "Identify prerequisites worth keeping open." },
    ],
  },
  {
    id: "X", label: "Class X", verb: "Decide",
    heading: "Choose a stream and subjects with confidence",
    summary: "Match interests, school performance and intended degrees to suitable subjects; preserve alternatives.",
    outputs: ["Stream and subject options", "Career-to-course mapping", "Class XI–XII preparation plan"],
    parentPrompt: "Attend the joint counselling meeting and review both preferred and alternative subject combinations.",
    tasks: [
      { id: "10a", period: "Next 30 days", title: "Review academic records and interests", purpose: "Identify strengths, constraints and possible streams." },
      { id: "10b", period: "Next 3–6 months", title: "Map subjects to three degree pathways", purpose: "Verify entrance and subject prerequisites from official sources." },
      { id: "10c", period: "This academic year", title: "Agree on a stream and backup pathway", purpose: "Document the student-parent-counsellor discussion." },
    ],
  },
  {
    id: "XI", label: "Class XI", verb: "Develop",
    heading: "Build a university-ready profile",
    summary: "Develop academics, relevant projects, skills and an entrance examination plan.",
    outputs: ["Academic targets", "Profile-building plan", "Entrance examination milestones"],
    parentPrompt: "Review quarterly progress without treating every extracurricular activity as an admissions requirement.",
    tasks: [
      { id: "11a", period: "Next 30 days", title: "Set subject and pathway goals", purpose: "Choose 2–3 pathways and review grade expectations." },
      { id: "11b", period: "Next 3–6 months", title: "Start one meaningful project or activity", purpose: "Build evidence of learning, curiosity or leadership." },
      { id: "11c", period: "This academic year", title: "Review exams and university options", purpose: "Create a verified eligibility and planning shortlist." },
    ],
  },
  {
    id: "XII", label: "Class XII", verb: "Prepare",
    heading: "Plan and manage undergraduate admission",
    summary: "Turn a student's profile into verified course choices, admission tasks and a financial plan.",
    outputs: ["Reach/target/safer university options", "Application and exam calendar", "Admission and funding plan"],
    parentPrompt: "Agree on affordability and application priorities while preserving the student's course and career preferences.",
    tasks: [
      { id: "12a", period: "Next 30 days", title: "Verify eligibility for chosen courses", purpose: "Use official current admission pages, never assumptions." },
      { id: "12b", period: "Next 3–6 months", title: "Track entrance tests and applications", purpose: "Record deadlines, documents and submission statuses." },
      { id: "12c", period: "This academic year", title: "Compare offers and prepare transition", purpose: "Review fees, fit, scholarships and enrolment requirements." },
    ],
  },
  {
    id: "GRAD", label: "Graduation", verb: "Transition",
    heading: "Choose a postgraduate or career transition",
    summary: "Assess postgraduate study, employment, professional training, research and entrepreneurship options.",
    outputs: ["Graduate career profile", "PG/career shortlist", "Transition roadmap"],
    parentPrompt: "Support an informed discussion about return on education investment and alternative options.",
    tasks: [
      { id: "ga", period: "Next 30 days", title: "Audit qualifications, experience and goals", purpose: "Clarify realistic pathways and any skill gaps." },
      { id: "gb", period: "Next 3–6 months", title: "Compare postgraduate and career routes", purpose: "Verify entry criteria, funding and likely career relevance." },
      { id: "gc", period: "This academic year", title: "Prepare applications or a career portfolio", purpose: "Work toward documented next-step decisions." },
    ],
  },
]

const periods: Period[] = ["Next 30 days", "Next 3–6 months", "This academic year"]

export default function StudentJourneyDemo() {
  const [stageId, setStageId] = useState<StageId>("IX")
  const [view, setView] = useState<"student" | "parent">("student")
  const [completed, setCompleted] = useState<Record<string, boolean>>({})
  const stage = stages.find((item) => item.id === stageId) ?? stages[0]
  const done = useMemo(() => stage.tasks.filter((task) => completed[task.id]).length, [stage, completed])
  const percent = Math.round((done / stage.tasks.length) * 100)

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-blue-700">RoadToCareers</p>
            <h1 className="text-lg font-bold text-slate-900">My Education & Career Journey</h1>
          </div>
          <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-medium text-blue-800">Sample experience · Not connected to real student records</span>
        </div>
      </header>
      <div className="mx-auto max-w-6xl space-y-6 px-5 py-8">
        <section className="rounded-3xl bg-[#112b50] p-7 text-white shadow-sm md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[.18em] text-blue-200">A personalised pathway starts at any stage</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-bold md:text-4xl">{stage.heading}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 md:text-base">{stage.summary}</p>
            </div>
          </div>
        </section>
        <section aria-label="Choose your current academic stage" className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="mb-3 text-sm font-semibold text-slate-700">Choose your current academic stage</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {stages.map((item) => (
              <button key={item.id} type="button" aria-pressed={stageId === item.id}
                onClick={() => setStageId(item.id)}
                className={stageId === item.id
                  ? "rounded-xl border border-blue-800 bg-blue-800 p-3 text-left text-white"
                  : "rounded-xl border border-slate-200 bg-white p-3 text-left text-slate-800 hover:border-blue-300 hover:bg-blue-50"}>
                <span className="block text-sm font-semibold">{item.label}</span>
                <span className={stageId === item.id ? "text-xs text-blue-100" : "text-xs text-slate-500"}>{item.verb}</span>
              </button>
            ))}
          </div>
        </section>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex rounded-xl border border-slate-200 bg-white p-1" aria-label="Switch view">
            <button type="button" aria-pressed={view === "student"} onClick={() => setView("student")} className={view === "student" ? "rounded-lg bg-[#112b50] px-4 py-2 text-sm font-semibold text-white" : "rounded-lg px-4 py-2 text-sm text-slate-600"}>Student view</button>
            <button type="button" aria-pressed={view === "parent"} onClick={() => setView("parent")} className={view === "parent" ? "rounded-lg bg-[#112b50] px-4 py-2 text-sm font-semibold text-white" : "rounded-lg px-4 py-2 text-sm text-slate-600"}>Parent view</button>
          </div>
          <p className="text-sm text-slate-500">Illustrative roadmap only · No AI decisions or saved data</p>
        </div>
        {view === "student" ? (
          <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
            <section className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">My development roadmap</h3>
                  <span className="text-sm font-semibold text-blue-800">{done} of {stage.tasks.length} steps completed</span>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-label="Roadmap completion" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
                  <div className="h-full rounded-full bg-blue-700 transition-all" style={{ width: percent + "%" }} />
                </div>
              </div>
              {periods.map((period) => (
                <section key={period} className="rounded-2xl border border-slate-200 bg-white p-5">
                  <h4 className="mb-3 font-bold text-slate-800">{period}</h4>
                  {stage.tasks.filter((task) => task.period === period).map((task) => (
                    <label key={task.id} className="flex cursor-pointer items-start gap-3 rounded-xl bg-slate-50 p-4">
                      <input type="checkbox" checked={!!completed[task.id]} onChange={(event) => setCompleted((prev) => ({ ...prev, [task.id]: event.target.checked }))} className="mt-1 size-4 accent-blue-700" />
                      <span>
                        <span className={completed[task.id] ? "block text-sm font-semibold text-slate-500 line-through" : "block text-sm font-semibold text-slate-900"}>{task.title}</span>
                        <span className="mt-1 block text-sm leading-5 text-slate-600">{task.purpose}</span>
                      </span>
                    </label>
                  ))}
                </section>
              ))}
            </section>
            <aside className="space-y-4">
              <section className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-bold">What you will receive</h3>
                <ul className="mt-4 space-y-3">{stage.outputs.map((out) => <li key={out} className="flex gap-2 text-sm leading-5 text-slate-700"><span className="font-bold text-blue-700">✓</span>{out}</li>)}</ul>
              </section>
              <section className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
                <h3 className="font-bold text-blue-950">A counsellor is part of the process</h3>
                <p className="mt-2 text-sm leading-6 text-blue-900">Recommendations should be reviewed with the student and a qualified counsellor. Assessments are only one input—not a career verdict.</p>
              </section>
            </aside>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            <section className="rounded-2xl border border-slate-200 bg-white p-7">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-700">{stage.label} · Parent guidance</p>
              <h3 className="mt-3 text-xl font-bold">How to support the student</h3>
              <p className="mt-3 text-sm leading-7 text-slate-700">{stage.parentPrompt}</p>
              <p className="mt-4 text-sm text-slate-600">Parents can review objectives and next steps, but sensitive counselling notes need appropriate access controls and the student's voice remains central.</p>
            </section>
            <section className="rounded-2xl border border-slate-200 bg-white p-7">
              <h3 className="text-xl font-bold">What to discuss at the next review</h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                <li>What interested the student most recently?</li>
                <li>What activities or subjects are becoming easier or harder?</li>
                <li>What choices need verification with a counsellor?</li>
                <li>Which development milestone should be reviewed next?</li>
              </ul>
            </section>
          </div>
        )}
        <footer className="pb-8 text-xs leading-5 text-slate-500">This is a static pilot demonstration using sample guidance and browser-only checkbox state. It collects no personal information and does not save or transmit progress. Student registration, parental consent, private dashboards, verified university data and AI recommendations are future integration stages.</footer>
      </div>
    </main>
  )
}
